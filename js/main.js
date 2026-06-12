import { getWhatsAppUrl, INSTAGRAM_URL } from "./config.js";
import { initSeo } from "./seo.js";

function initWhatsAppLinks() {
  const url = getWhatsAppUrl();
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
}

function initInstagramLinks() {
  if (!INSTAGRAM_URL) return;

  document.querySelectorAll("[data-instagram]").forEach((el) => {
    el.href = INSTAGRAM_URL;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    el.hidden = false;
  });
}

function initSmoothScroll() {
  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = document.querySelector(el.dataset.scroll);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initSeo();
  initWhatsAppLinks();
  initInstagramLinks();
  initSmoothScroll();
  initReveal();
});
