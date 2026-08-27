// Shared site chrome: nav + footer + full-screen menu + utilities
// Renders into #site-nav and #site-footer
// Set window.__PAGE = 'home' | 'about' | 'services' | 'evaluations' | 'faq' | 'contact' on each page

(function(){
  const PAGE = (window.__PAGE || '').toLowerCase();

  const PRIMARY = [
  ];


  const EXTRAS = [
    { label: 'Tempe',      href: 'speech-therapy-tempe.html' },
    { label: 'Scottsdale', href: 'speech-therapy-scottsdale.html' },
  ];

  const SOCIALS = [
    { label: 'Instagram', href: 'https://instagram.com/socialhousetherapy', icon: 'instagram' },
    { label: 'Facebook',  href: 'https://facebook.com/socialhousetherapy',  icon: 'facebook' },
    { label: 'TikTok',    href: 'https://tiktok.com/@socialhousetherapy',   icon: 'tiktok' },
  ];

  function socialIcon(name){
    if(name === 'instagram') return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>';
    if(name === 'facebook')  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';
    if(name === 'tiktok')    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.34a8.16 8.16 0 0 0 4.77 1.52V6.41a4.85 4.85 0 0 1-1.84.28z"/></svg>';
    return '';
  }

  // ---------- NAV ----------
  function buildNav(){
    const root = document.getElementById('site-nav');
    if(!root) return;

    const inlineLinks = `
      <div class="nav-item-drop">
        <button class="nav-drop-btn" type="button" aria-haspopup="true" aria-expanded="false">For Families
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="nav-drop">
          <div class="nav-drop-panel">
            <a href="evaluations.html">Evaluations</a>
            <a href="index.html#pricing-anchor">Pricing</a>
            <a href="faq.html">FAQs</a>
          </div>
        </div>
      </div>
      <a href="partner-with-us.html" class="${PAGE==='partner'?'active':''}">Partner With Us</a>
      <a href="about.html" class="${PAGE==='about'?'active':''}">About Us</a>`;

    const socialsHTML = SOCIALS.map(s => `
      <a class="nav-social" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">
        ${socialIcon(s.icon)}
      </a>`).join('');

    root.innerHTML = `
      <header class="nav" id="navEl">
        <div class="nav-inner">
          <a class="nav-brand" href="index.html" aria-label="Social House Therapy">
            <img src="assets/logo-240.webp" alt="Social House Therapy" width="125" height="125" decoding="async" fetchpriority="high">
          </a>
          <nav class="nav-links" aria-label="Primary">${inlineLinks}</nav>
          <div class="nav-right">
            <a class="nav-cta" href="tel:4804904812" aria-label="Call or text us at 480-490-4812">
              <span class="nav-cta-pre">Call/Text</span>
              <span class="nav-cta-num">480-490-4812</span>
            </a>
            <a class="nav-cta-primary" href="contact.html">
              Contact Us
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>
            </a>
            <button class="nav-burger" id="navBurger" aria-label="Open menu" aria-controls="menuOverlay" aria-expanded="false" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline class="bi-roof" points="2 10.5 12 4 22 10.5"/><line class="bi-w1" x1="5" y1="8.6" x2="5" y2="21"/><line class="bi-w2" x1="19" y1="8.6" x2="19" y2="21"/><line class="bi-l3" x1="5" y1="21" x2="19" y2="21"/><polyline class="bi-door" points="10 21 10 15.5 14 15.5 14 21"/></svg>
            </button>
          </div>
        </div>
      </header>`;

  }

  // ---------- NAV DROPDOWN (click-based) ----------
  function wireNavDrop(){
    function closeAll(){
      document.querySelectorAll('.nav-item-drop.open, .nav-sub.open').forEach(el => {
        el.classList.remove('open');
        const b = el.querySelector('.nav-drop-btn, .nav-sub-btn');
        if(b) b.setAttribute('aria-expanded', 'false');
      });
    }
    document.querySelectorAll('.nav-drop-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const drop = btn.closest('.nav-item-drop');
        const open = drop.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        if(!open) drop.querySelectorAll('.nav-sub.open').forEach(s => s.classList.remove('open'));
      });
    });
    document.querySelectorAll('.nav-sub-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sub = btn.closest('.nav-sub');
        const open = sub.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
    document.addEventListener('click', (e) => {
      if(!e.target.closest || !e.target.closest('.nav-item-drop')) closeAll();
    });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeAll(); });
    let navScY = window.pageYOffset;
    window.addEventListener('scroll', () => {
      if (Math.abs(window.pageYOffset - navScY) > 8) closeAll();
      navScY = window.pageYOffset;
    }, { passive: true });
  }

  // ---------- FULL-SCREEN MENU ----------
  function buildMenuOverlay(){
    if(document.getElementById('menuOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'menuOverlay';
    overlay.className = 'menu-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Site menu');
    overlay.setAttribute('tabindex', '-1');

    const primaryHTML = `
      <li class="menu-acc">
        <button class="menu-acc-btn" type="button" aria-expanded="false">
          <span>For Families</span>
          <svg class="menu-acc-chev" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <ul class="menu-acc-panel">
          <li><a href="evaluations.html">Evaluations</a></li>
            <li><a href="index.html#pricing-anchor">Pricing</a></li>
          <li><a href="faq.html">FAQs</a></li>
        </ul>
      </li>
      <li><a href="partner-with-us.html"><span>Partner With Us</span><span class="arr">→</span></a></li>
      <li><a href="about.html"><span>About Us</span><span class="arr">→</span></a></li>
      <li><a href="contact.html"><span>Contact</span><span class="arr">→</span></a></li>
    `;

    const extrasHTML = '';

    overlay.innerHTML = `
      <div class="menu-overlay-inner">
        <div class="menu-grid">
          <div class="menu-col">
            <ul class="menu-primary">${primaryHTML}</ul>
          </div>
        </div>

        <div class="menu-foot">
          <div>
            <a href="tel:4804904812">(480) 490-4812</a>
            <span style="margin: 0 10px; color: var(--ink-300);">·</span>
            <a href="mailto:info@socialhousetherapy.com">info@socialhousetherapy.com</a>
            <span style="margin: 0 10px; color: var(--ink-300);">·</span>
            Tempe &amp; Scottsdale, AZ
          </div>
          <a class="menu-foot-cta" href="contact.html">
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function wireMenu(){
    const burger = document.getElementById('navBurger');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('menuClose');
    if(!burger || !overlay) return;

    let lastFocus = null;

    function focusables(){
      return overlay.querySelectorAll('a, button');
    }

    function open(){
      lastFocus = document.activeElement;
      // Opened from the floating burger while the header is scrolled away:
      // drop the panel from the viewport top instead of below the (hidden) nav.
      const nav = document.getElementById('navEl');
      overlay.classList.toggle('from-top', !!(nav && nav.classList.contains('nav-hide')));
      overlay.classList.add('open');
      document.body.classList.add('menu-open');
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      // Focus the panel itself, not the first button: a programmatic focus on a
      // button paints the clay focus ring, which reads as a stray orange box on open.
      setTimeout(() => overlay.focus({ preventScroll: true }), 60);
    }

    function close(){
      overlay.classList.remove('open');
      document.body.classList.remove('menu-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    burger.addEventListener('click', () => { overlay.classList.contains('open') ? close() : open(); });
    if(closeBtn) closeBtn.addEventListener('click', close);

    // Click outside the inner panel closes
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) close();
    });

    // Selecting any link closes
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => close());
    });

    // Accordion (For Families / Services)
    overlay.querySelectorAll('.menu-acc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const li = btn.closest('.menu-acc');
        const panel = li.querySelector('.menu-acc-panel');
        const open = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
        let anc = li.parentElement ? li.parentElement.closest('.menu-acc-panel') : null;
        while(anc){ anc.style.maxHeight = 'none'; anc = anc.parentElement ? anc.parentElement.closest('.menu-acc-panel') : null; }
      });
    });

    // Escape + focus trap
    document.addEventListener('keydown', (e) => {
      if(!overlay.classList.contains('open')) return;
      if(e.key === 'Escape'){ e.preventDefault(); close(); return; }
      if(e.key === 'Tab'){
        const f = Array.from(focusables());
        if(!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    });
  }

  // ---------- FOOTER ----------
  function buildFooter(){
    const root = document.getElementById('site-footer');
    if(!root) return;
    root.innerHTML = `
      <footer class="footer">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="foot-brand-link">
              <img src="assets/logo-240.webp" alt="Social House Therapy" width="96" height="96" decoding="async" loading="lazy">
            </a>
            <div class="foot-contact foot-contact-mobile">
              <h4 class="footer-h4-stack">Contact Us</h4>
              <ul>
                <li><a class="foot-phone" href="tel:4804904812" aria-label="Call or text us at 480-490-4812">Call/Text 480-490-4812</a></li>
                <li><a href="mailto:info@socialhousetherapy.com">info@socialhousetherapy.com</a></li>
                  <li><a href="https://share.google/xTUNuque8RDOZr5IY" target="_blank" rel="noopener">Find us on Google</a></li>
              </ul>
            </div>
            <div class="foot-socials">
              ${SOCIALS.map(s => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${socialIcon(s.icon)}</a>`).join('')}
            </div>
            <div class="hand-sign">talk soon!</div>
          </div>
          <div>
            <h4>Site map</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="evaluations.html">Evaluations</a></li>
              <li><a href="partner-with-us.html">Partner With Us</a></li>
              <li><a href="faq.html">FAQs</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Areas We Serve</h4>
            <ul>
              <li><a href="speech-therapy-tempe.html">Tempe</a></li>
              <li><a href="speech-therapy-scottsdale.html">Scottsdale</a></li>
            </ul>
            <div class="foot-contact-desktop">
              <h4 class="footer-h4-stack">Contact Us</h4>
              <ul>
                <li><a class="foot-phone" href="tel:4804904812" aria-label="Call or text us at 480-490-4812">Call/Text 480-490-4812</a></li>
                <li><a href="mailto:info@socialhousetherapy.com">info@socialhousetherapy.com</a></li>
                  <li><a href="https://share.google/xTUNuque8RDOZr5IY" target="_blank" rel="noopener">Find us on Google</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-base">
          <div>© ${new Date().getFullYear()} Social House Therapy</div>
          <div class="footer-legal"><a href="privacy.html">Notice of Privacy Practices</a></div>
        </div>
      </footer>`;
  }

  // ---------- FLOATING CONTACT BUTTON ----------
  function buildContactFab(){
    // Don't show on the contact page — the form is already there.
    if(PAGE === 'contact') return;
    if(document.getElementById('contactFab')) return;

    const style = document.createElement('style');
    style.id = 'contactFabStyles';
    style.textContent = `
      .contact-fab{
        position: fixed; right: 22px; bottom: 22px; z-index: 900;
        display: inline-flex; align-items: center; gap: 9px;
        padding: 13px 18px; text-decoration: none;
        border-radius: 999px;
        background: var(--clay-500, #c7541f); color: var(--cream-50, #fbf8f1);
        font-family: inherit; font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
        box-shadow: 0 12px 30px -10px rgba(40,50,40,0.5), 0 2px 6px rgba(40,50,40,0.2);
        transition: transform .18s ease, box-shadow .18s ease, background .18s ease, opacity .2s ease, visibility .2s ease;
      }
      .contact-fab.is-hidden{ opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(8px); }
      .contact-fab:hover{ background: var(--clay-600, #a44318); color: var(--cream-50, #fbf8f1); transform: translateY(-2px); box-shadow: 0 16px 38px -10px rgba(199,84,31,0.55); }
      .contact-fab:active{ transform: translateY(0); }
      .contact-fab svg{ width: 19px; height: 19px; flex-shrink: 0; }
      .contact-fab .cf-label{ white-space: nowrap; }
      .to-top-fab{
        position: fixed; right: 22px; bottom: 84px; z-index: 900;
        display: inline-flex; align-items: center; justify-content: center;
        width: 46px; height: 46px; border-radius: 999px; border: 1.5px solid var(--sage-600, #6c8a6e);
        background: var(--white, #fff); color: var(--sage-700, #5b7150); cursor: pointer;
        box-shadow: 0 10px 26px -12px rgba(40,50,40,.4);
        transition: transform .18s ease, opacity .2s ease, visibility .2s ease, background .18s ease;
      }
      .to-top-fab.is-hidden{ opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(8px); }
      .to-top-fab:hover{ background: var(--sage-100, #e2ebdc); transform: translateY(-2px); }
      .to-top-fab svg{ width: 20px; height: 20px; }
      @media (max-width: 560px){
        .contact-fab{ right: 16px; bottom: 16px; padding: 14px; }
        .to-top-fab{ right: 16px; bottom: 76px; }
        .contact-fab .cf-label{ display: none; }
        .contact-fab svg{ width: 22px; height: 22px; }
      }
    `;
    document.head.appendChild(style);

    const fab = document.createElement('a');
    fab.id = 'contactFab';
    fab.className = 'contact-fab';
    fab.href = 'contact.html';
    fab.setAttribute('aria-label', 'Contact us');
    fab.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <span class="cf-label">Contact us</span>`;
    document.body.appendChild(fab);

    const topFab = document.createElement('button');
    topFab.id = 'toTopFab';
    topFab.className = 'to-top-fab is-hidden';
    topFab.type = 'button';
    topFab.setAttribute('aria-label', 'Back to top');
    topFab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 15 12 9 18 15"/></svg>';
    topFab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(topFab);

    // Hide the button whenever the header or footer is in view.
    // IntersectionObserver instead of a scroll handler: no layout reads per frame.
    const header = document.getElementById('navEl') || document.querySelector('.nav');
    const footer = document.querySelector('.footer');
    if(!('IntersectionObserver' in window)){ return; }
    const seen = { header: !!header, footer: false };
    // The nav is position:fixed, so it is always intersecting and cannot be used
    // to decide visibility. Both breakpoints therefore key off scroll distance;
    // desktop additionally hides the buttons once the footer is in view, since
    // the footer carries its own contact links.
    const mobileMq = window.matchMedia('(max-width: 720px)');
    function update(){
      const nearTop = window.scrollY < 120;
      /* The nav is fixed, so "is the header showing" is the nav-hide class the
         scroll handler toggles, not an IntersectionObserver entry. */
      const headerShown = !!header && !header.classList.contains('nav-hide');
      const hid = mobileMq.matches ? nearTop : (nearTop || seen.footer || headerShown);
      fab.classList.toggle('is-hidden', hid);
      topFab.classList.toggle('is-hidden', hid);
    }
    if(mobileMq.addEventListener) mobileMq.addEventListener('change', update);
    window.addEventListener('scroll', update, { passive: true });
    if(header && 'MutationObserver' in window){
      new MutationObserver(update).observe(header, { attributes: true, attributeFilter: ['class'] });
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if(en.target === header) seen.header = en.isIntersecting;
        else if(en.target === footer) seen.footer = en.isIntersecting;
      });
      update();
    });
    if(header) io.observe(header);
    if(footer) io.observe(footer);
    update();
  }

  // ---------- REVEAL ----------
  function wireReveal(){
    const els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window) || !els.length){
      els.forEach(e => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    els.forEach(e => io.observe(e));
  }

  // ---------- FAQ ----------
  // One delegated listener instead of two per question.
  function wireFaq(){
    document.addEventListener('click', (e) => {
      const q = e.target.closest && e.target.closest('.faq-q');
      if(!q) return;
      const item = q.closest('.faq-item');
      const a = item && item.querySelector('.faq-a');
      if(!item || !a) return;
      const isOpen = item.classList.toggle('open');
      a.style.maxHeight = isOpen ? a.scrollHeight + 'px' : '0px';
    });
  }

  // ---------- HAMBURGER VISIBILITY ----------
  // Show the floating top-right hamburger only after the page header has
  // scrolled fully out of view; hide it when the header is back in view.
  function wireHamburgerVisibility(){
    const burger = document.getElementById('navBurger');
    const header = document.getElementById('navEl') || document.querySelector('.nav');
    if(!burger || !header) return;

    if('IntersectionObserver' in window){
      new IntersectionObserver(entries => {
        entries.forEach(en => burger.classList.toggle('visible', !en.isIntersecting));
      }).observe(header);
      return;
    }

    function update(){
      const rect = header.getBoundingClientRect();
      burger.classList.toggle('visible', rect.bottom <= 0);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function boot(){
    buildNav();
    wireNavDrop();
    buildMenuOverlay();
    wireMenu();
    buildFooter();
    buildContactFab();
    wireReveal();
    wireFaq();
    wireHamburgerVisibility();
    wireNavHide();
  }

  // ---------- HIDE HEADER ON SCROLL DOWN, REVEAL ON SCROLL UP ----------
  function wireNavHide(){
    const spacer = document.getElementById('site-nav');
    const nav = document.getElementById('navEl');
    if(!spacer || !nav) return;
    function sizeSpacer(){ spacer.style.height = nav.offsetHeight + 'px'; document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px'); }
    sizeSpacer();
    window.addEventListener('resize', sizeSpacer);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(sizeSpacer);
    window.addEventListener('load', sizeSpacer);
    let lastY = window.scrollY;
    window.addEventListener('scroll', function(){
      const y = window.scrollY;
      const dy = y - lastY;
      if(Math.abs(dy) < 8) return;
      if(dy > 0 && y > nav.offsetHeight + 60 && !document.body.classList.contains('menu-open')){
        nav.classList.add('nav-hide');
      } else {
        nav.classList.remove('nav-hide');
      }
      lastY = y;
    }, { passive: true });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
