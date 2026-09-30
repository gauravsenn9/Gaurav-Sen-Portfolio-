// Progressive enhancement: navigation, search and filters. All page content works without JS.
(() => {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('#main-nav');
  const mq = window.matchMedia('(max-width: 640px)');
  function closeMenu() {if(!menu||!nav)return;menu.setAttribute('aria-expanded','false');nav.dataset.collapsed=String(mq.matches);}
  if(menu && nav){
    menu.hidden = false;closeMenu();
    menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.dataset.collapsed=String(open);});
    nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
    mq.addEventListener('change',closeMenu);
  }
  const controls=document.querySelector('.filter-controls');
  const search=document.querySelector('#project-search');
  if(controls && search){
    controls.hidden=false;
    const cards=[...document.querySelectorAll('.project-card')];
    const buttons=[...document.querySelectorAll('[data-filter]')];
    const count=document.querySelector('#result-count');
    const empty=document.querySelector('#empty-results');
    let category='all';
    const params=new URLSearchParams(location.search);
    search.value=params.get('q')||'';
    const initial=params.get('category');if(buttons.some(b=>b.dataset.filter===initial))category=initial;
    function update(writeUrl=true){
      const query=search.value.trim().toLowerCase();let visible=0;
      for(const card of cards){const matches=(category==='all'||card.dataset.category===category)&&query.split(/\s+/).every(term=>card.dataset.search.includes(term));card.hidden=!matches;if(matches)visible++;}
      for(const button of buttons)button.setAttribute('aria-pressed',String(button.dataset.filter===category));
      count.textContent=`${visible} ${visible===1?'project':'projects'}`;empty.hidden=visible>0;
      if(writeUrl){const u=new URL(location.href);u.searchParams.delete('q');u.searchParams.delete('category');if(query)u.searchParams.set('q',search.value.trim());if(category!=='all')u.searchParams.set('category',category);history.replaceState(null,'',u);}
    }
    search.addEventListener('input',()=>update());
    buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;update();}));
    document.querySelector('#reset-filters').addEventListener('click',()=>{search.value='';category='all';update();search.focus();});
    window.addEventListener('popstate',()=>{const p=new URLSearchParams(location.search);search.value=p.get('q')||'';category=buttons.some(b=>b.dataset.filter===p.get('category'))?p.get('category'):'all';update(false);});
    update(false);
  }
  if('IntersectionObserver' in window){
    const toc=[...document.querySelectorAll('.case-sidebar a')];
    const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){toc.forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -65% 0px'});
    document.querySelectorAll('.case-article section[id]').forEach(s=>observer.observe(s));
  }
})();
