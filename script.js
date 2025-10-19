// Shadril Hassan Shifat — Portfolio interactions
(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  // Theme: respect prefers-color-scheme, save user choice
  const THEME_KEY = 'site-theme';
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) html.classList.add('dark');

  function applyThemeButtonLabel() {
    if (!themeToggle) return;
    const isDark = html.classList.contains('dark');
    const icon = isDark
      ? '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M22 12h-2M4 12H2m15.36-7.36-1.41 1.41M7.05 16.95l-1.41 1.41M16.95 16.95l1.41 1.41M7.05 7.05 5.64 5.64"/></svg>'
      : '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const label = isDark ? 'Light' : 'Dark';
    themeToggle.innerHTML = icon + '<span>' + label + '</span>';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }

  function toggleTheme() {
    html.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, html.classList.contains('dark') ? 'dark' : 'light');
    applyThemeButtonLabel();
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  applyThemeButtonLabel();

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
})();
