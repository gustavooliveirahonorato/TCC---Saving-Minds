const listaMensagens = [
    { texto: "Não se cobre tanto por um resultado imediato. O aprendizado é um processo diário.", categoria: "estudos", autor: "Anônimo" },
    { texto: "Tudo bem ter dias em que você não se sente 100%. Respire fundo e respeite o seu tempo.", categoria: "dificeis", autor: "Colega de Escola" },
    { texto: "Você é muito mais do que as suas notas. Seu valor não é medido por um boletim.", categoria: "autoestima", autor: "Equipe Saving Minds" },
    { texto: "Quando a rotina de provas parecer pesada, lembre-se de fazer pausas. Cuidar da mente também é estudar.", categoria: "estudos", autor: "Anônimo" },
    { texto: "Mesmo nos dias mais cinzentos, lembre-se de que tempestades sempre passam.", categoria: "dificeis", autor: "Anônimo" },
    { texto: "Seja gentil com você mesmo hoje. Você está fazendo o melhor que pode!", categoria: "autoestima", autor: "Anônimo" }
];

function renderizarMensagens(filtro = 'todas') {
    const mural = document.getElementById('muralMensagens');
    if (!mural) return;
    
    mural.innerHTML = '';

    const filtradas = filtro === 'todas' 
        ? listaMensagens 
        : listaMensagens.filter(m => m.categoria === filtro);

    filtradas.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'card-mensagem';
        card.innerHTML = `
            <p>"${msg.texto}"</p>
            <span>— ${msg.autor}</span>
        `;
        mural.appendChild(card);
    });
}

function filtrarMensagens(cat, elemento) {
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('ativo'));
    elemento.classList.add('ativo');
    renderizarMensagens(cat);
}

function salvarDiario(event) {
    if (event) event.preventDefault();

    let conteudoInput = document.getElementById("conteudo_diario");
    let conteudo = conteudoInput.value;

    if (conteudo.trim() === "") {
        alert("Escreva alguma coisa antes de salvar!");
        return;
    }

    // Caminho absoluto corrigido para '/salvar.php'
    fetch('/salvar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `usuario_id=1&titulo=Mensagem do Mural&conteudo=${encodeURIComponent(conteudo)}&e_publico=1`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Salvo com sucesso:', data);
        
        listaMensagens.unshift({
            texto: conteudo,
            categoria: 'dificeis',
            autor: 'Anônimo'
        });

        conteudoInput.value = ""; 
        renderizarMensagens();

        const aviso = document.getElementById('avisoSucesso');
        if (aviso) {
            aviso.style.display = 'block';
            setTimeout(() => aviso.style.display = 'none', 4000);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor PHP.');
    });
}

// Inicializa o mural ao carregar a página
renderizarMensagens();