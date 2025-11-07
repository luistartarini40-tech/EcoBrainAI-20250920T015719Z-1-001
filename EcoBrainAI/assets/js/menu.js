/* Lógica para o menu hamburguer */

// Espera o HTML ser carregado antes de executar
document.addEventListener('DOMContentLoaded', () => {

  // Pega o botão pelos seu ID
  const menuToggle = document.getElementById('menuToggle');

  // Pega o menu de navegação pelo seu ID
  const primaryNav = document.getElementById('primaryNav');

  // Verifica se os dois elementos existem na página
  if (menuToggle && primaryNav) {

    // Adiciona um "ouvinte" de clique no botão
    menuToggle.addEventListener('click', () => {

      // 1. Adiciona ou remove a classe 'show' no menu
      // O seu CSS (responsive.css) usa a classe '.show' para exibir o menu
      primaryNav.classList.toggle('show');

      // 2. Atualiza o 'aria-expanded' para acessibilidade (leitores de tela)
      // Pega o estado atual (true se 'show' estiver presente)
      const isExpanded = primaryNav.classList.contains('show');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }
});