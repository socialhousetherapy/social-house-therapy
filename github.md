# GitHub
repo: socialhousetherapy/social-house-therapy
branch: main

## Last sync
date: 2026-09-08T19:13:05Z
commit: 42ac7176
### Updated in this project
- Verified main is still at 42ac7176 (no upstream changes since the 2026-08-28 pull); nothing pulled, nothing pushed
- Byte-level diff of all 64 repo files against the project: 24 differ locally, 2 exist only in the repo, 38 identical
- Prepared design_handoff_live_match/ (Claude Code bundle) so main matches the project's live-site files; owner runs it
- Cache-bust bumped on every live page: styles/site.css?v=75, scripts/site.js?v=46

## Screen map
| Project screen | Repo files |
|---|---|
| index.html | index.html, styles/site.css, styles/tokens.css, styles/when-to-reach.css, styles/clarity.css, scripts/site.js, scripts/sp-widget.js |
| about.html | about.html |
| evaluations.html | evaluations.html, styles/evaluations.css, styles/service-sources.css, scripts/evaluations.js |
| speech-therapy-tempe.html | speech-therapy-tempe.html |
| speech-therapy-scottsdale.html | speech-therapy-scottsdale.html |
| faq.html | faq.html |
| contact.html | contact.html |
| privacy.html | privacy.html |
| 404.html | 404.html |
| partner-with-us.html (held) | not on main after the pending push; local page + styles/partner.css + scripts/partner.js |
| (drafts, not in repo) | aac-support, speech-sound-disorders, early-communication-late-talkers, language-thinking-executive-function, autism-social-communication, stuttering-fluency |

## Pending push (bundle final 2026-09-08, owner approved the scope; owner runs it via Claude Code)
- Scope: live main becomes exactly the nine linked pages plus what they reference, robots.txt, sitemap.xml, and internal docs. Unlinked pages are added later, one at a time, as they are finalized.
- Bundle: design_handoff_live_match/ (README.md is the manifest). 45 files copied: 9 pages, sitemap.xml, scripts/site.js, scripts/evaluations.js, styles/site.css, styles/evaluations.css, styles/clarity.css, CLAUDE.md, github.md, 8 review docs (language-thinking-executive-function-review.md is new), 20 new photo assets (hero-playroom, clarity-madison-girl, scottsdale-hero, scottsdale-playroom, tempe-hero, tempe-girl-phone-night). 13 files deleted: partner-with-us.html (held), pediatric-feeding-oral-motor-review.md, understanding-using-language-review.md, scripts/service-article.js, three cactus-hero skylines, clarity-mother-child.webp, speech-evaluation-camera.webp, tempe-boy-phone-560.webp, three paint-* textures. Expected 72 files on main.
- After the push, replace 42ac7176 under Last sync with the new commit sha and move this section into Sync history.
- What the push carries: real photos in the home, Tempe, and Scottsdale heroes (cactus skylines removed; photo fills the right side with an eased left fade on desktop, sits under the headline on phones); home clarity section photo (Madison and a girl at a kitchen table) running curve to curve; Tempe "Googling at 11pm" and Scottsdale "You suspected it" sections flipped to photo left, text right, with new photos and soft fades; Scottsdale hero headline "Every child has a voice. We help Scottsdale kids find it."; Partner With Us unlinked everywhere and removed from main; menu footer city names link to the city pages; "Not seeing what you're looking for?" card centered full width on home and city pages; pediatric feeding service removed everywhere; evaluations page mobile table of contents opens on mouse click; schema images on the Tempe page point at the new hero photo.

## Sync history
- 2026-08-28T04:26:21Z: pulled main at 42ac7176 (66 commits / 74 files since deploy push); project made identical to repo for all live-site files; drafts kept unlinked; nothing pushed
- 2026-08-25: full-site deploy handoff prepared in design_handoff_full_site_deploy/ and pushed via Claude Code (removed blog/DDD/milestones + orphaned assets, added 404, icons, share cards)
- 2026-08-16T18:21:08Z: repo browsed read-only to plan full-site push; nothing imported
