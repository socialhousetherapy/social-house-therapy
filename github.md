# GitHub
repo: socialhousetherapy/social-house-therapy
branch: main

## Last sync
date: 2026-09-16T23:15:57Z
commit: 30b4fb78 (from d9087baf)
### Updated in this project
- Nothing yet: pushed directly from Claude Code. Bring these 18 files into the design project before the next bundle: all 9 pages, scripts/site.js, and the 8 files in assets/fonts/
- Fonts are self-hosted: the exact woff2 files Google serves for Bricolage Grotesque, DM Sans (upright and italic), and Caveat now live in assets/fonts/ (latin and latin-ext subsets). Every page preloads the three latin files and declares the @font-face rules inline in the head, replacing the Google preconnect and stylesheet links. Same bytes, so rendering is unchanged; text metrics verified identical against the previous version on Home, About, Tempe, and FAQ
- Cactus art on the final CTA (index, about, faq, tempe, scottsdale) is applied by site.js after load (class bg-ready; the sections carry data-bg-defer) so the 76 KB image no longer shares bandwidth with the hero photo and fonts. site.js cache version bumped to v=47 on every page
- Why: PageSpeed mobile sat at 76-77 with TBT 0 and CLS 0; the whole remaining gap was the Google Fonts chain (two extra origins plus a stylesheet round trip) counted before first paint (FCP 3.5 s, LCP 4.1 s)
- Rule for new pages: copy the font preload lines and @font-face block from an existing page head; do not link fonts.googleapis.com. Internal links stay root paths without .html (href="/about")
- Earlier direct pushes still to bring into the design project: clean URLs (05acd7d7, 14 files: all pages, 404.html, site.js, evaluations.js, sp-widget.js, sitemap.xml, _redirects), pricing link /#pricing (9cb3e7a3, 6 files), mobile speed fix (08fc380a: sp-widget.js, index.html, assets/madison-jeffery-720.webp)
- Follow-up for a future bundle: add sameAs (Facebook) to the business schema nodes in about.html and speech-therapy-scottsdale.html

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
