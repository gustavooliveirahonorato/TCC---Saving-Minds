<?php
include('conexao.php'); // Certifique-se de que sua conexão com o banco está aqui

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario_id = $_POST['usuario_id'] ?? 1; // ID padrão ou vindo da sessão
    $pergunta_numero = $_POST['pergunta_numero'] ?? null;
    $resposta_escolhida = $_POST['resposta_escolhida'] ?? null;

    if ($pergunta_numero && $resposta_escolhida) {
        $stmt = $conn->prepare("INSERT INTO quiz (usuario_id, pergunta_numero, resposta_escolhida, data_resposta) VALUES (?, ?, ?, NOW())");
        $stmt->bind_param("iis", $usuario_id, $pergunta_numero, $resposta_escolhida);

        if ($stmt->execute()) {
            echo json_encode(["sucesso" => true, "mensagem" => "Resposta salva com sucesso!"]);
        } else {
            echo json_encode(["sucesso" => false, "erro" => "Erro ao salvar no banco."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["sucesso" => false, "erro" => "Dados incompletos."]);
    }
}
$conn->close();
?>