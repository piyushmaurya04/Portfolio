# Piyush Maurya — Developer Portfolio

A cinematic, scroll-driven developer portfolio showcasing enterprise systems engineering, distributed event pipelines, and full-stack software development. Built with **React 18**, **TypeScript**, **Three.js / React Three Fiber**, **GSAP ScrollTrigger**, **Tailwind CSS**, and **Netlify Functions**.

---

## ✨ Features

- **Persistent 3D WebGL Canvas**: A continuous 3D developer model rendered via Three.js / React Three Fiber, seamlessly interpolated across scenes via scroll progress.
- **GSAP Scroll Choreography**: Timeline orchestration and scroll-linked animations powered by GSAP and ScrollTrigger, paired with Lenis smooth scrolling.
- **Interactive Experience Hub**: Modular, tabbed showcase detailing enterprise initiatives at **Tata Consultancy Services (TCS)**:
  - **WIPS**: Event-driven data synchronization platform handling ~400K messages with Apache Kafka, consumer groups, and self-recovering DLQ workflows.
  - **PSS**: Master-data integration with Customer Registry (CR), REST APIs, OAuth 2.0, Oracle PL/SQL, and Angular.
  - **Security & Code Quality**: Remediation of 150+ vulnerabilities across 14 enterprise services (SAST/DAST/SCA), patching `CVE-2024-38816`, and SonarQube quality gates.
- **3D Rotating Project Carousel**: Spatial card track displaying full-stack and backend projects with accessible modals, interactive details, and direct GitHub links.
- **Serverless Contact Form**: Direct delivery to inbox via **Resend REST API**, complete with input validation, honeypot spam protection, structured text, and responsive HTML card formatting.

---

## 🛠️ Tech Stack

### Frontend & Graphics
- **Core**: React 18 · TypeScript · Vite
- **3D & Graphics**: Three.js · React Three Fiber (`@react-three/fiber`) · Drei (`@react-three/drei`) · Postprocessing
- **Animation & Motion**: GSAP 3 · ScrollTrigger · Lenis Smooth Scroll
- **Styling**: Tailwind CSS · PostCSS · Lucide Icons

### Backend & Cloud
- **Serverless**: Netlify Functions v2 (Node 20 runtime, ES modules)
- **Email Delivery**: Resend REST API
- **Deployment**: Netlify (`netlify.toml`)

---

## 📁 Project Structure

```text
├── netlify/
│   └── functions/
│       └── contact.mjs           # Netlify serverless function integrating Resend REST API
├── public/
│   ├── models/
│   │   └── developer.glb         # 3D character / workspace model
│   └── projects/                 # Project preview graphics
├── src/
│   ├── animation/
│   │   ├── sceneConfig.ts        # 3D camera keyframes and normalized scroll interpolation
│   │   └── scrollStore.ts        # Reactive scroll state store
│   ├── components/
│   │   ├── layout/               # Scene wrappers, background layers, global glow
│   │   ├── navigation/           # Top navigation pill, mobile menu, keyboard hint
│   │   ├── projects/             # 3D project cards and accessible detail modals
│   │   ├── typography/           # Editorial typography and Reveal scroll wrappers
│   │   └── ui/                   # Contact form, preloader, scroll progress bar
│   ├── data/
│   │   ├── achievements.ts       # Awards, metrics, and coding profiles
│   │   ├── experience.ts         # TCS enterprise initiatives, projects, and tenure
│   │   ├── personal.ts           # Bio, roles, contacts, and social links
│   │   ├── projects.ts           # Portfolio projects catalog
│   │   └── skills.ts             # Technical skills matrix & engineering practices
│   ├── hooks/                    # Smooth scroll, keyboard navigation, media queries
│   ├── scenes/                   # Viewport scenes (Hero, About, Projects, Experience, Skills, Activity, Contact)
│   ├── styles/                   # Global CSS & Tailwind styling
│   └── three/                    # Three.js canvas, lighting, camera rig, developer model
├── netlify.toml                  # Netlify build, functions, headers, and redirect rules
└── vite.config.ts                # Vite config + local dev middleware for contact function
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.x` or `20.x`
- npm `9.x` or higher

### Installation

```bash
git clone https://github.com/piyushmaurya04/Portfolio.git
cd Portfolio
npm install
```

### Development

```bash
npm run dev
```

The Vite dev server includes a local middleware that proxies `/.netlify/functions/contact` directly to Resend, allowing you to test form submissions on `http://localhost:5173` without running the full Netlify CLI.

### Production Build

```bash
npm run build
```

Compiles TypeScript (`tsc --noEmit`) and bundles production assets into `dist/`.

To preview the production build locally:

```bash
npm run preview
```

---

## 🔐 Environment Variables

For the contact form to dispatch emails via Resend, configure the following environment variables in your **Netlify Dashboard** (**Site configuration → Environment variables**) or in a local `.env` file for local development:

| Variable | Required | Description | Example |
|---|---|---|---|
| `RESEND_API_KEY` | **Yes** | Your Resend secret API key | `re_xxxxxxxxxxxxxxxxxxxx` |
| `CONTACT_RECIPIENT` | **Yes** | Destination email for form submissions | `piyushmaurya0410@gmail.com` |
| `RESEND_FROM` | No | Verified sender address *(defaults to Resend onboarding address)* | `Portfolio Contact <onboarding@resend.dev>` |

> **Note:** Never commit production API keys or `.env` files to git. `.env` is ignored by default in `.gitignore`.

---

## 🌐 Deployment

The repository is configured for zero-config continuous deployment on **Netlify**:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`
- **Cache headers**: 3D assets in `/models/*` are served with immutable long-term caching (`max-age=31536000`).
- **SPA routing**: Automatic redirect rule `/* -> /index.html 200` ensures smooth client-side routing.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
