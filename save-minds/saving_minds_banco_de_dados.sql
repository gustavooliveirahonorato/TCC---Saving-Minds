-- ===================================================
-- BANCO DE DADOS: Saving Minds (TCC)
-- Desenvolvido para o projeto Saving Minds
-- Compatível com MySQL / MariaDB / phpMyAdmin / XAMPP
-- ===================================================

CREATE DATABASE IF NOT EXISTS `saving_minds` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `saving_minds`;

-- ---------------------------------------------------
-- ESTRUTURA DAS TABELAS
-- ---------------------------------------------------

-- 1. Tabela de Usuários
DROP TABLE IF EXISTS `respostas_quiz`;
DROP TABLE IF EXISTS `quiz_opcoes`;
DROP TABLE IF EXISTS `quiz_perguntas`;
DROP TABLE IF EXISTS `chat_mensagens`;
DROP TABLE IF EXISTS `diario_mensagens`;
DROP TABLE IF EXISTS `registros_humor`;
DROP TABLE IF EXISTS `frases_motivacionais`;
DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `senha_hash` VARCHAR(255) NOT NULL,
  `tipo_usuario` ENUM('ALUNO', 'PROFESSOR', 'ADMIN') DEFAULT 'ALUNO',
  `data_cadastro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabela de Registros de Humor (Home / Diário)
CREATE TABLE `registros_humor` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NULL,
  `humor` ENUM('Radiante', 'Bem', 'Neutro', 'Exausto') NOT NULL,
  `data_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabela de Frases Motivacionais (Pop-up da Home)
CREATE TABLE `frases_motivacionais` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `categoria_humor` ENUM('Radiante', 'Bem', 'Neutro', 'Exausto') NOT NULL,
  `frase` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabela de Diário / Mensagens de Apoio
CREATE TABLE `diario_mensagens` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NULL,
  `titulo` VARCHAR(150) DEFAULT NULL,
  `conteudo` TEXT NOT NULL,
  `e_publico` TINYINT(1) DEFAULT 0,
  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabelas do Quiz de Humor / Relato
CREATE TABLE `quiz_perguntas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ordem` INT NOT NULL,
  `enunciado` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `quiz_opcoes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `pergunta_id` INT NOT NULL,
  `texto_opcao` VARCHAR(255) NOT NULL,
  `pontos` INT DEFAULT 1,
  FOREIGN KEY (`pergunta_id`) REFERENCES `quiz_perguntas`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `respostas_quiz` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NULL,
  `opcao_id` INT NOT NULL,
  `data_resposta` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`opcao_id`) REFERENCES `quiz_opcoes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Tabela de Chatbot / Atendimento
CREATE TABLE `chat_mensagens` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT NULL,
  `remetente` ENUM('USUARIO', 'BOT') NOT NULL,
  `mensagem` TEXT NOT NULL,
  `data_envio` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================================================
-- INSERÇÃO DE DADOS INICIAIS
-- ===================================================

-- Usuários de Exemplo
INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha_hash`, `tipo_usuario`) VALUES
(1, 'Ana Clara', 'ana.clara@escola.com', '$2y$10$eImiTXuWVxfM37uY4JANjO.y0U3Lp2P1D1xN/s5Kx8yN5G8E1G1GK', 'ALUNO'),
(2, 'Professor Silva', 'professor@escola.com', '$2y$10$eImiTXuWVxfM37uY4JANjO.y0U3Lp2P1D1xN/s5Kx8yN5G8E1G1GK', 'PROFESSOR'),
(3, 'Administrador', 'admin@savingminds.com', '$2y$10$eImiTXuWVxfM37uY4JANjO.y0U3Lp2P1D1xN/s5Kx8yN5G8E1G1GK', 'ADMIN');

-- Frases Motivacionais (Pop-up da Home)
INSERT INTO `frases_motivacionais` (`categoria_humor`, `frase`) VALUES
('Radiante', 'Que dia incrível! Aproveite essa energia para contagiar as pessoas ao seu redor! ✨'),
('Radiante', 'Sua alegria ilumina o ambiente. Continue espalhando coisas boas! 🌟'),
('Bem', 'Manter o equilíbrio é uma grande conquista. Continue cuidando de você! 🌿'),
('Bem', 'Pequenos passos constantes levam a grandes realizações. Tenha um ótimo dia! 🌸'),
('Neutro', 'Dias calmos também são importantes. Respire fundo e vá no seu próprio ritmo. 🍃'),
('Neutro', 'Tudo bem não estar 100% animado todos os dias. Respeite o seu momento. ☁️'),
('Exausto', 'Você fez o seu melhor hoje. Lembre-se de que descansar também é produtivo e necessário. 💜'),
('Exausto', 'Não carregue o mundo nas costas. Respire fundo e tire um tempo só para você. 🧘');

-- Perguntas e Opções do Quiz (Extraídas de quiz.html)
INSERT INTO `quiz_perguntas` (`id`, `ordem`, `enunciado`) VALUES
(1, 1, 'Como você descreveria seu nível de energia ao acordar hoje?'),
(2, 2, 'Como está a sua cabeça em relação às matérias e prazos da escola?'),
(3, 3, 'Qual frase mais combina com a sua capacidade de foco hoje?'),
(4, 4, 'Como está a sua paciência para interagir com as pessoas na escola?'),
(5, 5, 'Como foi a qualidade do seu sono na última noite?'),
(6, 6, 'Quando você pensa nas tarefas de hoje, qual o sentimento principal?'),
(7, 7, 'Como você reagiu quando algo não saiu como o planejado recentemente?'),
(8, 8, 'Você conseguiu reservar um tempo para si mesmo(a) nos últimos dias?'),
(9, 9, 'Como está o seu nível de tensão corporal (ombros, pescoço, cabeça)?'),
(10, 10, 'Qual é a sua disposição para participar das aulas de hoje?'),
(11, 11, 'Como está sua alimentação e apetite na rotina de estudos?'),
(12, 12, 'Como você se sente quando precisa fazer trabalhos em grupo?'),
(13, 13, 'Como você lida com o uso do celular e redes sociais nos momentos livres?'),
(14, 14, 'Você sente que tem alguém na escola (amigos/professores) para conversar?'),
(15, 15, 'Se você pudesse escolher agora, do que mais precisa?');

-- Opções de cada pergunta
INSERT INTO `quiz_opcoes` (`pergunta_id`, `texto_opcao`, `pontos`) VALUES
-- P1
(1, '⚡ Super disposto(a) e com gás total', 1),
(1, '🌤️ Normal, levando a rotina com calma', 2),
(1, '🔋 Arrastando os pés, precisando de descanso', 3),
-- P2
(2, '🟢 Tudo organizado, sem desespero', 1),
(2, '🟡 Algumas coisas acumuladas, mas sob controle', 2),
(2, '🔴 Muita pressão e sensação de sobrecarga', 3),
-- P3
(3, '🎯 Foco total, consigo concentrar rápido', 1),
(3, '💭 Mente meio avoadinha, mas dá pra estudar', 2),
(3, '🤯 Impossível focar, pensamentos a mil', 3),
-- P4
(4, '💬 Tranquila, com vontade de conversar e rir', 1),
(4, '😐 Neutra, prefiro ficar mais na minha', 2),
(4, '⚠️ Zero paciência, qualquer barulho me irrita', 3),
-- P5
(5, '😴 Dormi super bem e acordei renovado(a)', 1),
(5, '📱 Demorei um pouco pra dormir, mas ok', 2),
(5, '📉 Dormi mal, acordei várias vezes ou tive insônia', 3),
-- P6
(6, '🚀 Motivação para resolver tudo', 1),
(6, '🥱 Cansaço, mas vou fazendo no meu ritmo', 2),
(6, '😰 Ansiedade e vontade de adiar tudo', 3),
-- P7
(7, '💡 De boa, pensei logo em uma solução', 1),
(7, '😮‍💨 Fiquei chateado(a), mas bola pra frente', 2),
(7, '💥 Fiquei extremamente estressado(a) e desanimado(a)', 3),
-- P8
(8, '🎨 Sim, fiz coisas que gosto e relaxei', 1),
(8, '⏳ Pouco, a rotina está bem corrida', 2),
(8, '❌ Zero tempo, só estudo, obrigações e cansaço', 3),
-- P9
(9, '🧘 Relaxado(a), sem dores ou tensão', 1),
(9, '🏋️ Um pouco pesado(a), mas suportável', 2),
(9, '🧱 Músculos totalmente travados e doloridos', 3),
-- P10
(10, '🙋‍♂️ Curioso(a) e com vontade de aprender', 1),
(10, '🚶‍♂️ Presente fisicamente, mas a cabeça longe', 2),
(10, '😴 Só querendo que o sinal toque pra ir embora', 3),
-- P11
(11, '🥗 Regular e equilibrada, me alimento bem', 1),
(11, '🍕 Meio desregulada (como demais por ansiedade ou pulo refeições)', 2),
(11, '🚫 Sem apetite nenhum ou estômago embrulhado pelo estresse', 3),
-- P12
(12, '🤝 Animado(a), gosto de colaborar com os colegas', 1),
(12, '📋 Razoável, prefiro quando cada um faz sua parte', 2),
(12, '😩 Muito estressado(a), prefiro fazer tudo sozinho(a)', 3),
-- P13
(13, '📲 Uso de forma moderada pra me distrair', 1),
(13, '👀 Passo mais tempo do que deveria rolando o feed', 2),
(13, '🌀 Uso pra me alienar e esquecer os problemas escolares', 3),
-- P14
(14, '🫂 Sim, me sinto acolhido(a) e apoiado(a)', 1),
(14, '🤷 Tenho colegas, mas converso só sobre o básico', 2),
(14, '🪞 Me sinto sozinho(a) e deslocado(a) no ambiente escolar', 3),
-- P15
(15, '🚀 Continuar produzindo e curtir o restante do dia', 1),
(15, '🎧 Um tempinho sozinho(a) ouvindo música', 2),
(15, '🛌 Desligar o celular e descansar sem cobranças', 3);

-- Exemplo de Mensagens no Diário
INSERT INTO `diario_mensagens` (`usuario_id`, `titulo`, `conteudo`, `e_publico`) VALUES
(1, 'Um dia mais leve', 'Hoje resolvi fazer os exercícios de respiração do site e me senti bem melhor antes da prova!', 1),
(1, 'Reflexão sobre os estudos', 'Às vezes me cobro demais por notas, mas preciso lembrar de cuidar da minha saúde mental em primeiro lugar.', 0);
