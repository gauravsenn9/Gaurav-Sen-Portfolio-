// Native browser animation, with no external runtime, tracking or API keys.
(() => {
  const root = document.documentElement;
  const home = document.querySelector('.motion-home');
  if (!home) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 641px)');
  const toggle = document.querySelector('#motion-toggle');
  const hero = home.querySelector('.hero');
  const progress = home.querySelector('.reading-progress');
  let choice = null;
  let enabled = false;
  let pending = false;
  try { choice = localStorage.getItem('product-lab-motion'); } catch {}
  const tiltElements = [...home.querySelectorAll('[data-tilt]')];
  function apply() {
    enabled = !reduced.matches && choice !== 'off';
    root.dataset.motion = enabled ? 'on' : 'off';
    toggle.hidden = false;
    toggle.disabled = reduced.matches;
    toggle.textContent = reduced.matches ? 'Reduced motion' : `Motion ${enabled ? 'on' : 'off'}`;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', reduced.matches ? 'Reduced motion enabled by your device preference' : `Motion effects ${enabled ? 'on; turn off' : 'off; turn on'}`);
    if (!enabled) tiltElements.forEach(el => {
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
    });
    schedule();
  }
  function render() {
    pending = false;
    const height = Math.max(1, root.scrollHeight - innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / height))})`;
    if (enabled && pointer.matches) {
      const distance = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
      hero.style.setProperty('--portrait-scroll', `${distance * 20}px`);
    } else hero.style.removeProperty('--portrait-scroll');
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(render); }
  }
  toggle.addEventListener('click', () => {
    choice = enabled ? 'off' : 'on';
    try { localStorage.setItem('product-lab-motion', choice); } catch {}
    apply();
  });
  reduced.addEventListener('change', apply);
  pointer.addEventListener('change', apply);
  addEventListener('storage', event => {
    if (event.key === 'product-lab-motion' || event.key === null) { choice = event.newValue; apply(); }
  });
  addEventListener('scroll', schedule, { passive:true });
  addEventListener('resize', schedule, { passive:true });
  addEventListener('load', schedule, { once:true });
  home.addEventListener('toggle', schedule, true);
  home.addEventListener('input', schedule);
  home.addEventListener('click', schedule);
  document.addEventListener('visibilitychange', () => { root.dataset.pageHidden = String(document.hidden); });
  for (const el of tiltElements) {
    el.addEventListener('pointermove', event => {
      if (!enabled || !pointer.matches) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tilt-y', `${((event.clientX-r.left)/r.width-.5)*7}deg`);
      el.style.setProperty('--tilt-x', `${(.5-(event.clientY-r.top)/r.height)*5}deg`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tilt-x','0deg');
      el.style.setProperty('--tilt-y','0deg');
    });
  }
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    }, { threshold:.05 });
    home.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
    const links = [...document.querySelectorAll('.journey-inner nav a')];
    const sections = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === '#'+entry.target.id) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin:'-10% 0px -60% 0px' });
    links.forEach(link => { const section=document.querySelector(link.hash); if(section) sections.observe(section); });
  } else home.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  apply();
})();
