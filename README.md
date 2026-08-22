# Jordan Ellis — Personal Portfolio

A premium, single-page portfolio for a Full-Stack Developer / Software Engineer.
Plain HTML, CSS, and JavaScript — no build step, no framework required.

## Folder structure

```
portfolio-project/
├── index.html        # all page content/markup
├── css/
│   └── style.css      # all styles (design tokens, layout, animations)
├── js/
│   └── script.js       # nav highlighting, scroll reveals, skill bars, counters, contact form
├── assets/             # put your profile photo / images here
└── README.md
```

## How to open and run in VS Code

1. Open VS Code → **File > Open Folder...** → select this `portfolio-project` folder.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab, if you don't have it yet.
3. Right-click `index.html` in the Explorer → **Open with Live Server**.
   - This opens the site in your browser at something like `http://127.0.0.1:5500` and auto-refreshes when you save changes.
4. Edit freely — `index.html` for content, `css/style.css` for styling, `js/script.js` for behavior.

No `npm install`, no build tools — you can also just double-click `index.html` to open it directly in a browser, though Live Server gives you live-reload while editing.

## What to personalize

- **Name & role** — search `Jordan Ellis` in `index.html` and replace throughout.
- **Photo** — drop your photo into `assets/`, then in `index.html` replace the `.hero-photo` div's `<span class="initials">JE</span>` with an `<img src="assets/your-photo.jpg" alt="Your Name">`.
- **About, Skills, Stack** — edit the text and percentage values (`data-w="95"`) directly in `index.html`.
- **Projects** — each `<article class="project">` block is one case study (problem / approach / result). Duplicate the block for more projects, or edit the four in place.
- **Experience / Education / Achievements** — edit the `.commit`, `.edu-card`, and `.ach-card` blocks.
- **Contact links** — update the `mailto:`, GitHub, and LinkedIn URLs (appears in both the navbar and the contact section).

## Notes

- Fonts (Space Grotesk, Inter, JetBrains Mono) and tech icons (Devicon) load from CDN links in `index.html` — an internet connection is needed for those to render, but the site works fully offline otherwise.
- The contact form has no backend; submitting it opens the visitor's email client with a pre-filled message via `mailto:`. If you want it to actually send from the page without opening an email app, you'll need a form backend (e.g. Formspree) — ask if you want that wired in.
- Respects `prefers-reduced-motion` and is keyboard-accessible (focus outlines, semantic HTML, native `<details>` for case studies).
