// Shared site chrome: nav + footer + shared utilities
// Renders into elements with id="site-nav" and id="site-footer"
// Set window.__PAGE = 'home' | 'about' | 'services' | 'faq' | 'contact' on each page

(function(){
  const PAGE = (window.__PAGE || '').toLowerCase();
  const LINKS = [
    { label: 'About Us',     href: 'about.html',                key: 'about' },
    { label: 'Services',     href: 'services.html',             key: 'services' },
    { label: 'How It Works', href: 'index.html#how-it-works',   key: 'how' },
    { label: 'Resources',    href: 'faq.html',                  key: 'faq' },
    { label: 'Contact',      href: 'contact.html',              key: 'contact' },
  ];

  function buildNav(){
    const root = document.getElementById('site-nav');
    if(!root) return;
    root.innerHTML = `
      <header class="nav" id="navEl">
        <div class="nav-inner">
          <a class="nav-brand" href="index.html" aria-label="Social House Therapy">
            <img src="assets/logo-full.png" alt="Social House Therapy">
          </a>
          <nav class="nav-links" aria-label="Primary">
            ${LINKS.map(l => `<a href="${l.href}" class="${l.key===PAGE?'active':''}">${l.label}</a>`).join('')}
          </nav>
          <a class="nav-cta" href="contact.html">Get Started</a>
          <button class="nav-toggle" aria-label="Toggle menu" id="navToggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="7"  x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
          </button>
        </div>
      </header>`;
    const navEl = document.getElementById('navEl');
    const toggle = document.getElementById('navToggle');
    if(toggle) toggle.addEventListener('click', () => navEl.classList.toggle('nav-mobile-open'));
  }

  function buildFooter(){
    const root = document.getElementById('site-footer');
    if(!root) return;
    root.innerHTML = `
      <footer class="footer">
        <div class="footer-grid">
          <div>
            <div class="foot-brand">
              <img src="assets/favicon-48.png" alt="">
              Social House
            </div>
            <p class="tagline">Family-centered, child-led speech &amp; language therapy in Tempe and Scottsdale, Arizona — delivered where life happens.</p>
            <div class="hand-sign">talk soon —</div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="about.html">About Madison</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="faq.html">FAQs</a></li>
              <li><a href="contact.html">Book a free call</a></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="service-language.html">Language delays</a></li>
              <li><a href="service-speech.html">Speech sounds</a></li>
              <li><a href="service-aac.html">AAC support</a></li>
              <li><a href="service-feeding.html">Pediatric feeding</a></li>
              <li><a href="service-fluency.html">Stuttering &amp; fluency</a></li>
              <li><a href="service-cognitive.html">Cognitive communication</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li>Tempe &amp; Scottsdale, AZ</li>
              <li>In-home &amp; on-site</li>
              <li>Telehealth statewide</li>
              <li><a href="tel:4804904812">480-490-4812</a></li>
              <li><a href="mailto:hello@socialhousetherapy.com">hello@socialhousetherapy.com</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-base">
          <div>© ${new Date().getFullYear()} Social House Therapy · Madison Jeffery, CCC-SLP</div>
          <div>Neurodiversity-affirming · Family-centered</div>
        </div>
      </footer>`;
  }

  // Reveal on scroll
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

  // FAQ behavior (works on any page with .faq-item)
  function wireFaq(){
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if(!q || !a) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.toggle('open');
        if(isOpen){ a.style.maxHeight = a.scrollHeight + 'px'; }
        else      { a.style.maxHeight = '0px'; }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    wireReveal();
    wireFaq();
  });
})();
