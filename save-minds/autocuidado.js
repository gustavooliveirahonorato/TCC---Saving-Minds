function abrirModal(tipo) {
    document.getElementById(`modal-${tipo}`).style.display = 'flex';
}

function fecharModal(tipo) {
    document.getElementById(`modal-${tipo}`).style.display = 'none';
    document.getElementById('resultado-checkin').innerText = '';
}

function registrarNivel(nivel) {
    const resultado = document.getElementById('resultado-checkin');
    
    switch(nivel) {
        case 1:
            resultado.innerText = "Ótimo! Aproveite para realizar suas tarefas com tranquilidade.";
            break;
        case 2:
            resultado.innerText = "Tudo sob controle. Lembre-se de fazer pequenas pausas.";
            break;
        case 3:
            resultado.innerText = "Recomendação: Tire 5 minutos para o exercício de respiração antes da próxima aula.";
            break;
        case 4:
            resultado.innerText = "Atenção: Seu nível de estresse está alto. Considere conversar com a coordenação ou agendar um momento de pausa.";
            break;
    }
}

function iniciarPausa() {
    alert("Iniciando pausa de descompressão de 2 minutos. Respire fundo...");
}