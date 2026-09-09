/* ============================================================
   main.js
   Script principal do site — organizado em 3 módulos:
   1. Navegação ativa (marca o item clicado no menu)
   2. Tema claro/escuro (com persistência via localStorage)
   3. Menu mobile (hamburguer)
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. NAVEGAÇÃO ATIVA
     Ao clicar em um item do menu, remove "active" de todos
     e adiciona apenas no item clicado.
  ========================================================== */
  function initActiveNav() {
    const listItems = document.querySelectorAll('.list li');

    listItems.forEach((item) => {
      item.addEventListener('click', () => {
        listItems.forEach((li) => li.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }


  /* ==========================================================
     2. TEMA CLARO / ESCURO
     - Salva a preferência do usuário no localStorage
     - Respeita a preferência do sistema operacional na 1ª visita
     - Aplica o tema assim que possível, evitando "flash" visual
  ========================================================== */
  function initThemeToggle() {
    const STORAGE_KEY = 'theme';

    const html = document.documentElement;
    const toggleBtn = document.querySelector('.button-toggle');
    const toggleIcon = toggleBtn.querySelector('i');

    // Aplica o tema no HTML, no ícone e salva a escolha
    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      toggleIcon.classList.toggle('light', theme === 'light');
      localStorage.setItem(STORAGE_KEY, theme);
    }

    // Decide qual tema usar ao carregar a página:
    // 1º prioridade -> o que o usuário já escolheu antes (localStorage)
    // 2º prioridade -> a preferência do sistema operacional
    function getInitialTheme() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;

      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      return prefersLight ? 'light' : 'dark';
    }

    // Define o tema inicial imediatamente
    applyTheme(getInitialTheme());

    // Alterna o tema ao clicar no botão
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  }


  /* ==========================================================
     3. MENU MOBILE (HAMBURGUER)
     Abre/fecha a navegação mobile e alterna o ícone
     entre "barras" (fechado) e "X" (aberto).
  ========================================================== */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navbar');
    const menuIcon = menuToggle.querySelector('i');

    const navLinks = nav.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');

      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);

      menuIcon.className = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';

      // Só bloqueia se o menu estiver ABERTO
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {

        // Fecha o menu
        nav.classList.remove('open');

        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');

        menuIcon.className = 'fa-solid fa-bars';

        // Libera o scroll
        document.body.style.overflow = '';
      });
    });
  }


  /* ==========================================================
     INICIALIZAÇÃO
  ========================================================== */
  initActiveNav();
  initThemeToggle();
  initMobileMenu();

});