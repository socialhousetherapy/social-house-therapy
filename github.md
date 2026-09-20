# GitHub
repo: socialhousetherapy/social-house-therapy
branch: main

## Last sync
date: 2026-09-20T19:47:53Z
commit: PENDING (from 361c686e)
### Updated in this project
- All nine pages changed: index, about, evaluations, speech-therapy-tempe, speech-therapy-scottsdale, faq, contact, privacy, 404. Take all nine from main as they stand now. Meta descriptions only; no layout, copy, or schema structure changed
- New descriptions written by the owner, replacing the previous ones. They move from feature lists to the practice voice. All nine land between 114 and 147 characters, inside what Google displays
- Where each page also carried the same text in og:description, twitter:description, or a JSON-LD "description", those copies were updated with it: index 3 slots, evaluations 3, faq 3, contact 3, privacy 3, tempe 2, about 1, scottsdale 1
- og:description and twitter:description on about, tempe, and scottsdale were already written differently on purpose and were left alone. The same is true of the JSON-LD entity descriptions on index, about, tempe, and evaluations: those describe the business or the service, not the search snippet, so they keep their own wording
- 404.html had no meta description at all and now has one. Note it carries meta robots noindex, so this text cannot appear in search results. It was added because the owner asked for it; it is cosmetic
- The owner's 404 text used an em dash ("Oops, this page wandered off"). CLAUDE.md forbids em dashes anywhere, so it was written with a comma instead. Flagged to the owner
- Curly punctuation is intentional and verified as UTF-8 in the files: left and right double quotation marks on evaluations, and right single quotation marks on faq, contact, and 404. Straight double quotes were not used, since they would end the HTML attribute early
- Note on the home page: the meta description now says Arizona and the East Valley rather than naming Tempe and Scottsdale, matching the new title. The JSON-LD business description on that page still names Tempe and Scottsdale, so the city signal is not lost
- JSON-LD on all nine pages re-parsed clean after the edit

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
- 2026-09-20T19:47:53Z: pushed PENDING (from 361c686e) directly from Claude Code: new meta descriptions on all nine pages in the practice voice, with og:description, twitter:description, and mirrored JSON-LD description fields kept in sync, plus a first meta description on 404.html (9 files); nothing deleted
- 2026-09-20T19:33:43Z: pushed cef118c4 (from 566cef7e) directly from Claude Code: page titles shortened to fit Google's display length on index, about, and faq, and a new contact title, with og:title, twitter:title, and the contact WebPage schema name kept in sync (4 files); nothing deleted
- 2026-09-20T19:15:07Z: pushed 57f6674e (from 8274308f) directly from Claude Code: netlify.toml added, a build ignore command so pushes that touch only .md files stop consuming Netlify deploy credits (1 file). Earlier the same day 8274308f added the /pages/* splat redirect to _redirects (1 file), pushed without a notice; this entry covers both. Nothing deleted
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
