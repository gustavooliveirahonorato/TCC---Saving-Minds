// ==========================================================================
// LÓGICA DA TELA DE FOCO CONSCIENTE (POMODORO + TAREFAS)
// ==========================================================================

let tempoRestante = 25 * 60; // 25 minutos em segundos
let temporizador = null;
let estaRodando = false;

// Elementos da Tela
const displayTempo = document.querySelector('h1, .tempo-display, #tempo') || document.querySelector('div[style*="font-size"]'); 
// (Caso use um seletor específico para o timer, ajuste aqui. Vamos usar o padrão abaixo)

document.addEventListener('DOMContentLoaded', () => {
    carregarTarefasSalvas();
    atualizarDisplayTimer();
});

// --- CRONÔMETRO POMODORO ---

function iniciarFoco() {
    if (estaRodando) return;
    estaRodando = true;

    temporizador = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplayTimer();
        } else {
            pararFoco();
            alert('Parabéns! Bloco de foco concluído. Tire alguns minutos para descansar.');
            resetarFoco();
        }
    }, 1000);
}

function reiniciarFoco() {
    pararFoco();
    tempoRestante = 25 * 60;
    atualizarDisplayTimer();
}

function pararFoco() {
    estaRodando = false;
    clearInterval(temporizador);
}

function atualizarDisplayTimer() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    
    // Procura o elemento do timer na tela (ex: o texto 25:00)
    const elementoTimer = document.querySelector('h1') || document.getElementById('timer');
    if (elementoTimer) {
        const minStr = String(minutos).padStart(2, '0');
        const segStr = String(segundos).padStart(2, '0');
        // Mantém a estrutura visual se houver
        if(elementoTimer.textContent.includes(':') || elementoTimer.textContent.length <= 5) {
            elementoTimer.textContent = `${minStr}:${segStr}`;
        }
    }
}


// --- LISTA DE TAREFAS PRIORITÁRIAS (COM LOCALSTORAGE) ---

function adicionarTarefa() {
    const inputTarefa = document.getElementById('input-tarefa') || document.querySelector('input[type="text"]');
    if (!inputTarefa) return;
    
    const texto = inputTarefa.value.trim();
    if (texto === '') return;

    let tarefas = obterDadosLocal('tarefas_foco') || [];
    
    if (tarefas.length >= 3) {
        alert('Você pode adicionar no máximo 3 metas curtas por bloco!');
        return;
    }

    tarefas.push({ texto: texto, concluida: false });
    salvarDadosLocal('tarefas_foco', tarefas);
    
    inputTarefa.value = '';
    carregarTarefasSalvas();
}

function carregarTarefasSalvas() {
    const tarefas = obterDadosLocal('tarefas_foco') || [];
    const container = document.getElementById('lista-tarefas') || document.querySelector('.tarefas-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'space-between';
        item.style.margin = '8px 0';
        item.style.padding = '8px';
        item.style.background = '#f9f9f9';
        item.style.borderRadius = '6px';
        
        item.innerHTML = `
            <span style="${tarefa.concluida ? 'text-decoration: line-through; color: #888;' : ''}">${tarefa.texto}</span>
            <button onclick="removerTarefa(${index})" style="background: #ff5c5c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">X</button>
        `;
        container.appendChild(item);
    });
}

function removerTarefa(index) {
    let tarefas = obterDadosLocal('tarefas_foco') || [];
    tarefas.splice(index, 1);
    salvarDadosLocal('tarefas_foco', tarefas);
    carregarTarefasSalvas();
}