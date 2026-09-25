<?php
// Lê as variáveis do Render ou usa os valores padrão do TiDB caso rode local
$host = getenv('DB_HOST') ?: "gateway01.us-east-1.prod.aws.tidbcloud.com";
$usuario = getenv('DB_USER') ?: "Wen9maK69CYDqnX.root";
$senha = getenv('DB_PASS') ?: "FCzmAOxZakHLB0aa"; 
$banco = getenv('DB_NAME') ?: "sys";
$porta = getenv('DB_PORT') ?: 4000;

$conn = mysqli_init();
mysqli_ssl_set($conn, NULL, NULL, NULL, NULL, NULL);

if (!mysqli_real_connect($conn, $host, $usuario, $senha, $banco, (int)$porta, NULL, MYSQLI_CLIENT_SSL)) {
    die("Erro na conexão com o banco de dados: " . mysqli_connect_error());
}

$conn->set_charset("utf8mb4");
?>