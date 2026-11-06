# Karthikeyan P M — Portfolio

Live: https://karthikeyangitup.github.io/Portfolio/

Plain HTML, CSS and JavaScript. No build step and no JS libraries (AOS and Typed.js were removed).

## Deploy (GitHub Pages)
1. Delete the old `Advanced-min.png`, `karthikeyanpm.jpg` and `Karthikeyan_PM_MendixProfile.pdf` from the repo root. They are replaced by the optimised images in `assets/img/` and the new CV `Karthikeyan_PM_AdvancedMendixDeveloper.pdf`.
2. Copy everything in this folder into the repo root and replace the files that are already there.
3. Commit and push. Pages redeploys in about a minute.
4. Optional: in Google Search Console, submit `sitemap.xml`.

## Files
| File | Purpose |
|---|---|
| `index.html` | Content, SEO tags, social preview tags, structured data |
| `style.css` | Design tokens, dark/light themes, animations, responsive breakpoints (320px → 1920px+) |
| `script.js` | All behaviour. The `CONFIG` and `PROJECTS` objects at the top are the parts you edit |
| `scene3d.js` | The 3D particle background (plain WebGL, no libraries). Edit `SECTION_MAP` to change which shape appears in each section and where |
| `assets/img/` | WebP + JPG photos (about 30 KB instead of 272 KB), Mendix Rapid/Intermediate/Advanced badges, Java course badge, social share image |
| `assets/certificates/` | The four certificate PDFs opened by the "View" buttons |
| `favicon.svg`, `apple-touch-icon.png` | Browser tab and home-screen icons |
| `robots.txt`, `sitemap.xml` | Search engine indexing |

## Features
- **3D particle background ("Data Constellation").** One set of particles changes shape as you scroll: a data globe in the hero, a double helix in About and Experience, a torus knot in Skills and Services, a tesseract-style cube (outer cube, inner core cube and connecting struts) in Projects, a spiral galaxy in Certifications and an ocean wave in Contact. Particles burst out and regroup between shapes and move away from the cursor. It starts after the page has loaded, drops quality automatically on slow devices, pauses in background tabs and stays still for visitors who turn motion off. If a browser can't run WebGL, the plain CSS background shows instead.
- **Scroll-linked motion:** the hero fades and lifts as you scroll away, section titles tilt into place, star dust drifts at a different speed (parallax), and the timeline and progress bars fill as you scroll.
- **Command palette.** Press `Ctrl/⌘ + K` or `/` to jump to a section, open a project or certificate, download the CV, copy your email or switch the theme.
- **Theme switcher.** Dark/light toggle (or press `T`). The new theme spreads out in a circle from the button, the choice is remembered, and it follows the visitor's system setting by default.
- **Projects.** **Search Portal** (4CRisk.ai → CUBE) is shown as one wide flagship card with 9 module tiles. Clicking a tile opens the case study at that module (link format: `#project/searchportal/cmap`). The other 6 projects are filterable by Mendix, Power Apps and Power BI. Each card opens a case-study popup (Goal, Features, Role, Tech) with Previous/Next buttons, keyboard support and links you can share (e.g. `#project/swiftvob`).
- **Contact form.** Checks each field as you type, shows a character counter, saves an unsent draft, and has a hidden spam trap. It sends by **email** (opens the visitor's mail app) or **WhatsApp**. It can optionally send directly to your inbox through Formspree (see below).
- **Always up to date.** Years of experience are counted from `careerStart`, the footer year updates itself, and there is a live Chennai clock.
- **Animations:** fade-in as you scroll, counting stats, a typing role line, a code window that types itself in, a timeline line that fills as you scroll, a scroll progress bar, a back-to-top button with a progress ring, cards that tilt and light up under the mouse, buttons that follow the cursor, a soft cursor glow, a scrolling tech strip, moving gradient borders, and a short loading screen on the first visit only.
- **Accessibility:** "skip to content" link, keyboard focus kept inside pop-ups, labelled icon buttons, and reduced animation for visitors who turn motion off in their system settings.

## Common edits
- **Receive form messages directly (recommended):** create a free form at formspree.io and paste its URL into `CONFIG.formEndpoint` in `script.js`.
- **Google Analytics:** add your gtag snippet to `<head>`. CV downloads, project opens, filter clicks, outbound links and section views are tracked automatically.
- **Edit Search Portal modules:** edit `PROJECTS.searchportal.modules` in `script.js`, and the matching `.module-tile` buttons in `index.html`.
- **Add or edit a project:** add a card in `index.html` with `data-project="yourid"`, add matching details under `PROJECTS.yourid` in `script.js`, then update the counts on the filter buttons.
- **Skill levels:** each `lvl-1/2/3` class in the Skills section = Proficient / Advanced / Expert.

## Things only you can add (they make the biggest difference)
- One **measurable result** per project (time saved, number of users, approvals per month).
- **Screenshots** (blurred if confidential), added to each project's popup.
- A link to your Mendix profile, if you have one.
- Your CV dates the acquisition as "Feb 2026" in one place and "Apr 2026" in another. The site uses Feb 2026.
