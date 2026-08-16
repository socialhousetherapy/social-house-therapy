/* SimplePractice appointment-request widget: every "book a free call" CTA opens the overlay in-page.
   Shared across pages — include this file, then the SimplePractice CDN script:
   <script src="scripts/sp-widget.js"></script>
   <script src="https://widget-cdn.simplepractice.com/assets/integration-1.0.js"></script> */
(function () {
  var SP = {
    'data-spwidget-scope-id': 'd78301b5-e954-408c-b390-6baf299af8f1',
    'data-spwidget-scope-uri': 'socialhousetherapy',
    'data-spwidget-application-id': '7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b',
    'data-spwidget-channel': 'embedded_widget',
    'data-spwidget-type': 'Contact form'
  };
  /* Every booking/contact CTA opens the widget — any CTA-styled link pointing at contact.html,
     plus the nav/menu booking buttons. Plain "Contact" nav/footer text links stay as links. */
  var BOOKING_SELECTOR = 'a.hiw-step-cta, a.cl-cta-btn, a.menu-foot-cta, ' +
    'a.ct-secondary-btn, a.sv-fit-step-cta, a.btn[href$="contact.html"], a.t-path-cta[href$="contact.html"], ' +
    'a.tz-btn[href$="contact.html"], a.tz-step[href$="contact.html"], ' +
    'a.sz-btn[href$="contact.html"], a.sz-step[href$="contact.html"], ' +
    'a.hand-note[href$="contact.html"], ' +
    'a.ev-btn[href$="contact.html"], a.ev-link[href$="contact.html"], ' +
    '.faq-a a[href$="contact.html"]';
  function stamp() {
    var found = 0;
    document.querySelectorAll(BOOKING_SELECTOR).forEach(function (el) {
      if (el.hasAttribute('data-spwidget-autobind')) return;
      Object.keys(SP).forEach(function (k) { el.setAttribute(k, SP[k]); });
      el.setAttribute('data-spwidget-contact', '');
      el.setAttribute('data-spwidget-scope-global', '');
      el.setAttribute('data-spwidget-autobind', '');
      /* Graceful fallback if the widget script can't load. */
      el.setAttribute('href', 'https://socialhousetherapy.clientsecure.me');
      el.setAttribute('rel', 'noopener');
      found++;
    });
    if (found && window.spWidgetAutoBind) window.spWidgetAutoBind();
    return found;
  }
  stamp(); /* static in-page CTAs */

  /* ---- lazy loading of the SimplePractice bundle ------------------------
     The third-party script is by far the heaviest request on the page, and
     nothing on screen depends on it. So it is fetched on the first sign of
     interaction (or when the browser goes idle), instead of during load.
     Behaviour is unchanged: if a CTA is clicked before the bundle is ready,
     the click waits for it and then re-fires. */
  var SP_SRC = 'https://widget-cdn.simplepractice.com/assets/integration-1.0.js';
  var spState = document.querySelector('script[src*="widget-cdn.simplepractice.com"]') ? 'ready' : 'idle';
  var spQueue = [];

  function flushSP() {
    var q = spQueue; spQueue = [];
    q.forEach(function (fn) { try { fn(); } catch (e) {} });
  }
  function loadSP(cb) {
    if (cb) spQueue.push(cb);
    if (spState === 'ready' || spState === 'error') return flushSP();
    if (spState === 'loading') return;
    spState = 'loading';
    var s = document.createElement('script');
    s.src = SP_SRC;
    s.async = true;
    s.onload = function () { spState = 'ready'; stamp(); startWatchers(); flushSP(); };
    s.onerror = function () { spState = 'error'; flushSP(); };
    document.head.appendChild(s);
  }
  ['pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'].forEach(function (t) {
    window.addEventListener(t, function () { loadSP(); }, { once: true, passive: true, capture: true });
  });
  if (window.requestIdleCallback) requestIdleCallback(function () { loadSP(); }, { timeout: 4000 });
  else setTimeout(function () { loadSP(); }, 2500);

  /* Sizing strategy: ONE scroll surface — the form's own page inside the iframe.
     The iframe fills the whole viewport and the form scrolls natively inside it.
     This means:
       — no double scroll (the page behind is locked while the overlay is open),
       — the bottom of the form is always reachable no matter how long it grows
         (e.g. choosing "Someone else" adds fields),
       — wheel/touch scrolling never hands off between two scroll areas, so it
         can't stall mid-gesture. */
  var MOBILE_MAX = 700; /* below this width, treat as mobile (hint copy only) */

  /* ---- scroll cue ------------------------------------------------------- */
  var HINT_ID = 'sp-scroll-hint';
  function ensureHintStyles() {
    if (document.getElementById('sp-scroll-hint-style')) return;
    var s = document.createElement('style');
    s.id = 'sp-scroll-hint-style';
    s.textContent =
      '#' + HINT_ID + '{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);' +
      'z-index:2147483647;display:flex;align-items:center;gap:8px;' +
      'background:rgba(47,62,52,.92);color:#fdfcf9;font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
      'padding:10px 16px;border-radius:999px;box-shadow:0 6px 24px rgba(0,0,0,.28);' +
      'pointer-events:none;opacity:0;transition:opacity .5s ease;}' +
      '#' + HINT_ID + '.sp-hint-show{opacity:1;}' +
      '#' + HINT_ID + ' .sp-hint-arrow{display:inline-block;animation:spHintBob 1.4s ease-in-out infinite;}' +
      '@keyframes spHintBob{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}' +
      '@media (prefers-reduced-motion: reduce){#' + HINT_ID + ' .sp-hint-arrow{animation:none;}}';
    document.head.appendChild(s);
  }
  /* Show the cue when the form opens, then fade it out after 4 seconds. */
  var hintTimer = null;
  function showHint() {
    if (document.getElementById(HINT_ID)) return;
    ensureHintStyles();
    var hint = document.createElement('div');
    hint.id = HINT_ID;
    hint.innerHTML = 'Scroll to see the full form <span class="sp-hint-arrow">&#8595;</span>';
    document.body.appendChild(hint);
    requestAnimationFrame(function () { hint.classList.add('sp-hint-show'); });
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () {
      hint.classList.remove('sp-hint-show');
      setTimeout(hideHint, 600);
    }, 4000);
  }
  function hideHint() {
    clearTimeout(hintTimer);
    var hint = document.getElementById(HINT_ID);
    if (hint) hint.parentNode.removeChild(hint);
  }

  /* ---- always-available exit (with accidental-tap protection) ------------ */
  var EXIT_ID = 'sp-exit-btn';
  var CONFIRM_ID = 'sp-exit-confirm';
  function ensureExitStyles() {
    if (document.getElementById('sp-exit-style')) return;
    var s = document.createElement('style');
    s.id = 'sp-exit-style';
    s.textContent =
      '#' + EXIT_ID + '{position:fixed;top:14px;right:14px;z-index:2147483647;' +
      'display:flex;align-items:center;gap:7px;cursor:pointer;border:0;' +
      'background:rgba(47,62,52,.92);color:#fdfcf9;border-radius:999px;padding:10px 16px;' +
      'font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
      'box-shadow:0 6px 24px rgba(0,0,0,.28);}' +
      '#' + EXIT_ID + ':hover{background:#2f3e34;}' +
      '#' + EXIT_ID + ' .sp-exit-x{font-size:15px;line-height:1;}' +
      '#' + CONFIRM_ID + '{position:fixed;top:56px;right:14px;z-index:2147483647;' +
      'background:#fdfcf9;color:#2f3e34;border-radius:14px;padding:16px;width:230px;' +
      'font:400 13px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
      'box-shadow:0 10px 34px rgba(0,0,0,.32);}' +
      '#' + CONFIRM_ID + ' p{margin:0 0 12px;font-weight:600;}' +
      '#' + CONFIRM_ID + ' .sp-confirm-row{display:flex;gap:8px;}' +
      '#' + CONFIRM_ID + ' button{flex:1;cursor:pointer;border-radius:999px;padding:9px 0;' +
      'font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}' +
      '#' + CONFIRM_ID + ' .sp-keep{border:1.5px solid #2f3e34;background:transparent;color:#2f3e34;}' +
      '#' + CONFIRM_ID + ' .sp-leave{border:0;background:#a14d2e;color:#fdfcf9;}';
    document.head.appendChild(s);
  }
  function removeConfirm() {
    var c = document.getElementById(CONFIRM_ID);
    if (c) c.parentNode.removeChild(c);
  }
  function removeExitUI() {
    removeConfirm();
    var b = document.getElementById(EXIT_ID);
    if (b) b.parentNode.removeChild(b);
  }
  var closing = false;
  function closeWidget() {
    /* Hide our chrome immediately so nothing lingers during the close animation. */
    closing = true;
    removeX(); removeExitUI(); hideHint();
    var scroller = document.querySelector('.spwidget--scroller');
    if (!scroller) { lockPage(false); closing = false; return; }
    var root = scroller;
    while (root && root.parentNode !== document.body) root = root.parentNode;

    /* The widget closes itself (and resets its own open/closed state) when the
       dimmed backdrop is clicked — trigger that native path instead of ripping
       the overlay out of the DOM, so the booking CTAs keep working afterwards. */
    [root, scroller.parentNode, scroller].forEach(function (el) {
      if (!el || el === document.body) return;
      ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(function (type) {
        var Ev = type.indexOf('pointer') === 0 && window.PointerEvent ? PointerEvent : MouseEvent;
        el.dispatchEvent(new Ev(type, { bubbles: true, cancelable: true, view: window, clientX: 2, clientY: 2 }));
      });
    });

    /* Fallback: if the widget ignored the backdrop click, remove the overlay. */
    setTimeout(function () {
      var stillOpen = document.querySelector('.spwidget--scroller');
      if (stillOpen) {
        var r = stillOpen;
        while (r && r.parentNode !== document.body) r = r.parentNode;
        if (r) r.parentNode.removeChild(r);
      }
      lockPage(false);
      closing = false;
    }, 450);
  }
  function showExit() {
    if (document.getElementById(EXIT_ID)) return;
    ensureExitStyles();
    var btn = document.createElement('button');
    btn.id = EXIT_ID;
    btn.type = 'button';
    btn.innerHTML = '<span class="sp-exit-x">&#10005;</span> Exit form';
    btn.addEventListener('click', function () {
      /* Two-step exit: first tap opens a small confirm card, so a stray tap
         can never wipe the user's answers. */
      if (document.getElementById(CONFIRM_ID)) { removeConfirm(); return; }
      var card = document.createElement('div');
      card.id = CONFIRM_ID;
      card.innerHTML = '<p>Leave the form?</p>' +
        '<div style="margin:0 0 12px;">Anything you\u2019ve typed won\u2019t be saved.</div>' +
        '<div class="sp-confirm-row">' +
        '<button type="button" class="sp-keep">Keep going</button>' +
        '<button type="button" class="sp-leave">Exit</button></div>';
      document.body.appendChild(card);
      card.querySelector('.sp-keep').addEventListener('click', removeConfirm);
      card.querySelector('.sp-leave').addEventListener('click', closeWidget);
    });
    document.body.appendChild(btn);
  }

  /* ---- page scroll lock while the overlay is open ------------------------ */
  var pageLocked = false;
  function lockPage(on) {
    if (on === pageLocked) return;
    pageLocked = on;
    var v = on ? 'hidden' : '';
    document.documentElement.style.overflow = v;
    document.body.style.overflow = v;
  }

  /* Subtle desktop-only X: closes the form immediately, no confirm. */
  var X_ID = 'sp-close-x';
  function ensureXStyles() {
    if (document.getElementById('sp-close-x-style')) return;
    var s = document.createElement('style');
    s.id = 'sp-close-x-style';
    s.textContent =
      '#' + X_ID + '{position:fixed;top:16px;right:20px;z-index:2147483647;' +
      'width:36px;height:36px;display:flex;align-items:center;justify-content:center;' +
      'cursor:pointer;border:0;border-radius:50%;background:rgba(47,62,52,.35);' +
      'color:#fdfcf9;font:400 17px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
      'transition:background .2s ease;}' +
      '#' + X_ID + ':hover{background:rgba(47,62,52,.85);}';
    document.head.appendChild(s);
  }
  function showX() {
    if (document.getElementById(X_ID)) return;
    ensureXStyles();
    var btn = document.createElement('button');
    btn.id = X_ID;
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Close form');
    btn.innerHTML = '&#10005;';
    btn.addEventListener('click', closeWidget);
    document.body.appendChild(btn);
  }
  function removeX() {
    var b = document.getElementById(X_ID);
    if (b) b.parentNode.removeChild(b);
  }

  /* Lift the width caps on the widget's wrapper layers so the form can use the
     full viewport. Applied with !important so the widget's stylesheet can't win. */
  function unclamp(scroller, iframe) {
    var el = iframe.parentNode;
    while (el && el !== document.body && el.style) {
      el.style.setProperty('max-width', 'none', 'important');
      el.style.setProperty('width', (el === scroller || el.contains(scroller)) ? '100vw' : '100%', 'important');
      el.style.setProperty('left', '0', 'important');
      el.style.setProperty('right', '0', 'important');
      el.style.setProperty('margin', '0', 'important');
      el = el.parentNode;
    }
  }

  /* ---- fit ------------------------------------------------------------- */
  var wasOpen = false;
  function fitWidget() {
    var scroller = document.querySelector('.spwidget--scroller');
    var iframe = scroller && scroller.querySelector('iframe');
    /* The widget may hide (not remove) its overlay on close — treat invisible as closed. */
    var open = !!(scroller && iframe) && scroller.getBoundingClientRect().width > 0;
    if (!open) {
      hideHint(); removeExitUI(); removeX(); lockPage(false);
      closing = false; wasOpen = false;
      return;
    }
    if (closing) return; /* don't re-add chrome while the overlay is closing */

    lockPage(true);

    /* Chrome (cue + X) is managed every tick — NOT behind the style guard below —
       so it reliably comes back each time the form is reopened. */
    if (!wasOpen) { wasOpen = true; showHint(); }
    showX();
    removeExitUI();

    var hPx = window.innerHeight + 'px';
    /* Idempotence guard — constant style writes cause janky scrolling. Re-apply
       only when the viewport changes or the widget overrides our sizing. */
    var key = 'v:' + window.innerWidth + 'x' + window.innerHeight;
    if (iframe.getAttribute('data-sp-fit') === key && iframe.style.height === hPx) return;
    iframe.setAttribute('data-sp-fit', key);

    unclamp(scroller, iframe);

    /* Iframe fills the viewport; the form page scrolls natively INSIDE it. */
    iframe.style.animation = 'none';
    iframe.style.transform = 'none';
    iframe.style.position = 'relative';
    iframe.style.top = '0';
    iframe.style.display = 'block';
    iframe.style.width = '100%';
    iframe.style.maxWidth = '100%';
    iframe.style.margin = '0';
    iframe.style.height = hPx;
    iframe.removeAttribute('scrolling');   /* let the iframe scroll its content */

    /* The outer overlay must NOT scroll — one scroll surface only. */
    scroller.style.setProperty('overflow', 'hidden', 'important');
    scroller.style.setProperty('height', '100vh', 'important');
  }
  /* Apply now and again as the widget/iframe settle. */
  function fitSoon() { [0, 60, 200, 500, 1000, 1800].forEach(function (t) { setTimeout(fitWidget, t); }); }

  /* Re-stamp the nav/menu CTAs that site.js injects after load, and fit the
     widget whenever its overlay is added to the page. Mutations from our own
     scroll-cue pill are ignored so it can't feed back into itself.
     Both watchers only start once the widget bundle is actually present. */
  var watching = false;
  function startWatchers() {
    if (watching || !document.body) return;
    watching = true;
    var OWN_IDS = { 'sp-scroll-hint': 1, 'sp-exit-btn': 1, 'sp-exit-confirm': 1, 'sp-close-x': 1 };
    function isOurs(n) { return n && n.id && OWN_IDS[n.id]; }
    var pending = false;
    new MutationObserver(function (muts) {
      var relevant = muts.some(function (m) {
        if (isOurs(m.target)) return false;
        var nodes = [].slice.call(m.addedNodes).concat([].slice.call(m.removedNodes));
        return nodes.some(function (n) { return !isOurs(n); });
      });
      if (!relevant || pending) return;
      /* Coalesce bursts of mutations into one pass — re-querying the whole
         document per mutation is expensive on long pages. */
      pending = true;
      requestAnimationFrame(function () { pending = false; stamp(); fitWidget(); });
    }).observe(document.body, { childList: true, subtree: true });
    setInterval(fitWidget, 400);
  }

  /* Fit when a booking CTA is clicked (the overlay mounts just after);
     if the bundle has not loaded yet, fetch it first and replay the click. */
  document.addEventListener('click', function (e) {
    var cta = e.target.closest && e.target.closest(BOOKING_SELECTOR);
    if (!cta) return;
    if (spState === 'ready') { fitSoon(); return; }
    if (spState === 'error') return; /* fall through to the href fallback */
    e.preventDefault();
    var fired = false;
    function go() {
      if (fired) return;
      fired = true;
      if (spState === 'ready') setTimeout(function () { cta.click(); }, 0);
      else window.location.href = cta.getAttribute('href');
    }
    setTimeout(go, 3000); /* safety net if the CDN is slow or blocked */
    loadSP(go);
  }, true);
  window.addEventListener('resize', fitWidget);
  if (spState === 'ready') startWatchers();
})();
