// Apply the theme before styles render, including when storage is unavailable.
(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let choice = null;
  try { choice = localStorage.getItem('product-lab-theme'); } catch {}
  if (!['light', 'dark'].includes(choice)) choice = null;
  const apply = theme => {
    root.dataset.theme = theme;
    const toggle = document.querySelector('#theme-toggle');
    if (toggle) {
      toggle.hidden = false;
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.title = toggle.getAttribute('aria-label');
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b1117' : '#f7f8f6');
  };
  apply(choice || (preference.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelector('#theme-toggle')?.addEventListener('click', () => {
      choice = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('product-lab-theme', choice); } catch {}
      apply(choice);
    });
  });
  preference.addEventListener('change', event => {
    if (!choice) apply(event.matches ? 'dark' : 'light');
  });
  window.addEventListener('storage', event => {
    if (event.key !== 'product-lab-theme') return;
    choice = ['light', 'dark'].includes(event.newValue) ? event.newValue : null;
    apply(choice || (preference.matches ? 'dark' : 'light'));
  });
})();
