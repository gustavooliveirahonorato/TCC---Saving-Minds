document.addEventListener('DOMContentLoaded', () => {
    // Exemplo de interatividade para o círculo de respiração
    const breathCircle = document.querySelector('.breath-circle');
    const breathInstructions = document.querySelector('.breath-instructions');

    if (breathCircle && breathInstructions) {
        let isExpanded = false;

        // Alterna o texto de instrução com base na animação CSS
        setInterval(() => {
            isExpanded = !isExpanded;
            if (isExpanded) {
                breathInstructions.textContent = "Expire suavemente quando ele encolher.";
            } else {
                breathInstructions.textContent = "Inspire devagar quando o círculo expandir.";
            }
        }, 4000); // Sincronizado com o tempo da animação CSS (8s total para o ciclo)
    }

    // Confirmação ao clicar em ligar para números de emergência em dispositivos móveis
    const callButtons = document.querySelectorAll('.btn-call');
    callButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('tel:')) {
                const numero = href.replace('tel:', '');
                // Em computadores, o link tel: pode não fazer nada, mas em celulares abre o discador
                console.log(`Iniciando chamada para o número: ${numero}`);
            }
        });
    });
});