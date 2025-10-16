# Shadril Hassan Shifat — Portfolio

Static portfolio website for PhD applications. Built with semantic HTML, responsive CSS, and lightweight JS. Ready for GitHub Pages.

- Repository name: `shadril238.github.io`
- Live URL: `https://shadril238.github.io`

## Structure

- `index.html` — Main page (About, Research, Experience, Publications, Projects, Skills, Tests, Certifications, Achievements, References, Contact)
- `stylesheet.css` — Styles (light/dark theme, responsive, print styles)
- `script.js` — Interactions (dark mode, mobile nav, smooth scroll, back-to-top)
- `assets/img/` — Placeholder images & favicon

## Local preview

Open `index.html` directly in a browser, or serve via a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new public repository named `shadril238.github.io`.
2. Add these files to the repository root and push to `main`.
3. GitHub Pages auto-deploys from the root of `main`. Visit `https://shadril238.github.io`.

Alternatively, for a project site:

1. Use any repository name, push to `main`.
2. In Settings → Pages → Build and deployment: Source = `Deploy from a branch`, Branch = `main` `/ (root)`.

## Customization

- Replace placeholder images in `assets/img/` with your own.
- Update links in the header/contact sections as needed.
- Put your PDF at `assets/Shadril_Hassan_Shifat_CV.pdf` (or update the link in `index.html`).
- Tweak colors/typography in `stylesheet.css` variables. Toggle default theme by adding/removing `class="light"` on `<html>`.

## Accessibility & Print

- Skip link and focus styles are included.
- Print styles collapse ornamentation for clean PDF printing.

## License

This site’s code is provided for personal portfolio use. Replace personal content with your own before publishing.
