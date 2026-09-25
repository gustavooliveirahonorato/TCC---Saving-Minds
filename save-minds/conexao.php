<?php
ini_set('display_errors', 0);
error_reporting(0);

$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$db   = getenv('DB_NAME');
$port = getenv('DB_PORT') ?: 4000;

// Inicializa a conexão MySQLi com suporte a SSL (Exigido pelo TiDB Cloud)
$conn = mysqli_init();
$conn->ssl_set(NULL, NULL, NULL, NULL, NULL);
$conn->real_connect($host, $user, $pass, $db, (int)$port, NULL, MYSQLI_CLIENT_SSL);

if ($conn->connect_error) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['sucesso' => false, 'erro' => 'Erro de conexão: ' . $conn->connect_error]);
    exit;
}
?>