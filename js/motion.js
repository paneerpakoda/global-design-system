/* ============================================================
   ICICI Global DS — app shell motion behaviours
   Scoped to the DESIGNOS HUB chrome only (home + sidebar).
   No DS component is touched here. Global object `Motion`;
   app.js calls Motion.afterRender() after every route().
   Idempotent (data-m-on) and honours prefers-reduced-motion.
   Tilt + magnetic pull are intentionally LOW intensity.
   ============================================================ */

const Motion = (() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const once = (el) => { if (el.dataset.mOn) return false; el.dataset.mOn = '1'; return true; };

  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); e.target._mView && e.target._mView(); } });
  }, { threshold: 0.25 }) : null;
  const onView = (el, fn) => { if (!io || reduce) { fn(); return; } el._mView = fn; io.observe(el); };

  /* count-up — for the hub's metric tiles (tabular figures, settles, no bounce) */
  function countUp(el){
    if (!once(el)) return;
    const raw = (el.dataset.countup || el.textContent).trim();
    const m = raw.match(/^(\D*?)(-?[\d,]*\.?\d+)(.*)$/);
    if (!m) return;
    const prefix = m[1] || '', suffix = m[3] || '', numStr = m[2].replace(/,/g, '');
    const target = parseFloat(numStr);
    const decimals = (numStr.split('.')[1] || '').length;
    const grouped = m[2].includes(',');
    const fmt = (v) => {
      let s = v.toFixed(decimals);
      if (grouped) { const p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); s = p.join('.'); }
      return prefix + s + suffix;
    };
    el.style.fontVariantNumeric = 'tabular-nums';
    if (reduce) { el.textContent = fmt(target); return; }
    onView(el, () => {
      const dur = 950; let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
      };
      el.textContent = fmt(0); requestAnimationFrame(step);
    });
  }

  /* reveal words — gentle staggered rise for the home hero title */
  function revealWords(el){
    if (!once(el)) return;
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    if (reduce) { el.textContent = text; return; }
    text.split(/(\s+)/).forEach((w, i) => {
      if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(w)); return; }
      const s = document.createElement('span');
      s.className = 'ds-reveal-word'; s.textContent = w; s.setAttribute('aria-hidden', 'true');
      s.style.animationDelay = (i * 0.035).toFixed(3) + 's';
      el.appendChild(s);
    });
  }

  /* VERY subtle 3D tilt (+ spotlight if present) — hub navigation tiles */
  function tilt(el){
    if (!once(el) || reduce) return;
    const max = parseFloat(el.dataset.tilt) || 3;          // degrees — keep low
    const spot = el.hasAttribute('data-spotlight');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.classList.add('tilting');
      el.style.setProperty('--ry', ((px - 0.5) * 2 * max).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((0.5 - py) * 2 * max).toFixed(2) + 'deg');
      el.style.setProperty('--ty', '-3px');
      if (spot) { el.style.setProperty('--mx', (px * 100).toFixed(1) + '%'); el.style.setProperty('--my', (py * 100).toFixed(1) + '%'); }
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('tilting');
      el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); el.style.setProperty('--ty', '0');
    });
  }

  /* faint cursor spotlight — only for spotlight tiles that don't already tilt */
  function spotlight(el){
    if (el.hasAttribute('data-tilt') || !once(el) || reduce) return;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
    });
  }

  /* VERY low magnetic pull — used only on the hub's hero CTA */
  function magnetic(el){
    if (!once(el) || reduce) return;
    const strength = parseFloat(el.dataset.magnetic) || 0.12;   // keep low
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * strength).toFixed(1) + 'px,' +
        ((e.clientY - r.top - r.height / 2) * strength).toFixed(1) + 'px)';
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  }

  /* sidebar sliding active pill */
  function syncNav(){
    const nav = document.getElementById('nav'); if (!nav) return;
    let pill = nav.querySelector(':scope > .nav-pill');
    const active = nav.querySelector('.nav-item.active');
    if (!active) { if (pill) pill.classList.remove('show'); return; }
    if (!pill) { pill = document.createElement('div'); pill.className = 'nav-pill'; nav.prepend(pill); }
    pill.style.setProperty('--pill-x', active.offsetLeft + 'px');
    pill.style.setProperty('--pill-y', active.offsetTop + 'px');
    pill.style.setProperty('--pill-w', active.offsetWidth + 'px');
    pill.style.height = active.offsetHeight + 'px';
    requestAnimationFrame(() => pill.classList.add('show'));
  }

  function afterRender(root){
    root = root || document;
    root.querySelectorAll('[data-countup]').forEach(countUp);
    root.querySelectorAll('[data-reveal-words]').forEach(revealWords);
    root.querySelectorAll('[data-tilt]').forEach(tilt);          /* tilt before spotlight (shared once-guard) */
    root.querySelectorAll('[data-spotlight]').forEach(spotlight);
    root.querySelectorAll('[data-magnetic]').forEach(magnetic);
    syncNav();
  }

  window.addEventListener('resize', syncNav);
  return { afterRender, syncNav };
})();
window.Motion = Motion;
