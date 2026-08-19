let etapaAtual = 1;
const totalEtapas = 15;
const respostas = {};
const usuarioIdAtual = 1; // ID do usuário logado (pode ajustar dinamicamente se tiver sessão)

function atualizarBarraProgresso() {
    const porcentagem = ((etapaAtual - 1) / totalEtapas) * 100;
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = `${porcentagem}%`;
}

function proximaPergunta(chavePergunta, valor) {
    respostas[chavePergunta] = valor;

    // Envia a resposta atual para o banco de dados via PHP
    salvarRespostaNoBanco(etapaAtual, valor);

    const divAtual = document.getElementById(`step-${etapaAtual}`);
    if (divAtual) divAtual.classList.remove('active');

    etapaAtual++;

    if (etapaAtual <= totalEtapas) {
        const proximaDiv = document.getElementById(`step-${etapaAtual}`);
        if (proximaDiv) proximaDiv.classList.add('active');
        atualizarBarraProgresso();
    } else {
        const bar = document.getElementById('progressBar');
        if (bar) bar.style.width = '100%';
        exibirResultado();
    }
}

// Função que faz o envio assíncrono para o salvar_quiz.php
function salvarRespostaNoBanco(numeroPergunta, respostaTexto) {
    const dados = new URLSearchParams();
    dados.append('usuario_id', usuarioIdAtual);
    dados.append('pergunta_numero', numeroPergunta);
    dados.append('resposta_escolhida', respostaTexto);

    fetch('salvar_quiz.php', {
        method: 'POST',
        body: dados
    })
    .then(response => response.json())
    .then(data => {
        if (!data.sucesso) {
            console.error("Aviso ao salvar no banco:", data.erro);
        }
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
    });
}

function exibirResultado() {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    const divResultado = document.getElementById('step-resultado');
    if (divResultado) divResultado.classList.add('active');

    const pontuacao = Object.values(respostas).reduce((a, b) => a + b, 0);

    const emoji = document.getElementById('resEmoji');
    const titulo = document.getElementById('resTitulo');
    const texto = document.getElementById('resTexto');

    if (pontuacao <= 20) {
        emoji.innerText = "🌟";
        titulo.innerText = "Energia & Mente Equilibrada!";
        texto.innerText = "Sua rotina escolar está fluindo de forma positiva. Você está conseguindo conciliar estudos, sono e interações sociais com bastante equilíbrio. Continue cultivando esses bons momentos!";
    } else if (pontuacao <= 27) {
        emoji.innerText = "🌤️";
        titulo.innerText = "Dia Estável, Mas Atente-se às Pausas";
        texto.innerText = "Você está lidando bem com os desafios escolares diários. Algumas matérias ou cobranças pontuais podem incomodar, mas nada fora de controle. Lembre-se de manter pausas ativas na rotina de estudos.";
    } else if (pontuacao <= 34) {
        emoji.innerText = "🔋";
        titulo.innerText = "Alerta de Cansaço & Leve Sobrecarga";
        texto.innerText = "Seu corpo e mente já mostram sinais perceptíveis de exaustão. Prazos e interações sociais podem estar exigindo mais do que o normal. Que tal fazer um exercício de respiração para desacelerar?";
    } else if (pontuacao <= 40) {
        emoji.innerText = "⚠️";
        titulo.innerText = "Nível Alto de Tensão & Estresse";
        texto.innerText = "A sobrecarga com a rotina de estudos está pesada. Você pode estar sentindo dores musculares, ansiedade ou falta de foco. Tente não absorver tudo sozinho(a) e diminua o ritmo por hoje.";
    } else {
        emoji.innerText = "💙";
        titulo.innerText = "Necessidade Urgente de Acolhimento e Pausa";
        texto.innerText = "Sua bateria emocional e física está no limite. A rotina escolar parece sufocante no momento. É muito importante dar uma pausa nas cobranças, conversar com alguém em quem confia ou buscar nossa aba de ajuda.";
    }
}

function reiniciarQuiz() {
    etapaAtual = 1;
    for (let key in respostas) delete respostas[key];

    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));

    const primeiraDiv = document.getElementById('step-1');
    if (primeiraDiv) primeiraDiv.classList.add('active');
    atualizarBarraProgresso();
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarBarraProgresso();
});