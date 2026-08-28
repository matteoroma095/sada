(() => {
  const header = document.querySelector(".site-header");
  const brand = document.querySelector(".brand");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero");

  // Logo stroke draw
  requestAnimationFrame(() => {
    brand?.classList.add("is-drawn");
    hero?.classList.add("is-ready");
  });

  // Header scroll state
  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("is-open", !open);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });

  // Scroll reveals
  const animated = document.querySelectorAll("[data-animate]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    animated.forEach((el) => io.observe(el));
  } else {
    animated.forEach((el) => el.classList.add("is-in"));
  }

  const form = document.querySelector("#contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = form.querySelector(".form-note");
    if (note) {
      note.hidden = false;
      note.textContent = "Grazie per il messaggio. Ti risponderemo al più presto.";
    }
    form.reset();
  });
})();
