# Home page (index.html): accuracy review (August 2026)

Reviewed against ASHA guidance, NIDCD/NCHS statistics, and primary research. Claim-by-claim verdicts; page updated same day. Same standard as `aac-review.md`.

## Fixed (data errors)

### 1. "1 in 15 U.S. children ages 3-17 currently has a reported speech or language disorder"
**Wrong number, wrong source.** The linked NIDCD page states: "Approximately 1 in 14 (7.2%) U.S. children ages 3-17 has had a disorder related to voice, speech, or language in the past 12 months." No figure of 1 in 15 appears in either cited survey.

Also fixed: "currently has" overstates it. The survey question is past-12-months, not point prevalence. Page now says "had a voice, speech, or language disorder in the past 12 months."

Note for Madison: you may have seen **1 in 12 (7.7%)** elsewhere (WPS, older ASHA materials). That is the 2015 NCHS figure, which *included swallowing disorders*. NIDCD's current page reports voice/speech/language only, hence 7.2%. Both trace to the same source (Black, Vahratian & Hoffman, NCHS Data Brief 205). We use the current NIDCD number because that is the page we link to, and a reader who clicks should find our number there.

### 2. "1 in 11 children ages 2-8 currently has a reported language disorder"
**Not supported by anything.** No such statistic exists in NSCH or NHIS. The closest real figures on the NIDCD page are:
- 3.3% of children 3-17 have a *language* disorder specifically
- 8.9% (nearly 1 in 11) of *Black* children 3-17 have a voice, speech, or language disorder

The "1 in 11" appears to have been lifted from the second and re-labeled as a general-population language-disorder rate. That is a real misstatement and it was the single worst claim on the page.

**Replaced with:** "10.8% of children ages 3 to 6 had one, the highest rate of any age group" (NIDCD, verbatim figure). This is both accurate and a stronger argument for a pediatric practice, since it says the problem peaks exactly in the years we serve.

### 3. "51.2% of children with communication disorders did not see a specialist for evaluation or treatment in the past year"
**Wrong, and backwards from the source.** NIDCD: "More than half (59.7%) of U.S. children ages 3-17 with a voice, speech, or language disorder received intervention services in the past year." The true non-service figure is therefore **40.3%**, not 51.2. The claim as written inflated the gap by roughly 11 percentage points and would have failed any fact-check.

Also: "did not see a specialist for evaluation or treatment" is not what the survey measured. It measured **receipt of intervention services**. Page now uses that wording.

### 4. Source line
Cited "National Survey of Children's Health, 2021-2023" and "National Health Interview Survey, 2022." Neither supports any of the three numbers, and the NSCH link went to a Census landing page with no relevant data. Now a single honest citation to the NIDCD Quick Statistics page, naming NHIS as the underlying survey, with no invented data years.

Added, in the practice's voice: "These numbers describe populations, not any one child. If something feels off at home, that is reason enough to ask." Consistent with the no-upsell stance on the AAC and evaluations pages.

## Fixed (quotation integrity)

Three testimonial pull quotes did not match the review body printed beside them on the same page. A reader comparing the two would see the practice quoting the same parent two different ways.

| Where | Was | Now |
|---|---|---|
| Hero card, Natasha S. | "Day by day, I've seen him become more expressive..." | "Day by day he has become more expressive..." (matches the review body verbatim) |
| Hero card, Sabrina M. | ...looked forward to his sessions. | ...looked forward to his sessions! (matches rail punctuation) |
| Portrait card, Cynthia L. | "Madison is so patient and kind and really knows how to connect." | "She is so patient and kind and really knows how to connect with her students." (verbatim) |

**Open action for Madison.** Several pull quotes are sentences that do not appear anywhere in the review text shown on the card, e.g. Natasha's "She didn't just help him find his voice..." and Cynthia's "She teaches her students how to be confident with their language...". These are presumably from the full Google reviews with the card body truncated, which is fine. Please confirm each pull quote is verbatim from the original review. Testimonials are covered by FTC endorsement rules, and a paraphrase inside quotation marks is the kind of thing that gets flagged. If any cannot be matched to an original, drop the quotation marks or drop the quote.

## Changed (evidence caution)

**"Gestalt language development"** in the Autism & Social Communication card is the page's weakest evidence claim. Bryant, Bowen et al. (2024), *Current Developmental Disorders Reports* 12(1):1-14, a systematic review indexed in ASHA's own Evidence Maps, found **no full-text intervention study** evaluating the effectiveness of GLP/NLA-based interventions. A 2025 response in *Perspectives of the ASHA Special Interest Groups* (Lingo Lab, MSU) raises five concerns about GLP/NLA, including that it is contradicted by existing research and presumes incompetence.

What the critics and proponents *agree* on: honoring echolalia, and a child-led, play-based approach. Both are well supported and both are what we actually do.

**Changed to:** "Play, connection, interaction, echolalia and gestalt language, and authentic communication." This keeps the term parents search for while anchoring it to echolalia, which is a documented, uncontested phenomenon rather than a contested protocol. Revert if you disagree, but the page should not read as an endorsement of NLA as an evidence-based method, because it currently is not one.

## Verified and kept

1. **"Child-led, play-based"** throughout. Supported across the intervention literature and endorsed even by critics of specific protocols. Kept.
2. **"Every family starts with an evaluation."** Consistent with ASHA's Code of Ethics and Practice Portal: assessment precedes and drives treatment. Kept.
3. **Speech Sound Disorders card**: "sound errors or motor-planning and coordination challenges." Accurate two-part framing (articulation/phonological vs. motor speech, i.e. CAS and dysarthria). Kept.
4. **Stuttering card**: "Building confidence and ease with less pressure around speaking." Correctly avoids any fluency-cure implication. Consistent with ASHA's Practice Portal on fluency and with the affirming-care literature. Kept.
5. **Pediatric Feeding & Oral-Motor card**: oral-motor is named inside a *feeding* context (chewing, drinking, textures), where oral-motor skill work is legitimate practice. Kept. Flag for the feeding page, not this one: non-speech oral motor exercises are **not** supported for improving speech sound production, so no page should imply oral-motor work improves articulation.
6. **Early Communication card**: "Fewer words, gestures, sounds, or communication attempts than expected for their age." Accurate description of the late-talker profile, and correctly describes observations rather than promising a diagnosis. Kept.
7. **AAC card**: consistent with the reviewed AAC page. Kept.
8. **Credentials**: CCC-SLP and ArSHA membership, displayed as membership/certification only, no superiority claims. Kept.
9. **No aggregate star-rating claim** is displayed anywhere on the page. Good; an unverifiable "4.9 from 37 reviews" badge would be a liability. The CSS for one still exists but is unused.

## Em dashes
Eight found and removed: hero image alt text, both credential logo alt texts, and five code comments. Page is now clean.

**Outside this page:** `scripts/service.js` contains roughly 30 em dashes. It does not appear to be loaded by any current page (the service pages are standalone HTML now), so it may be dead code. Worth deleting or cleaning separately.

## Update (August 2026, second pass)
The same three corrected NIDCD figures now run on all three pages that show the stat strip. Both location pages (speech-therapy-tempe.html, speech-therapy-scottsdale.html) previously still carried the debunked set (1 in 15; the invented 1 in 11 ages 2-8; the inflated 51.2%) with the unsupported NSCH source line; all replaced with 1 in 14 / 10.8% / 40.3% and the single NIDCD citation. The homepage strip was restructured to tell the story the location pages tell: three step labels ("It starts common." / "It peaks early." / "Too many wait.") and the same closing line, "We hope to change that."

## Update (August 2026, third pass)
Reader-flagged: "in the past year" / "that year" implied current-year data. The NIDCD figures trace to the NHIS 2012 communication-disorders supplement (Black, Vahratian & Hoffman 2015), which NIDCD still presents as its current statistics; no newer national survey of these disorders exists. All three pages now say "within a single year" / "in that same year," and the source line names the 2012 NHIS supplement as the most recent national survey.

## Update (August 2026, fourth pass)
Madison asked whether anything newer than 2012 exists. Verified: the NSCH (annual) asks parents whether a provider or educator ever identified a speech or other language disorder and whether the child currently has it. NSCH 2021-2022 nationwide: **6.3% of children 3-17 currently have one (95% CI 6.0-6.6), about 1 in 16** (childhealthdata.org query, K2Q37A/B). This is a narrower, diagnosed-condition measure; the 2012 NHIS supplement remains the only symptom-based national survey, which is why NIDCD still presents it. All three stat strips now lead with the fresh NSCH 1-in-16 figure (labeled 2021-2022), keep the 10.8% age-peak and 40.3% no-services findings labeled as "the most detailed national study," and cite both sources. Note the two headline measures are not comparable to each other (6.3% diagnosed-current vs 7.2% symptom-based past-year); the page never presents them side by side as the same thing.
- NSCH 2021-2022 query: https://www.childhealthdata.org/browse/survey/results?q=10474&r=1

## Source URLs
- NIDCD Quick Statistics (all three homepage figures): https://www.nidcd.nih.gov/health/statistics/quick-statistics-voice-speech-language
- Black, Vahratian & Hoffman (2015), NCHS Data Brief 205 (underlying NHIS analysis): https://www.cdc.gov/nchs/products/databriefs/db205.htm
- Bryant, Bowen et al. (2024), GLP/NLA systematic review, via ASHA Evidence Maps: https://apps.asha.org/EvidenceMaps/Articles/ArticleSummary/f9ec13fc-a1b9-ef11-8155-005056834e2b
- Response to Blanc et al. (2025), Perspectives ASHA SIGs: https://pubs.asha.org/doi/10.1044/2025_PERSP-25-00055
- Blanc et al. (2023), original NLA viewpoint: https://pubs.asha.org/doi/10.1044/2023_PERSP-23-00098

## Redundancy pass (2026-08-25, owner direction)
Wording changes only; no statistics or prevalence claims touched.

**New copy that states a clinical process (Clarity section, closing paragraph), owner-authored.** "An evaluation gives us the clarity to know what your child needs next. If there is a clear delay, we can begin therapy right away. If skills are only mildly behind, we may give you specific strategies to use at home and a plan to check back on their progress."
- The two named paths (direct intervention for a clear delay; caregiver-implemented strategies with a scheduled check-in for mild findings) match the recommendation set already documented on evaluations.html §5.
- Severity-graded recommendations are standard ASHA practice; the page makes no claim about outcomes or timelines, so no citation is required.
- Deliberately avoids "wait and see." Owner direction: the practice does not advertise a wait-and-see approach, because families arrive having already been told to wait. Where mild or borderline findings make a period of home strategies reasonable, that is framed as coached strategies with a scheduled check-in, not as waiting. Private pay also means direct services remain available for mild or borderline delays. Do not reintroduce wait-and-see phrasing anywhere on the site.

**Madison's home-page block is now an excerpt of about.html,** not separate copy. First paragraph lifted verbatim from her About bio (paragraph 1); second condensed from About paragraphs 2 and 3. The previous outcome list ("speech that friends can understand, gestures turning into words, AAC used independently, teachers noticing new participation") was removed: it was unsourced outcome claims and duplicated the notice strip and services grid. Specialty areas are listed late-talkers-first with autism last, per owner note that a family chose the practice specifically because it was not presented as autism-focused.

**Repetition removed.** "Child-led" cut from the hero lead (kept in Approach, the section about how therapy works). "No pressure" reduced from four appearances to two: the Approach headline keeps it, its echo sentence was replaced, and the finale now states the concrete version (free call, no obligation after an evaluation) already used on evaluations.html. "Real life" reduced to the finale only: the services headline is now "What Families Come to Us For" and Approach card 3 is "Coaching for Parents, Not Just Kids". Approach card 1 retitled so it no longer paraphrases the paragraph beside it. Pricing step 1 no longer repeats the hero's "understand the next step" promise. CTA blocks in Clarity and Approach removed (hero, Madison, services, pricing step 1, and finale remain).
