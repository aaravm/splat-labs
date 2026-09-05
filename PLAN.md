# SplatLabs Landing Page — Build Plan

## Overview
Build a modern, dark-themed landing page for **SplatLabs** — a startup streaming live events using 4D Gaussian Splatting. Inspired by landing pages from Gracia AI, Evercoast, Splat Labs, Volum, and RAVE SPACE.

---

## Tech Stack
- **Next.js 15** (App Router) — React framework
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — scroll animations & section reveals
- **Custom WebGL Canvas** — animated particle/splat hero background
- **TypeScript** — full type safety
- **Vercel-ready** — zero-config deploy

## Design System
| Token | Value | Usage |
|---|---|---|
| Background | `#050505` / `#0a0a0a` | Page & section backgrounds |
| Surface | `#111111` / `#1a1a1a` | Cards, elevated elements |
| Text Primary | `#fafafa` | Headlines, body |
| Text Muted | `#888888` / `#a1a1aa` | Captions, secondary |
| Accent Primary | `#06b6d4` (cyan-500) | CTAs, highlights |
| Accent Secondary | `#8b5cf6` (violet-500) | Gradient accents |
| Gradient | cyan → violet | Hero headline, accents |
| Font | Inter (400, 500, 600, 700, 800) | All text |

## Sections (8 total)

### 1. Navigation Bar
- Sticky, glass-morphism (blurred dark bg)
- Logo ("SplatLabs" with cyan accent on "Splat")
- Nav links: Features, How It Works, Use Cases, About
- CTA button: "Get Early Access"
- Mobile hamburger menu

### 2. Hero Section
- **Full-viewport dark canvas** with animated WebGL particles (splats floating, slowly rotating, cyan/violet tinted)
- Headline: "Live Events in **4D Gaussian Splatting**" with gradient text on the bold part
- Subheadline: "Stream immersive, photorealistic volumetric experiences. No headset required."
- Two CTAs: "Get Early Access" (solid cyan) + "Watch Demo" (ghost)
- Reassurance microcopy: "No plugins · No downloads · Works in any browser"
- Stats strip below CTAs: "60fps · <50ms latency · 10M+ splats/frame"

### 3. Trusted By / Compatibility Strip
- "Works with" label
- Tool/capture icons row (mock logos): Polycam, DJI, Luma AI, Kiri Engine, Postshot
- Subtle grayscale → color on hover
- Understated divider line

### 4. About / Problem Statement
- Split layout: left text, right visual (gradient orb or abstract splat visual)
- Headline: "Millions of Tiny Splats. One Photorealistic World."
- Body: "Instead of triangles or point clouds, Gaussian Splatting represents a scene as millions of tiny 3D gaussian blobs — each with its own position, color, and opacity. The result: real-time, photorealistic rendering that runs in a browser."
- Key stat callouts inline

### 5. Features Grid
- 3-column responsive grid (→ 1 col mobile)
- 6 feature cards with icon, title, description:
  1. **Real-Time Capture** — "Capture and stream volumetric video at 60fps with sub-50ms latency"
  2. **4D Gaussian Splatting** — "Our proprietary pipeline renders millions of splats in real-time using WebGPU"
  3. **Browser-Native** — "Zero plugins, zero installs. Works on any modern browser across devices"
  4. **Scalable Streaming** — "Adaptive bitrate streaming for splat data. From 10K to 10M+ splats per frame"
  5. **Event-Ready** — "Built for live concerts, sports, conferences, and immersive broadcasts"
  6. **Developer API** — "Integrate volumetric streaming into your app with our REST & WebSocket APIs"
- Cards: dark surface bg, subtle border, hover glow effect

### 6. How It Works
- 3-step horizontal pipeline with connecting lines
- Step icons and numbered indicators
- Steps:
  1. **Capture** — "Use any Gaussian Splatting capture rig or compatible camera"
  2. **Process** — "Our cloud pipeline converts raw data to optimized 4D splat streams"
  3. **Stream** — "Embed the player in your platform. Viewers watch in real-time, in-browser"
- Below: a code snippet or embed snippet showing integration simplicity

### 7. Use Cases
- Tabbed or card-based section
- 4 use cases:
  1. **Live Concerts** — "Put fans inside the venue from anywhere in the world"
  2. **Sports Broadcasting** — "Replay moments from every angle in volumetric 3D"
  3. **Corporate Events** — "Immersive keynotes and product launches for global audiences"
  4. **Creative & VFX** — "Real-time volumetric capture for film, gaming, and mixed reality"
- Each with a gradient accent border

### 8. CTA + Footer
- Final CTA section: dark bg with subtle gradient mesh
- Headline: "Ready to Stream the Future?"
- Email input + "Get Early Access" button
- Footer: Logo, nav links, social icons, copyright, "© 2026 SplatLabs. All rights reserved."

## File Structure
```
splatlabs/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, global styles)
│   ├── page.tsx            # Main landing page (composes all sections)
│   └── globals.css         # Tailwind directives + custom CSS
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── SplatCanvas.tsx     # WebGL animated particle canvas
│   ├── TrustedBy.tsx
│   ├── About.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── UseCases.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── public/
│   └── (favicon, og image if needed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md (not created unless asked)
```

## Implementation Order
1. **Scaffold**: `npx create-next-app@latest` with TypeScript + Tailwind + App Router
2. **Global styles**: Set up `globals.css` with dark theme, Inter font, Tailwind config
3. **SplatCanvas.tsx**: Build the WebGL particle animation component
4. **Layout + Navbar**: Root layout with fonts/metadata, sticky glass navbar
5. **Hero**: Gradient headline, CTAs, stats strip, with canvas behind
6. **TrustedBy**: Logo strip
7. **About**: Split layout with splat explanation
8. **Features**: 6-card responsive grid
9. **HowItWorks**: 3-step pipeline
10. **UseCases**: Tabbed use case cards
11. **CTA + Footer**: Final conversion section + footer
12. **Animations**: Add Framer Motion scroll reveals to all sections
13. **Responsive**: Polish mobile/tablet breakpoints
14. **Verify**: `npm run build` to catch any errors

## Verification
- Run `npm run build` — must pass with zero errors
- Run `npm run dev` — visual check at localhost:3000
- Check responsive layout at mobile/tablet/desktop breakpoints
- Verify all animations trigger on scroll
