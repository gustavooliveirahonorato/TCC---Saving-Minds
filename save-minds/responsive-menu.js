// =====================================================
// RESPONSIVO - SAVING MINDS
// Cria o botão de menu (hambúrguer) e o fundo escuro por JS,
// sem precisar mexer no HTML de cada página.
// =====================================================

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return; // página sem menu lateral (ex: ajuda.html), não faz nada

    // Botão hambúrguer
    const botao = document.createElement('button');
    botao.className = 'menu-hamburguer';
    botao.setAttribute('aria-label', 'Abrir menu');
    botao.innerHTML = '&#9776;'; // ícone ☰
    document.body.appendChild(botao);

    // Fundo escuro atrás do menu
    const overlay = document.createElement('div');
    overlay.className = 'overlay-menu';
    document.body.appendChild(overlay);

    function abrirMenu() {
        sidebar.classList.add('aberta');
        overlay.classList.add('ativo');
    }

    function fecharMenu() {
        sidebar.classList.remove('aberta');
        overlay.classList.remove('ativo');
    }

    botao.addEventListener('click', function () {
        if (sidebar.classList.contains('aberta')) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });

    overlay.addEventListener('click', fecharMenu);

    // Fecha o menu automaticamente ao clicar em algum link dele (celular)
    sidebar.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', fecharMenu);
    });
});