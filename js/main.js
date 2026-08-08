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
    10. Rendu dynamique (data/*.json → DOM : Nouveautés, Musique, Discographie,
        Vidéos, Concerts, Réseaux sociaux, coordonnées)
   ========================================================================== */

/**
 * Marqueur "JS a démarré", posé immédiatement à l'exécution du script
 * (avant tout appel de fonction, avant même DOMContentLoaded). C'est ce
 * qui active .reveal en CSS (voir section 2). Si ce script ne se charge
 * ou ne s'exécute pas du tout, cette classe n'est jamais posée et le
 * contenu .reveal reste visible par défaut plutôt que caché indéfiniment.
 */
document.documentElement.classList.add("js-ready");

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

/**
 * Exécute une fonction d'initialisation de façon isolée : si elle échoue,
 * l'erreur est journalisée en console mais n'empêche jamais les
 * initialisations suivantes de s'exécuter. Sans cette isolation, une
 * exception dans une seule fonction (ex. sélecteur CSS invalide) bloquait
 * silencieusement tout le reste — y compris initRevealOnScroll(), qui
 * rend visible le contenu des sections .reveal. C'est cette cause exacte
 * qui rendait les pages secondaires visuellement vides malgré un code
 * par ailleurs syntaxiquement correct.
 */
function safeInit(name, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[init] ${name} a échoué :`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  safeInit("initHeaderScroll", initHeaderScroll);
  safeInit("initMobileNav", initMobileNav);
  safeInit("initSmoothAnchors", initSmoothAnchors);
  safeInit("initActiveNav", initActiveNav);
  safeInit("initRevealOnScroll", initRevealOnScroll);
  safeInit("initBookingForm", initBookingForm);
  safeInit("initContactForm", initContactForm);
  safeInit("initLightbox", initLightbox);
  safeInit("initBackToTop", initBackToTop);
  safeInit("initFooterYear", initFooterYear);
  safeInit("initSiteData", initSiteData);
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

  // Sur les pages secondaires (/pages/*.html), les liens de nav pointent
  // vers "../index.html#section" : ce ne sont pas des ancres de la page
  // courante, donc ils sont exclus du suivi de section active.
  const sameDocumentLinks = navLinks.filter((link) => link.getAttribute("href").startsWith("#"));
  if (!sameDocumentLinks.length) return;

  const sections = sameDocumentLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    sameDocumentLinks.forEach((link) => {
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

/* ---------- 5. Formulaires : envoi réel via Web3Forms ---------- */
/**
 * Web3Forms — service gratuit sans backend, compatible hébergement
 * 100% statique (GitHub Pages, Netlify, Vercel). Toutes les soumissions
 * sont redirigées par e-mail vers lizibamvuluzi@gmail.com.
 *
 * Clé d'accès activée le 07/08/2026 (compte Web3Forms créé par l'artiste).
 */
const WEB3FORMS_ACCESS_KEY = "04225266-8537-4951-87a2-c050cbb8d1e0";

/** Message de confirmation affiché après un envoi réussi, signé, multi-ligne. */
function renderSuccessMessage(status) {
  status.innerHTML =
    '<strong class="form-status__title">Merci.</strong>' +
    "Votre message a bien été transmis.<br>" +
    "Je prendrai connaissance de votre demande et vous répondrai dans les meilleurs délais." +
    '<span class="form-status__signature">— Liziba Mvuluzi</span>';
}

async function submitForm(form, status, subject) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn && submitBtn.disabled) return; // envoi déjà en cours, ignore toute nouvelle tentative

  status.classList.remove("is-error");

  if (!form.checkValidity()) {
    status.textContent = "Merci de compléter les champs obligatoires.";
    status.classList.add("is-error");
    return;
  }

  if (submitBtn) submitBtn.disabled = true; // empêche tout double-clic ou double-Entrée pendant l'envoi
  status.textContent = "Envoi en cours…";

  const formData = new FormData(form);
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("subject", subject);
  formData.append("from_name", "Site officiel — Liziba Mvuluzi");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      status.classList.remove("is-error");
      renderSuccessMessage(status);
      form.reset(); // vide automatiquement les champs après un envoi réussi
    } else {
      throw new Error(result.message || "Échec de l'envoi");
    }
  } catch (error) {
    console.error("[formulaire] Échec de l'envoi :", error);
    status.classList.add("is-error");
    status.textContent = "Une erreur est survenue. Merci de réessayer, ou d'écrire directement à lizibamvuluzi@gmail.com.";
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

function initBookingForm() {
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("bookingStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm(form, status, "Nouvelle demande de booking — Liziba Mvuluzi");
  });
}

/* ---------- 6. Formulaire Contact ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm(form, status, "Nouveau message — Site officiel Liziba Mvuluzi");
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
    const img = item.querySelector("img");
    imageEl.style.backgroundImage = img && img.currentSrc ? `url("${img.currentSrc}")` : "none";
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
   10. Rendu dynamique — data/*.json → DOM
   ==========================================================================
   Charge les 6 fichiers JSON puis peuple les sections correspondantes.
   Principe de non-régression : si une donnée est absente ou vide, le
   contenu statique déjà présent dans le HTML est laissé tel quel (aucune
   section n'est jamais vidée par erreur).
   ========================================================================== */

/**
 * Préfixe de chemin relatif — permet à ce même script d'être utilisé
 * depuis la racine (index.html) comme depuis un sous-dossier (/pages/*.html).
 * Défini via l'attribut data-base-path sur <html> ("" à la racine, "../"
 * depuis /pages/).
 */
const BASE_PATH = document.documentElement.dataset.basePath || "";

const ICON_CACHE = new Map();

/** Charge et met en cache le SVG d'une icône de plateforme (fichier local). */
async function loadIcon(id) {
  if (ICON_CACHE.has(id)) return ICON_CACHE.get(id);
  try {
    const response = await fetch(`${BASE_PATH}assets/icons/platforms/${id}.svg`, { cache: "force-cache" });
    const markup = response.ok ? await response.text() : "";
    ICON_CACHE.set(id, markup);
    return markup;
  } catch {
    ICON_CACHE.set(id, "");
    return "";
  }
}

/** Échappe le texte inséré dans le HTML généré dynamiquement. */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

/** Trie les sorties par date décroissante ; à dates égales/vides, conserve l'ordre du fichier. */
function sortReleasesDesc(releases) {
  return [...releases].sort((a, b) => (b.releaseDate || "").localeCompare(a.releaseDate || ""));
}

/** Formate le type de sortie pour l'affichage. */
function formatReleaseType(type) {
  return { single: "Single", ep: "EP", album: "Album" }[type] || type || "";
}

/** Construit la ligne de méta-information d'une sortie (featuring · type · année). */
function formatReleaseMeta(release) {
  const parts = [];
  if (release.featuring && release.featuring.length) {
    parts.push(`feat. ${release.featuring.join(", ")}`);
  }
  parts.push(formatReleaseType(release.type));
  if (release.releaseDate) parts.push(release.releaseDate.slice(0, 4));
  return parts.filter(Boolean).join(" — ");
}

/** Premier lien d'écoute disponible, par ordre de priorité. */
function pickPrimaryLink(release) {
  const order = ["spotify", "appleMusic", "youtubeMusic", "deezer", "amazonMusic", "boomplay", "audiomack", "bandcamp"];
  for (const key of order) {
    if (release.links && release.links[key]) return release.links[key];
  }
  return null;
}

/* ---- Musique : titre à la une ---- */
function renderFeaturedRelease(releasesData) {
  if (!releasesData?.releases?.length) return;
  const release = sortReleasesDesc(releasesData.releases)[0];

  const art = document.getElementById("featuredReleaseArt");
  const title = document.getElementById("featuredReleaseTitle");
  const meta = document.getElementById("featuredReleaseMeta");
  const desc = document.getElementById("featuredReleaseDesc");
  const link = document.getElementById("featuredReleaseLink");
  if (!art || !title || !meta || !desc || !link) return;

  if (release.cover) art.style.backgroundImage = `url("${release.cover}")`;
  title.textContent = release.title;
  meta.textContent = formatReleaseMeta(release);
  if (release.description) desc.textContent = release.description;

  const primaryLink = pickPrimaryLink(release);
  if (primaryLink) {
    link.href = primaryLink;
    link.style.display = "";
  } else {
    link.style.display = "none";
  }
}

/* ---- Nouveautés : 2 sorties les plus récentes ---- */
function renderNouveautes(releasesData, videosData) {
  const grid = document.getElementById("newsGrid");
  if (!grid || !releasesData?.releases?.length) return;

  const latest = sortReleasesDesc(releasesData.releases).slice(0, 2);
  const videosById = new Map((videosData?.videos || []).map((v) => [v.id, v]));

  grid.innerHTML = latest
    .map((release) => {
      const primaryLink = pickPrimaryLink(release);
      const video = release.videoId ? videosById.get(release.videoId) : null;
      const clipLink = video
        ? `<a href="https://youtu.be/${encodeURIComponent(video.youtubeId)}" target="_blank" rel="noopener">Voir le clip →</a>`
        : "";
      const listenLink = primaryLink
        ? `<a href="${primaryLink}" target="_blank" rel="noopener">Écouter →</a>`
        : "";
      return `
        <article class="news-card">
          <div class="news-card__art" style="${release.cover ? `background-image:url('${release.cover}')` : ""}"></div>
          <div class="news-card__body">
            <span class="news-card__meta">${escapeHTML(formatReleaseMeta(release))}</span>
            <h3 class="news-card__title">${escapeHTML(release.title)}</h3>
            ${release.description ? `<p class="news-card__desc">${escapeHTML(release.description)}</p>` : ""}
            <div class="news-card__links">${listenLink}${clipLink}</div>
          </div>
        </article>`;
    })
    .join("");
}

/* ---- Musique : grille des plateformes de streaming ---- */
async function renderPlatforms(socialsData) {
  const grid = document.getElementById("platformsGrid");
  if (!grid || !socialsData?.profiles?.length) return;

  const streaming = socialsData.profiles.filter((p) => p.group === "streaming");
  if (!streaming.length) return;

  const icons = await Promise.all(streaming.map((p) => loadIcon(p.id)));

  grid.innerHTML = streaming
    .map(
      (p, i) => `
      <a class="platform" href="${p.url}" target="_blank" rel="noopener">
        <span class="platform__group">
          <span class="platform__icon" aria-hidden="true">${icons[i]}</span>
          <span class="platform__name">${escapeHTML(p.label)}</span>
        </span>
        <span class="platform__arrow" aria-hidden="true">→</span>
      </a>`
    )
    .join("");
}

/* ---- Réseaux sociaux : cartes des profils généraux ---- */
async function renderSocialCards(socialsData) {
  const grid = document.getElementById("socialsGrid");
  const footer = document.getElementById("footerSocials");
  if ((!grid && !footer) || !socialsData?.profiles?.length) return;

  const social = socialsData.profiles.filter((p) => p.group === "social");
  if (!social.length) return;

  if (grid) {
    const icons = await Promise.all(social.map((p) => loadIcon(p.id)));
    grid.innerHTML = social
      .map((p, i) => {
        const cta = p.id === "youtube" ? "S'abonner" : "Suivre";
        return `
        <a class="social-card" href="${p.url}" target="_blank" rel="noopener">
          <span class="social-card__icon" aria-hidden="true">${icons[i]}</span>
          <span class="social-card__name">${escapeHTML(p.label)}</span>
          <span class="social-card__cta">${cta} →</span>
        </a>`;
      })
      .join("");
  }

  if (footer) {
    footer.innerHTML = social
      .map((p) => `<a href="${p.url}" target="_blank" rel="noopener">${escapeHTML(p.label)}</a>`)
      .join("");
  }
}

/* ---- Discographie : tableau complet ---- */
function renderDiscography(releasesData) {
  const body = document.getElementById("discographyBody");
  if (!body || !releasesData?.releases?.length) return;

  const rows = sortReleasesDesc(releasesData.releases).map((release) => {
    const year = release.releaseDate ? release.releaseDate.slice(0, 4) : "—";
    const featuring = release.featuring && release.featuring.length
      ? ` <em>(feat. ${escapeHTML(release.featuring.join(", "))})</em>`
      : "";
    const primaryLink = pickPrimaryLink(release);
    const linkCell = primaryLink
      ? `<a href="${primaryLink}" target="_blank" rel="noopener" class="discography__link">Écouter →</a>`
      : "—";
    return `
      <div class="discography__row" role="row">
        <span role="cell" class="discography__year">${year}</span>
        <span role="cell" class="discography__title">${escapeHTML(release.title)}${featuring}</span>
        <span role="cell" class="discography__type">${escapeHTML(formatReleaseType(release.type))}</span>
        <span role="cell">${linkCell}</span>
      </div>`;
  });

  body.innerHTML = rows.join("");
}

/* ---- Vidéos : grille des clips ---- */
function renderVideos(videosData) {
  const grid = document.getElementById("videoGrid");
  if (!grid || !videosData?.videos?.length) return;

  grid.innerHTML = videosData.videos
    .map(
      (video) => `
      <div class="video-card">
        <div class="video-card__frame">
          <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}" title="${escapeHTML(video.title)}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p class="video-card__caption">${escapeHTML(video.title)}</p>
      </div>`
    )
    .join("");
}

/* ---- Concerts : agenda ou état vide ---- */
function renderConcerts(concertsData) {
  const agenda = document.getElementById("agenda");
  const emptyState = document.getElementById("agendaEmpty");
  if (!agenda || !emptyState) return;
  if (!concertsData?.concerts?.length) return; // état vide déjà présent dans le HTML, rien à faire

  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  const items = concertsData.concerts
    .filter((c) => c.status !== "cancelled")
    .map((c) => {
      const date = new Date(c.date);
      const day = Number.isNaN(date.getTime()) ? "—" : date.getDate();
      const month = Number.isNaN(date.getTime()) ? "" : months[date.getMonth()];
      const ticket = c.ticketUrl
        ? `<a href="${c.ticketUrl}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">${c.status === "soldout" ? "Complet" : "Billetterie"}</a>`
        : "";
      return `
        <article class="agenda__item">
          <div class="agenda__date"><span class="agenda__day">${day}</span><span class="agenda__month">${month}</span></div>
          <div class="agenda__info">
            <h3 class="agenda__title">${escapeHTML(c.title)}</h3>
            <p class="agenda__place">${escapeHTML(c.city)}${c.country ? ", " + escapeHTML(c.country) : ""}</p>
          </div>
          ${ticket}
        </article>`;
    });

  if (items.length) {
    agenda.innerHTML = items.join("");
  }
}

/* ---- Coordonnées : bouton WhatsApp + liens email/téléphone (progressive, jamais destructif) ---- */
function applyArtistContact(artistData) {
  const contact = artistData?.contact;
  if (!contact) return;

  const whatsappBtn = document.getElementById("whatsappFloatBtn");
  if (whatsappBtn && contact.whatsapp) {
    whatsappBtn.href = contact.whatsapp.startsWith("http")
      ? contact.whatsapp
      : `https://wa.me/${contact.whatsapp}`;
  }

  const emailEl = document.getElementById("contactEmailLink");
  if (emailEl && contact.email) {
    emailEl.href = `mailto:${contact.email}`;
    emailEl.textContent = contact.email;
  }
}

/**
 * Google Analytics 4 — préparation uniquement, jamais d'identifiant fictif.
 *
 * Architecture : la mesure d'audience est entièrement pilotée par
 * `data/site.json` (champ `analytics`), et non par un script codé en dur
 * dans chaque page HTML. Avantage : le site comportant plusieurs pages
 * avec header/footer dupliqués (voir README §13), un identifiant GA4 en
 * dur devrait être répété dans chacune d'elles ; ici, un seul champ JSON
 * suffit à l'activer partout, ou à confirmer qu'il n'est pas encore actif.
 *
 * POUR ACTIVER GA4 (dès que le Measurement ID sera disponible) :
 * 1. Ouvrir data/site.json.
 * 2. Renseigner : "analytics": { "provider": "ga4", "id": "G-XXXXXXXXXX" }
 *    (remplacer par le Measurement ID réel, format "G-" suivi de
 *    caractères alphanumériques).
 * 3. Aucune autre modification n'est nécessaire — le script officiel
 *    Google (gtag.js) est alors chargé automatiquement sur chaque page,
 *    de façon asynchrone (aucun impact sur les performances tant qu'il
 *    n'est pas configuré).
 *
 * Tant que `analytics.id` est `null` ou absent, cette fonction ne charge
 * strictement rien : aucun script Google, aucun cookie, aucune requête
 * réseau superflue.
 */
function initAnalytics(siteData) {
  const analytics = siteData?.analytics;
  if (!analytics || analytics.provider !== "ga4") return;

  const id = analytics.id;
  if (!id || typeof id !== "string" || !/^G-[A-Z0-9]+$/i.test(id)) return;

  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", id);
}

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
 * Charge les 6 fichiers de la couche de données en parallèle, les expose
 * via `window.siteData`, puis déclenche le rendu de chaque section.
 * Chaque fichier est chargé indépendamment : l'échec de l'un n'empêche pas
 * le chargement ni le rendu des autres.
 */
async function initSiteData() {
  const sources = {
    artist: `${BASE_PATH}data/artist.json`,
    socials: `${BASE_PATH}data/socials.json`,
    releases: `${BASE_PATH}data/releases.json`,
    videos: `${BASE_PATH}data/videos.json`,
    concerts: `${BASE_PATH}data/concerts.json`,
    site: `${BASE_PATH}data/site.json`,
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
  const { artist, socials, releases, videos, concerts, site } = window.siteData;

  try {
    renderFeaturedRelease(releases);
    renderNouveautes(releases, videos);
    renderDiscography(releases);
    renderVideos(videos);
    renderConcerts(concerts);
    applyArtistContact(artist);
    initAnalytics(site);
    await Promise.all([renderPlatforms(socials), renderSocialCards(socials)]);
  } catch (error) {
    console.error("[render] Erreur lors du rendu dynamique :", error);
  }
}


