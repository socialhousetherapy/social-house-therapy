# AI visibility checklist (AEO)

Goal: get AI assistants (ChatGPT, Perplexity, Gemini, Google AI Overviews) to cite socialhousetherapy.com when parents ask speech therapy questions.

## One-time setup

- [x] robots.txt and sitemap.xml are live on main (pushed 2026-09-08, verified identical 2026-09-16)
- [ ] Sitemap lists live, linked pages only (8 today). Add each page the day it is published and linked, per the project sync rules; never list drafts, unlinked pages (blog, DDD resources), or the on-hold partner page
- [ ] Bing Webmaster Tools: create free account at bing.com/webmasters, verify the site, submit sitemap.xml (Perplexity and ChatGPT retrieve from Bing's index)
- [ ] Google Search Console: confirm the site is verified and sitemap.xml is submitted
- [ ] Hosting check: if the site ever moves behind Cloudflare or similar, make sure any "block AI bots" toggle is OFF (some hosts enable it by default)
- [ ] Netlify: in Site configuration, confirm any AI crawler blocking or bot protection setting is OFF (edge-level blocks override robots.txt)
- [ ] Never add Disallow rules for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, or Bingbot to robots.txt

## Off-site reputation (Madison)

- [ ] Google Business Profile: accurate hours, services, service area, categories; keep responding to reviews
- [ ] ASHA ProFind profile up to date
- [ ] ArSHA member directory listing up to date
- [ ] Same name, phone, and service description everywhere (site, GBP, directories, social)
- [ ] Steady flow of genuine Google reviews; never gate or incentivize

## Content habits (ongoing, already our build standard)

- [x] FAQ page with natural-language questions, 2-4 sentence answers, synced FAQPage schema
- [x] Claims cited to ASHA guidance or primary research, with per-page accuracy review docs
- [x] LocalBusiness and Person schema on key pages
- [ ] Service pages: direct answer in the first 40-60 words under each heading (apply as each coming-soon page is finished)
- [ ] Refresh "last reviewed" dates when content is re-verified; stale pages (90+ days) lose AI citations

## Monthly testing (Madison, ~15 minutes)

- [ ] Ask ChatGPT, Perplexity, and Google: "speech therapist for a late talker in Tempe", "in-home speech therapy Scottsdale", "how much does a private speech evaluation cost in Arizona", "does my 18 month old need speech therapy"
- [ ] Note which businesses get named and whether we are cited; log changes here

## Log

- 2026-08-25: checklist created
- 2026-09-16: confirmed robots.txt and sitemap.xml already live and matching; no push required
