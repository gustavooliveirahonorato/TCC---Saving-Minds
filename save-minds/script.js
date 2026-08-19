function abrirPopUp(humor) {
    const modal = document.getElementById('modalFrase');
    const textoFrase = document.getElementById('textoFrase');

    if (!modal || !textoFrase) return;

    // Exibe o modal e a mensagem de carregamento
    textoFrase.innerText = "Carregando frase motivacional...";
    modal.style.display = "flex";

    // Faz a chamada para o PHP salvar e buscar a frase
    fetch('obter_frase.php?humor=' + encodeURIComponent(humor))
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.sucesso) {
                textoFrase.innerText = data.frase;
            } else {
                textoFrase.innerText = data.mensagem || "Tenha um ótimo dia!";
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            textoFrase.innerText = "Erro ao conectar com o banco de dados.";
        });
}

function fecharPopUp() {
    const modal = document.getElementById('modalFrase');
    if (modal) {
        modal.style.display = 'none';
    }
}