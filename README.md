# Spriha Associate — Website Redesign

A full frontend redesign of the official website for **Spriha Associate**, an industrial electronics repair and automation solutions company based in Vadodara, Gujarat. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, just clean frontend work.

---

## Preview

![Spriha Associate Hero](assets/img/banner/hero-1.jpg)

---

## About the Project

Spriha Associate has been repairing industrial electronics for over 15 years — drives, PCBs, HMIs, VFDs, PLCs, and more. The goal of this redesign was to give the company a website that actually looks as professional as their work. The old design was dated and didn't reflect the quality of the service they provide.

This version is built to feel modern, fluid, and credible — the kind of site that makes a plant manager trust you before they even read a word.

---

## Features

- **Animated preloader** with SVG circuit path drawing effect
- **Custom cursor** — red dot + trailing ring, hides the OS cursor
- **Hero slider** with 3 slides, Ken Burns image zoom, word-reveal text animation, keyboard and swipe support
- **Particle canvas** — subtle red dot network rendered on the hero background
- **Scroll reveal animations** — elements fade/slide in as you scroll down
- **3D card tilt** on equipment and feature cards (mouse-tracked perspective)
- **Magnetic buttons** — primary CTAs elastically attract the cursor
- **Animated stat counters** with SVG ring progress indicators
- **Parallax CTA section** — background scrolls at a different speed than content
- **Infinite marquee** — two-row brand ticker running in opposite directions
- **Scrollspy navigation** — nav link highlights based on active section
- **Auto-hiding header** — disappears on scroll down, reappears on scroll up
- **Scroll progress bar** along the top of the page
- **WhatsApp float button** with pulse ring animation
- **Contact form** that composes and opens a WhatsApp message directly
- Fully **responsive** down to 320px
- Respects **prefers-reduced-motion** — all animations disabled cleanly for accessibility

---

## Sections

| Section | Description |
|---|---|
| Hero | Full-viewport image slider with particle overlay and animated copy |
| Trust Strip | Client logos — Panasonic, Essar, IOCL, L&T |
| About | Company story, experience badge, floating stat pill |
| Services | 16 repair service cards on a dark background |
| Stats | 4 animated counters with SVG ring indicators |
| Industries | 4 image cards covering Oil & Gas, Manufacturing, Power, Electronics |
| Equipment | 6 lab equipment cards with tilt and image zoom |
| Process | Vertical 5-step repair timeline with icons |
| Why Us | 4 feature cards with animated bottom bar |
| Brands | Dual infinite marquee of 28+ supported brands |
| CTA Band | Full-bleed parallax call-to-action |
| Contact | Dark section with info, Google Maps embed, and WhatsApp quote form |
| Footer | Links, contact details, copyright |

---

## Tech Stack

- **HTML5** — semantic markup, ARIA labels, skip link
- **CSS3** — custom properties, grid, flexbox, keyframe animations, clip-path, backdrop-filter
- **Vanilla JavaScript** — IntersectionObserver, Canvas API, requestAnimationFrame, no dependencies
- **Google Fonts** — Poppins, Inter, Space Grotesk
- **Unsplash** — supplementary imagery (free commercial license)

No jQuery. No libraries. No npm. Just open `index.html` in a browser.

---

## File Structure

```
spriha-redesign/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       ├── banner/        # Hero and CTA background images
│       ├── gallery/       # Equipment photos and feature icons
│       └── logo/          # Client logos (Panasonic, Essar, IOCL, L&T, Spriha)
└── README.md
```

---

## Running Locally

No server needed. Just open the file:

```
double-click index.html
```

Or if you want to serve it properly (avoids any browser file:// quirks):

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000` in your browser.

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Red | `#e21b22` | Primary brand color, CTAs, accents |
| Dark | `#0d0d14` | Dark sections, footer |
| White | `#ffffff` | Light sections |
| Ink | `#12121a` | Body text |
| Ink Soft | `#4a4a5a` | Secondary text |
| Tint | `#f2f3f9` | Alternating light sections |

---

## Contact Info (Live on Site)

- **Phone:** +91 97128 00416
- **Email:** spriha.service@gmail.com
- **Address:** 13, Shree Sitaram Kutir Soc., near Sai Chokdi, Manjalpur, Vadodara, Gujarat 390011

---

## Notes

- The contact form does not use a backend — on submit it opens a pre-filled WhatsApp message to the business number
- External images are loaded from Unsplash CDN (requires internet connection)
- The custom cursor is disabled automatically on touch devices
- All animations are disabled when the OS has reduced motion enabled (`prefers-reduced-motion: reduce`)
