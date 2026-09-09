/* Evaluations article: editable content variables + lightweight interactions.
   Everything here is progressive enhancement. The page reads fully without it. */
(function () {
  'use strict';

  /* ---------- EDITABLE CONTENT VARIABLES ----------
     Update these in one place; the page fills itself in on load. */
  var EV = window.EV_CONFIG = {
    bookingUrl: 'contact.html',            // "Schedule an Evaluation"
    consultUrl: 'contact.html',            // "Talk With an SLP First" / free consultation
    pricingUrl: 'index.html#pricing-anchor',      // Services and pricing
    reportTurnaround: '',                  // e.g. "7 to 10 business days" (leave empty to omit)
    lastReviewed: 'September 2026',           // article "last updated" field
    readingTime: '19 min read'
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
        a.addEventListener('click', function () { closeList(); });
      });
      /* The bar stays in view while you read; a thumb-drag upward on the bar
         itself slides it off, tracking the finger like the site menu. Drags are
         wired to the summary strip only, so tapping links never dismisses it. */
      /* Drags are wired to the WHOLE bar (strip + open list), not just the
         summary; taps on links still work because clicks are only swallowed
         after an actual drag. */
      var strip = mob;
      var sum = mob.querySelector('summary');
      var list = mob.querySelector('ol');
      var tocEase = 'cubic-bezier(0.32,0.72,0.24,1)';
      var sv = sum && sum.querySelector('svg');
      var foldTimer = null, listClosing = false;
      /* Smooth open/close: <details> pops instantly by default, so the list
         height and opacity are animated by hand. Interruptible: a tap mid-
         animation cancels the pending cleanup and animates from the current
         height to the new target, so rapid taps always respond. */
      function openList() {
        clearTimeout(foldTimer); foldTimer = null; listClosing = false;
        var fresh = !mob.open;
        mob.open = true;
        document.body.classList.add('toc-open');
        if (sv) sv.style.transform = '';           /* [open] CSS turns the chevron */
        if (!list) return;
        var cur = fresh ? 0 : list.getBoundingClientRect().height;
        var full = list.scrollHeight;
        list.style.transition = 'none';
        list.style.overflow = 'hidden';
        list.style.height = cur + 'px';
        if (fresh) list.style.opacity = '0';
        void list.offsetHeight;
        list.style.transition = 'height 420ms ' + tocEase + ', opacity 420ms ' + tocEase;
        list.style.height = full + 'px'; list.style.opacity = '1';
        foldTimer = setTimeout(function () { list.style.cssText = ''; foldTimer = null; }, 440);
      }
      function closeList() {
        if (!mob.open || listClosing) return;
        clearTimeout(foldTimer); foldTimer = null; listClosing = true;
        document.body.classList.remove('toc-open');
        if (!list) { mob.open = false; listClosing = false; return; }
        if (sv) sv.style.transform = 'none';       /* chevron turns back right away */
        var cur = list.getBoundingClientRect().height;
        list.style.transition = 'none';
        list.style.overflow = 'hidden';
        list.style.height = cur + 'px';
        void list.offsetHeight;
        list.style.transition = 'height 420ms ' + tocEase + ', opacity 420ms ' + tocEase;
        list.style.height = '0px'; list.style.opacity = '0';
        foldTimer = setTimeout(function () {
          mob.open = false; list.style.cssText = '';
          if (sv) sv.style.transform = '';
          foldTimer = null; listClosing = false;
        }, 430);
      }
      /* Listen on the whole bar: with mouse pointer capture active (see below) the
         browser dispatches the click to the capturing element, not the summary,
         so a summary-only listener never fires and the bar would not open. */
      strip.addEventListener('click', function (e) {
        if (!e.target.closest || !e.target.closest('summary')) return;
        e.preventDefault();                    /* we animate instead of the instant toggle */
        if (tocSuppress) { tocSuppress = false; return; }
        if (!mob.open || listClosing) openList(); else closeList();
      });
      var tocStartY = null, tocDrag = 0, tocDragging = false, tocPid = null, tocSuppress = false, tocWasOpen = false, tocInList = false;
      function tocSet(px) {
        mob.style.transition = 'none';
        mob.style.transform = 'translateY(' + (-px) + 'px)';
        mob.style.opacity = String(Math.max(0.55, 1 - px / 900));   /* stays visible while dragging */
      }
      function tocReset(animate) {
        mob.style.transition = animate ? 'transform 560ms cubic-bezier(0.32,0.72,0.24,1), opacity 560ms cubic-bezier(0.32,0.72,0.24,1)' : 'none';
        mob.style.transform = '';
        mob.style.opacity = '';
        if (animate) setTimeout(function () { mob.style.transition = ''; }, 580);
        else mob.style.transition = '';
      }
      function tocDismiss() {
        void mob.offsetHeight;   /* commit the dragged position so the glide starts from it */
        mob.style.transition = 'transform 560ms cubic-bezier(0.32,0.72,0.24,1), opacity 560ms cubic-bezier(0.32,0.72,0.24,1)';
        mob.style.transform = 'translateY(-160%)';
        mob.style.opacity = '0';
        mob.open = false;
        document.body.classList.remove('toc-open');
        setTimeout(function () { mob.classList.add('toc-hide'); tocReset(false); }, 560);
      }
      /* Mouse drag (desktop): pointer capture */
      strip.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        tocStartY = e.clientY; tocDrag = 0; tocDragging = false; tocPid = e.pointerId; tocWasOpen = mob.open;
        try { strip.setPointerCapture(tocPid); } catch (err) {}
      });
      strip.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse' || tocStartY === null || e.pointerId !== tocPid) return;
        tocDrag = tocStartY - e.clientY;   /* positive = up */
        if (!tocDragging && Math.abs(tocDrag) > 6) tocDragging = true;
        if (tocDragging) tocSet(Math.max(0, tocDrag));
      });
      function tocPointerEnd(e) {
        if (e.pointerType !== 'mouse' || tocStartY === null || e.pointerId !== tocPid) return;
        tocSuppress = tocDragging;
        tocEnd(); tocPid = null;
      }
      strip.addEventListener('pointerup', tocPointerEnd);
      strip.addEventListener('pointercancel', tocPointerEnd);
      /* Finger drag (phones): plain touch events, the same pattern as the site
         menu, which is proven to track reliably on iOS. */
      strip.addEventListener('touchstart', function (e) {
        tocSuppress = false;
        tocStartY = e.touches[0].clientY; tocDrag = 0; tocDragging = false; tocWasOpen = mob.open;
        tocInList = !!(list && list.contains(e.target));
      }, { passive: true });
      strip.addEventListener('touchmove', function (e) {
        if (tocStartY === null) return;
        if (e.cancelable) e.preventDefault();      /* gesture is ours, not a scroll */
        var curY = e.touches[0].clientY;
        /* A long list scrolls internally first; the bar only starts sliding
           once the list has no more room in that direction. */
        if (tocInList && list) {
          var max = list.scrollHeight - list.clientHeight;
          var delta = tocStartY - curY;             /* finger up = positive */
          if (max > 2 && ((delta > 0 && list.scrollTop < max) || (delta < 0 && list.scrollTop > 0))) {
            list.scrollTop = Math.min(max, Math.max(0, list.scrollTop + delta));
            tocStartY = curY;                       /* hand-off point for the slide */
            return;
          }
        }
        tocDrag = tocStartY - curY;
        if (!tocDragging && Math.abs(tocDrag) > 4) tocDragging = true;
        if (tocDragging) tocSet(Math.max(0, tocDrag));
      }, { passive: false });
      strip.addEventListener('touchend', function () { tocSuppress = tocDragging; tocEnd(); }, { passive: true });
      strip.addEventListener('touchcancel', function () { tocSuppress = false; tocEnd(); }, { passive: true });
      /* A drag release fires a click; swallow it so it can't re-toggle the
         list (that toggle was the appear/disappear glitch). */
      strip.addEventListener('click', function (e) {
        if (tocSuppress) { e.preventDefault(); e.stopPropagation(); tocSuppress = false; }
      }, true);
      function tocEnd() {
        if (tocStartY === null) return;
        if (tocDragging && tocDrag > 150) {
          /* Open list: the drag folds the list closed and the bar glides back.
             Closed strip: the drag sends the whole bar off screen. */
          if (tocWasOpen) { closeList(); tocReset(true); }
          else tocDismiss();
        }
        else if (tocDragging) tocReset(true);
        tocStartY = null; tocDragging = false; tocDrag = 0; tocWasOpen = false;
      }
      /* FABs hide while the list is open, same as the site menu */
      mob.addEventListener('toggle', function () {
        document.body.classList.toggle('toc-open', mob.open);
      });
      /* Open list: tap below closes it; drags below slide the bar like the menu */
      document.addEventListener('touchstart', function (e) {
        if (!mob.open || mob.contains(e.target)) return;
        tocStartY = e.touches[0].clientY; tocDrag = 0; tocDragging = false; tocWasOpen = true;
      }, { passive: true });
      document.addEventListener('touchmove', function (e) {
        if (!mob.open || mob.contains(e.target) || tocStartY === null) return;
        if (e.cancelable) e.preventDefault();      /* page behind stays put */
        tocDrag = tocStartY - e.touches[0].clientY;
        if (!tocDragging && tocDrag > 4) tocDragging = true;
        if (tocDragging) tocSet(Math.max(0, tocDrag));
      }, { passive: false });
      document.addEventListener('touchend', function (e) {
        if (!mob.open || mob.contains(e.target) || tocStartY === null) return;
        if (!tocDragging) { closeList(); tocStartY = null; return; }  /* plain tap */
        tocEnd();
      }, { passive: true });
      document.addEventListener('click', function (e) {
        if (mob.open && !mob.contains(e.target)) closeList();
      });
      /* Scrolling up brings a dismissed bar back. */
      var tLastY = window.pageYOffset;
      window.addEventListener('scroll', function () {
        var y = window.pageYOffset;
        var dy = y - tLastY;
        if (Math.abs(dy) < 8) return;
        if (dy < 0) mob.classList.remove('toc-hide');
        tLastY = y;
      }, { passive: true });
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

  function init() { fillVars(); scrollFx(); flow(); parallax(); bar(); faqAria(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
