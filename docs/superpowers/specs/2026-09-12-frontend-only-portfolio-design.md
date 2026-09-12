# Frontend-Only Portfolio Specification & Design

**Author:** Balaji P & Antigravity  
**Date:** 2026-09-12  
**Status:** Approved  

## 1. Objective
Transform the existing full-stack Flask / SQLite portfolio into a high-performance, frontend-only static website. All backend logic, session-based auth, and database files will be archived into `_backend_backup/`, while the client-side experience is upgraded with refined aesthetics, smooth animations, and zero-build static hosting capability (compatible with GitHub Pages, Vercel, Netlify, or direct browser viewing).

## 2. Architecture & File Layout
```text
Portfolio/
├── index.html                  # Semantic single-page HTML5 document with complete SEO
├── css/
│   └── style.css               # Refined cyber/modern design system, tokens, and animations
├── js/
│   └── main.js                 # Interactive logic (canvas, typing, filter, toasts, observers)
├── img/
│   └── profile.jpg             # Profile image asset
├── _backend_backup/            # Archived Python/Flask backend and databases
│   ├── app.py
│   ├── db.py
│   ├── auth_utils.py
│   ├── routes/
│   ├── templates/
│   ├── local_portfolio.db
│   ├── schema.sql
│   ├── requirements.txt
│   ├── Procfile
│   ├── render.yaml
│   └── runtime.txt
├── README.md                   # Updated project documentation for static hosting
└── .gitignore
```

## 3. Visual & Aesthetic Improvements
1. **Glassmorphism & Depth:** Cards feature subtle frosted glass backdrop filters (`backdrop-filter: blur(12px)`) with delicate border gradients.
2. **Scroll-Driven Micro-Interactions:** Subtle fade-and-lift entry animations triggered via `IntersectionObserver`.
3. **Interactive Elements:**
   - Neural particle network canvas in the hero background that responds to cursor velocity.
   - Dynamic typing title with realistic blink and backspace effect.
   - Category filtering for skills (`All`, `Languages`, `Web & Mobile`, `AI & ML`, `Databases & Tools`) with smooth opacity transitions.
   - One-click copy-to-clipboard cards for email and phone numbers with checkmark toast notifications.
   - Ambient mouse spotlight glow (for desktop viewports > 768px).
   - Interactive back-to-top floating button and reading progress bar.
4. **Typography & Styling:** Curated Google Fonts (`Syne` for modern display headings, `DM Sans` for readable body text).
5. **SEO & Accessibility:**
   - Pre-rendered semantic HTML5 tags.
   - Complete Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter card tags.
   - Schema.org `Person` JSON-LD structured data.
   - WCAG-compliant color contrast and accessible `aria-label` attributes on icon-only buttons.
