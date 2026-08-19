<?php
header('Content-Type: application/json; charset=utf-8');

$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "saving_minds";

$conexao = new mysqli($servidor, $usuario, $senha, $banco);

if ($conexao->connect_error) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro na conexão com o banco."]);
    exit;
}

$humor = $_GET['humor'] ?? '';

if (!empty($humor)) {
    $sql_insert = "INSERT INTO registros_humor (humor) VALUES (?)";
    $stmt_insert = $conexao->prepare($sql_insert);
    $stmt_insert->bind_param("s", $humor);
    $stmt_insert->execute();
    $stmt_insert->close();
}

$frases = [
    'Radiante' => 'Que dia incrível! Continue espalhando essa energia positiva por onde passar.',
    'Bem' => 'Fico muito feliz em saber que você está bem! Aproveite cada momento do seu dia.',
    'Neutro' => 'Dias tranquilos são ótimos para recarregar as energias. Respire fundo e vá no seu ritmo.',
    'Exausto' => 'Você tem se esforçado bastante. Lembre-se de fazer uma pausa e cuidar de você hoje.'
];

if (array_key_exists($humor, $frases)) {
    echo json_encode([
        "sucesso" => true,
        "frase" => $frases[$humor]
    ]);
} else {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Selecione um humor válido."
    ]);
}

$conexao->close();
?>