'use strict';
(() => {
  const config = window.KAMURA_CONFIG;
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  function safeURL(value, externalOnly = false) {
    if (!value || typeof value !== 'string') return '';
    try { const u = new URL(value, location.href); return ['https:', 'http:'].includes(u.protocol) && (!externalOnly || u.protocol === 'https:') ? u.href : ''; } catch { return ''; }
  }
  function outbound(a, url) { a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  const menu = document.querySelector('.menu-toggle');
  const header = document.querySelector('.header');
  function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', updateHeader, {passive:true});
  window.addEventListener('pageshow', updateHeader);
  updateHeader();
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('navigation').classList.toggle('is-open', open); });
  $('navigation').addEventListener('click', e => { if (e.target.closest('a')) { menu.setAttribute('aria-expanded', 'false'); $('navigation').classList.remove('is-open'); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { menu.setAttribute('aria-expanded', 'false'); $('navigation').classList.remove('is-open'); menu.focus(); } });
  document.addEventListener('click', e => { if (!header.contains(e.target) && menu.getAttribute('aria-expanded') === 'true') { menu.setAttribute('aria-expanded','false'); $('navigation').classList.remove('is-open'); } });
  matchMedia('(min-width: 901px)').addEventListener('change', e => { if(e.matches){menu.setAttribute('aria-expanded','false');$('navigation').classList.remove('is-open');} });
  for (const key of ['x', 'tiktok']) {
    const url = safeURL(config.links[key], true);
    const a = el(url ? 'a' : 'span', url ? '' : 'social-pending');
    const label = key === 'x' ? 'X' : 'TikTok';
    a.setAttribute('aria-label', label + (url ? '（別タブで開く）' : ' 準備中'));
    if (url) outbound(a, url); else a.title = label + ' 準備中';
    const img = el('img'); img.src = key === 'x' ? 'assets/figma-9-347-img1.svg' : 'assets/figma-9-347-imgTiktok1.svg'; img.alt = '';
    a.append(img); $('header-social').append(a); $('footer-social')?.append(a.cloneNode(true));
  }
  function service(parent, name, key) { const url = safeURL(config.links[key], true); const item = el(url ? 'a' : 'span', 'pill' + (url ? '' : ' disabled')); item.append(el('span', '', name)); if (url) { outbound(item, url); item.append(el('span', '', '›')); item.lastChild.setAttribute('aria-hidden', 'true'); item.setAttribute('aria-label', `${name}（別タブで開く）`); } else item.append(el('small', '', '準備中')); parent.append(item); }
  service($('booth-link'), 'BOOTH', 'booth'); service($('work-links'), 'ココナラ', 'coconala'); service($('work-links'), 'SKIMA', 'skima');
  config.goods.forEach(g => { const url = safeURL(g.url, true); const card = el(url ? 'a' : 'div', 'goods-card'); if (url) outbound(card, url); const src = safeURL(g.image); if (src) { const img = el('img'); img.src = src; img.alt = g.title; img.loading = 'lazy'; card.append(img); } else { const text = el('span', '', g.title); text.append(el('small', '', 'グッズ掲載準備中')); card.append(text); } $('goods-grid').append(card); });
  let lastFocused;
  function openArt(item) {
    lastFocused = document.activeElement; const body = $('art-body'); body.replaceChildren();
    if (item.type === 'video') { const v = el('video'); v.src = safeURL(item.src); v.controls = true; v.playsInline = true; v.preload = 'metadata'; body.append(v); }
    else { const image = el('img'); image.src = safeURL(item.src); image.alt = item.title; body.append(image); }
    $('art-title').textContent = item.title; $('art-caption').textContent = item.caption || ''; $('art-dialog').showModal();
  }
  config.gallery.forEach(item => {
    const card = el('article', 'gallery-card');
    const skin=el('div','window-skin gallery-skin');skin.setAttribute('aria-hidden','true');
    for(const [cls,file] of [['skin-head','imgGroup'],['skin-body','imgGroup1'],['skin-min','imgVector'],['skin-max','imgVector1'],['skin-close','imgGroup2']]){const img=el('img',cls);img.src=`assets/figma-9-96-${file}.svg`;img.alt='';skin.append(img);}card.append(skin);
    const valid = item.type !== 'placeholder' && safeURL(item.src);
    const open = el(valid ? (item.type === 'link' ? 'a' : 'button') : 'div', valid ? 'gallery-open' : 'gallery-placeholder');
    const visual = el('div', 'gallery-visual');
    if (valid && item.type !== 'video') { const img = el('img', item.fit === 'cover' ? 'fit-cover' : ''); img.src = safeURL(item.type === 'link' ? item.poster : item.src); img.alt = item.title; img.loading = 'lazy'; if (item.type !== 'link' || item.poster) visual.append(img); }
    if (item.background) visual.style.backgroundColor = item.background;
    if (!valid) visual.append(el('span', '', item.icon || '✧'));
    if (valid && ['video', 'link'].includes(item.type)) { if (item.poster && item.type === 'video') { const img = el('img'); img.src = safeURL(item.poster); img.alt = ''; img.loading = 'lazy'; visual.append(img); } visual.append(el('span', 'play-icon', '▷')); }
    open.append(visual, el('h3', '', item.title), el('p', '', item.caption || ''));
    if (valid) { if (item.type === 'link') { outbound(open, safeURL(item.src)); open.setAttribute('aria-label', item.title + '（別タブで開く）'); } else { open.type = 'button'; open.setAttribute('aria-label', item.title + 'を拡大表示'); open.addEventListener('click', () => openArt(item)); } }
    card.append(open); $('gallery-track').append(card);
  });
  const dialog = $('art-dialog'); document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { dialog.querySelector('video')?.pause(); lastFocused?.focus(); });
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function scrollGallery(direction) { const track = $('gallery-track'); const step = track.firstElementChild?.getBoundingClientRect().width || 270; track.scrollBy({left: direction * (step + 28), behavior: reducedMotion.matches ? 'instant' : 'smooth'}); }
  $('gallery-prev').addEventListener('click', () => scrollGallery(-1)); $('gallery-next').addEventListener('click', () => scrollGallery(1));
  $('gallery-track').addEventListener('keydown', e => { if (e.target === $('gallery-track') && ['ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); scrollGallery(e.key === 'ArrowLeft' ? -1 : 1); } });
  const galleryTrack = $('gallery-track');
  let drag = null, suppressGalleryClick = false, suppressTimer;
  galleryTrack.addEventListener('dragstart', e => e.preventDefault());
  galleryTrack.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    clearTimeout(suppressTimer); suppressGalleryClick = false;
    drag = {id:e.pointerId,x:e.clientX,left:galleryTrack.scrollLeft,moved:false};
  });
  galleryTrack.addEventListener('pointermove', e => {
    if (!drag || drag.id !== e.pointerId) return;
    const distance = e.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 6) return;
    if (!drag.moved) {
      drag.moved = true; suppressGalleryClick = true;
      galleryTrack.classList.add('is-dragging');
      galleryTrack.setPointerCapture(e.pointerId);
    }
    e.preventDefault();
    galleryTrack.scrollLeft = drag.left - distance;
  });
  function finishGalleryDrag(e) {
    if (!drag || drag.id !== e.pointerId) return;
    const {id,moved} = drag; drag = null;
    galleryTrack.classList.remove('is-dragging');
    if (galleryTrack.hasPointerCapture(id)) galleryTrack.releasePointerCapture(id);
    if (moved) suppressTimer = setTimeout(() => {suppressGalleryClick = false;}, 300);
  }
  galleryTrack.addEventListener('pointerup', finishGalleryDrag);
  galleryTrack.addEventListener('pointercancel', finishGalleryDrag);
  galleryTrack.addEventListener('lostpointercapture', finishGalleryDrag);
  window.addEventListener('pointerup', finishGalleryDrag);
  galleryTrack.addEventListener('click', e => {
    if (suppressGalleryClick && e.detail !== 0) {e.preventDefault();e.stopImmediatePropagation();}
  }, true);
  const tokyoDate = new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const dayMS = 86400000;
  function parseDate(s) { if (!/^\d{4}-\d{2}-\d{2}$/.test(s || '')) return null; const d = new Date(s+'T00:00:00Z'); return Number.isFinite(+d) && d.toISOString().slice(0,10) === s ? d : null; }
  function monday(d) { return new Date(+d - ((d.getUTCDay()+6)%7)*dayMS); }
  function dateKey(d) { return d.toISOString().slice(0,10); }
  let week = monday(parseDate(tokyoDate)); let events = []; let state = config.scheduleEndpoint ? 'loading' : 'sample'; let lastUpdated = '';
  function normalize(rows) { if (!Array.isArray(rows)) throw Error('予定データの形式を確認してください'); return rows.filter(r => r && parseDate(r.date) && typeof r.title === 'string' && r.title.trim()).map(r => ({date:r.date,title:r.title.slice(0,150),description:String(r.description || '').slice(0,400),start:/^\d{2}:\d{2}$/.test(r.start || '') ? r.start : '',end:/^\d{2}:\d{2}$/.test(r.end || '') ? r.end : '',url:safeURL(r.url,true)})).sort((a,b) => (a.date+a.start).localeCompare(b.date+b.start)); }
  function renderSchedule() {
    const end = new Date(+week+6*dayMS); $('schedule-year').textContent = week.getUTCFullYear() === end.getUTCFullYear() ? week.getUTCFullYear() : `${week.getUTCFullYear()} / ${end.getUTCFullYear()}`;
    $('week-date').value = dateKey(week); const note = $('schedule-note');
    note.textContent = state === 'sample' ? (events.length ? '最新の配信予定をお届けします。' : '配信予定はただいま準備中です。') : state === 'error' ? '予定を取得できませんでした。時間をおいて再度ご確認ください。' : state === 'loading' ? '予定を読み込んでいます…' : `最新の配信予定${lastUpdated ? ' ／ 更新 '+lastUpdated : ''}`;
    $('schedule-list').replaceChildren();
    for (let i=0;i<7;i++) {
      const d=new Date(+week+i*dayMS); const key=dateKey(d); const row=el('div','day-row'); const date=el('time','day-date',`${d.getUTCMonth()+1}/${d.getUTCDate()}`); date.dateTime=key; row.append(date,el('span','day-label',['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i])); const list=el('div','day-events');
      const daily=events.filter(e=>e.date===key);
      if (!daily.length) list.append(el('div','event empty',state==='loading'?'読み込み中…':state==='error'?'取得できませんでした':'予定はまだありません'));
      daily.forEach(e=> { const node=el(e.url?'a':'div','event'+(e.url?' event-link':'')); if(e.url) {outbound(node,e.url);node.setAttribute('aria-label',`${e.title} TikTokイベントへ（別タブで開く）`);} if(e.start) node.append(el('time','',e.start+(e.end?'–'+e.end:''))); const text=el('div','event-text');text.append(el('span','',e.title));if(e.description)text.append(el('small','',e.description));node.append(text);if(e.url){const arrow=el('span','event-arrow','↗');arrow.setAttribute('aria-hidden','true');node.append(arrow);}list.append(node); }); row.append(list);$('schedule-list').append(row);
    }
  }
  $('prev-week').addEventListener('click',()=>{week=new Date(+week-7*dayMS);renderSchedule();});$('next-week').addEventListener('click',()=>{week=new Date(+week+7*dayMS);renderSchedule();});$('this-week').addEventListener('click',()=>{week=monday(parseDate(tokyoDate));renderSchedule();});$('week-date').addEventListener('change',e=>{const d=parseDate(e.target.value);if(d){week=monday(d);renderSchedule();}});
  async function refreshSchedule() {
    if(!config.scheduleEndpoint){events=normalize(config.sampleSchedule);renderSchedule();return;}
    try {const u=new URL(config.scheduleEndpoint);if(u.protocol!=='https:')throw Error('HTTPS required');const response=await fetch(u.href,{cache:'no-store',signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error('Load failed');const data=await response.json();events=normalize(Array.isArray(data)?data:data.events);state='live';lastUpdated=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit'}).format(new Date());}catch{state='error';events=[];}renderSchedule();
  }
  renderSchedule();refreshSchedule();setInterval(()=>{if(!document.hidden&&config.scheduleEndpoint)refreshSchedule();},60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden&&config.scheduleEndpoint)refreshSchedule();});
  $('copyright-year').textContent=tokyoDate.slice(0,4);
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('#navigation>a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id));}});},{rootMargin:'-15% 0px -60% 0px'}); document.querySelectorAll('main>section[id]').forEach(s=>observer.observe(s));
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('main > section')];
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {entry.target.classList.add('is-revealed');reveal.unobserve(entry.target);}
      });
    }, {threshold:0,rootMargin:'0px 0px -24px 0px'});
    sections.forEach(section => {section.classList.add('section-reveal');reveal.observe(section);});
    document.addEventListener('focusin', e => {
      const section = e.target.closest?.('.section-reveal');
      if (section) {section.classList.add('is-revealed');reveal.unobserve(section);}
    });
    reducedMotion.addEventListener('change', e => {
      if (e.matches) {sections.forEach(section => section.classList.add('is-revealed'));reveal.disconnect();}
    });
  }
})();
