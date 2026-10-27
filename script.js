/* Melhor Sorriso — interações da landing page.
   Antes de publicar: confirme o WhatsApp e configure analytics/consentimento. */
(() => {
  "use strict";

  // Número em formato internacional, apenas dígitos: 55 + DDD + número.
  // Confirmar com a clínica antes de colocar a página no ar.
  const WHATSAPP_NUMBER = "5511911111111";
  const DEFAULT_MESSAGE = "Olá! Gostaria de informações sobre a Clínica Odontológica Melhor Sorriso e gostaria de consultar os horários para uma avaliação.";

  const whatsappUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || DEFAULT_MESSAGE)}`;

  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    const message = link.dataset.message || DEFAULT_MESSAGE;
    link.href = whatsappUrl(message);
    link.addEventListener("click", () => {
      trackEvent(link.dataset.event || "whatsapp_click", {
        link_text: (link.textContent || "").trim().slice(0, 80)
      });
    });
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      mainNav.classList.toggle("is-open", !isOpen);
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        mainNav.classList.remove("is-open");
      });
    });
  }

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const interest = String(formData.get("interest") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const text = [
        "Olá! Vim pela página da Clínica Odontológica Melhor Sorriso.",
        `Nome: ${name}`,
        phone ? `Telefone para contato: ${phone}` : "",
        `Assunto: ${interest}`,
        message ? `Mensagem: ${message}` : "",
        "",
        "Gostaria de receber informações sobre o atendimento."
      ].filter(Boolean).join("\n");

      trackEvent("form_whatsapp_start", { form_name: "contact_form", interest });
      if (status) status.textContent = "Abrindo o WhatsApp. Revise a mensagem e toque em enviar para concluir.";
      window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    });
  }

  // GA4/GTM: quando GTM for instalado, dataLayer pode receber estes eventos.
  // O consentimento e as tags devem ser configurados antes de ativar publicidade.
  window.dataLayer = window.dataLayer || [];
  function trackEvent(eventName, parameters = {}) {
    // Evite enviar nome, telefone, texto livre ou dados de saúde às plataformas analíticas.
    window.dataLayer.push({ event: eventName, ...parameters });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Telefone: apenas uma formatação visual básica, sem enviar dados a terceiros.
  const phoneInput = document.querySelector("#phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      const digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
      if (digits.length >= 11) {
        phoneInput.value = digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else if (digits.length >= 7) {
        phoneInput.value = digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, (_, a, b, c) => `(${a}) ${b}${c ? "-" + c : ""}`);
      } else if (digits.length >= 3) {
        phoneInput.value = digits.replace(/^(\d{2})(\d+)/, "($1) $2");
      } else {
        phoneInput.value = digits;
      }
    });
  }
})();

/* ===== v2: movimento e interações ===== */
(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const bar = document.querySelector(".scroll-progress");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      if (header) header.classList.toggle("is-scrolled", scrollY > 24);
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Link ativo no menu conforme a seção visível
  const links = [...document.querySelectorAll('.main-nav > a[href^="#"]:not(.button)')];
  if ("IntersectionObserver" in window && links.length) {
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove("is-active"));
        map.get(e.target.id)?.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

    // Passos: a linha se desenha quando a seção entra na tela
    const steps = document.querySelector(".steps-grid");
    if (steps) {
      const so = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { steps.classList.add("in-view"); so.disconnect(); }
      }, { threshold: .35 });
      so.observe(steps);
    }
  } else {
    document.querySelector(".steps-grid")?.classList.add("in-view");
  }

  // Menu mobile: fecha com Esc ou clique fora
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
  };
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", (e) => {
    if (nav?.classList.contains("is-open") && !header.contains(e.target)) closeMenu();
  });

  // FAQ: abre uma pergunta por vez
  const faq = [...document.querySelectorAll(".faq-list details")];
  faq.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) faq.forEach((o) => { if (o !== d) o.open = false; });
  }));

  // Formulário: contador de caracteres e confirmação visual
  const msg = document.querySelector("#message");
  const count = document.querySelector("#msg-count");
  if (msg && count) {
    msg.addEventListener("input", () => {
      count.textContent = `${msg.value.length}/${msg.maxLength}`;
      count.classList.toggle("is-near", msg.value.length > msg.maxLength * .9);
    });
  }
  const form = document.querySelector("#contact-form");
  if (form) form.addEventListener("submit", () => {
    if (!form.checkValidity()) return;
    form.classList.add("is-sent");
    const btn = form.querySelector("button[type=submit]");
    if (btn) { btn.disabled = true; setTimeout(() => { btn.disabled = false; }, 4000); }
  });
  if (reduce) document.documentElement.classList.remove("js");
})();

/* ===== v3: cards levam ao formulário; botão flutuante inteligente ===== */
(() => {
  "use strict";
  const select = document.querySelector("#interest");
  document.querySelectorAll(".js-interest").forEach((link) => {
    link.addEventListener("click", () => {
      const value = link.dataset.interest;
      (window.dataLayer = window.dataLayer || []).push({ event: link.dataset.event || "select_treatment", interest: value });
      if (!select) return;
      const match = [...select.options].find((o) => o.value === value || o.text === value);
      if (match) select.value = match.value || match.text;
      select.classList.remove("is-flash");
      void select.offsetWidth;
      select.classList.add("is-flash");
    });
  });
  // O botão do WhatsApp aparece depois do hero e some quando o formulário está na tela.
  const float = document.querySelector(".floating-whatsapp");
  const contact = document.querySelector("#contato");
  if (float) {
    let past = false, atContact = false;
    const update = () => float.classList.toggle("is-visible", past && !atContact);
    addEventListener("scroll", () => { past = scrollY > 520; update(); }, { passive: true });
    if (contact && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { atContact = e.intersectionRatio > .25; update(); }, { threshold: [0, .25, .5] }).observe(contact);
    }
    past = scrollY > 520; update();
  }
})();
