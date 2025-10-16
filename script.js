// Shadril Hassan Shifat — Portfolio interactions
(function () {
  const html = document.documentElement;
  const modeToggle = document.getElementById('modeToggle');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const toTop = document.getElementById('toTop');

  // Theme: respect prefers-color-scheme, save user choice
  const THEME_KEY = 'shadril-theme';
  const saved = localStorage.getItem(THEME_KEY);
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  if (saved === 'light' || (!saved && prefersLight)) html.classList.add('light');

  function toggleTheme() {
    html.classList.toggle('light');
    localStorage.setItem(THEME_KEY, html.classList.contains('light') ? 'light' : 'dark');
  }

  if (modeToggle) modeToggle.addEventListener('click', toggleTheme);

  // Mobile nav
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('show');
    });
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Smooth scroll for on-page links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      }
    });
  });

  // Back to top button
  const onScroll = () => {
    if (!toTop) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    toTop.classList.toggle('show', y > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Last updated string (manual + guard)
  const lastUpdated = document.getElementById('lastUpdated');
  if (lastUpdated && !lastUpdated.textContent) {
    const d = new Date();
    lastUpdated.textContent = `Updated ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;
  }
})();

