<?php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'saving_minds';

$conexao = new mysqli($host, $usuario, $senha, $banco);

if ($conexao->connect_error) {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro de conexão com o banco']);
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
$stmt = $conexao->prepare($sql);

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

$conexao->close();
?>