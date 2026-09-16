<?php
$host = "gateway01.us-east-1.prod.aws.tidbcloud.com";
$usuario = "Wen9maK69CYDqnX.root";
$senha = "FCzmAOxZakHLB0aa"; 
$banco = "sys";
$porta = 4000;

// Cria a conexão incluindo a porta
$conn = mysqli_init();

// Configuração SSL exigida pelo TiDB Cloud
// (Se faltar isso, a conexão de fora da rede deles pode ser rejeitada)
mysqli_ssl_set($conn, NULL, NULL, NULL, NULL, NULL);

if (!mysqli_real_connect($conn, $host, $usuario, $senha, $banco, $porta, NULL, MYSQLI_CLIENT_SSL)) {
    die("Erro na conexão com o banco de dados: " . mysqli_connect_error());
}

$conn->set_charset("utf8mb4");
?>