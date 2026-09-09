# Project rules
- Never use em dashes anywhere: not in page copy, headings, alt text, schema, or internal docs. Use commas, colons, parentheses, or split the sentence instead. Also avoid the HTML entity form of the em dash.
- Voice: Madison Jeffery, MS, CCC-SLP, Social House Therapy (Tempe/Scottsdale AZ, in-home + telehealth, private pay). Honest, no-upsell stance: evaluations carry no obligation to begin therapy; no device sales or commissions.
- Clinical claims must be verifiable against ASHA guidance or primary research. Each content page gets a claim-by-claim accuracy review doc (see aac-review.md).

# Sync rules
- Always ask the owner before pushing to GitHub or syncing from it. Do not push or sync automatically, even when changes look ready.
- Pushes go through a Claude Code handoff bundle (design_handoff_*/README.md lists the exact copy and delete steps). The owner runs it and pastes the resulting commit sha into github.md.
- Service pages under construction are local drafts only. They are not in the repo and their URLs 404 on the live site (404.html handles it). Currently: aac-support, speech-sound-disorders, early-communication-late-talkers, language-thinking-executive-function, autism-social-communication, and stuttering-fluency. Their review docs do live in the repo. Home page service cards stay aria-disabled with data-coming-soon, and the nav has no Services submenu, until a page is approved.
- Publish a draft only after the owner confirms that page is finished, one page at a time, never in a bulk push. Publishing a page also means relinking its home card and adding it to sitemap.xml.
- partner-with-us.html is on hold (owner decision 2026-09-08). The rewritten page, styles/partner.css, and scripts/partner.js stay local, unlinked from nav, menu, footer, and sitemap, and the page is removed from main until the owner clears it. Open items are listed in partner-with-us-changelog.md.
- The pediatric feeding and oral-motor service was dropped in September 2026. Its page and review doc are deleted; do not restore either.
- Older full-page versions of the service pages exist in git history at commit 5d1c9c1c (git checkout 5d1c9c1c -- <page>.html), but the local drafts are newer and are the ones to use.
