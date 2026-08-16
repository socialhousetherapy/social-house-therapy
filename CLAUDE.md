# Project rules
- Never use em dashes anywhere: not in page copy, headings, alt text, schema, or internal docs. Use commas, colons, parentheses, or split the sentence instead. Also avoid the HTML entity form of the em dash.
- Voice: Madison Jeffery, MS, CCC-SLP, Social House Therapy (Tempe/Scottsdale AZ, in-home + telehealth, private pay). Honest, no-upsell stance: evaluations carry no obligation to begin therapy; no device sales or commissions.
- Clinical claims must be verifiable against ASHA guidance or primary research. Each content page gets a claim-by-claim accuracy review doc (see aac-review.md).

# Sync rules
- Always ask the owner before pushing to GitHub or syncing from it. Do not push or sync automatically, even when changes look ready.
- Pages under construction are intentionally shipped as coming soon stubs on main, following the arizona-ddd-resources.html pattern. As of commit a1502d9c these are: aac-support, speech-sound-disorders, early-communication-late-talkers, understanding-using-language, autism-social-communication, stuttering-fluency, pediatric-feeding-oral-motor, and evaluations.
- Do not overwrite a stub with full page content until the owner confirms that page is finished. Restore pages one at a time, not in a bulk sync.
- The full pre-stub content of those 8 pages is preserved in git history at commit 5d1c9c1c and can be restored with: git checkout 5d1c9c1c -- <page>.html
