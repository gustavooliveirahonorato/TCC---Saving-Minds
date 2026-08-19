// chat.js completo atualizado para salvar no banco de dados

function enviarMensagem(event) {
    if (event) {
        event.preventDefault();
    }

    const input = document.getElementById('mensagem');
    const containerMensagens = document.getElementById('chat');
    const textoMensagem = input.value.trim();

    if (textoMensagem === '') return;

    // 1. Exibe a mensagem do usuário na tela
    const mensagemUsuario = document.createElement('div');
    mensagemUsuario.className = 'message user';
    mensagemUsuario.textContent = textoMensagem;
    containerMensagens.appendChild(mensagemUsuario);

    input.value = '';
    containerMensagens.scrollTop = containerMensagens.scrollHeight;

    // 2. Envia a mensagem para o banco de dados via PHP
    fetch('/save-minds/salvar_mensagem.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensagem: textoMensagem })
    })
    .then(response => response.text())
    .then(resultado => {
        console.log('Retorno do PHP:', resultado);
    })
    .catch(error => {
        console.error('Erro:', error);
    });

    // 3. Simula a resposta automática do assistente
    setTimeout(() => {
        const mensagemBot = document.createElement('div');
        mensagemBot.className = 'message bot';
        
        const textoLower = textoMensagem.toLowerCase();
        if (textoLower.includes('ansiedade') || textoLower.includes('prova')) {
            mensagemBot.innerHTML = 'Entendo que provas gerem ansiedade. Tente respirar fundo por alguns segundos. Quer fazer um exercício de respiração na aba ao lado?';
        } else if (textoLower.includes('relaxamento') || textoLower.includes('cansado')) {
            mensagemBot.innerHTML = 'A rotina escolar pode ser exaustiva. Lembre-se de fazer pequenas pausas ao longo do dia.';
        } else {
            mensagemBot.innerHTML = 'Obrigado por compartilhar. Estou aqui para te ouvir e apoiar no que precisar!';
        }

        containerMensagens.appendChild(mensagemBot);
        containerMensagens.scrollTop = containerMensagens.scrollHeight;
    }, 800);
}