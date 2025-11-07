(function () {
  // --- PARTE 1: CONTROLE DE TEMA (MODO ESCURO) ---
  // (Esta parte continua igual)
  const root = document.documentElement;
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') { root.classList.add('dark'); }
  const yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const setPressed = () => themeBtn.setAttribute('aria-pressed', root.classList.contains('dark') ? 'true' : 'false');
    setPressed();
    themeBtn.addEventListener('click', () => {
      root.classList.toggle('dark');
      localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
      setPressed();
    });
  }

  // --- PARTE 2: CONTROLE DE FONTE (AQUI ESTÁ A MUDANÇA) ---
  
  // Pega o tamanho salvo (escala). O padrão é 1 (ou 16px)
  const getSize = () => parseFloat(localStorage.getItem('fontScale') || '1');
  
  // Aplica o tamanho (16px * escala)
  const applySize = () => document.body.style.fontSize = (16 * getSize()) + 'px';
  
  // Salva a nova escala no localStorage e aplica o tamanho
  const save = (val) => { 
    localStorage.setItem('fontScale', String(val)); 
    applySize(); 
  };

  // Aplica o tamanho salvo assim que a página carrega
  applySize();

  // Pega os botões A+ e A-
  const inc = document.getElementById('fontInc');
  const dec = document.getElementById('fontDec');

  // Define os limites em escala (Seu Pedido / 16px)
  const desktopLimits = {
      max: 1.25,  // 20px
      min: 0.8125 // 13px
  };
  const mediumLimits = {
      max: 0.875,  // 14px
      min: 0.8125 // 13px
  };

  // Define a "media query" para checar a tela de 801px até 837px
  const mediumScreenQuery = window.matchMedia('(max-width: 837px) and (min-width: 801px)');

  // Função para pegar os limites corretos
  function getLimits() {
      if (mediumScreenQuery.matches) {
          return mediumLimits; // Tela média (801-837px)
      }
      return desktopLimits; // Outros tamanhos (desktop)
  }

  // Adiciona o clique no botão A+ (Aumentar)
  if (inc) {
    inc.addEventListener('click', () => {
      const limits = getLimits();
      // O passo de 0.0625 é o equivalente a 1px (1 / 16 = 0.0625)
      const newSize = Math.min(limits.max, getSize() + 0.0625); // Não deixa passar do MÁXIMO
      save(newSize);
    });
  }
  
  // Adiciona o clique no botão A- (Diminuir)
  if (dec) {
    dec.addEventListener('click', () => {
      const limits = getLimits();
      // O passo de 0.0625 é o equivalente a 1px
      const newSize = Math.max(limits.min, getSize() - 0.0625); // Não deixa passar do MÍNIMO
      save(newSize);
    });
  }

})();