/* ===========================
   AARSHI WEBSITE — JS
   =========================== */

(function () {
  "use strict";

  /* --- SPA PAGE SWITCHING --- */
  function showPage(pageId) {
    document.body.setAttribute("data-current-page", pageId);
    // Update nav active state
    document.querySelectorAll(".nav-page-link").forEach(a => {
      a.classList.toggle("active", a.dataset.page === pageId);
    });
    // Close mobile menu
    document.getElementById("navLinks")?.classList.remove("open");
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });
    // Save in history so back button works
    history.pushState({ page: pageId }, "", "#" + pageId);
  }

  // Default to about on load
  const initPage = location.hash.replace("#", "") || "about";
  document.body.setAttribute("data-current-page", initPage);

  document.querySelectorAll(".nav-page-link").forEach(a => {
    a.classList.toggle("active", a.dataset.page === initPage);
    a.addEventListener("click", e => {
      e.preventDefault();
      showPage(a.dataset.page);
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", e => {
    const page = (e.state && e.state.page) || "about";
    document.body.setAttribute("data-current-page", page);
    document.querySelectorAll(".nav-page-link").forEach(a =>
      a.classList.toggle("active", a.dataset.page === page)
    );
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  // Story CTA: switch to events page instead of anchor scroll
  const storyCta = document.getElementById("storyCta");
  if (storyCta) storyCta.addEventListener("click", e => {
    e.preventDefault();
    showPage("events");
  });

  /* --- THEME TOGGLE --- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Initialise: use saved preference, then system preference, then default dark
  const savedTheme = localStorage.getItem("aarshi-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initialTheme);

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("aarshi-theme", theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  // Listen for OS-level changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("aarshi-theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
  const curtain = document.getElementById("curtain");
  if (curtain) {
    // Small delay so user sees the curtain, then open
    setTimeout(() => {
      curtain.classList.add("open");
      // Remove from DOM after animation so it doesn't block
      setTimeout(() => curtain.classList.add("gone"), 1300);
    }, 800);
  }

  /* --- NAV SCROLL STATE --- */
  const nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- MOBILE NAV TOGGLE --- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open") ? "true" : "false"
      );
    });
    // Close on link click
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- SCROLL REVEAL --- */
  const revealEls = document.querySelectorAll(
    ".pillar, .event-card, .trophy-item, .ach-item, .team-card, .contact-card, .about-text, .about-pillars, .trophy-banner, .other-achievements, .drama-room-note"
  );

  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  /* --- STAGGERED REVEAL FOR GRIDS --- */
  function staggerReveal(parentSelector, childSelector, delayStep) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    parent.querySelectorAll(childSelector).forEach((el, i) => {
      el.style.transitionDelay = `${i * delayStep}ms`;
    });
  }
  staggerReveal(".about-pillars", ".pillar", 80);
  staggerReveal(".events-grid", ".event-card", 80);
  staggerReveal(".team-grid", ".team-card", 60);
  staggerReveal(".ach-list", ".ach-item", 80);
  staggerReveal(".contact-grid", ".contact-card", 80);

  /* Active nav now handled by SPA switcher above */
  /* --- GALLERY FILTER --- */
  const filterBtns = document.querySelectorAll(".gf-btn");
  const galItems   = document.querySelectorAll(".gal-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      galItems.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  /* --- LIGHTBOX --- */
  const lightbox = document.getElementById("lightbox");
  const lbImg    = document.getElementById("lbImg");
  const lbCap    = document.getElementById("lbCaption");
  const lbClose  = document.getElementById("lbClose");
  const lbPrev   = document.getElementById("lbPrev");
  const lbNext   = document.getElementById("lbNext");

  let currentIndex = 0;
  let visibleItems = [];

  function openLightbox(index) {
    visibleItems = Array.from(galItems).filter(
      (el) => !el.classList.contains("hidden")
    );
    currentIndex = index;
    showLbImage();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function showLbImage() {
    const item = visibleItems[currentIndex];
    const img  = item.querySelector("img");
    lbImg.src  = img.src;
    lbImg.alt  = img.alt;
    lbCap.textContent = item.dataset.caption || img.alt;
  }

  galItems.forEach((item) => {
    item.addEventListener("click", () => {
      visibleItems = Array.from(galItems).filter(
        (el) => !el.classList.contains("hidden")
      );
      const idx = visibleItems.indexOf(item);
      openLightbox(idx);
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lbNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showLbImage();
  });

  lbPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showLbImage();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % visibleItems.length; showLbImage(); }
    if (e.key === "ArrowLeft")  { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLbImage(); }
  });

  /* --- IICM GALLERY FILTER --- */
  const iicmFilterBtns = document.querySelectorAll("[data-iicm-filter]");
  const iicmItems      = document.querySelectorAll(".iicm-item");

  iicmFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      iicmFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.iicmFilter;
      iicmItems.forEach((item) => {
        if (filter === "all" || item.dataset.iicm === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  /* Make IICM items open in the same shared lightbox */
  iicmItems.forEach((item) => {
    item.addEventListener("click", () => {
      const visibleIicm = Array.from(iicmItems).filter(
        (el) => !el.classList.contains("hidden")
      );
      const idx = visibleIicm.indexOf(item);
      /* Temporarily set visibleItems to the IICM set */
      visibleItems = visibleIicm;
      currentIndex = idx;
      showLbImage();
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  /* --- PAST EVENTS FILTER --- */
  const pastFilterBtns = document.querySelectorAll("[data-past-filter]");
  const pastItems      = document.querySelectorAll(".past-item");

  pastFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      pastFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.pastFilter;
      pastItems.forEach((item) => {
        if (filter === "all" || item.dataset.past === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  /* Past items open in shared lightbox */
  pastItems.forEach((item) => {
    item.addEventListener("click", () => {
      const visiblePast = Array.from(pastItems).filter(
        (el) => !el.classList.contains("hidden")
      );
      const idx = visiblePast.indexOf(item);
      visibleItems = visiblePast;
      currentIndex = idx;
      showLbImage();
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  /* --- ANIMATED STAT COUNTERS --- */
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach((el) => counterObserver.observe(el));

  /* --- BACK TO TOP --- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --- LAZY LOAD BLUR IMAGES --- */
  const lazyImgs = document.querySelectorAll(
    ".gal-item img, .poster-img-wrap img, .team-photo, .renowned-photo, .download-preview img"
  );
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.complete) {
          img.classList.add("loaded");
        } else {
          img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: "100px" });
  lazyImgs.forEach((img) => imgObserver.observe(img));

  /* --- COUNTDOWN TIMERS --- */
  const countdowns = document.querySelectorAll(".countdown");
  function updateCountdowns() {
    const now = Date.now();
    countdowns.forEach((cd) => {
      const deadline = new Date(cd.dataset.deadline).getTime();
      const timer = cd.querySelector(".cd-timer");
      if (!timer) return;
      const diff = deadline - now;
      if (diff <= 0) {
        timer.textContent = "Deadline passed";
        timer.classList.add("expired");
        return;
      }
      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000)  / 60000);
      timer.textContent = days > 0
        ? `${days}d ${hours}h ${mins}m`
        : `${hours}h ${mins}m`;
    });
  }
  if (countdowns.length) {
    updateCountdowns();
    setInterval(updateCountdowns, 60000);
  }

  /* --- FLIP CARDS (tap on touch devices) --- */
  const flipCards = document.querySelectorAll(".flip-card");
  // Only add tap-to-flip on touch devices (hover handles desktop)
  if (window.matchMedia("(hover: none)").matches) {
    flipCards.forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });
  }

  /* --- LIGHTBOX SWIPE (mobile) --- */
  let touchStartX = 0;
  let touchStartY = 0;
  if (lightbox) {
    lightbox.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    lightbox.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      // Only trigger swipe if horizontal movement > vertical (not a scroll)
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          // Swipe left → next
          currentIndex = (currentIndex + 1) % visibleItems.length;
        } else {
          // Swipe right → prev
          currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        }
        showLbImage();
      } else if (Math.abs(dy) > 80 && dy > 0) {
        // Swipe down → close
        closeLightbox();
      }
    }, { passive: true });
  }

})();

/* ── ANNOUNCEMENT BANNER ── */
(function(){
  const ann = document.getElementById("annBanner");
  const annClose = document.getElementById("annClose");
  if (!ann) return;
  // Respect dismissed state
  if (localStorage.getItem("aarshi-ann-dismissed") === "true") {
    ann.style.display = "none";
    return;
  }
  if (ann.dataset.active !== "true") ann.style.display = "none";
  if (annClose) annClose.addEventListener("click", () => {
    ann.style.display = "none";
    localStorage.setItem("aarshi-ann-dismissed", "true");
  });
})();

/* ── STORY POPUP ── */
(function(){
  const popup    = document.getElementById("storyPopup");
  const backdrop = document.getElementById("storyBackdrop");
  const closeBtn = document.getElementById("storyClose");
  const cta      = document.getElementById("storyCta");
  const bar      = document.getElementById("storyBar");
  if (!popup || popup.dataset.active !== "true") return;
  // Only show once per session
  if (sessionStorage.getItem("aarshi-story-shown")) return;
  // Show after 2s
  setTimeout(() => {
    popup.classList.add("ready"); // make display:block first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        popup.classList.add("open"); // then animate in next frame
        backdrop.classList.add("open");
      });
    });
    sessionStorage.setItem("aarshi-story-shown", "true");
    // Start progress bar
    requestAnimationFrame(() => { if(bar) bar.style.width = "100%"; });
    // Auto-close after 6s
    setTimeout(closeStory, 6000);
  }, 2000);
  function closeStory() {
    popup.classList.remove("open");
    backdrop.classList.remove("open");
    setTimeout(() => popup.classList.remove("ready"), 600);
  }
  if (closeBtn) closeBtn.addEventListener("click", closeStory);
  if (backdrop) backdrop.addEventListener("click", closeStory);
  if (cta) cta.addEventListener("click", closeStory);
})();

/* ── TYPEWRITER HERO SUBTITLE ── */
(function(){
  const el = document.getElementById("heroTypewriter");
  if (!el) return;
  const text = "The Theatrical & Dramatics Society";
  let i = 0;
  // Start after curtain (1.5s)
  setTimeout(function type() {
    el.innerHTML = text.slice(0, i) + '<span class="typewriter-cursor"></span>';
    if (i <= text.length) { i++; setTimeout(type, 55); }
    else { el.innerHTML = text; } // remove cursor when done
  }, 1500);
})();

/* ── ON THIS DAY THEATRE FACTS ── */
(function(){
  const facts = [
    "Rabindranath Tagore wrote over 50 plays, transforming Bengali theatre with works like Dakghar (The Post Office).",
    "The Sangeet Natak Akademi, India's national academy for music, drama & dance, was founded in 1952.",
    "Habib Tanvir's Naya Theatre used Chhattisgarhi folk artists to create timeless works like Charandas Chor.",
    "The ancient Sanskrit play Mricchakatika (The Little Clay Cart) is among the oldest surviving Indian dramas.",
    "Girish Karnad's Tughlaq (1964) is considered one of the finest plays in Kannada and Indian theatre history.",
    "Vijay Tendulkar's Ghashiram Kotwal (1972) sparked controversy and became a landmark in Marathi theatre.",
    "Utpal Dutt established the People's Little Theatre in Kolkata, blending political messages with stagecraft.",
    "The IPTA (Indian People's Theatre Association), founded in 1942, united artists against colonial rule.",
    "Badal Sircar developed 'Third Theatre' — taking plays out of proscenium stages and into open public spaces.",
    "Sanskrit theatre manuals like the Natyashastra describe over 36 different emotional states for actors.",
    "The oldest form of Indian theatre, Kutiyattam, is from Kerala and is a UNESCO Intangible Cultural Heritage.",
    "Theatre of Roots movement in the 1970s sought to revive classical Indian performance traditions.",
    "Ebrahim Alkazi, called 'father of modern Indian theatre', directed landmark productions at the NSD in Delhi.",
    "Kalidasa's Abhijnanasakuntalam is considered a masterpiece of classical Sanskrit drama, set ~4th century CE.",
    "The Prithvi Theatre in Mumbai, founded by Prithviraj Kapoor in 1944, toured across India with its company.",
    "India's first professional theatre building was the Chowringhee Theatre, built in Calcutta in 1813.",
    "Jatra is a traditional form of Bengali theatrical performance — vibrant, loud, and deeply rooted in folk culture.",
    "Mohan Rakesh's Ashadh Ka Ek Din (1958) is considered the first major modern Hindi play.",
    "The National School of Drama, New Delhi, was established in 1959 and remains Asia's leading theatre institution.",
    "In classical Indian theatre, the Sutradhara (stage manager) introduced the play and held the entire production together.",
    "Marathi theatre (Natak) has a history stretching over 150 years and deeply influenced Indian cinema.",
    "Kavalam Narayana Panikkar revived Kerala's classical traditions, creating a distinctive modern theatre vocabulary.",
    "Manipuri theatre traditions date back centuries and are closely linked to the Vaishnava devotional movement.",
    "The playwright Dharamvir Bharati's Andha Yug (1954) is based on the Mahabharata and remains widely staged today.",
    "Street theatre (Nukkad Natak) became a powerful political tool in India during the Emergency (1975–1977).",
    "Tamil theatre has a rich legacy with Therukoothu — a traditional street performance form dating to ancient times.",
    "Vijaya Mehta is one of India's most celebrated theatre directors, known for her work in Marathi theatre.",
    "The Rangayana repertory company in Mysore is one of India's few full-time professional theatre companies.",
    "Kolkata's Minerva Theatre, founded in 1893, was one of the first Bengali theatre halls with a proscenium stage.",
    "B.V. Karanth composed music for over 400 productions and transformed theatre music in Karnataka and beyond.",
    "Navtej Johar's practice of connecting Indian classical dance with contemporary theatre has influenced a generation.",
    "The word 'Natyam' in Sanskrit encompasses theatre, dance, and music — they were never considered separate arts.",
  ];
  const el = document.getElementById("otdText");
  if (!el) return;
  // Pick based on day-of-year for consistent daily rotation
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  el.textContent = facts[dayOfYear % facts.length];
})();

/* ── REHEARSAL BANNER ── */
(function(){
  const banner = document.getElementById("rehearsalBanner");
  if (!banner || banner.dataset.active !== "true") return;
  // EDIT showDate to set the show night — format: 'YYYY-MM-DD'
  const showDate = "2026-12-01";
  const weeksEl  = document.getElementById("rehearsalWeeks");
  const weeks    = Math.max(0, Math.ceil((new Date(showDate) - Date.now()) / 604800000));
  if (weeksEl) weeksEl.textContent = weeks > 0 ? `${weeks} week${weeks !== 1 ? "s" : ""} to show night` : "Show night soon!";
})();

/* ── CURTAIN THEME TRANSITION ── */
(function(){
  const toggle  = document.getElementById("themeToggle");
  const curtain = document.getElementById("curtain");
  if (!toggle || !curtain) return;

  let animating = false;

  toggle.addEventListener("click", () => {
    if (animating) return;
    animating = true;

    const root    = document.documentElement;
    const current = root.getAttribute("data-theme") || "dark";
    const next    = current === "dark" ? "light" : "dark";

    // Close curtain
    curtain.classList.remove("gone");
    curtain.classList.add("theme-transitioning");

    setTimeout(() => {
      root.setAttribute("data-theme", next);
      localStorage.setItem("aarshi-theme", next);

      // Reopen curtain
      requestAnimationFrame(() => {
        curtain.classList.remove("theme-transitioning");
        curtain.classList.add("open");
        setTimeout(() => {
          curtain.classList.add("gone");
          animating = false;
        }, 1300);
      });
    }, 500);
  });
})();

/* ── CONFETTI ON CURTAIN OPEN ── */
(function(){
  const curtain = document.getElementById("curtain");
  if (!curtain) return;
  let fired = false;
  const observer = new MutationObserver(() => {
    if (curtain.classList.contains("open") && !fired) {
      fired = true;
      launchConfetti();
    }
  });
  observer.observe(curtain, { attributes: true, attributeFilter: ["class"] });

  function launchConfetti() {
    const colors = ["#E8C547","#C0392B","#F5F0E8","#B8952D","#922B21"];
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9998;width:100%;height:100%";
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      r: Math.random() * 6 + 3,
      d: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltSpeed: Math.random() * 0.2 - 0.1,
      opacity: 1
    }));
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.d + 1;
        p.tilt += p.tiltSpeed;
        p.opacity = Math.max(0, 1 - frame / 100);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.5, p.tilt, 0, Math.PI * 2);
        ctx.fill();
        if (p.x > canvas.width) p.x = 0;
      });
      ctx.globalAlpha = 1;
      frame++;
      if (frame < 120) requestAnimationFrame(draw);
      else canvas.remove();
    }
    requestAnimationFrame(draw);
  }
})();

/* ── MEMBER WALL FILTER ── */
(function(){
  const filterBtns = document.querySelectorAll("[data-batch]");
  const chips      = document.querySelectorAll(".member-chip");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const batch = btn.dataset.batch;
      chips.forEach(chip => {
        chip.classList.toggle("hidden", batch !== "all" && chip.dataset.batch !== batch);
      });
    });
  });
})();


/* ── ANNOUNCEMENT EXPIRY ── */
(function(){
  const ann = document.getElementById("annBanner");
  if (!ann) return;
  const expires = ann.dataset.expires;
  if (expires && new Date(expires) < new Date()) {
    ann.style.display = "none";
  }
})();

/* ── EVENT STATUS AUTO-UPDATE (badge switches to Closed after deadline) ── */
(function(){
  const now = Date.now();
  document.querySelectorAll(".countdown[data-deadline]").forEach(cd => {
    const deadline = new Date(cd.dataset.deadline).getTime();
    if (deadline < now) {
      // Find the nearest poster-badge--live and switch it
      const card = cd.closest(".poster-card");
      if (!card) return;
      const badge = card.querySelector(".poster-badge--live");
      if (badge) {
        badge.textContent = "Closed";
        badge.classList.remove("poster-badge--live");
        badge.classList.add("poster-badge--closed");
      }
    }
  });
})();

/* ── FORM TOGGLE ── */
window.toggleForm = function(id) {
  const card = document.getElementById(id);
  const body = card.querySelector(".form-embed-body") || document.getElementById(id === "bookingForm" ? "bookingForm" : null);
  // For booking form, id IS the body element
  const el = body || (id === "bookingForm" ? document.getElementById("bookingForm") : null);
  if (!el) return;
  const isOpen = el.style.display !== "none";
  el.style.display = isOpen ? "none" : "block";
  // Update toggle button text
  const btn = card ? card.querySelector(".form-embed-toggle") : document.getElementById("bookingToggleBtn");
  if (btn) btn.textContent = isOpen ? "Show Form ▼" : "Hide Form ▲";
};

// Booking form special case
window.toggleForm = function(id) {
  let body, btn;
  if (id === "bookingForm") {
    body = document.getElementById("bookingForm");
    btn  = document.getElementById("bookingToggleBtn");
  } else {
    const card = document.getElementById(id);
    if (!card) return;
    body = card.querySelector(".form-embed-body");
    btn  = card.querySelector(".form-embed-toggle");
  }
  if (!body) return;
  const isOpen = body.style.display !== "none";
  body.style.display = isOpen ? "none" : "block";
  if (btn) btn.textContent = isOpen ? (id==="bookingForm"?"Show Booking Form ▼":"Show Form ▼") : (id==="bookingForm"?"Hide Booking Form ▲":"Hide Form ▲");
};

/* ── WEB PUSH REMINDERS ── */
window.requestReminder = async function(btn) {
  if (!("Notification" in window)) {
    alert("Your browser does not support notifications.");
    return;
  }
  const event    = btn.dataset.event;
  const deadline = new Date(btn.dataset.deadline);
  const perm = await Notification.requestPermission();
  if (perm !== "granted") {
    alert("Please allow notifications to get reminders.");
    return;
  }
  // Schedule a notification 24h before deadline
  const remindAt = deadline.getTime() - 24 * 60 * 60 * 1000;
  const delay    = remindAt - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      new Notification("⏰ AARSHI Reminder", {
        body: `${event} deadline is tomorrow! Don't forget to submit.`,
        icon: "assets/apple-touch-icon.png"
      });
    }, Math.min(delay, 2147483647)); // JS max timeout
    btn.textContent = "🔔 Reminder Set!";
    btn.classList.add("reminded");
    btn.disabled = true;
  } else {
    btn.textContent = "⚠️ Deadline passed";
    btn.disabled = true;
  }
};

/* ── TICKER DUPLICATION (seamless loop) ── */
(function(){
  const ticker = document.getElementById("achTicker");
  if (!ticker) return;
  ticker.innerHTML += ticker.innerHTML; // duplicate for seamless scroll
})();

/* ── POSTER LIGHTBOX ── */
window.openPosterLightbox = function(src, title, dlHref, dlName) {
  const lb = document.getElementById("posterLb");
  document.getElementById("posterLbImg").src = src;
  document.getElementById("posterLbTitle").textContent = title;
  const dl = document.getElementById("posterLbDownload");
  dl.href = dlHref; dl.download = dlName;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
};
window.closePosterLightbox = function() {
  document.getElementById("posterLb").classList.remove("open");
  document.body.style.overflow = "";
};
document.addEventListener("keydown", e => {
  if (e.key === "Escape") window.closePosterLightbox();
});


/* ── EVENT DETAIL MODAL ── */
window.openEventModal = function(id) {
  document.querySelectorAll(".event-modal-body").forEach(b => b.style.display = "none");
  const target = document.getElementById("modal-" + id);
  if (target) target.style.display = "block";
  document.getElementById("eventModal").classList.add("open");
  document.body.style.overflow = "hidden";
};
window.closeEventModal = function() {
  document.getElementById("eventModal").classList.remove("open");
  document.body.style.overflow = "";
};
document.addEventListener("keydown", e => {
  if (e.key === "Escape") window.closeEventModal();
});

/* ── RENOWNED FACES BIO MODAL ── */
window.openBioModal = function(id) {
  document.querySelectorAll("#bioModal .event-modal-body").forEach(b => b.style.display = "none");
  const target = document.getElementById("bio-" + id);
  if (target) target.style.display = "block";
  const modal = document.getElementById("bioModal");
  modal.classList.add("open");
  modal.querySelector(".event-modal-card").scrollTop = 0;
  document.body.style.overflow = "hidden";
};
window.closeBioModal = function() {
  document.getElementById("bioModal").classList.remove("open");
  document.body.style.overflow = "";
};
document.addEventListener("keydown", e => {
  if (e.key === "Escape") window.closeBioModal();
});
