/* ============================================================
   Piyush Maurya — Portfolio
   Interactions: theme, typing, reveal, nav, cursor, tilt, form
   ============================================================ */

(function () {
  "use strict";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    const pre = $("#preloader");
    if (pre) setTimeout(() => pre.classList.add("is-done"), 500);
  });

  /* ---------- Theme Selection ---------- */
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const themeMenuBtn = $("#themeMenuBtn");
  const themeMenu = $("#themeMenu");
  const themeSwatches = $$(".theme-swatch");
  
  const storedTheme = localStorage.getItem("pm-theme") || "dark-celadon";
  root.setAttribute("data-theme", storedTheme);
  
  // Determine light/dark mode from theme name
  const updateModeFromTheme = (theme) => {
    const isLight = theme.startsWith("light-");
    root.setAttribute("data-mode", isLight ? "light" : "dark");
  };
  updateModeFromTheme(storedTheme);

  // Theme toggle (dark/light mode only)
  themeToggle?.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const currentMode = currentTheme.startsWith("light-") ? "light" : "dark";
    const newMode = currentMode === "dark" ? "light" : "dark";
    
    // Switch to same color family but opposite mode
    const colorFamily = currentTheme.split("-")[1]; // e.g., "celadon", "aurora"
    const colorMap = {
      "celadon": { dark: "dark-celadon", light: "light-sky" },
      "aurora": { dark: "dark-aurora", light: "light-rose" },
      "ocean": { dark: "dark-ocean", light: "light-sky" },
      "forest": { dark: "dark-forest", light: "light-lime" },
      "sunset": { dark: "dark-sunset", light: "light-peach" }
    };
    
    const family = colorMap[colorFamily] ? colorFamily : "celadon";
    const newTheme = colorMap[family][newMode];
    
    root.setAttribute("data-theme", newTheme);
    root.setAttribute("data-mode", newMode);
    localStorage.setItem("pm-theme", newTheme);
    highlightCurrentTheme();
  });

  // Theme menu toggle
  themeMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    themeMenu?.classList.toggle("is-open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".theme-selector")) {
      themeMenu?.classList.remove("is-open");
    }
  });

  // Theme swatch selection
  themeSwatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      const theme = swatch.dataset.theme;
      root.setAttribute("data-theme", theme);
      updateModeFromTheme(theme);
      localStorage.setItem("pm-theme", theme);
      themeMenu?.classList.remove("is-open");
      highlightCurrentTheme();
    });
  });

  // Highlight current theme
  const highlightCurrentTheme = () => {
    themeSwatches.forEach(swatch => {
      if (swatch.dataset.theme === root.getAttribute("data-theme")) {
        swatch.style.borderColor = "var(--accent)";
      } else {
        swatch.style.borderColor = "transparent";
      }
    });
  };
  
  // Initial highlight
  highlightCurrentTheme();

  /* ---------- Year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Live experience tenure ---------- */
  const tenureEl = $(".timeline__tenure");
  const tenureValue = $("#tenureValue");
  if (tenureEl && tenureValue) {
    const since = new Date(tenureEl.dataset.since + "T00:00:00");
    const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
    const updateTenure = () => {
      const now = new Date();
      let years = now.getFullYear() - since.getFullYear();
      let months = now.getMonth() - since.getMonth();
      let days = now.getDate() - since.getDate();
      if (days < 0) {
        months -= 1;
        // days in the previous month relative to now
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) { years -= 1; months += 12; }
      tenureValue.textContent =
        `${plural(years, "year")}, ${plural(months, "month")}, ${plural(days, "day")}`;
    };
    updateTenure();
    // Re-check periodically so it rolls over the day boundary while the page is open
    setInterval(updateTenure, 60 * 1000);
  }

  /* ---------- Nav scroll state + active link ---------- */
  const nav = $("#nav");
  const navLinks = $$(".nav__link");
  const dotLinks = $$(".dot-nav__dot");
  const timelineEl = $("#timeline");
  const timelineProgress = $("#timelineProgress");
  const sections = navLinks
    .map((l) => $(l.getAttribute("href")))
    .filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("is-scrolled", y > 20);

    // scroll progress
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const prog = $("#scrollProgress");
    if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";

    // back to top
    $("#toTop")?.classList.toggle("is-visible", y > 500);

    // active section
    let current = sections[0]?.id;
    for (const sec of sections) {
      if (sec.offsetTop - 120 <= y) current = sec.id;
    }
    navLinks.forEach((l) =>
      l.classList.toggle("is-active", l.getAttribute("href") === "#" + current)
    );
    dotLinks.forEach((d) =>
      d.classList.toggle("is-active", d.getAttribute("href") === "#" + current)
    );

    // timeline scroll-linked fill
    if (timelineEl && timelineProgress) {
      const r = timelineEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const total = r.height + start - vh * 0.35;
      const passed = Math.min(Math.max(start - r.top, 0), total);
      const pct = total > 0 ? (passed / total) * 100 : 0;
      timelineProgress.style.height = Math.min(pct, 100) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = $("#navBurger");
  const menu = $("#navLinks");
  burger?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  navLinks.forEach((l) =>
    l.addEventListener("click", () => {
      menu.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Back to top ---------- */
  $("#toTop")?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
  );

  /* ---------- Typing effect ---------- */
  const typed = $("#typed");
  if (typed) {
    const roles = [
      "Software Engineer",
      "Java · Spring Boot Developer",
      "Kafka Pipeline Engineer",
      "Backend & Microservices Dev",
    ];
    let ri = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = roles[ri];
      typed.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) {
        ci++;
      } else if (deleting && ci > 0) {
        ci--;
      } else if (!deleting && ci === word.length) {
        deleting = true;
        return setTimeout(tick, 1600);
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
      setTimeout(tick, deleting ? 45 : 95);
    };
    if (prefersReduced) { typed.textContent = roles[0]; } else { tick(); }
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const delay = e.target.dataset.delay || (i % 4) * 70;
            setTimeout(() => e.target.classList.add("is-visible"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("is-visible"));
  }

  /* ---------- Count-up stats ---------- */
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = +el.dataset.count;
          const suffix = el.dataset.suffix || "";
          const dur = 1400;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- Custom cursor ---------- */
  const cursor = $("#cursor");
  const cursorDot = $("#cursorDot");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (cursor && cursorDot && fine && !prefersReduced) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    $$("a, button, [data-tilt], .tag, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  /* ---------- 3D tilt ---------- */
  if (fine && !prefersReduced) {
    $$("[data-tilt]").forEach((card) => {
      const strength = 8;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (fine && !prefersReduced) {
    $$("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
    });
  }

  /* ---------- Toast helper ---------- */
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2600);
  };

  /* ---------- Copy to clipboard ---------- */
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        showToast("Copied " + value + " ✓");
      } catch {
        // Fallback for insecure contexts / older browsers
        const ta = document.createElement("textarea");
        ta.value = value; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); showToast("Copied " + value + " ✓"); }
        catch { showToast("Press Ctrl+C to copy"); }
        ta.remove();
      }
    });
  });

  /* ---------- Skill proficiency rings ---------- */
  const rings = $$(".ring");
  if (rings.length && "IntersectionObserver" in window) {
    const CIRC = 2 * Math.PI * 52; // r = 52
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const ring = e.target;
        const value = +ring.dataset.value;
        const fg = ring.querySelector(".ring__fg");
        const pct = ring.querySelector(".ring__pct");
        if (fg) fg.style.strokeDashoffset = CIRC * (1 - value / 100);
        // animate number
        if (pct) {
          if (prefersReduced) { pct.textContent = value + "%"; }
          else {
            const start = performance.now(), dur = 1400;
            const step = (now) => {
              const p = Math.min((now - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              pct.textContent = Math.round(value * eased) + "%";
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        }
        rio.unobserve(ring);
      });
    }, { threshold: 0.5 });
    rings.forEach((r) => rio.observe(r));
  }

  /* ---------- Project detail modals ---------- */
  const PROJECTS = {
    tom: {
      badge: "Featured · In Progress",
      title: "Tenant & Owner Management System (TOM)",
      desc: "An owner-managed property platform with a normalized relational schema and REST APIs for Users, Properties, and Leases. Financial logic is computed server-side to guarantee accuracy and avoid data staleness.",
      highlights: [
        "Anniversary-based, <strong>idempotent rent-billing engine</strong> using Spring <code>@Scheduled</code>, invoicing in arrears with month-end date clamping.",
        "Duplicate-prevention via a DB unique constraint + application-level check.",
        "Owner-configurable late-fee logic (grace period + per-day fine).",
        "Payment-lifecycle state machine: <code>PENDING → LATE → AWAITING_APPROVAL → PAID</code>.",
        "Dues modeled as a computed aggregate over unpaid rent rows (no stored totals).",
        "Planned: JWT auth with per-user isolation, React frontend, Python/FastAPI LLM function-calling microservice.",
      ],
      tags: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "Maven"],
      links: [],
    },
    netflix: {
      badge: "Frontend",
      title: "Netflix Clone",
      desc: "A pixel-faithful replica of the Netflix user interface, built to master responsive layout, component structure, and interactive UI patterns.",
      highlights: [
        "Responsive hero banner and horizontally scrollable content rows.",
        "Hover interactions and card scaling effects.",
        "Clean, semantic HTML/CSS structure with vanilla JavaScript.",
      ],
      tags: ["HTML", "CSS", "JavaScript"],
      links: [{ label: "View on GitHub", href: "https://github.com/piyushmaurya04/Netflix-Clone-", primary: true }],
    },
    weather: {
      badge: "Full Stack",
      title: "Weather Application",
      desc: "A dynamic weather app that serves real-time weather data through a Java backend, with a responsive client interface.",
      highlights: [
        "Frontend built with HTML, CSS, and JavaScript.",
        "Backend powered by Java JSP and Servlets.",
        "Real-time weather lookups with a clean, readable UI.",
      ],
      tags: ["HTML", "CSS", "JavaScript", "Java JSP", "Servlets"],
      links: [{ label: "View on GitHub", href: "https://github.com/piyushmaurya04/Weather-project", primary: true }],
    },
    myntra: {
      badge: "Frontend",
      title: "Myntra Clone",
      desc: "A responsive e-commerce clone of Myntra featuring a full shopping experience on the frontend.",
      highlights: [
        "Dynamic product listings with an interactive shopping cart.",
        "User authentication flow.",
        "Add-to-bag functionality with live cart updates.",
      ],
      tags: ["HTML", "CSS", "JavaScript"],
      links: [],
    },
  };

  const modal = $("#projectModal");
  if (modal) {
    const mBadge = $("#modalBadge"), mTitle = $("#modalTitle"), mDesc = $("#modalDesc");
    const mHigh = $("#modalHighlights"), mTags = $("#modalTags"), mActions = $("#modalActions");
    let lastFocused = null;

    const openModal = (id) => {
      const p = PROJECTS[id];
      if (!p) return;
      lastFocused = document.activeElement;
      mBadge.textContent = p.badge;
      mTitle.textContent = p.title;
      mDesc.innerHTML = p.desc;
      mHigh.innerHTML = p.highlights.map((h) => `<li>${h}</li>`).join("");
      mTags.innerHTML = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
      mActions.innerHTML = p.links.length
        ? p.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener" class="btn ${l.primary ? "btn--primary" : "btn--outline"} btn--sm">${l.label}</a>`).join("")
        : `<span class="tag">Private / in-progress repository</span>`;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      $(".modal__close", modal)?.focus();
    };
    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lastFocused?.focus();
    };

    $$("[data-project]").forEach((el) =>
      el.addEventListener("click", () => openModal(el.dataset.project))
    );
    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  /* ---------- Hero constellation canvas ---------- */
  const canvas = $("#heroCanvas");
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext("2d");
    let w, h, points = [], raf;
    const mouse = { x: -9999, y: -9999 };
    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#c0ded9";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = rect.width * dpr;
      h = canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor(rect.width / 22));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const col = accent();
      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > rect.width) p.vx *= -1;
        if (p.y < 0 || p.y > rect.height) p.vy *= -1;
        // gentle mouse attraction
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) { p.x += dx * 0.008; p.y += dy * 0.008; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      }
      // connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = col;
            ctx.globalAlpha = (1 - d / 120) * 0.28;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const heroEl = $("#home");
    heroEl?.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });
    heroEl?.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });
    window.addEventListener("resize", resize);
    resize();
    draw();
    // Pause when hero not visible (perf)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) { if (!raf) draw(); }
          else { cancelAnimationFrame(raf); raf = null; }
        });
      }, { threshold: 0 }).observe(canvas);
    }
  }

  /* ---------- Contact form (Google Apps Script) ---------- */
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwa9WFJL_v2aPRY4DccuIEqeWpbrxxsZZSkrhy5yNjhLQAxA3XZ6bhZOMfUo0PnpKDj/exec';
  
  const form = $("#contactForm");
  if (form) {
    const note = $("#formNote");
    const submitBtn = $("button[type=submit]", form);
    const setError = (id, msg) => {
      const field = $("#" + id).closest(".field");
      field.classList.toggle("is-invalid", !!msg);
      const err = $(`.field__error[data-for="${id}"]`);
      if (err) err.textContent = msg || "";
    };
    const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = $("#cName").value.trim();
      const email = $("#cEmail").value.trim();
      const message = $("#cMessage").value.trim();
      let ok = true;

      if (!name) { setError("cName", "Please enter your name."); ok = false; } else setError("cName");
      if (!email) { setError("cEmail", "Please enter your email."); ok = false; }
      else if (!validEmail(email)) { setError("cEmail", "Enter a valid email address."); ok = false; }
      else setError("cEmail");
      if (!message) { setError("cMessage", "Please write a message."); ok = false; } else setError("cMessage");
      if (!ok) return;

      // Disable button and show sending state
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      if (note) note.textContent = "This may take few seconds";

      try {
        // Create FormData with the form fields
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Email", email);
        formData.append("Messages", message);

        console.log("Sending message to Google Apps Script...");

        // Setup abort timeout (30 seconds - Google Apps Script can be slow)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          console.log("Request timeout after 30 seconds");
          controller.abort();
        }, 30000);

        // Send to Google Apps Script with no-cors mode for better compatibility
        const response = await fetch(scriptURL, { 
          method: 'POST', 
          body: formData,
          mode: 'no-cors',
          keepalive: true,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        console.log("Message sent successfully");
        
        // Success - no-cors mode always returns opaque response, so we assume success
        if (note) note.textContent = "Message sent successfully ✓";
        showToast("Message sent ✓");
        form.reset();
        
        // Clear note after 3 seconds
        setTimeout(() => {
          if (note) note.textContent = "";
        }, 3000);
      } catch (error) {
        console.error('Fetch error:', error);
        if (error.name === 'AbortError') {
          console.error("Request timed out");
          if (note) note.textContent = "Request timeout. Server may be slow. Try again in a moment.";
        } else {
          console.error("Network error:", error.message);
          if (note) note.textContent = "Failed to send message. Please check your connection.";
        }
        showToast("Failed to send message");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

  /* ---------- Resume button message ---------- */
  const resumeBtn = $("#resumeBtn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Contact Piyush Maurya for the latest resume – Email, phone, or message");
    });
  }
})();
