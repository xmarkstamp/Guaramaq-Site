/* Guarámaq • main.js (final, sem hambúrguer)
   - Copiar telefone (data-copy) com fallback e feedback
   - Acessibilidade em badges (data-tip)
   - Lazy-load em imagens (exceto banner do hero para LCP)
   - Proteção do formulário (bloqueia duplo envio) + foco ao abrir #orcamento
*/
(function () {
  // ===== 1) Copiar telefone (data-copy) com fallback =====
  const canClipboard = !!(navigator.clipboard && navigator.clipboard.writeText);

  function tempLabel(el, text, cls, ms = 1400) {
    if (!el) return;
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
      return;
    }
    // Fallback compatível
    const ta = document.createElement("textarea");
    ta.value = val;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
    document.body.removeChild(ta);
    onDone(ok);
  }

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("[data-copy]");
    if (!el || el.disabled) return;
    const val = (el.getAttribute("data-copy") || "").trim();
    if (!val) {
      tempLabel(el, "Nada para copiar", "is-error");
      return;
    }
    copyValue(val, (ok) =>
      tempLabel(el, ok ? "Número copiado!" : "Erro ao copiar", ok ? "is-copied" : "is-error")
    );
  });

  // ===== 2) Acessibilidade badges (data-tip) =====
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

  // ===== 3) Lazy-load em imagens (exceto banner do hero para LCP) =====
  const heroBanner = document.querySelector(".hero-image .banner img");
  document.querySelectorAll("img").forEach((img) => {
    if (img === heroBanner) return; // mantém imediato para melhor LCP
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
    if (!img.src.endsWith(".svg")) img.decoding = "async";
  });

  // ===== 4) Formulário (evitar duplo envio) =====
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

  // ===== 5) Foco no formulário ao abrir #orcamento =====
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
