# Portfolio Details — Piyush Maurya (Updated 2026)

> Primary source: `resume.txt` (latest resume)
> Reference (old site): https://piyushmaurya-portfolio.netlify.app/
> This document is the foundation for building the NEW, improved portfolio website.

---

## 1. Personal Profile

| Field | Detail |
|-------|--------|
| **Name** | Piyush Maurya |
| **Title / Role** | Software Engineer — Java / Spring Boot / Kafka |
| **Location** | Maharashtra, India |
| **Current Position** | System Engineer at Tata Consultancy Services (TCS) — Enterprise Client Account, Mumbai |
| **Email** | piyush.maurya0410@gmail.com |
| **Phone** | +91 8600450745 |

---

## 2. Professional Summary

Software Engineer skilled in building enterprise Java/Spring Boot applications and event-driven, fault-tolerant Kafka pipelines with DLQ handling. Solid foundation in SQL, production support, and CI/CD (Docker, Jenkins); recognized with a TCS GEMS Award for Best Team.

---

## 3. Technical Skills

### Languages
- Java
- Python
- JavaScript
- SQL

### Backend & Messaging
- Spring Boot
- REST APIs
- Apache Kafka
- JDBC
- Microservices
- JWT Authentication
- OAuth (SASL_SSL)

### DevOps & Tools
- Git
- Maven
- Postman
- Conjur
- IntelliJ IDEA
- Eclipse
- Offset Explorer

### Frontend & Databases
- HTML
- CSS
- JavaScript
- React (Basic)
- Angular (Basic)
- MySQL
- Oracle SQL (Basic)

### Practices
- Agile / Scrum
- Production Support
- Dead Letter Queue (DLQ) Design
- Bug Fixing & Root-Cause Analysis

---

## 4. Professional Experience

### Tata Consultancy Services (TCS) — System Engineer
**Enterprise Client Account | Mumbai, India | Jan 2025 – Present**

- Enhanced an enterprise web application (PSS) by implementing new business features and fixing production defects, improving overall application stability and reliability.
- Designed and built **four Spring Boot Kafka consumer services** ingesting real-time distributor data across environment-specific topics, each processed via **3 parallel partitions per topic**; the initial production load of **70K–93K messages per topic** was consumed and persisted successfully within seconds of deployment.
- Implemented **eventId-based deduplication** against Oracle stored procedures (UPSERT/DELETE) to guarantee exactly-once writes, with full schema validation before persistence.
- Architected a **two-tier fault-tolerance strategy** — Spring-managed in-memory retry (5 attempts, 1-min backoff) for transient errors, plus immediate DLQ routing with throttled email alerts for malformed messages — and a **scheduled DLQ reprocessor** (every 2 hrs, up to 12 retries) that eliminated manual intervention and prevented data loss.
- Secured all Kafka connections with **OAuth (SASL_SSL)** and **Conjur-managed credentials** in Kubernetes, deployed consistently across four environments (DEV/LT/STG/PRD).
- Performed testing and validation during a **Teradata-to-Snowflake data migration** as part of an Agile team.
- Self-deployed all implementations to production by independently following the client's production deployment lifecycle end-to-end.

---

## 5. Projects

### Tenant & Owner Management System (TOM) — *In Progress*
**Tech Stack:** Java, Spring Boot, Spring Data JPA (Hibernate), MySQL, Maven
**Planned:** Spring Security (JWT), React, Python/FastAPI

- Designed a normalized relational schema and REST APIs for an owner-managed property platform (Users, Properties, Leases), with correct JPA relationship ownership modeling and tenant-code-based lease linking.
- Engineered an **anniversary-based, idempotent rent-billing engine** using Spring Boot's `@Scheduled`, generating monthly invoices in arrears with month-end date clamping and duplicate-prevention via a DB unique constraint + application-level check.
- Implemented owner-configurable late-fee logic (grace period + per-day fine) and a **payment-lifecycle state machine** (PENDING → LATE → AWAITING_APPROVAL → PAID) for online and owner-approved cash payments.
- Designed dues/balance as a **computed aggregate** over unpaid rent rows rather than a stored total, avoiding data staleness and keeping financial calculations server-side.
- Planning JWT authentication with per-user data isolation, a React frontend, and a Python/FastAPI microservice using **LLM function-calling** for natural-language queries over the user's own data.

### Netflix Clone
**Tech:** HTML, CSS, JavaScript
- A replica of the Netflix UI focused on frontend web development techniques.
- **Repo:** https://github.com/piyushmaurya04/Netflix-Clone-

### Weather Application
**Tech:** HTML, CSS, JavaScript (Frontend) · Java JSP, Servlets (Backend)
- A dynamic weather application showing real-time weather data.
- **Repo:** https://github.com/piyushmaurya04/Weather-project

### Myntra Clone
**Tech:** HTML, CSS, JavaScript
- A responsive Myntra clone with dynamic product listings, interactive shopping cart, user authentication, and add-to-bag functionality.
- **Repo:** (to be added)

---

## 6. Education

- **B.Tech in Computer Science Engineering** — 2020–2024
  SSVPS Bapusaheb Shivajirao Deore College of Engineering, Dhule — CGPA: 8.59
- **HSC (Higher Secondary)** — 2018–2020
  GTP College, Nandurbar — Percentage: 61.85%
- **SSC (Secondary)** — 2018
  S.A. Mission English Medium High School, Nandurbar — Percentage: 86.80%

### Trainings
- **Java Language** — Ashwadeep Computer Classes, Dhule
- **App Development** — Infotech Incorporate, Dhule
- **Web Development (Internship)** — TechnoHacks Edutech, Nashik

---

## 7. Achievements & Certifications

- Received the **TCS GEMS Award for Best Team**.
- Independently designed and deployed a production-ready Kafka consumer service with DLQ and auto-retry, adopted as a critical upstream data source.
- **HackerRank Gold Badge in Java**
- **CodeChef 2★**
- **150+ DSA problems on LeetCode**

---

## 8. Profile / Social Links

| Platform | Link |
|----------|------|
| **LinkedIn** | https://www.linkedin.com/in/piyush-maurya-a1a5a1256/ |
| **GitHub** | https://github.com/piyushmaurya04 |
| **Instagram** | https://www.instagram.com/piyushmaurya22?igsh=bnF5N2ZxMDVwdTZj |
| **X (Twitter)** | https://x.com/piyushmaurya22 |
| **LeetCode** | https://leetcode.com/u/mauryapiyush30/ |
| **CodeChef** | https://www.codechef.com/users/piyushmaurya04 |
| **HackerRank** | https://www.hackerrank.com/profile/piyushmaurya8421 |

> Note: Email on latest resume is **piyush.maurya0410@gmail.com** (old site used piyushmaurya0410@gmail.com — confirm which to use).

---

## 9. Proposed Structure for the New Website

1. **Hero** — Name, title (Software Engineer | Java · Spring Boot · Kafka), CTA (View Work / Contact / Download Resume)
2. **About** — professional summary + quick highlights (TCS, TCS GEMS Award)
3. **Experience** — TCS timeline with the Kafka achievements
4. **Skills** — grouped (Languages, Backend & Messaging, DevOps, Frontend & DB, Practices)
5. **Projects** — TOM (featured) + Netflix Clone + Weather App + Myntra Clone
6. **Achievements** — awards, coding profiles (LeetCode / CodeChef / HackerRank)
7. **Contact** — email, phone, social links, resume download, contact form

### Design & Tech Recommendations
- **Stack:** Static website — HTML, CSS, JavaScript (fast, easy to host on Netlify/GitHub Pages).
- **Theme:** modern dark/light toggle, clean typography, subtle animations.
- **Must-haves:** responsive, accessible (a11y), SEO meta + Open Graph, fast load.
- **Extras:** live demo links, downloadable resume PDF, smooth scroll navigation.

---

## 10. Build Plan
- **Type:** Static website (no backend build step required for hosting).
- **All projects kept:** TOM (featured) + Netflix Clone + Weather App + Myntra Clone.
- **All links kept:** LinkedIn, GitHub, Instagram, X, LeetCode, CodeChef, HackerRank + project repos.

### Open Questions (nice to confirm, not blocking)
1. Which email to show — `piyush.maurya0410@gmail.com` (resume) or `piyushmaurya0410@gmail.com` (old site)?
2. Do you have a new resume PDF to link for download?
3. Any brand colors / design preference (minimal, colorful, dark, etc.)?

---

*Updated to reflect the latest resume. This is the single source of truth for the new static website build.*
