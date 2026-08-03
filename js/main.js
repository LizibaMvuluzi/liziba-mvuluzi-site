/* ==========================================================================
   LIZIBA MVULUZI — main.js (version finale)
   Vanilla JS — aucune dépendance externe
   Sommaire :
     0. Utilitaire : throttle scroll (requestAnimationFrame)
     1. Header : fond au scroll
     2. Menu mobile
     3. Ancrage doux + surbrillance du lien actif
     4. Apparition au scroll (IntersectionObserver)
     5. Formulaire Booking
     6. Formulaire Contact
     7. Galerie : Lightbox
     8. Boutons flottants (Retour en haut)
     9. Année dynamique du footer
    10. Fondations V1.2 — chargement des données (data/*.json)
   ========================================================================== */

/**
 * Limite l'exécution d'une fonction à une fois par frame d'animation.
 * Évite le layout thrashing sur les écouteurs de scroll haute fréquence.
 */
function onScrollFrame(callback) {
  let ticking = false;
  return () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initSmoothAnchors();
  initActiveNav();
  initRevealOnScroll();
  initBookingForm();
  initContactForm();
  initLightbox();
  initBackToTop();
  initFooterYear();
  initSiteData();
});


/* ---------- 1. Header : fond au scroll ---------- */
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = onScrollFrame(() => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  });
  header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- 2. Menu mobile ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* ---------- 3. Ancrage doux + lien actif ---------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", targetId);
    });
  });
}

function initActiveNav() {
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  if (!navLinks.length || !("IntersectionObserver" in window)) return;

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- 4. Apparition au scroll ---------- */
function initRevealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblings = Array.from(el.parentElement?.querySelectorAll(".reveal") || []);
          const delay = Math.min(siblings.indexOf(el) * 60, 240);
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- 5. Formulaire Booking ---------- */
function initBookingForm() {
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("bookingStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = "Merci de compléter les champs obligatoires.";
      status.classList.add("is-error");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    // TODO : remplacer ce console.log par un envoi réel (Formspree, EmailJS,
    // fonction serverless Netlify/Vercel, ou tout endpoint de votre choix).
    console.log("Demande de booking :", data);

    status.classList.remove("is-error");
    status.textContent = "Merci. Votre demande a bien été transmise — une réponse vous parviendra rapidement.";
    form.reset();
  });
}

/* ---------- 6. Formulaire Contact ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = "Merci de compléter les champs obligatoires.";
      status.classList.add("is-error");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    // TODO : remplacer ce console.log par un envoi réel (Formspree, EmailJS,
    // fonction serverless Netlify/Vercel, ou tout endpoint de votre choix).
    console.log("Message de contact :", data);

    status.classList.remove("is-error");
    status.textContent = "Message envoyé. Merci, une réponse vous parviendra rapidement.";
    form.reset();
  });
}

/* ---------- 7. Galerie : Lightbox ---------- */
function initLightbox() {
  const items = Array.from(document.querySelectorAll(".gallery__item"));
  const lightbox = document.getElementById("lightbox");
  if (!items.length || !lightbox) return;

  const imageEl = document.getElementById("lightboxImage");
  const captionEl = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  let currentIndex = 0;
  let lastFocused = null;

  const open = (index) => {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const caption = item.getAttribute("data-caption") || "";
    captionEl.textContent = caption;
    imageEl.setAttribute("aria-label", caption);
    // TODO : lorsque les vraies photos seront intégrées (balises <img> dans
    // chaque .gallery__item), remplir lightboxImage avec l'image réelle,
    // par exemple : imageEl.style.backgroundImage = `url(${item.querySelector('img').src})`;
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => open(currentIndex - 1));
  nextBtn.addEventListener("click", () => open(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") open(currentIndex + 1);
    if (e.key === "ArrowLeft") open(currentIndex - 1);
  });
}

/* ---------- 8. Bouton Retour en haut ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const onScroll = onScrollFrame(() => {
    btn.classList.toggle("is-visible", window.scrollY > 700);
  });
  btn.classList.toggle("is-visible", window.scrollY > 700);
  window.addEventListener("scroll", onScroll, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- 9. Année dynamique du footer ---------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================================
   10. Fondations V1.2 — chargement des données (data/*.json)
   ==========================================================================
   Ce module charge les 6 fichiers JSON de la couche de données (artist,
   socials, releases, videos, concerts, site) et les met à disposition via
   `window.siteData`, préparant les prochaines évolutions du site.

   IMPORTANT — portée volontairement limitée à ce stade :
   Ce module NE MODIFIE AUCUN CONTENU AFFICHÉ. Il ne fait que charger et
   vérifier les données ; aucune fonction de rendu n'est encore branchée sur
   les sections existantes (Musique, Discographie, Concerts, Réseaux
   sociaux…), qui restent alimentées par le HTML statique tant que le
   contenu réel n'a pas été validé et intégré dans les fichiers JSON.

   Quand le moment sera venu de connecter une section à ses données, la
   marche à suivre est : écrire une fonction `renderXxx(data)` dédiée, qui
   lit `window.siteData.xxx` et remplace le contenu statique correspondant —
   section par section, sans toucher aux autres.
   ========================================================================== */

/**
 * Charge un fichier JSON local et retourne son contenu déjà parsé.
 * Chemin relatif exigé (compatibilité GitHub Pages / Netlify / Vercel,
 * racine ou sous-dossier, sans modification).
 */
async function loadJSON(relativePath) {
  const response = await fetch(relativePath, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Échec du chargement de "${relativePath}" (HTTP ${response.status})`);
  }
  return response.json();
}

/**
 * Charge les 6 fichiers de la couche de données en parallèle.
 * Chaque fichier est chargé indépendamment : l'échec de l'un n'empêche pas
 * le chargement des autres (utile en phase de mise en place progressive du
 * contenu, fichier par fichier).
 */
async function initSiteData() {
  const sources = {
    artist: "data/artist.json",
    socials: "data/socials.json",
    releases: "data/releases.json",
    videos: "data/videos.json",
    concerts: "data/concerts.json",
    site: "data/site.json",
  };

  const entries = await Promise.all(
    Object.entries(sources).map(async ([key, path]) => {
      try {
        const data = await loadJSON(path);
        return [key, data];
      } catch (error) {
        console.warn(`[data] ${key} : ${error.message}`);
        return [key, null];
      }
    })
  );

  window.siteData = Object.fromEntries(entries);

  // Point d'ancrage pour les futures fonctions de rendu (V1.2 et suivantes).
  // Ex. : if (window.siteData.releases?.releases.length) renderReleases(...);
}

