# Piyush Maurya — Portfolio Content & Spec

> Master reference document extracted from the old portfolio (HTML/CSS/JS).
> Use this to rebuild the portfolio in React (or any modern stack) without losing any information.

---

## 1. Personal / Brand Identity

| Field | Value |
|-------|-------|
| **Name** | Piyush Maurya |
| **Title / Role** | Senior Software Engineer (Software Engineer) |
| **Current Employer** | Tata Consultancy Services (TCS) |
| **Job Title @ TCS** | System Engineer |
| **Location** | Mumbai / Maharashtra, India |
| **Tagline** | Java · Spring Boot · Apache Kafka · Microservices. Building scalable, event-driven, fault-tolerant enterprise systems. |
| **Monogram / Logo** | "PM" |
| **Availability** | Open to opportunities (`isAvailable() → true`) |

### Meta / SEO
- **Site URL:** https://piyushmaurya-portfolio.netlify.app/
- **Description:** Piyush Maurya - Senior Software Engineer specializing in Java, Spring Boot, Apache Kafka, microservices, and event-driven architecture. Building scalable enterprise systems.
- **Keywords:** Piyush Maurya, Software Engineer, Java Developer, Spring Boot, Apache Kafka, Microservices, Event-driven Architecture, Backend Developer, Full Stack Developer
- **Theme color:** `#0b1120`
- **Google site verification:** `i4J8CdeRhnYmqjA8zGCnKnHj3wQD3rrIhBXVcPDCvGk`
- **Schema.org:** `Person` + `WebSite` structured data (JSON-LD) for Google Knowledge Panel

---

## 2. Contact Information

| Channel | Value |
|---------|-------|
| **Email** | piyushmaurya0410@gmail.com |
| **Phone** | +91 86004 50745 |
| **Location** | Maharashtra, India |

### Social / Professional Links
| Platform | URL |
|----------|-----|
| LinkedIn | https://www.linkedin.com/in/piyush-maurya-a1a5a1256/ |
| GitHub | https://github.com/piyushmaurya04 |
| LeetCode | https://leetcode.com/u/mauryapiyush30/ |
| CodeChef | https://www.codechef.com/users/piyushmaurya04 |
| HackerRank | https://www.hackerrank.com/profile/piyushmaurya8421 |
| X (Twitter) | https://x.com/piyushmaurya22 |
| Instagram | https://www.instagram.com/piyushmaurya22 |

---

## 3. Hero Section

- **Greeting:** "Hi, I'm **Piyush Maurya**"
- **Animated typed roles:**
  1. Software Engineer
  2. Java · Spring Boot Developer
  3. Kafka Pipeline Engineer
  4. Backend & Microservices Dev
- **Description:** Software Engineer skilled in building **enterprise Java / Spring Boot** applications and **event-driven, fault-tolerant Kafka pipelines** with DLQ handling. Recognized with a **TCS GEMS Award** for Best Team.
- **CTAs:** "View My Work" → Projects · "Get In Touch" → Contact
- **Code card (Developer.java):**
  ```java
  public class Developer {
    String name  = "Piyush Maurya";
    String role  = "Software Engineer";
    String Working_At  = "Tata Consultancy Services";

    String[] Tech_Stack = {
      "Java", "Spring Boot",
      "Apache Kafka", "Microservices", "SQL"
    };

    boolean isAvailable() {
      return true;
    }
  }
  ```

---

## 4. About

I'm a Software Engineer at **Tata Consultancy Services (TCS)**, working on the client account in Mumbai. I build enterprise Java / Spring Boot applications and design **event-driven, fault-tolerant Apache Kafka pipelines** with dead-letter-queue handling that eliminate manual intervention and prevent data loss.

I have a solid foundation in SQL, production support, and CI/CD (Docker, Jenkins). I independently own the full production deployment lifecycle, from build to release, and was recognized with a **TCS GEMS Award for Best Team**.

**Quick facts:**
- B.Tech. Computer Engineering, SSVPS, Dhule (2020–2024)
- System Engineer @ TCS, Mumbai, India
- Java · Spring Boot · Kafka · Microservices

**Stats:**
| Number | Label |
|--------|-------|
| 4 | Kafka consumer services built |
| 150+ | DSA problems solved |
| 93K | Messages processed / topic |
| GEMS | TCS Best Team Award |

---

## 5. Work Experience

### System Engineer — Tata Consultancy Services (TCS)
- **Team/Account:** Enterprise Client Account
- **Period:** Jan 2025 – Present (start date `2025-01-16`, live tenure counter)
- **Location:** Mumbai, India

**Responsibilities & Achievements:**
- Enhanced an enterprise web application (**PSS**) with new business features and production-defect fixes, improving stability and reliability.
- Designed and built **four Spring Boot Kafka consumer services** ingesting real-time distributor data, each via **3 parallel partitions per topic**; an initial load of **70K–93K messages/topic** was consumed and persisted within seconds of deployment.
- Implemented **eventId-based deduplication** against Oracle stored procedures (UPSERT/DELETE) for exactly-once writes, with full schema validation before persistence.
- Architected a **two-tier fault-tolerance strategy**: in-memory retry (5 attempts, 1-min backoff) + immediate DLQ routing with throttled email alerts, plus a scheduled **DLQ reprocessor** (every 2 hrs, up to 12 retries).
- Secured all Kafka connections with **OAuth (SASL_SSL)** and **Conjur-managed credentials** in Kubernetes across four environments (DEV/LT/STG/PRD).
- Validated a **Teradata-to-Snowflake** data migration and independently owned the client's end-to-end production deployment lifecycle.

**Tech tags:** Spring Boot · Apache Kafka · Oracle SQL · OAuth SASL_SSL · Kubernetes · Conjur

---

## 6. Education & Training

### Education
| Degree | Institution | Year | Score |
|--------|-------------|------|-------|
| B.Tech in Computer Science Engineering | SSVPS Bapusaheb Shivajirao Deore College of Engineering, Dhule | 2020–2024 | CGPA: 8.59 |
| HSC (Higher Secondary) | GTP College, Nandurbar | 2018–2020 | 61.85% |
| SSC (Secondary) | S.A. Mission English Medium High School, Nandurbar | 2018 | 86.80% |

### Trainings
| Course | Provider | Note |
|--------|----------|------|
| Java Language | Ashwadeep Computer Classes, Dhule | — |
| App Development | Infotech Incorporate, Dhule | — |
| Web Development | TechnoHacks Edutech, Nashik | Internship |

---

## 7. Technical Skills

### Proficiency Rings
| Skill | Level |
|-------|-------|
| Java | 90% |
| Spring Boot | 88% |
| Apache Kafka | 85% |
| SQL | 82% |
| JavaScript | 75% |

### Skill Groups
- **Languages:** Java · Python · JavaScript · SQL
- **Backend & Messaging:** Spring Boot · REST APIs · Apache Kafka · JDBC · Microservices · JWT Auth · OAuth (SASL_SSL)
- **DevOps & Tools:** Git · Maven · Docker · Jenkins · Postman · Conjur · IntelliJ IDEA · Eclipse · Offset Explorer
- **Frontend & Databases:** HTML · CSS · JavaScript · React · Angular · MySQL · Oracle SQL
- **Practices:** Agile / Scrum · Production Support · DLQ Design · Root-Cause Analysis

---

## 8. Projects

### Featured — Tenant & Owner Management System (TOM)
- **Status:** Featured · In Progress
- **Description:** An owner-managed property platform with a normalized relational schema and REST APIs for Users, Properties, and Leases. Financial logic is computed server-side to guarantee accuracy and avoid data staleness.
- **Highlights:**
  - Anniversary-based, **idempotent rent-billing engine** using Spring `@Scheduled`, invoicing in arrears with month-end date clamping.
  - Duplicate-prevention via a DB unique constraint + application-level check.
  - Owner-configurable late-fee logic (grace period + per-day fine).
  - Payment-lifecycle state machine: `PENDING → LATE → AWAITING_APPROVAL → PAID`.
  - Dues modeled as a computed aggregate over unpaid rent rows (no stored totals).
  - Planned: JWT auth with per-user isolation, React frontend, Python/FastAPI LLM function-calling microservice.
- **Tech:** Java · Spring Boot · Spring Data JPA · Hibernate · MySQL · Maven
- **Diagram entities:** User → Property → Lease → Payment

### Netflix Clone
- **Type:** Frontend
- **Description:** A pixel-faithful replica of the Netflix user interface, built to master responsive layout, component structure, and interactive UI patterns.
- **Highlights:** Responsive hero banner & horizontally scrollable rows · hover/card-scaling effects · clean semantic HTML/CSS + vanilla JS.
- **Tech:** HTML · CSS · JavaScript
- **Repo:** https://github.com/piyushmaurya04/Netflix-Clone-

### Weather Application
- **Type:** Full Stack
- **Description:** A dynamic weather app that serves real-time weather data through a Java backend, with a responsive client interface.
- **Highlights:** Frontend in HTML/CSS/JS · backend in Java JSP & Servlets · real-time weather lookups with a clean UI.
- **Tech:** HTML · CSS · JavaScript · Java JSP · Servlets
- **Repo:** https://github.com/piyushmaurya04/Weather-project

### Myntra Clone
- **Type:** Frontend
- **Description:** A responsive e-commerce clone of Myntra featuring a full shopping experience on the frontend.
- **Highlights:** Dynamic product listings with interactive cart · user authentication flow · add-to-bag with live cart updates.
- **Tech:** HTML · CSS · JavaScript
- **Repo:** Coming soon

> All repositories: https://github.com/piyushmaurya04

---

## 9. Achievements & Coding Profiles

| Achievement | Details |
|-------------|---------|
| 🏆 **TCS GEMS Award · Best Team** | Recognized for outstanding team contribution. Independently designed and deployed a production-ready Kafka consumer service with DLQ and auto-retry, adopted as a critical upstream data source. |
| 🧠 **LeetCode** | 150+ DSA problems solved: arrays, trees, graphs, DP, sorting. |
| ⭐ **CodeChef · 2★** | Highest rating **1565**. Strong in algorithms, data structures & competitive programming. |
| 🥇 **HackerRank** | Gold Badge in Java (5★): advanced Java proficiency & problem-solving. |

---

## 10. Site Structure / Navigation

Sections (in order): **Home · About · Experience · Education · Skills · Projects · Achievements · Contact**

Additional UI elements to reproduce:
- Preloader with "PM" logo animation
- Scroll progress bar
- Animated background (blobs + grid overlay)
- Custom cursor + dot follower
- Scroll-spy dot navigation (right side)
- Back-to-top button
- Footer: "© {year} Piyush Maurya. Designed & built with care." + links (About, Projects, Contact)
- Contact form: Name, Email, Message (with validation) + "Send Message"
- Toast notifications (e.g. copy-to-clipboard email)
- Project detail modal (badge, title, description, highlights, tags, links). When a project has no public repo, actions show a `Private / in-progress repository` tag. Closes via overlay click, close button, or `Escape`; locks body scroll and manages focus (accessibility).
- Hero **constellation canvas**: animated particle network (up to 70 nodes) with line connections and gentle mouse attraction; pauses when hero is off-screen for performance; uses the active theme `--accent` color.
- Resume button: no file yet — on click shows toast *"Contact Piyush Maurya for the latest resume – Email, phone, or message"*.

---

## 11. Theming System

**Modes:** Dark / Light toggle. Default theme: `dark-midnight`. Persisted in `localStorage` key `pm-theme`.

### Dark Themes
| Key | Name | Gradient |
|-----|------|----------|
| dark-midnight | Midnight | #60a5fa → #818cf8 |
| dark-ocean | Ocean | #22b8cf → #38bdf8 |
| dark-graphite | Graphite | #a78bfa → #c4b5fd |
| dark-emerald | Emerald | #34d399 → #2dd4bf |
| dark-plum | Plum | #fb7185 → #f43f5e |
| dark-amber | Amber | #fbbf24 → #f59e0b |

### Light Themes
| Key | Name | Gradient |
|-----|------|----------|
| light-porcelain | Porcelain | #2563eb → #7c3aed |
| light-azure | Azure | #0369a1 → #0ea5e9 |
| light-slate | Slate | #4f46e5 → #818cf8 |
| light-mint | Mint | #047857 → #34d399 |
| light-rose | Rose | #be123c → #fb7185 |
| light-sand | Sand | #b45309 → #f59e0b |

**Dark ↔ Light pairs:** midnight↔porcelain · ocean↔azure · graphite↔slate · emerald↔mint · plum↔rose · amber↔sand

---

## 12. Design & Typography

- **Fonts (Google Fonts):**
  - Space Grotesk (400/500/600/700) — headings
  - Inter (300/400/500/600) — body
  - JetBrains Mono (400/500) — code
- **Interactions:** typing effect, scroll reveal animations, count-up stats, animated skill rings, 3D tilt cards, magnetic buttons, live experience tenure counter, custom cursor, hero constellation canvas.
- **Accessibility:** respects `prefers-reduced-motion`; ARIA labels throughout; semantic HTML; focus management in modal.

---

## 12b. Contact Form / Integrations

- **Backend:** Google Apps Script Web App endpoint (POST `FormData`).
  - Script URL: `https://script.google.com/macros/s/AKfycbwa9WFJL_v2aPRY4DccuIEqeWpbrxxsZZSkrhy5yNjhLQAxA3XZ6bhZOMfUo0PnpKDj/exec`
  - Fields sent: `Name`, `Email`, `Messages`.
  - Uses `mode: 'no-cors'`, `keepalive: true`, and a 30-second abort timeout.
- **EmailJS** browser SDK (`@emailjs/browser@4`) is also loaded via CDN (available as an alternative sender).
- **Client-side validation:** required Name, valid Email (regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`), required Message; inline field errors; "Sending…" state; success/error toasts.

### How "Send Message" works (step-by-step flow)

1. **Submit intercepted** — the form's default submit is prevented (`e.preventDefault()`); the page never reloads.
2. **Read & trim inputs** — `name`, `email`, and `message` values are read and trimmed.
3. **Validate fields** (blocks send if any fail, showing inline errors under each field):
   - Name — must not be empty → *"Please enter your name."*
   - Email — must not be empty → *"Please enter your email."*; must match the email regex → *"Enter a valid email address."*
   - Message — must not be empty → *"Please write a message."*
4. **Enter sending state** — submit button is disabled, its text becomes **"Sending…"**, and the note shows *"This may take few seconds"*.
5. **Build payload** — a `FormData` object is created with keys `Name`, `Email`, `Messages`.
6. **Send request** — `fetch(scriptURL, …)` POSTs to the Google Apps Script Web App with:
   - `method: 'POST'`, `body: formData`
   - `mode: 'no-cors'` (response is opaque — success is assumed if no error is thrown)
   - `keepalive: true` (lets the request complete even if the page is navigating away)
   - `signal` from an `AbortController` with a **30-second timeout** (`setTimeout` → `controller.abort()`).
7. **On success** — note shows *"Message sent successfully ✓"*, a toast shows *"Message sent ✓"*, the form is reset, and the note auto-clears after 3 seconds.
8. **On failure**:
   - `AbortError` (timeout) → *"Request timeout. Server may be slow. Try again in a moment."*
   - Network/other error → *"Failed to send message. Please check your connection."* + toast *"Failed to send message"*.
9. **Finally** — the timeout is cleared, the submit button is re-enabled, and its original text ("Send Message") is restored.

**Server side:** the Google Apps Script receives the `FormData` and appends the `Name`, `Email`, and `Messages` values as a row into a linked Google Sheet (and/or forwards them by email), acting as a serverless form backend with no database required.

> ⚠️ On rebuild, move the Apps Script URL / EmailJS keys to environment variables and add spam protection (honeypot / rate limiting).

---

## 13. Rebuild Notes (React Migration)

Suggested component breakdown:
- `Preloader`, `ScrollProgress`, `AnimatedBackground`, `CustomCursor`
- `Navbar` (logo, links, theme selector, resume, burger), `DotNav`
- `Hero` (typed roles, code card, social links)
- `About` (text + stat cards)
- `Experience` (timeline with live tenure)
- `Education` (education + trainings columns)
- `Skills` (proficiency rings + skill-group marquees)
- `Projects` (featured card + project grid + modal)
- `Achievements` (award + coding-profile cards)
- `Contact` (info + form)
- `Footer`, `Toast`, `ThemeProvider` (context + localStorage)

Data to externalize into JSON/TS config: personal info, social links, experience, education, trainings, skills, projects, achievements, themes.
