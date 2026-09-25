<?php
// Desativa exibição de erros brutos no PHP para não quebrar o retorno JSON
ini_set('display_errors', 0);
error_reporting(0);

header('Content-Type: application/json; charset=utf-8');

// Usa a conexão padronizada com o TiDB
require_once 'conexao.php';

if (!isset($conn) || $conn->connect_error) {
    echo json_encode(["sucesso" => false, "erro" => "Erro de conexão com o banco de dados"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario_id = $_POST['usuario_id'] ?? 1;
    $pergunta_numero = $_POST['pergunta_numero'] ?? null;
    $resposta_escolhida = $_POST['resposta_escolhida'] ?? null;

    if ($pergunta_numero && $resposta_escolhida) {
        $stmt = $conn->prepare("INSERT INTO quiz (usuario_id, pergunta_numero, resposta_escolhida, data_resposta) VALUES (?, ?, ?, NOW())");
        
        if ($stmt) {
            $stmt->bind_param("iis", $usuario_id, $pergunta_numero, $resposta_escolhida);

            if ($stmt->execute()) {
                echo json_encode(["sucesso" => true, "mensagem" => "Resposta salva com sucesso!"]);
            } else {
                echo json_encode(["sucesso" => false, "erro" => "Erro ao salvar no banco."]);
            }
            $stmt->close();
        } else {
            echo json_encode(["sucesso" => false, "erro" => "Erro na preparação da query."]);
        }
    } else {
        echo json_encode(["sucesso" => false, "erro" => "Dados incompletos."]);
    }
} else {
    echo json_encode(["sucesso" => false, "erro" => "Método não permitido."]);
}

$conn->close();
?>