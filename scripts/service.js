// Service page data + renderer
(function(){
  const SERVICES = {
    'language': {
      title: 'Language delays & disorders',
      tag: 'Receptive + expressive',
      ages: 'Toddlers through teens',
      lead: 'Whether your child is just finding their first words or navigating complex conversations, we support the full arc of language — with real-world practice built into every session.',
      color: 'sage',
      intro: "Language is how kids connect, share, and learn. When it's hard to understand others (receptive language) or to put thoughts into words (expressive language), frustration can build quickly. We work in the places your child actually communicates — during play, routines, transitions, and everyday moments — so new skills are easier to use outside of therapy.",
      whenHelp: [
        'Few or late first words for toddlers',
        'Difficulty following directions',
        'Short sentences or limited vocabulary compared to peers',
        'Trouble sharing a story or describing events',
        'Word-finding struggles or frequent "ums"',
        'Gestalt language processors (script users) who need natural-language support',
      ],
      approach: [
        { t: 'Child-led play', d: 'We start with what they love. Motivation is the shortest path to new language.' },
        { t: 'Natural routines', d: 'Snacks, bath time, getting dressed — daily moments become language-rich opportunities.' },
        { t: 'Parent coaching', d: 'Every session ends with a quick debrief so strategies come home with you.' },
        { t: 'Gestalt-affirming', d: 'For gestalt language processors, we follow the stages instead of forcing single words.' },
      ],
    },
    'speech': {
      title: 'Speech sounds',
      tag: 'Articulation + phonology',
      ages: 'Ages 3 and up',
      lead: "When a child's speech is hard to understand, it affects confidence, friendships, and school. We work on the sounds they need — without making therapy feel like drills.",
      color: 'clay',
      intro: "Speech sound difficulties come in different shapes: a child who can't make a particular sound (articulation), a child who follows patterns that simplify speech (phonology), or a child whose mouth and brain aren't yet coordinating sounds into words (motor planning). Each gets a different approach — matched to how your child learns best.",
      whenHelp: [
        "Family or friends often ask 'what did she say?'",
        'Specific sounds (r, l, s, th, k, g) are distorted past the typical age',
        'Multiple sounds are missing or swapped',
        'Speech sounds choppy or effortful',
        'Child is becoming frustrated or avoiding talking',
      ],
      approach: [
        { t: 'Play-based practice', d: 'Sounds show up in games, books, and scavenger hunts — not flashcards.' },
        { t: 'Clear targets', d: 'We pick two to three priority sounds at a time so progress is measurable.' },
        { t: 'Home carryover', d: 'Short, specific practice ideas for busy parents — five minutes a day, not twenty.' },
        { t: 'Confidence first', d: "Kids talk more when they feel safe. That's always our first win." },
      ],
    },
    'aac': {
      title: 'AAC support',
      tag: 'Augmentative &amp; alternative communication',
      ages: 'All ages',
      lead: 'Every child deserves a reliable way to say what they mean. AAC — from simple picture systems to speech-generating devices — can be that way.',
      color: 'sky',
      intro: "AAC (augmentative and alternative communication) includes everything from signs and picture cards to iPad-based speech apps and dedicated devices. Used well, AAC doesn't replace speech — it supports it. Research consistently shows AAC helps speech develop, and we model it alongside every child we work with, whether they use a few words or none yet.",
      whenHelp: [
        'Your child has lots to say but limited speech',
        'You are considering an AAC device or evaluation',
        'Your child has a device but isn\'t using it consistently',
        'School is recommending AAC and you have questions',
        'You want your child to grow into multi-word communication on their device',
      ],
      approach: [
        { t: 'Device trials', d: 'We match the system to the child — not the other way around.' },
        { t: 'Modeling first', d: 'Adults model AAC throughout sessions so it feels natural, not special.' },
        { t: 'Core vocabulary', d: 'We build from the small, powerful words kids use most: more, go, stop, want, help.' },
        { t: 'Team coordination', d: 'We partner with schools and ABA teams so the device works everywhere.' },
      ],
    },
    'feeding': {
      title: 'Pediatric feeding',
      tag: 'Sensory-informed feeding',
      ages: 'Toddlers through school-age',
      lead: 'Mealtimes can feel like the hardest hour of the day. We help families move from stress to connection — one safe, playful bite at a time.',
      color: 'sun',
      intro: 'Picky eating, sensory sensitivities, oral-motor challenges, and feeding aversions can all make mealtimes fraught. Our feeding work is responsive and sensory-informed: we never pressure kids to eat. Instead, we expand what feels safe, build oral-motor skills through play, and coach caregivers on strategies that actually fit your family.',
      whenHelp: [
        'Your child eats fewer than 20 foods',
        'Mealtimes regularly end in tears (yours or theirs)',
        'Your child gags, pockets food, or has trouble chewing',
        'You are worried about nutrition or growth',
        'Sensory sensitivities limit new foods',
      ],
      approach: [
        { t: 'No-pressure philosophy', d: 'Pressure backfires. Curiosity wins. We build safety around food first.' },
        { t: 'Food play', d: 'Touching, smelling, licking — every step toward tasting counts.' },
        { t: 'Oral-motor support', d: 'Strengthening the skills needed for chewing, managing textures, and swallowing safely.' },
        { t: 'Family coaching', d: 'Strategies for your actual table — not the clinic\'s.' },
      ],
    },
    'fluency': {
      title: 'Stuttering & fluency',
      tag: 'Confidence-first',
      ages: 'Ages 4 and up',
      lead: 'Our goal is a child who is proud of their voice — however it sounds. Fluency support, not fluency pressure.',
      color: 'clay',
      intro: "Stuttering is a difference in how speech flows, not a character flaw. Many kids go through periods of disfluency that resolve on their own; others benefit from support that reduces tension and builds confidence. We work on easier speech *and* on how your child feels about their speech — because confidence is what makes communication possible.",
      whenHelp: [
        'Repetitions, blocks, or prolongations that last more than six months',
        'Tension or physical struggle during stuttering',
        'Avoidance of talking, words, or situations',
        'Frustration or embarrassment around speech',
        'A family history of stuttering',
      ],
      approach: [
        { t: 'Desensitization', d: 'We talk openly about stuttering. Secrets make it harder, not easier.' },
        { t: 'Easier speech', d: 'Tools like easy onsets and smooth starts — used when they help, never as a cover-up.' },
        { t: 'Confidence building', d: 'Your child practices being a confident speaker in low-stakes settings first.' },
        { t: 'Parent coaching', d: 'How to respond, how to listen, and what to say (and not say) at home.' },
      ],
    },
    'cognitive': {
      title: 'Cognitive communication',
      tag: 'Executive function + social communication',
      ages: 'Teens through young adults',
      lead: 'Communication is more than words. We support the thinking skills that make conversations, school, and independence work.',
      color: 'sage',
      intro: "Cognitive communication covers the bigger-picture skills — attention, memory, organization, problem-solving, and social communication. For teens and young adults, these skills shape school success, friendships, and early independence. We use real goals (homework, texting, job interviews) to build real skills.",
      whenHelp: [
        'Difficulty organizing thoughts for school or conversation',
        'Trouble with working memory or following multi-step directions',
        'Socially confusing situations that keep coming up',
        'Reading comprehension that lags behind decoding',
        'Transition support for teens heading into college or work',
      ],
      approach: [
        { t: 'Real-life goals', d: 'We start with what matters to your teen — not a generic skill list.' },
        { t: 'Strategy coaching', d: 'Concrete tools for planning, self-monitoring, and problem-solving.' },
        { t: 'Social practice', d: 'Role-play, video review, and structured conversations — with debrief built in.' },
        { t: 'Self-advocacy', d: 'Teaching teens to explain their brain, ask for what they need, and own their voice.' },
      ],
    },
  };

  const COLOR = {
    sage: { bg: 'var(--sage-100)', fg: 'var(--sage-700)', accent: 'var(--sage-500)' },
    clay: { bg: 'var(--clay-100)', fg: 'var(--clay-600)', accent: 'var(--clay-400)' },
    sky:  { bg: 'var(--sky-100)',  fg: 'var(--sky-500)',  accent: 'var(--sky-500)' },
    sun:  { bg: 'var(--sun-100)',  fg: '#8a6610',         accent: 'var(--sun-500)' },
  };

  window.renderService = function(key){
    const s = SERVICES[key];
    if(!s) return;
    const c = COLOR[s.color] || COLOR.sage;
    document.title = `${s.title} — Social House Therapy`;
    const meta = document.querySelector('meta[name="description"]');
    if(meta) meta.setAttribute('content', `${s.title} in Tempe & Scottsdale, AZ. ${s.lead}`);

    const root = document.getElementById('svc-root');
    root.innerHTML = `
      <section class="page-hero">
        <div class="page-hero-inner reveal in">
          <div class="crumbs"><a href="index.html">Home</a><span class="sep">/</span><a href="services.html">Services</a><span class="sep">/</span><span>${s.title}</span></div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:4px;">
            <span style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:${c.bg};color:${c.fg};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;border-radius:999px;">${s.tag}</span>
            <span style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:var(--cream-100);color:var(--fg-2);font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;border-radius:999px;">${s.ages}</span>
          </div>
          <h1>${s.title}</h1>
          <p class="lead">${s.lead}</p>
          <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap;">
            <a class="btn btn-primary" href="contact.html">Book a free call</a>
            <a class="btn btn-ghost" href="services.html">All services →</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container" style="display:grid;grid-template-columns:1.2fr 1fr;gap:56px;align-items:start;" id="svcGrid">
          <div class="reveal">
            <span class="eyebrow-sage">What it looks like</span>
            <h2 style="font-family:var(--font-heading);font-size:clamp(26px,3vw,38px);font-weight:500;letter-spacing:-0.02em;line-height:1.15;color:var(--brand-ink);margin:14px 0 18px;">Therapy that fits into your child's world, not the other way around.</h2>
            <p style="font-size:17px;line-height:1.7;color:var(--fg-2);">${s.intro}</p>
          </div>
          <div class="reveal" style="background:var(--white);border:1px solid var(--border-subtle);border-radius:24px;padding:28px;">
            <div style="font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${c.fg};margin-bottom:12px;">When to reach out</div>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;">
              ${s.whenHelp.map(h => `
                <li style="display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--border-subtle);">
                  <span style="flex-shrink:0;width:22px;height:22px;border-radius:999px;background:${c.bg};color:${c.fg};display:grid;place-items:center;margin-top:2px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span style="font-size:15px;line-height:1.5;color:var(--fg-1);">${h}</span>
                </li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <section class="section section-cream">
        <div class="container">
          <div class="section-head reveal"><span class="eyebrow-sage">Our approach</span><h2>How we work.</h2></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;">
            ${s.approach.map((a, i) => `
              <div class="card reveal">
                <div style="font-family:var(--font-hand);font-size:32px;color:${c.accent};line-height:1;">${['one','two','three','four'][i]}</div>
                <h3 style="font-family:var(--font-heading);font-size:19px;font-weight:600;color:var(--brand-ink);margin:10px 0 8px;">${a.t}</h3>
                <p style="font-size:15px;color:var(--fg-2);margin:0;">${a.d}</p>
              </div>`).join('')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;background:var(--sage-800);color:var(--cream-50);border-radius:36px;padding:48px 48px;" id="svcQuote">
            <div>
              <div style="color:var(--sun-300);letter-spacing:2px;margin-bottom:14px;">★ ★ ★ ★ ★</div>
              <p style="font-family:var(--font-heading);font-size:22px;line-height:1.4;color:var(--cream-50);margin:0 0 18px;">Madison was so patient and always incorporated his interests. We noticed the improvement as a family.</p>
              <div style="color:rgba(251,248,241,0.72);font-size:14px;"><strong style="color:var(--cream-50);">Julie B.</strong> · Parent, Scottsdale</div>
            </div>
            <div>
              <div style="font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--sun-300);margin-bottom:12px;">Related services</div>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${Object.keys(SERVICES).filter(k => k !== key).slice(0, 3).map(k => `
                  <a href="service-${k}.html" style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:rgba(255,255,255,0.06);border:1px solid rgba(251,248,241,0.14);border-radius:14px;color:var(--cream-50);font-family:var(--font-heading);font-weight:500;">
                    ${SERVICES[k].title}
                    <span style="color:var(--sun-300);">→</span>
                  </a>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style="padding: 40px 32px 112px;">
        <div class="cta-banner reveal">
          <div>
            <h2>Let's talk about your child.</h2>
            <p>A free 15-minute call with Madison is the best place to start. No forms, no pressure — just a conversation.</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;">
              <a class="btn btn-soft" href="contact.html">Book a free call</a>
              <a class="btn btn-outline-light" href="faq.html">Read the FAQ →</a>
            </div>
          </div>
          <div style="position:relative;aspect-ratio:1;border-radius:28px;overflow:hidden;box-shadow:var(--shadow-md);max-width:320px;justify-self:end;"><img src="assets/madison-jeffery.jpg" alt="" style="width:100%;height:100%;object-fit:cover;"></div>
        </div>
      </section>
    `;

    // responsive grid
    const style = document.createElement('style');
    style.textContent = `@media (max-width: 900px){ #svcGrid, #svcQuote { grid-template-columns: 1fr !important; } }`;
    document.head.appendChild(style);
  };
})();
