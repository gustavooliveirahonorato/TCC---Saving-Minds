let tempoRestante = 25 * 60; // 25 minutos
let timerId = null;
let rodando = false;

document.addEventListener('DOMContentLoaded', () => {
    carregarMetas();
    atualizarTelaTimer();
});

function alternarCronometro() {
    const btn = document.getElementById('btnIniciar');
    if (!rodando) {
        rodando = true;
        btn.textContent = 'Pausar';
        btn.style.backgroundColor = '#d9534f';
        
        timerId = setInterval(() => {
            if (tempoRestante > 0) {
                tempoRestante--;
                atualizarTelaTimer();
            } else {
                pararCronometro();
                alert('Tempo concluído! Descanse um pouco.');
                reiniciarCronometro();
            }
        }, 1000);
    } else {
        pararCronometro();
        btn.textContent = 'Retomar';
        btn.style.backgroundColor = 'var(--primary-color)';
    }
}

function pararCronometro() {
    rodando = false;
    clearInterval(timerId);
}

function reiniciarCronometro() {
    pararCronometro();
    tempoRestante = 25 * 60;
    atualizarTelaTimer();
    const btn = document.getElementById('btnIniciar');
    btn.textContent = 'Iniciar Foco';
    btn.style.backgroundColor = '';
}

function atualizarTelaTimer() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    const minFormatado = String(minutos).padStart(2, '0');
    const segFormatado = String(segundos).padStart(2, '0');
    const display = document.getElementById('displayTempo');
    if (display) {
        display.textContent = `${minFormatado}:${segFormatado}`;
    }
}

function obterMetas() {
    const dados = localStorage.getItem('saving_minds_metas_foco');
    return dados ? JSON.parse(dados) : [];
}

function salvarMetas(metas) {
    localStorage.setItem('saving_minds_metas_foco', JSON.stringify(metas));
}

function adicionarMeta() {
    const input = document.getElementById('inputMeta');
    if (!input) return;
    const texto = input.value.trim();
    if (!texto) return;

    let metas = obterMetas();
    if (metas.length >= 3) {
        alert('Você pode adicionar no máximo 3 metas curtas por bloco!');
        return;
    }

    metas.push({ id: Date.now(), texto: texto });
    salvarMetas(metas);
    input.value = '';
    carregarMetas();
}

function carregarMetas() {
    const container = document.getElementById('listaMetasBloco');
    if (!container) return;
    container.innerHTML = '';
    const metas = obterMetas();

    metas.forEach(meta => {
        const item = document.createElement('div');
        item.className = 'item-bloco-tarefa';
        item.innerHTML = `
            <span>${meta.texto}</span>
            <button class="btn-del-mini" onclick="removerMeta(${meta.id})">✕</button>
        `;
        container.appendChild(item);
    });
}

function removerMeta(id) {
    let metas = obterMetas();
    metas = metas.filter(m => m.id !== id);
    salvarMetas(metas);
    carregarMetas();
}