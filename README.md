# Portfolio — Atupele Nathan Mkagula

Personal portfolio website for a cybersecurity practitioner, IT consultant, and digital systems specialist based in Malawi.

## Overview

A high-performance, responsive portfolio built with vanilla HTML, CSS, and JavaScript. Delivered as a single file for portability, with a unified dark/light theme system, custom cursor interactions, scroll-driven animations, and canvas-based hero visuals. No build step required.

## Features

- **Theme System**: Dark/light toggle with `localStorage` persistence
- **Custom Cursor**: Gold-accented cursor with context-aware hover scaling
- **Scroll Animations**: Intersection Observer-powered fade-ins and parallax
- **Canvas Hero**: Responsive particle network with real-time rendering
- **Mobile Navigation**: Collapsible menu with smooth transitions
- **Accessibility**: Semantic markup, ARIA labels, keyboard focus states
- **Zero Build Step**: Runs directly in any modern browser

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styling | CSS3, CSS Variables, Tailwind CSS (CDN) |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5.1 |
| Typography | Inter + Space Grotesk (`@fontsource`) |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/<username>/atupele-portfolio.git
cd atupele-portfolio

# Open in browser
open index.html

# Or serve locally (recommended for asset caching & CORS)
python3 -m http.server 8000
```

## Customization

- **Colors & Theme**: Edit variables in `:root` and `body.light-mode` at the top of the `<style>` block
- **Content**: Update text directly within each `<section>`
- **Images**: Replace `assets/headshot.jpg` and swap hero background URLs in the `style` attributes
- **Links**: Modify contact/social URLs in the `#contact` section and footer

## Deployment

Ready for any static hosting platform. Push to your default branch for automatic deployment:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

No configuration files or build steps are required.

## Project Structure

```
├── index.html          # Complete source (HTML + CSS + JS)
├── assets/             # Local media (headshot, project images)
└── README.md           # Documentation
```

> **Note**: The codebase is intentionally consolidated into a single file for simplicity and fast deployment. For larger applications, split CSS/JS into modular files and implement a build pipeline.

## License

© 2026 Atupele Nathan Mkagula. All rights reserved.
