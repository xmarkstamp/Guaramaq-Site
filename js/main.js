/* Guarámaq • main.js (consolidado)
   - Menu hambúrguer (mobile)
   - Copiar telefone (data-copy) com fallback
   - Acessibilidade badges (data-tip)
   - Lazy-load em imagens fora do hero
   - Proteção do formulário e foco no #orcamento
*/
(function () {
  // ===== 1) Menu hambúrguer =====
  const hamb = document.querySelector(".hamb");
  const actions = document.getElementById("top-actions");

  function closeMenu() {
    if (!actions) return;
    actions.classList.remove("is-open");
    if (hamb) hamb.setAttribute("aria-expanded", "false");
  }

  if (hamb && actions) {
    hamb.addEventListener("click", () => {
      const open = actions.classList.toggle("is-open");
      hamb.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Fecha no ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Fecha ao clicar fora
    document.addEventListener("click", (e) => {
      if (!actions.classList.contains("is-open")) return;
      const clickInside =
        e.target.closest("#top-actions") || e.target.closest(".hamb");
      if (!clickInside) closeMenu();
    });
  }

  // ===== 2) Copiar telefone (data-copy) com fallback =====
  const canClipboard = !!(navigator.clipboard && navigator.clipboard.writeText);
  function tempLabel(el, text, cls, ms = 1400) {
    if (!el.dataset.originalLabel) {
      el.dataset.originalLabel = (el.innerText || el.textContent || "").trim();
    }
    const original = el.dataset.originalLabel;
    el.classList.remove("is-copied", "is-error");
    if (cls) el.classList.add(cls);
    el.innerText = text;
    el.disabled = true;
    clearTimeout(el._copyTimer);
    el._copyTimer = setTimeout(() => {
      el.disabled = false;
      el.classList.remove("is-copied", "is-error");
      el.innerText = original || "Copiar";
    }, ms);
  }

  function copyValue(val, onDone) {
    if (canClipboard) {
      navigator.clipboard.writeText(val).then(
        () => onDone(true),
        () => onDone(false)
      );
    } else {
      // Fallback compatível
      const ta = document.createElement("textarea");
      ta.value = val;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(ta);
      onDone(ok);
    }
  }

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("[data-copy]");
    if (!el) return;
    if (el.disabled) return;
    const val = (el.getAttribute("data-copy") || "").trim();
    if (!val) {
      tempLabel(el, "Nada para copiar", "is-error");
      return;
    }
    copyValue(val, (ok) =>
      tempLabel(el, ok ? "Número copiado!" : "Erro ao copiar", ok ? "is-copied" : "is-error")
    );
  });

  // ===== 3) Acessibilidade badges (data-tip) =====
  const tipBadges = document.querySelectorAll("[data-tip]");
  tipBadges.forEach((el) => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    if (!el.hasAttribute("role")) el.setAttribute("role", "button");
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        el.classList.add("tip-active");
        setTimeout(() => el.classList.remove("tip-active"), 800);
        ev.preventDefault();
      }
    });
  });

  // ===== 4) Lazy-load em imagens (exceto banner do hero) =====
  const heroBanner = document.querySelector(".hero-image .banner img");
  document.querySelectorAll("img").forEach((img) => {
    if (img === heroBanner) return; // mantém imediato para LCP
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
    if (!img.src.endsWith(".svg")) img.decoding = "async";
  });

  // ===== 5) Formulário (evitar duplo envio) =====
  const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
  forms.forEach((form) => {
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", () => {
      if (!submitBtn) return;
      if (!submitBtn.dataset.originalText) {
        submitBtn.dataset.originalText = submitBtn.textContent;
      }
      submitBtn.textContent = "Enviando…";
      submitBtn.disabled = true;
      // Reabilita em 6s caso não navegue
      setTimeout(() => {
        if (submitBtn.disabled) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || "Enviar";
        }
      }, 6000);
    });
  });

  // ===== 6) Foco no formulário ao abrir #orcamento =====
  function focusFormIfHash() {
    if (location.hash === "#orcamento") {
      const form = document.querySelector("#orcamento form");
      const first = form && form.querySelector("input, textarea, select, button");
      if (first) first.focus({ preventScroll: false });
    }
  }
  window.addEventListener("hashchange", focusFormIfHash);
  focusFormIfHash();
})();
