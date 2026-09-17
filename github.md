# GitHub
repo: socialhousetherapy/social-house-therapy
branch: main

## Last sync
date: 2026-09-17T17:23:17Z
commit: 4a9dfc9f (from b0a8de1f)
### Updated in this project
- Nothing yet: pushed directly from Claude Code. Design project notice: one file changed in this push, about.html. Take it from main as it stands now; it also carries the static footer from e360b545
- about.html schema: added a compact business node (MedicalBusiness, @id https://socialhousetherapy.com/#org) to the graph, between the Person and the BreadcrumbList. Name, url, logo, telephone, email, sameAs (4 URLs), hasMap, areaServed, address, and geo are copied from the home page node so they match exactly; founder points at the Madison Person node on the same page (about#madison)
- Why: the Madison node says worksFor #org and the page says isPartOf #org, but no #org node existed on this page. Google reads each page by itself, so both pointers led nowhere. They now resolve on the page, which ties Madison's credentials to the practice
- Decision recorded: faq.html and privacy.html stay without a business node on purpose. Google needs it once (home page); extra copies add upkeep and no benefit
- Rule: if the business details change (phone, profile links, areas served), update the #org node on index, about, contact, evaluations, speech-therapy-tempe, and speech-therapy-scottsdale together
- Still to bring in from the earlier push the same day, e360b545 (from 48ef0994, 2026-09-17T17:15:30Z), 10 files, or the next bundle will undo this work: all 9 pages (404, about, contact, evaluations, faq, index, privacy, speech-therapy-scottsdale, speech-therapy-tempe) and CLAUDE.md. scripts/site.js is unchanged (still v=47). What that push changed:
- Business schema (the #org node) on index, contact, evaluations, speech-therapy-tempe, and speech-therapy-scottsdale now carries the same sameAs list of 4 URLs (Instagram, Facebook, TikTok, Google Business Profile) plus hasMap. The permanent Google Business Profile URL is https://www.google.com/maps?cid=12574984060774163496 (Google entity id /g/11xv33bc3d). Do not use share.google short links in schema: they redirect to a search page with tracking codes
- speech-therapy-scottsdale.html: the #org node said its url was /speech-therapy-scottsdale while every other page said the home page. One @id must carry one url, so it is now https://socialhousetherapy.com/. Founder jobTitle now matches the other pages (Speech-Language Pathologist, MS, CCC-SLP); logo and email added. This closes the earlier follow-up about sameAs on Scottsdale. about.html had no business node at the time of this push; it got one in the later push, 4a9dfc9f (see above)
- index.html pricing section: the In-home visit card sub line now reads "We come to you in Tempe and Scottsdale", with each city name linked to its location page. Two new rules follow .sz-price-card .sub in the inline styles (links inherit the grey text color, thin underline, clay on hover). Checked at 1280 and 375 wide: one line, no overflow
- Static footer: every page now ships a static copy of the footer inside #site-footer, generated from the buildFooter template in scripts/site.js (identical markup; verified against the script-built footer). site.js still replaces it on load, so visitors see no change. The static copy shows 2026; site.js shows the current year
- Why: crawlers that do not run scripts (Bing, most AI crawlers) saw home page links to /about, /evaluations, and /contact only, and could reach the Tempe and Scottsdale pages only through the sitemap and /evaluations. Backlinks will mostly land on the home page, so plain links from it pass that value on to the location pages
- Rule for the footer: when the footer template in site.js changes, update the static copy on every page. New pages copy the block from an existing page. Both rules are now in CLAUDE.md, along with a rule that every push carries a notice like this one
- Still to bring in from the previous direct push, 30b4fb78 (from d9087baf, 2026-09-16T23:15:57Z), 18 files: all 9 pages, scripts/site.js, and the 8 files in assets/fonts/. Take the pages from main as it stands now, so they carry both pushes
- Fonts are self-hosted: the exact woff2 files Google serves for Bricolage Grotesque, DM Sans (upright and italic), and Caveat now live in assets/fonts/ (latin and latin-ext subsets). Every page preloads the three latin files and declares the @font-face rules inline in the head, replacing the Google preconnect and stylesheet links. Same bytes, so rendering is unchanged; text metrics verified identical against the previous version on Home, About, Tempe, and FAQ
- Cactus art on the final CTA (index, about, faq, tempe, scottsdale) is applied by site.js after load (class bg-ready; the sections carry data-bg-defer) so the 76 KB image no longer shares bandwidth with the hero photo and fonts. site.js cache version bumped to v=47 on every page
- Why: PageSpeed mobile sat at 76-77 with TBT 0 and CLS 0; the whole remaining gap was the Google Fonts chain (two extra origins plus a stylesheet round trip) counted before first paint (FCP 3.5 s, LCP 4.1 s)
- Rule for new pages: copy the font preload lines and @font-face block from an existing page head; do not link fonts.googleapis.com. Internal links stay root paths without .html (href="/about")
- Earlier direct pushes still to bring into the design project: clean URLs (05acd7d7, 14 files: all pages, 404.html, site.js, evaluations.js, sp-widget.js, sitemap.xml, _redirects), pricing link /#pricing (9cb3e7a3, 6 files), mobile speed fix (08fc380a: sp-widget.js, index.html, assets/madison-jeffery-720.webp)

## Screen map
| Project screen | Repo files |
|---|---|
| index.html | index.html, styles/home.css, scripts/site.js, scripts/sp-widget.js |
| about.html | about.html |
| evaluations.html | evaluations.html, styles/evaluations.css, styles/service-sources.css, scripts/evaluations.js |
| speech-therapy-tempe.html | speech-therapy-tempe.html |
| speech-therapy-scottsdale.html | speech-therapy-scottsdale.html |
| faq.html | faq.html |
| contact.html | contact.html |
| privacy.html | privacy.html |
| 404.html | 404.html |
| (no screen) | _redirects |
| (no screen) | assets/fonts/ (8 woff2 files, referenced from every page head) |
| partner-with-us.html (held) | not on main; local page + styles/partner.css + scripts/partner.js |
| (drafts, not in repo) | aac-support, speech-sound-disorders, early-communication-late-talkers, language-thinking-executive-function, autism-social-communication, stuttering-fluency |

## Sync history
- 2026-09-17T17:23:17Z: pushed 4a9dfc9f (from b0a8de1f) directly from Claude Code: compact business node (#org) added to the about.html schema so worksFor and isPartOf resolve on the page; details copied from the home page node (1 file); nothing deleted
- 2026-09-17T17:15:30Z: pushed e360b545 (from 48ef0994) directly from Claude Code: Google Business Profile URL in the business schema (sameAs plus hasMap) on index, contact, evaluations, tempe, and scottsdale; Scottsdale #org url corrected to the home page; home pricing card links to the Tempe and Scottsdale pages; static footer copy inside #site-footer on all 9 pages; CLAUDE.md rules for design project notices and the static footer (10 files); nothing deleted
- 2026-09-16T23:15:57Z: pushed 30b4fb78 (from d9087baf) directly from Claude Code: self-hosted fonts on all 9 pages plus 8 woff2 files in assets/fonts/, cactus art deferred via site.js v=47 (18 files); nothing deleted
- 2026-09-16: pushed 08fc380a (from 967a5043) directly from Claude Code: mobile speed fixes from the PageSpeed review (mobile 55). scripts/sp-widget.js: the load-on-scroll trigger now ignores scrolls inside elements, because the reviews carousel scrolls itself on phones and was loading SimplePractice, Stripe, reCAPTCHA, and tag scripts (about 3 MB) with no visitor input. index.html: Meet Madison portrait srcset gains a 720w step (new assets/madison-jeffery-720.webp, 74 KB) so phones stop downloading the 175 KB 1000w file (3 files)
- 2026-09-16: pushed 9cb3e7a3 (from 3c43eb41) directly from Claude Code: pricing link is now /#pricing instead of /#pricing-anchor (header menu, mobile menu, evaluations page and script, FAQ). In index.html the pricing section id is now pricing-section and the scroll target span is id="pricing"; a second pricing-anchor span is kept so old links land in the same place (6 files)
- 2026-09-16T21:33:36Z: pushed 05acd7d7 (from 9a50ab73) directly from Claude Code: clean URLs across 8 pages, 404.html, site.js, evaluations.js, sp-widget.js, sitemap.xml, and _redirects (14 files); nothing deleted
- 2026-09-16T21:16:12Z: pushed 9a50ab73 (from 2443c950) via design_handoff_home_speed_sept16/: home page speed pass, index.html, new styles/home.css, sp-widget.js (no idle preload), 4 new sized webp images (7 files; no github.md in bundle); PageSpeed after deploy: mobile 76, desktop 90+ (was mobile 55)
- 2026-09-16T21:02:21Z: pushed 2443c950 (from 5ddf46c7) via design_handoff_about_faq_sept16/: base mismatch, so the receipt was merged with the two entries below; about.html, faq.html, and about-review.md were already identical on main, so only ai-visibility-checklist.md and github.md changed
- 2026-09-16T20:47:30Z: pushed 5ddf46c7 (from 1af419a9) directly from Claude Code: github.md notes only
- 2026-09-16T20:24:41Z: pushed 1af419a9 (from 3e757462) directly from Claude Code: added _redirects (301s for old Squarespace URLs /faqs, /home, /services). Same day the domain moved off Squarespace: socialhousetherapy.com now points at this Netlify project (DNS at GoDaddy, apex primary, www redirects to it, HTTPS on); Microsoft 365 email records carried over unchanged. Copy _redirects into the design project
- 2026-09-16T20:14:27Z: pushed 3e757462 (from ecab0fa8) via design_handoff_content_sept16/: evaluations and FAQ copy edits, Facebook URL on six pages, em dashes removed from code comments (17 files plus github.md); nothing deleted
- 2026-09-09T02:00:00Z: pushed ecab0fa8 (from 93da2d7b) via design_handoff_mobile_toc/: Tempe and Scottsdale phone layout, evaluations "On this page" strip rewrite (5 files plus github.md); nothing deleted
- 2026-09-08T22:05:00Z: pushed 93da2d7b (from 42ac7176) via design_handoff_live_match/: 9 pages, sitemap, site.js, evaluations.js, site.css, evaluations.css, clarity.css, CLAUDE.md, github.md, 8 review docs, 20 new photo assets; deleted partner-with-us.html, pediatric-feeding-oral-motor-review.md, understanding-using-language-review.md, scripts/service-article.js, 3 cactus-hero skylines, clarity-mother-child.webp, speech-evaluation-camera.webp, tempe-boy-phone-560.webp, 3 paint-* textures
- 2026-08-28T04:26:21Z: pulled main at 42ac7176 (66 commits / 74 files since deploy push); project made identical to repo for all live-site files; drafts kept unlinked; nothing pushed
- 2026-08-25: full-site deploy handoff prepared in design_handoff_full_site_deploy/ and pushed via Claude Code (removed blog/DDD/milestones + orphaned assets, added 404, icons, share cards)
- 2026-08-16T18:21:08Z: repo browsed read-only to plan full-site push; nothing imported
