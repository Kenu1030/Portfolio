/* ─────────────────────────────────────────────────
   script.js – Scroll Reveal & Nav Micro-interactions
───────────────────────────────────────────────── */

(function () {
  "use strict";

  /* ─── Scroll-reveal (Intersection Observer) ─── */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px 0px",
      }
    );

    revealEls.forEach((el, i) => {
      // Gentle stagger: each element gets a small incremental delay (capped)
      el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything immediately
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ─── Mobile hamburger toggle ─── */
  const hamburger = document.querySelector(".nav__hamburger");
  const navLinks = document.querySelector(".nav__links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!isOpen));
      navLinks.classList.toggle("is-open", !isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      });
    });
  }

  /* ─── Active nav link on scroll ─── */
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav__link");

  function setActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < bottom) {
        links.forEach((link) => {
          link.classList.toggle(
            "nav__link--active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ─── Nav background opacity on scroll ─── */
  const navWrapper = document.querySelector(".nav-wrapper");

  if (navWrapper) {
    window.addEventListener(
      "scroll",
      () => {
        navWrapper.classList.toggle("nav-wrapper--scrolled", window.scrollY > 10);
      },
      { passive: true }
    );
  }
})();
