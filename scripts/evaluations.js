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

  /* ---------- scroll progress + TOC scroll spy + mobile "On this page" bar ----------
     One passive listener, one rAF per frame, and offsets measured only when the
     layout can actually have changed. Reading offsetTop on every scroll event
     forces a synchronous layout and is what makes long pages stutter on phones. */
  function scrollFx() {
    var bar = document.querySelector('.ev-progress i');
    var art = document.querySelector('.ev-article');
    var links = Array.prototype.slice.call(document.querySelectorAll('.ev-toc a, .ev-toc-mobile a'));
    var secs = Array.prototype.slice.call(document.querySelectorAll('.ev-sec[id]'));
    var mob = document.querySelector('.ev-toc-mobile');
    var nav = document.getElementById('navEl');
    var GAP = 12;   /* breathing room between the bar and the heading that lands under it */
    var jumpUntil = 0;   /* while a scripted jump is in flight the bar ignores scroll direction */

    /* What can sit on top of the viewport. The bar is display:none on desktop, so it measures 0 there. */
    function navFull() { return nav ? nav.offsetHeight : 0; }
    function navShown() { return !!nav && !nav.classList.contains('nav-hide'); }
    function barHeight() { return mob ? mob.offsetHeight : 0; }

    var toc = mob ? mobileToc() : null;

    /* TOC links scroll by script so a heading always lands just under the bar.
       A plain anchor jump only knows scroll-margin-top; it cannot know whether
       the nav will be showing once the scroll settles. site.js shows the nav on
       any upward scroll and hides it after 150px downward, so that outcome is
       predicted here from the direction and length of the jump. */
    function jumpTo(sec, instant, keepHash) {
      var y = window.pageYOffset;
      var base = sec.offsetTop - barHeight() - GAP;
      var nh = navFull();
      var up = base - (navShown() ? nh : 0) < y;
      var navAfter = up ? true : (navShown() && !(base - y >= 150 && base > nh + 150));
      var top = Math.max(0, Math.round(base - (navAfter ? nh : 0)));
      if (!sec.hasAttribute('tabindex')) sec.setAttribute('tabindex', '-1');
      try { sec.focus({ preventScroll: true }); } catch (e) {}
      var smooth = !(instant || reduce.matches || !('scrollBehavior' in document.documentElement.style));
      jumpUntil = Date.now() + (smooth ? 900 : 200);
      if (toc) toc.show();                         /* the bar rides along and names the section on arrival */
      if (smooth) window.scrollTo({ top: top, left: 0, behavior: 'smooth' }); else window.scrollTo(0, top);
      if (!keepHash) { try { history.pushState(null, '', '#' + sec.id); } catch (e) {} }
    }
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = (a.getAttribute('href') || '').replace(/^#/, '');
        var sec = id && document.getElementById(id);
        if (!sec) return;
        e.preventDefault();
        if (toc) toc.close();
        jumpTo(sec, false, false);
      });
    });
    /* Arriving with a hash, the browser lands the heading under the nav. Re-land
       it once layout has settled, unless the reader has already scrolled away. */
    if (location.hash) {
      window.addEventListener('load', function () {
        var sec = document.getElementById(location.hash.slice(1));
        if (!sec || !sec.classList.contains('ev-sec')) return;
        if (Math.abs(window.pageYOffset - (sec.offsetTop - 20)) > 160) return;
        jumpTo(sec, true, true);
      });
    }

    function mobileToc() {
      var sum = mob.querySelector('summary');
      var list = mob.querySelector('ol');
      var sv = sum && sum.querySelector('svg');
      var EASE = 'cubic-bezier(0.32,0.72,0.24,1)';
      var GLIDE = 'transform 560ms ' + EASE + ', opacity 560ms ' + EASE;
      var SLOP = 8;        /* finger travel before a touch counts as a drag rather than a tap */
      var DISMISS = 150;   /* travel that commits the gesture */
      var foldTimer = null, listClosing = false, suppress = false, g = null;
      /* The strip names the section being read. Number and title come from the
         section label and the TOC link, so there is one source of truth. */
      var now = sum && sum.querySelector('.ev-toc-now'), nowN = now && now.querySelector('.n'), nowT = now && now.querySelector('.t'), nowSr = sum && sum.querySelector('.ev-sr');
      var labels = {}, labelled;
      secs.forEach(function (s) {
        var a = null; links.some(function (l) { if (l.getAttribute('href') === '#' + s.id) { a = l; return true; } return false; });
        var n = s.querySelector('.ev-sec-num');
        labels[s.id] = { n: n ? n.textContent.trim() : '', t: a ? a.textContent.trim() : s.id };
      });
      function label(id) {
        if (!nowT || id === labelled) return;
        labelled = id;
        var l = id && labels[id];
        if (nowN) nowN.textContent = l ? l.n : '';
        nowT.textContent = l ? l.t : 'On this page';
        if (nowSr) nowSr.textContent = l ? 'On this page: ' : '';
        if (reduce.matches) return;
        now.classList.remove('is-swap'); void now.offsetWidth; now.classList.add('is-swap');
      }

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
        list.style.transition = 'height 420ms ' + EASE + ', opacity 420ms ' + EASE;
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
        list.style.transition = 'height 420ms ' + EASE + ', opacity 420ms ' + EASE;
        list.style.height = '0px'; list.style.opacity = '0';
        foldTimer = setTimeout(function () {
          mob.open = false; list.style.cssText = '';
          if (sv) sv.style.transform = '';
          foldTimer = null; listClosing = false;
        }, 430);
      }

      /* A tap on the strip toggles the list. The release at the end of a drag
         also fires a click; it is swallowed here in the capture phase so it can
         never re-toggle the list (that re-toggle was the appear/disappear glitch).
         No pointer capture is used anywhere, so a mouse click reaches the summary. */
      mob.addEventListener('click', function (e) {
        if (suppress) { e.preventDefault(); e.stopPropagation(); return; }
        if (!e.target.closest || !e.target.closest('summary')) return;
        e.preventDefault();                        /* animate instead of the instant toggle */
        if (!mob.open || listClosing) openList(); else closeList();
      }, true);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mob.open) { closeList(); if (sum) sum.focus(); }
      });
      mob.addEventListener('toggle', function () {   /* FABs hide while the list is open, same as the site menu */
        document.body.classList.toggle('toc-open', mob.open);
      });

      function slide(px) {
        mob.style.transition = 'none';
        mob.style.transform = 'translateY(' + (-px) + 'px)';
        mob.style.opacity = String(Math.max(0.55, 1 - px / 900));   /* stays legible while dragging */
      }
      function settle() {                          /* glide back to the resting spot */
        mob.style.transition = GLIDE;
        mob.style.transform = ''; mob.style.opacity = '';
        setTimeout(function () { mob.style.transition = ''; }, 580);
      }
      function dismiss() {                         /* glide off the top; scrolling up brings it back */
        void mob.offsetHeight;                     /* commit the dragged position so the glide starts from it */
        mob.style.transition = GLIDE;
        mob.style.transform = 'translateY(-160%)'; mob.style.opacity = '0';
        setTimeout(function () {
          mob.classList.add('toc-hide');           /* the class now holds the off-screen state */
          mob.style.transition = 'none'; mob.style.transform = ''; mob.style.opacity = '';
          void mob.offsetHeight; mob.style.transition = '';
        }, 560);
      }
      /* Stuck to the top of the viewport, as opposed to sitting in its own place
         in the article, where sliding it away would leave a hole in the text. */
      function stuck() {
        var top = parseFloat(getComputedStyle(mob).top) || 0;
        return mob.getBoundingClientRect().top <= top + 1;
      }

      /* One gesture model for finger and mouse. The bar either OWNS the movement
         (it slides and the page must not scroll) or PASSES it to the browser
         (the reader is scrolling the page or the list). The call is made once,
         after SLOP, from the direction of travel:
           list open ............................ own, any direction; a long pull up folds it
           closed, stuck, moving up ............. own: the dismiss gesture
           closed, not stuck or moving down ..... pass: the reader is scrolling the page
           started on a list with room to scroll  pass: native momentum scrolling */
      function begin(y, wasOpen, target, mouse) {
        var inList = !!(list && target && list.contains(target));
        g = { y0: y, drag: 0, mode: null, wasOpen: wasOpen, mouse: mouse, stuck: stuck(),
              scrollable: inList && mob.open && list.scrollHeight > list.clientHeight + 2 };
      }
      function move(y, ev) {
        if (!g) return;
        g.drag = g.y0 - y;                          /* finger up = positive */
        if (!g.mode) {
          if (Math.abs(g.drag) < (g.mouse ? 6 : SLOP)) return;
          var up = g.drag > 0;
          if (g.scrollable) {
            var room = up ? list.scrollTop < list.scrollHeight - list.clientHeight - 1 : list.scrollTop > 0;
            g.mode = room ? 'pass' : 'own';
          } else g.mode = (g.wasOpen || (g.stuck && up)) ? 'own' : 'pass';
          if (g.mode === 'own') { g.y0 = y; g.drag = 0; }   /* the bar starts moving from where the call was made, no jump */
        }
        if (g.mode !== 'own') return;
        if (ev) {
          if (ev.cancelable) ev.preventDefault();   /* the page stays put */
          else if (!g.wasOpen) { g.mode = 'pass'; settle(); return; }   /* the browser is already scrolling: it keeps the gesture */
        }
        slide(Math.max(0, g.drag));
      }
      function end() {
        if (!g) return;
        var gg = g; g = null;
        if (gg.mode !== 'own') return;
        suppress = true; setTimeout(function () { suppress = false; }, 0);   /* the click that follows a drag must not toggle */
        if (gg.drag > DISMISS) { if (gg.wasOpen) { closeList(); settle(); } else dismiss(); }
        else settle();
      }
      function cancel() {
        if (!g) return;
        var gg = g; g = null;
        if (gg.mode === 'own') settle();
      }

      /* Finger: touch events, the same pattern as the site menu, which is proven
         to track reliably on iOS. Undecided moves are not cancelled, so the
         browser can still turn them into a scroll when the call is "pass". */
      mob.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) { cancel(); return; }
        begin(e.touches[0].clientY, mob.open, e.target, false);
      }, { passive: true });
      mob.addEventListener('touchmove', function (e) { if (g && !g.mouse && !g.outside) move(e.touches[0].clientY, e); }, { passive: false });
      mob.addEventListener('touchend', function () { if (g && !g.mouse && !g.outside) end(); }, { passive: true });
      mob.addEventListener('touchcancel', function () { if (g && !g.mouse && !g.outside) cancel(); }, { passive: true });
      /* Mouse: pointer events tracked on the window for the length of the drag. */
      mob.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        begin(e.clientY, mob.open, e.target, true);
        window.addEventListener('pointermove', mouseMove);
        window.addEventListener('pointerup', mouseUp);
        window.addEventListener('pointercancel', mouseUp);
      });
      function mouseMove(e) { if (g && g.mouse) move(e.clientY, null); }
      function mouseUp() {
        window.removeEventListener('pointermove', mouseMove);
        window.removeEventListener('pointerup', mouseUp);
        window.removeEventListener('pointercancel', mouseUp);
        if (g && g.mouse) end();
      }

      /* Open list: a tap anywhere else closes it; a pull upward anywhere else
         slides the bar like the site menu and folds the list past DISMISS. */
      document.addEventListener('touchstart', function (e) {
        if (!mob.open || mob.contains(e.target) || e.touches.length !== 1) return;
        begin(e.touches[0].clientY, true, null, false); g.outside = true;
      }, { passive: true });
      document.addEventListener('touchmove', function (e) {
        if (!g || !g.outside) return;
        if (e.cancelable) e.preventDefault();      /* page behind stays put */
        move(e.touches[0].clientY, null);
      }, { passive: false });
      document.addEventListener('touchend', function () {
        if (!g || !g.outside) return;
        if (!g.mode) { g = null; closeList(); return; }   /* plain tap */
        end();
      }, { passive: true });
      document.addEventListener('touchcancel', function () { if (g && g.outside) cancel(); }, { passive: true });
      document.addEventListener('click', function (e) {
        if (mob.open && !mob.contains(e.target)) closeList();
      });

      /* The strip stays pinned at the top while you read: when the header
         retracts (150px of downward scroll, site.js) the strip simply rides up
         to the top edge via its sticky top. Scrolling with the list open closes
         the list. Scrolling up brings back a strip that was swiped away, in
         step with the header. A scripted jump is exempt, so the strip is still
         there to name the section you tapped. The rubber-band bounce at either
         end of the page is not a scroll direction. */
      function show() { mob.classList.remove('toc-hide'); }
      var lastY = window.pageYOffset;
      window.addEventListener('scroll', function () {
        var y = window.pageYOffset;
        if (y < 0 || y > document.documentElement.scrollHeight - window.innerHeight + 1) return;
        var dy = y - lastY;
        if (Math.abs(dy) < 8) return;
        lastY = y;
        if (Date.now() < jumpUntil) return;
        if (mob.open) closeList();
        if (dy < 0) show();
      }, { passive: true });

      return { close: closeList, show: show, label: label };
    }

    if ((!bar || !art) && !secs.length) return;

    var artTop = 0, artRange = 0, tops = [], spy = 130, active = null, queued = false;

    function measure() {
      if (art) { artTop = art.offsetTop; artRange = art.offsetHeight - window.innerHeight; }
      tops = secs.map(function (s) { return s.offsetTop; });
      /* The spy line sits just below where jumpTo lands a heading, so the section
         you tapped is the one that lights up. Never tighter than 130px. */
      spy = Math.max(130, navFull() + barHeight() + GAP + 8);
    }

    function frame() {
      queued = false;
      var y = window.pageYOffset;
      if (bar && art) {
        var p = artRange > 0 ? (y - artTop) / artRange : 0;
        bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, p)).toFixed(4) + ')';
      }
      if (secs.length && links.length) {
        var t = y + spy, cur = secs[0].id;
        for (var i = 0; i < tops.length; i++) { if (tops[i] <= t) cur = secs[i].id; }
        if (toc) toc.label(t < tops[0] ? null : cur);   /* above the first section the strip still says "On this page" */
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
    window.addEventListener('load', remeasure);
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
