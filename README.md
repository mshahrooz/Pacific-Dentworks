# Pacific Dentworks · Showtime-style full website

Six responsive HTML pages modeled on the actual Showtime PDR website layout:
- `index.html` — the previously approved Pacific homepage: same hero slider, PDR cards, comparison section, guidance, process and contact layout.
- `about.html` — alternating story sections, six values cards, profiles and photo CTA.
- `services.html` — five alternating service sections, process cards and CTA.
- `gallery.html` — interactive before/after comparisons and larger view, plus two repair spotlights.
- `reviews.html` — same reviews page layout repurposed as useful guidance. **No fabricated customer reviews.**
- `contact.html` — matching contact layout, business details, form preview and location.

## Open offline

Extract the ZIP completely. Double-click `index.html`; all six pages open directly through `file://` in Chrome or Safari without a server. All page styles, fonts, JavaScript and local imagery are bundled. The homepage video is embedded directly inside `index.html`.

## GitHub Pages

Upload the extracted files to the **root** of a GitHub repository. Settings → Pages → Source: `Deploy from a branch` → Branch: `main`, folder `/ (root)`.

For automatic shared-component updates instead, enable `GitHub Actions` as the Pages source. The included workflow builds `_site/` using `scripts/build_site.py` and publishes that result. Header and footer templates are in `components/navigation.html` and `components/footer.html`; edits to those files update all six published pages on the next build.

## Pre-launch information checks

- Phone: **604-970-3368** (supplied by client; also corroborated by a directory listing).
- Current Langley location: **5516 198 St #112, Langley, BC V3A 0A6** (client supplied). An older public directory references a Surrey address; **confirm the Langley address and current hours** before launch.
- Pacific Dentworks Inc. appears in BC corporate registry notices from 2013; this is not evidence of exact current business operating history or staff identities.
- The before-and-after gallery is built from sample comparisons, not evidence of completed Pacific Dentworks customer repairs. Replace them with verified job photos before describing them as a portfolio of customer results.
- The Reviews page intentionally contains **no invented testimonials or stars**. Obtain exact verified reviews from the client to replace the guidance cards.
- Static HTML cannot send contact form submissions by itself. The form is a design preview with a phone fallback. Connect an approved form endpoint before customer-facing production use.

### Research sources
- https://www.bclaws.gov.bc.ca/civix/document/id/corpreg/corpreg/crpn1205fin1113
- https://canada247.info/explore/british_columbia/greater_vancouver/surrey/cloverdale/pacific_dentworks.html
- https://share.google/NfgVOzUmy43S9VXc0

### Change the accent
The primary palette is in `assets/pacific-brand.css`: `#f44336`.

## Complete ZIP contents

The repository root contains six HTML pages, `assets/`, `components/`, `scripts/`, and `.github/workflows/pages.yml`. The pages work from a directly extracted folder without a development server.

### Quick deployment instructions

1. Extract the ZIP. Upload **the contents of the extracted folder**, not the parent folder or ZIP itself, to a GitHub repository on the `main` branch.
2. Go to repository **Settings → Pages**. Select either **Deploy from a branch → main → /(root)** or **GitHub Actions** to use the included shared-component build workflow.
3. Open the website at `https://<username>.github.io/<repository>/` when the Pages deployment has completed.

**Form delivery:** The online contact form is not connected to a submission endpoint, so users are directed to call the business. Add a form provider before promising online enquiries.

## Homepage hero video (self hosted)
The supplied 4K source was trimmed to the **first 13 seconds**, slowed to **0.8x**
by encoding the output frames at 1.25 times the source timing (the loop runs about 16.25 seconds),
and compressed into two self-hosted H.264 MP4 files: `assets/videos/hero-desktop.mp4`
and `assets/videos/hero-mobile.mp4`. Audio is removed for reliable muted autoplay.
The same video loops continuously behind the three headline slides on desktop and mobile.
Browsers that prohibit autoplay can use the hero's Play video control.
The source 44 MB 4K upload is not required for deployment.

## Shared website color customizer
Every page includes a floating **Theme color** button. Use the picker, enter a hexadecimal
color, or select one of seven presets. The color updates the site's accent, buttons, header
band, footer and coordinated palette instantly. The selection is saved in that visitor's browser.
This does not publish a new global color for all website visitors.
Files: `assets/theme-customizer.css`, `assets/theme-customizer.js`.
To change the default for all future visitors, edit `DEFAULT` inside `assets/theme-customizer.js`
and redeploy, then update its preset/reset label if appropriate.

## Reviews page
The reviews page links directly to Pacific Dentworks' public Google Business Profile for
actual customer feedback and review submissions. It does not hard-code any customer ratings
or review quotations that have not been supplied or verified.

## Customer reviews
Four full customer testimonials provided by the site owner appear on the homepage and Reviews page. Reviewer names and original wording are preserved. Longer reviews have accessible Read More/Read Less controls. The source-review profile links appear on the Reviews page.
