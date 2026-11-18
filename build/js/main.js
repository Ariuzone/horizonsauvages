/* Horizons Sauvages — interactions (vanilla, aucune dépendance) */
(function () {
  "use strict";
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reducedMotion = motionQuery.matches;
  motionQuery.addEventListener?.("change", (e) => { reducedMotion = e.matches; });

  /* ---------- Header sticky ---------- */
  const header = $("[data-header]");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-stuck", window.scrollY > header.offsetHeight + 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menu mobile ---------- */
  const toggle = $("[data-nav-toggle]");
  const menu = $("#menu-mobile");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
      menu.hidden = open;
      if (open) {
        toggle.focus();
      } else {
        const first = menu.querySelector("a, button");
        if (first) first.focus();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Reveals au scroll ---------- */
  const revealEls = $$(".reveal, .reveal-img");
  if (revealEls.length) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Accordéons (FAQ, contenus dépliables) ---------- */
  $$(".faq-q").forEach((btn) => {
    const controls = btn.getAttribute("aria-controls");
    const panel = (controls && document.getElementById(controls)) || btn.parentElement?.nextElementSibling;
    if (!panel) return;
    const item = btn.closest(".faq-item");
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const next = !expanded;
      btn.setAttribute("aria-expanded", String(next));
      if (item) item.classList.toggle("open", next);
      panel.inert = !next;
    });
  });

  /* ---------- Filtres & tri des circuits ---------- */
  const circuitGrid = $("[data-circuit-list]");
  if (circuitGrid) {
    const cards = $$("[data-circuit]", circuitGrid);
    const state = { dest: [], type: [], duration: null, budget: null, season: null, sort: "popular" };

    const chipBind = (name, key) => {
      $$(`[data-filter="${name}"]`).forEach((chip) => {
        chip.addEventListener("click", () => {
          const val = chip.dataset.value;
          if (name === "duration" || name === "budget" || name === "season") {
            const on = chip.getAttribute("aria-pressed") === "true";
            $$(`[data-filter="${name}"]`).forEach((c) => c.setAttribute("aria-pressed", "false"));
            chip.setAttribute("aria-pressed", String(!on));
            state[key] = on ? null : val;
          } else {
            const on = chip.getAttribute("aria-pressed") === "true";
            chip.setAttribute("aria-pressed", String(!on));
            if (on) state[key] = state[key].filter((v) => v !== val);
            else state[key].push(val);
          }
          apply();
        });
      });
    };
    chipBind("dest", "dest");
    chipBind("type", "type");
    chipBind("duration", "duration");
    chipBind("budget", "budget");
    chipBind("season", "season");

    const sortSelect = $("[data-sort]");
    if (sortSelect) sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; apply(); });

    const resetBtn = $("[data-filters-reset]");
    if (resetBtn) resetBtn.addEventListener("click", () => {
      state.dest = []; state.type = []; state.duration = null; state.budget = null; state.season = null;
      $$("[data-filter]").forEach((c) => c.setAttribute("aria-pressed", "false"));
      if (sortSelect) { sortSelect.value = "popular"; state.sort = "popular"; }
      apply();
    });

    const countEl = $("[data-count]");
    const emptyEl = $("[data-empty]");
    const sorters = {
      popular: (a, b) => (+b.dataset.popular || 0) - (+a.dataset.popular || 0),
      priceAsc: (a, b) => (+a.dataset.price) - (+b.dataset.price),
      priceDesc: (a, b) => (+b.dataset.price) - (+a.dataset.price),
      durationAsc: (a, b) => (+a.dataset.duration) - (+b.dataset.duration),
      durationDesc: (a, b) => (+b.dataset.duration) - (+a.dataset.duration),
    };

    function matches(card) {
      const d = card.dataset;
      if (state.dest.length && !state.dest.some((v) => d.dest.split(",").includes(v))) return false;
      if (state.type.length && !state.type.some((v) => d.type.split(",").includes(v))) return false;
      if (state.duration) {
        const n = +d.duration;
        const [min, max] = state.duration === "court" ? [0, 7] : state.duration === "moyen" ? [8, 11] : [12, 99];
        if (n < min || n > max) return false;
      }
      if (state.budget) {
        const p = +d.price;
        const [min, max] = state.budget === "eco" ? [0, 3500] : state.budget === "moyen" ? [3500, 6000] : [6000, 1e9];
        if (p < min || p > max) return false;
      }
      if (state.season && !d.seasons.split(",").includes(state.season)) return false;
      return true;
    }

    function apply() {
      let visible = 0;
      const ordered = cards.slice().sort(sorters[state.sort] || sorters.popular);
      ordered.forEach((card) => {
        const ok = matches(card);
        card.hidden = !ok;
        if (ok) visible++;
        circuitGrid.appendChild(card);
      });
      if (countEl) countEl.textContent = visible;
      if (emptyEl) emptyEl.hidden = visible !== 0;
    }
    apply();
  }

  /* ---------- Wizard sur mesure ---------- */
  const wizard = $("[data-wizard]");
  if (wizard) {
    const steps = $$(".wizard-step", wizard);
    const bars = $$(".wizard-progress .bar", wizard);
    const form = $("#demande-form");
    let current = 0;

    const show = (i, { scroll = true, focus = true } = {}) => {
      steps.forEach((s, k) => s.classList.toggle("current", k === i));
      bars.forEach((b, k) => {
        b.classList.toggle("done", k < i);
        b.classList.toggle("active", k === i);
      });
      current = i;
      const heading = $(`#step-${i + 1}-title`);
      if (heading && focus) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
        if (scroll) {
          const rect = heading.getBoundingClientRect();
          if (rect.top < 90 || rect.top > window.innerHeight * 0.4) {
            window.scrollTo({ top: wizard.offsetTop - 90, behavior: reducedMotion ? "auto" : "smooth" });
          }
        }
      }
      if (i === steps.length - 1) buildRecap();
    };

    const validateStep = (i) => {
      let ok = true;
      $$("input, select, textarea", steps[i]).forEach((input) => {
        const field = input.closest(".field");
        if (!field) return;
        const bad = input.required && !input.checkValidity();
        field.classList.toggle("invalid", bad);
        if (bad) ok = false;
        const err = $(".error-msg", field);
        if (err && bad) err.textContent = input.validationMessage;
      });
      // Cases à cocher obligatoires (groupes de choix)
      $$("[data-required-group]", steps[i]).forEach((group) => {
        const any = $("input:checked", group);
        group.classList.toggle("invalid", !any);
        if (!any) ok = false;
      });
      return ok;
    };

    $$("[data-next]", wizard).forEach((b) => b.addEventListener("click", () => {
      if (validateStep(current) && current < steps.length - 1) show(current + 1);
      else if (!validateStep(current)) {
        const firstBad = $(".invalid", steps[current]);
        if (firstBad) $("input, select, textarea", firstBad)?.focus();
      }
    }));
    $$("[data-prev]", wizard).forEach((b) => b.addEventListener("click", () => { if (current > 0) show(current - 1); }));

    function buildRecap() {
      const target = $("[data-recap]", wizard);
      if (!target) return;
      const val = (name) => {
        const el = form.querySelector(`[name="${name}"]:checked`) || form.querySelector(`[name="${name}"]`);
        if (!el) return "—";
        if (el.type === "checkbox") {
          const vals = $$(`[name="${name}"]:checked`, form).map((c) => c.closest(".choice")?.querySelector("b")?.textContent || c.value);
          return vals.length ? vals.join(", ") : "—";
        }
        if (el.tagName === "SELECT") return el.options[el.selectedIndex]?.text || "—";
        return el.value || "—";
      };
      const envies = $$('[name="envies"]:checked', form).map((c) => c.closest(".choice").querySelector("b").textContent).join(", ") || "—";
      const rows = [
        ["Destination souhaitée", val("destination")],
        ["Autres envies de destination", val("destination-libre") || "—"],
        ["Dates ou période", val("periode")],
        ["Nombre de voyageurs", `${val("adultes")} adulte(s)${+val("enfants") > 0 ? ` + ${val("enfants")} enfant(s)` : ""}`],
        ["Budget par personne", val("budget") !== "—" ? val("budget") : "—"],
        ["Type de voyage", val("type-voyage") || "—"],
        ["Envies fortes", envies],
        ["Confort souhaité", val("confort") || "—"],
        ["Nom", val("nom")],
        ["E-mail", val("email")],
        ["Message", val("message") || "—"],
      ];
      target.innerHTML = rows
        .map(([k, v]) => `<li><span class="k">${k}</span><span class="v">${String(v).replace(/</g, "&lt;")}</span></li>`)
        .join("");
    }

    const consentBox = $("#consent");
    if (consentBox) consentBox.addEventListener("change", () => {
      consentBox.removeAttribute("aria-invalid");
      const label = consentBox.closest(".field-check");
      if (label) label.classList.remove("invalid");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateStep(steps.length - 1)) {
        const firstBad = $(".invalid", steps[steps.length - 1]);
        if (firstBad) $("input, select, textarea", firstBad)?.focus();
        return;
      }
      if (!$("#consent").checked) {
        const box = $("#consent");
        const label = box.closest(".field-check") || box.parentElement;
        if (label) label.classList.add("invalid");
        box.setAttribute("aria-invalid", "true");
        box.focus();
        return;
      }
      form.hidden = true;
      $("#wizard-progress").hidden = true;
      const done = $("#wizard-confirm");
      done.hidden = false;
      done.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
      $(".confirm-icon", done).setAttribute("tabindex", "-1");
      $(".confirm-icon", done).focus({ preventScroll: true });
    });

    show(0, { scroll: false, focus: false });
  }

  /* ---------- Carte interactive ---------- */
  const mapWrap = $("[data-map]");
  if (mapWrap) {
    const tooltip = $(".map-tooltip", mapWrap);
    const pins = $$(".map-pin", mapWrap);
    let hideTimer;
    const showTip = (pin) => {
      clearTimeout(hideTimer);
      const name = pin.dataset.name, blurb = pin.dataset.blurb, link = pin.dataset.link, linkLabel = pin.dataset.linkLabel;
      tooltip.querySelector("h4").textContent = name;
      tooltip.querySelector("p").textContent = blurb;
      const a = tooltip.querySelector("a");
      a.href = link; a.textContent = linkLabel || "Découvrir la destination";
      tooltip.classList.add("show");
      pins.forEach((p) => p.classList.toggle("active", p === pin));
      const wrapRect = mapWrap.getBoundingClientRect();
      const pinRect = pin.getBoundingClientRect();
      let left = pinRect.left - wrapRect.left + 18;
      if (left + 300 > wrapRect.width) left = pinRect.left - wrapRect.left - 310;
      tooltip.style.left = Math.max(6, left) + "px";
      tooltip.style.top = Math.max(6, pinRect.top - wrapRect.top - 10) + "px";
    };
    const hideTip = (force) => {
      hideTimer = setTimeout(() => {
        tooltip.classList.remove("show");
        pins.forEach((p) => p.classList.remove("active"));
      }, force ? 0 : 250);
    };
    tooltip.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    tooltip.addEventListener("mouseleave", () => hideTip());
    tooltip.addEventListener("focusin", () => clearTimeout(hideTimer));
    tooltip.addEventListener("focusout", (e) => { if (!tooltip.contains(e.relatedTarget)) hideTip(true); });
    pins.forEach((pin) => {
      pin.addEventListener("mouseenter", () => showTip(pin));
      pin.addEventListener("mouseleave", () => hideTip());
      pin.addEventListener("focus", () => showTip(pin));
      pin.addEventListener("blur", (e) => { if (!tooltip.contains(e.relatedTarget)) hideTip(true); });
      pin.addEventListener("click", () => { window.location.href = pin.dataset.link; });
      pin.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = pin.dataset.link;
        }
      });
    });
    // Liens croisés : survoler une destination de la liste met en avant l'épingle
    $$("[data-map-highlight]").forEach((item) => {
      const slug = item.dataset.mapHighlight;
      const pin = pins.find ? pins.find((p) => p.dataset.slug === slug) : null;
      if (!pin) return;
      item.addEventListener("mouseenter", () => showTip(pin));
      item.addEventListener("mouseleave", () => hideTip());
    });
  }

  /* ---------- Galerie / lightbox ---------- */
  const masonry = $("[data-gallery]");
  if (masonry) {
    const items = $$(".masonry-item", masonry);
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Visionneuse d'images");
    lb.innerHTML = `
      <button class="lb-close" aria-label="Fermer la visionneuse"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <button class="lb-nav lb-prev" aria-label="Image précédente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg></button>
      <img alt="">
      <button class="lb-nav lb-next" aria-label="Image suivante"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 5l7 7-7 7"/></svg></button>
      <figcaption></figcaption>`;
    document.body.appendChild(lb);
    const img = $("img", lb), cap = $("figcaption", lb);
    const pageRegions = $$("body > header, body > main, body > footer");
    let idx = 0, lastFocus = null, scrollY = 0;
    const lockScroll = () => {
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    };
    const unlockScroll = () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
    const open = (i) => {
      const wasOpen = lb.classList.contains("open");
      if (!wasOpen) {
        lastFocus = document.activeElement;
        lockScroll();
        pageRegions.forEach((el) => { el.inert = true; });
      }
      idx = (i + items.length) % items.length;
      const src = items[idx].querySelector("img");
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      cap.textContent = items[idx].dataset.caption || src.alt;
      lb.classList.add("open");
      if (!wasOpen) $(".lb-close", lb).focus();
    };
    const close = () => {
      if (!lb.classList.contains("open")) return;
      lb.classList.remove("open");
      pageRegions.forEach((el) => { el.inert = false; });
      unlockScroll();
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    };
    items.forEach((it, i) => {
      it.addEventListener("click", () => open(i));
      it.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
    });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", () => open(idx - 1));
    $(".lb-next", lb).addEventListener("click", () => open(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); open(idx - 1); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); open(idx + 1); return; }
      if (e.key === "Tab") {
        const focusables = $$("button", lb).filter((el) => !el.disabled && el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- Bouton haut de page ---------- */
  const top = $("[data-top]");
  if (top) top.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  /* ---------- Année courante (sécurité) ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
