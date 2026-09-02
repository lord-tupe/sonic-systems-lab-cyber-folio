# Atupele Nathan Mkagula — sonic-systems-lab-cyber-folio

Personal portfolio for **Atupele Nathan Mkagula**, a Cybersecurity Practitioner, IT Consultant, Customer Support Specialist at betPawa, and Systems Thinker based in Malawi.

---

## 🌟 Key Features

- **Zero-Dependency Core**: Built with vanilla HTML5, CSS3 design tokens, and modular ES6+ JavaScript. No runtime frameworks or build pipeline required.
- **Interactive Terminal**: Fully functional CLI command prompt in the About section supporting `whoami`, `skills`, `projects`, `certs`, `socials`, `theme`, `matrix`, `clear`, and more.
- **Project Filter & Rich Case Study Modals**: Filter projects by category (*Cybersecurity*, *Infrastructure*, *Creative*, *Support*) and inspect architectural blueprints, problem/solution breakdowns, and metrics.
- **Web Audio API Ambient Synthesizer**: Procedural real-time ambient synthesizer engine and reactive visualizer built directly in-browser with zero external MP3 dependencies.
- **CV / Resume Quick Viewer**: Built-in modal for reviewing qualifications, credentials, and triggering direct print-to-PDF.
- **Instant Clipboard Actions**: One-click copy for email and phone numbers with animated floating toast notifications.
- **Dark & Light Mode Engine**: Seamless theme switching with system preference detection and `localStorage` persistence.
- **Canvas Particle Network**: Real-time responsive particle physics with interactive mouse disturbance and flowing sine waves.
- **Comprehensive SEO & Rich Snippets**: Complete OpenGraph, Twitter Cards, SVG favicon, and JSON-LD schema (`schema.org/Person`) for search engine optimization.
- **Decap CMS Ready**: Included Decap CMS backend configuration in `/admin/` for content management.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 (Semantic & Accessible) |
| **Styling** | Modern CSS3 (Custom Properties, Glassmorphism, Print Styles) |
| **Logic** | Vanilla JavaScript (ES6+, Web Audio API, Canvas 2D) |
| **Icons & Fonts** | Font Awesome 6.5.1, Inter, Space Grotesk, JetBrains Mono |
| **CMS** | Decap CMS (Netlify Identity / Git Gateway) |

---

## 🚀 Quick Start

To preview or run the portfolio locally:

```bash
# Clone the repository
git clone https://github.com/lord-tupe/demo-portfolio-to-be-deleted-later.git
cd demo-portfolio-to-be-deleted-later

# Serve locally with Python
python -m http.server 8000

# Or with Node
npx serve .
```

Open `http://localhost:8000` in your browser.

---

## 📁 Project Structure

```
├── index.html          # Root production entry point (SEO, Semantic UI)
├── css/
│   └── styles.css      # Design tokens, themes, modals, print styles
├── js/
│   └── main.js         # Canvas animation, Terminal CLI, Web Audio, Modals
├── admin/
│   ├── index.html      # Decap CMS admin dashboard
│   └── config.yml      # Decap CMS collections (Projects & Articles)
└── README.md           # Documentation
```

---

## 🚀 Deployment

The site is configured for instant zero-configuration static hosting:
- **GitHub Pages**: Set Source to `main` branch root (`/`)
- **Netlify**: Set Publish directory to `.`
- **Vercel**: Set Output directory to `.`
- **Cloudflare Pages**: Set Build output directory to `.`

---

## 📄 License

Copyright &copy; 2026 Atupele Nathan Mkagula. All rights reserved.
