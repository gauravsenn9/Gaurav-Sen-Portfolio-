/* Silent loops without player controls; respect motion and data preferences. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const records = [...document.querySelectorAll('.walkthrough-video')].map(video => {
    video.muted = true;
    video.controls = false;
    return { video, visible: false, pending: false, blocked: false };
  });
  function allowed(s) {
    return s.visible && !document.hidden && !reduced.matches && document.documentElement.dataset.motion !== 'off' && !navigator.connection?.saveData;
  }
  function sync(s) {
    if (!allowed(s)) { s.video.pause(); return; }
    if (!s.video.paused || s.pending || s.blocked) return;
    s.pending = true;
    s.video.play().then(() => { if (!allowed(s)) s.video.pause(); }).catch(error => {
      if (error.name !== 'AbortError') { s.blocked = true; s.video.load(); }
    }).finally(() => { s.pending = false; });
  }
  const syncAll = () => records.forEach(sync);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      const s = records.find(s => s.video === entry.target);
      s.visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      sync(s);
    }), { threshold: [0, 0.25] });
    records.forEach(s => observer.observe(s.video));
  }
  document.addEventListener('visibilitychange', syncAll);
  reduced.addEventListener('change', syncAll);
  new MutationObserver(syncAll).observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
})();
