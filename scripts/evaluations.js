/* Evaluations article: editable content variables + lightweight interactions.
   Everything here is progressive enhancement. The page reads fully without it. */
(function () {
  'use strict';

  /* ---------- EDITABLE CONTENT VARIABLES ----------
     Update these in one place; the page fills itself in on load. */
  var EV = window.EV_CONFIG = {
    bookingUrl: 'contact.html',            // "Schedule an Evaluation"
    consultUrl: 'contact.html',            // "Talk With an SLP First" / free consultation
    pricingUrl: 'index.html#pricing',      // Services and pricing
    reportTurnaround: '',                  // e.g. "7 to 10 business days" (leave empty to omit)
    lastReviewed: 'August 2026',           // article "last updated" field
    readingTime: '22 min read',
    counters: [
      { n: 3,  suffix: '',  title: 'Major phases',                  desc: 'Preparation, direct assessment, and clinical interpretation' },
      { n: 8,  suffix: '+', title: 'Potential information sources', desc: 'Selected according to the child and referral concern' },
      { n: 1,  suffix: '',  title: 'Complete written report',       desc: 'Findings, interpretation, and recommendations in one place' },
      { n: 0,  suffix: '',  title: 'Required commitment to therapy', desc: 'An evaluation should result in an honest recommendation' }
    ]
  };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function fillVars() {
    document.querySelectorAll('[data-ev-var]').forEach(function (el) {
      var v = EV[el.getAttribute('data-ev-var')];
      if (v) el.textContent = v;
    });
    document.querySelectorAll('[data-ev-href]').forEach(function (el) {
      var v = EV[el.getAttribute('data-ev-href')];
      if (v) el.setAttribute('href', v);
    });
    /* turnaround sentence only appears when a value is set */
    document.querySelectorAll('[data-ev-if="reportTurnaround"]').forEach(function (el) {
      if (!EV.reportTurnaround) el.remove();
    });
  }

  /* ---------- scroll progress + TOC scroll spy ----------
     One passive listener, one rAF per frame, and offsets measured only when the
     layout can actually have changed. Reading offsetTop on every scroll event
     forces a synchronous layout and is what makes long pages stutter on phones. */
  function scrollFx() {
    var bar = document.querySelector('.ev-progress i');
    var art = document.querySelector('.ev-article');
    var links = Array.prototype.slice.call(document.querySelectorAll('.ev-toc a, .ev-toc-mobile a'));
    var secs = Array.prototype.slice.call(document.querySelectorAll('.ev-sec[id]'));
    var mob = document.querySelector('.ev-toc-mobile');
    if (mob) {
      mob.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { mob.open = false; });
      });
    }
    if ((!bar || !art) && !secs.length) return;

    var artTop = 0, artRange = 0, tops = [], active = null, queued = false;

    function measure() {
      if (art) { artTop = art.offsetTop; artRange = art.offsetHeight - window.innerHeight; }
      tops = secs.map(function (s) { return s.offsetTop; });
    }

    function frame() {
      queued = false;
      var y = window.pageYOffset;
      if (bar && art) {
        var p = artRange > 0 ? (y - artTop) / artRange : 0;
        bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, p)).toFixed(4) + ')';
      }
      if (secs.length && links.length) {
        var t = y + 130, cur = secs[0].id;
        for (var i = 0; i < tops.length; i++) { if (tops[i] <= t) cur = secs[i].id; }
        if (cur !== active) {
          active = cur;
          links.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + active);
          });
        }
      }
    }

    function onScroll() { if (!queued) { queued = true; requestAnimationFrame(frame); } }
    function remeasure() { measure(); frame(); }

    window.addEventListener('scroll', onScroll, { passive: true });
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt); rt = setTimeout(remeasure, 120);
    }, { passive: true });
    /* Anything that changes the page height invalidates the cached offsets. */
    document.addEventListener('toggle', function (e) {
      if (e.target && e.target.tagName === 'DETAILS') remeasure();
    }, true);
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.faq-q')) setTimeout(remeasure, 340);
    }, true);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
    remeasure();
  }

  /* ---------- animated counters ---------- */
  function counters() {
    var wrap = document.querySelector('.ev-stats');
    if (!wrap) return;
    var nodes = Array.prototype.slice.call(wrap.querySelectorAll('.ev-stat-n'));
    nodes.forEach(function (el, i) {
      var c = EV.counters[i];
      if (c) el.textContent = c.n + (c.suffix || '');
    });
    if (reduce.matches || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        nodes.forEach(function (el, i) {
          var c = EV.counters[i]; if (!c) return;
          var target = c.n, sfx = c.suffix || '', dur = 900, t0 = null;
          if (target === 0) { el.textContent = '0' + sfx; return; }
          function step(now) {
            if (!t0) t0 = now;
            var k = Math.min((now - t0) / dur, 1);
            var e = 1 - Math.pow(1 - k, 3);
            el.textContent = Math.round(target * e) + (k >= 1 ? sfx : '');
            if (k < 1) requestAnimationFrame(step);
          }
          el.textContent = '0';
          requestAnimationFrame(step);
        });
      });
    }, { threshold: 0.35 });
    io.observe(wrap);
  }

  /* ---------- flow diagram: highlight on hover / focus / scroll ---------- */
  function flow() {
    var steps = Array.prototype.slice.call(document.querySelectorAll('.ev-flow-step'));
    if (!steps.length) return;
    steps.forEach(function (s) {
      s.addEventListener('mouseenter', function () { set(s); });
      s.addEventListener('focusin', function () { set(s); });
    });
    function set(on) { steps.forEach(function (s) { s.classList.toggle('is-on', s === on); }); }
    if ('IntersectionObserver' in window && !reduce.matches) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('is-on'); });
      }, { threshold: 0.9 });
      steps.forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------- restrained parallax (desktop only) ---------- */
  function parallax() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-ev-par]'));
    if (!els.length || reduce.matches) return;
    /* Phones never get the parallax, so they never get the listener either. */
    var wide = window.matchMedia('(min-width: 761px)');
    if (!wide.matches) {
      if (wide.addEventListener) wide.addEventListener('change', function (e) { if (e.matches) parallax(); }, { once: true });
      return;
    }
    var on = window.matchMedia('(min-width: 1081px)');
    var tab = window.matchMedia('(min-width: 761px) and (max-width: 1080px)');
    var queued = false;
    function apply() {
      queued = false;
      var scale = on.matches ? 1 : (tab.matches ? 0.45 : 0);
      var vh = window.innerHeight;
      els.forEach(function (el) {
        if (!scale) { el.style.transform = ''; return; }
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var mid = r.top + r.height / 2;
        var off = ((vh / 2 - mid) / vh) * parseFloat(el.getAttribute('data-ev-par') || 14) * scale;
        el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
      });
    }
    function onScroll() { if (!queued) { queued = true; requestAnimationFrame(apply); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    apply();
  }

  /* ---------- mobile sticky CTA ---------- */
  function bar() {
    var el = document.querySelector('.ev-bar');
    if (!el) return;
    var x = el.querySelector('.ev-bar-x');
    if (x) {
      x.addEventListener('click', function () {
        el.classList.add('is-hidden');
        try { sessionStorage.setItem('evBarClosed', '1'); } catch (e) {}
      });
    }
    try { if (sessionStorage.getItem('evBarClosed') === '1') el.classList.add('is-hidden'); } catch (e) {}
  }

  /* ---------- FAQ disclosure state for screen readers ----------
     site.js owns the open/close class; we only mirror it into ARIA. */
  function faqAria() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.ev-faq .faq-item'));
    items.forEach(function (item, i) {
      var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
      if (!q || !a) return;
      if (!a.id) a.id = 'ev-faq-a-' + (i + 1);
      q.setAttribute('aria-controls', a.id);
      q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
      a.setAttribute('role', 'region');
      a.setAttribute('aria-labelledby', q.id || (q.id = 'ev-faq-q-' + (i + 1)));
      q.addEventListener('click', function () {
        requestAnimationFrame(function () {
          q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
        });
      });
    });
  }

  function init() { fillVars(); scrollFx(); counters(); flow(); parallax(); bar(); faqAria(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
