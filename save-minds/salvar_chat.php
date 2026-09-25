<?php
header('Content-Type: application/json; charset=utf-8');

// Usa a conexão SSL padronizada com o TiDB
require_once 'conexao.php';
$conexao = $conn;

if (!$conexao || $conexao->connect_error) {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro de conexao']);
    exit;
}

$usuario_id = 1; 
$remetente = $_POST['remetente'] ?? 'USUARIO';
$mensagem = $_POST['mensagem'] ?? '';

if (empty(trim($mensagem))) {
    echo json_encode(['sucesso' => false, 'erro' => 'Mensagem vazia']);
    exit;
}

$sql = "INSERT INTO chat_mensagens (usuario_id, remetente, mensagem) VALUES (?, ?, ?)";
$stmt = $conexao->prepare($sql);

if ($stmt) {
    $stmt->bind_param("iss", $usuario_id, $remetente, $mensagem);
    if ($stmt->execute()) {
        echo json_encode(['sucesso' => true]);
    } else {
        echo json_encode(['sucesso' => false, 'erro' => 'Erro ao executar']);
    }
    $stmt->close();
} else {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro no prepare']);
}

$conexao->close();
?>