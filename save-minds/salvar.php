<?php
header('Content-Type: application/json; charset=utf-8');

// Inclui a conexão segura configurada para o TiDB Cloud
require_once 'conexao.php';

// Garante que a variável $conn veio do conexao.php
if (!isset($conn) || $conn->connect_error) {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro de conexão com o banco de dados']);
    exit;
}

$usuario_id = $_POST['usuario_id'] ?? 1;
$titulo = $_POST['titulo'] ?? 'Mensagem do Mural';
$conteudo = $_POST['conteudo'] ?? '';
$e_publico = $_POST['e_publico'] ?? 1;

if (empty(trim($conteudo))) {
    echo json_encode(['sucesso' => false, 'erro' => 'Conteúdo vazio']);
    exit;
}

$sql = "INSERT INTO diario_mensagens (usuario_id, titulo, conteudo, e_publico) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("issi", $usuario_id, $titulo, $conteudo, $e_publico);
    if ($stmt->execute()) {
        echo json_encode(['sucesso' => true]);
    } else {
        echo json_encode(['sucesso' => false, 'erro' => 'Erro ao salvar no banco']);
    }
    $stmt->close();
} else {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro na query']);
}

$conn->close();
?>