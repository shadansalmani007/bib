const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

window.addEventListener("scroll", () => {
  if (currentPage === "about.html" || currentPage === "about") {
    // On about page, set About link as active
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "about.html" ||
          link.getAttribute("href") === "about",
      );
    });
  } else {
    // On index page, track sections
    let current = "home";
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) current = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current,
      );
    });
  }
});

// Set initial active state on page load
if (currentPage === "about.html" || currentPage === "about") {
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "about.html" ||
        link.getAttribute("href") === "about",
    );
  });
} else {
  const firstNav = document.querySelector(".nav-link.active");
  if (!firstNav) {
    document.querySelector(".nav-link")?.classList.add("active");
  }
}

// Back to Top Button Functionality
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Initialize carousel with infinite seamless loop
document.addEventListener("DOMContentLoaded", () => {
  const tracks = document.querySelectorAll(".carousel .carousel-track");
  if (!tracks.length) return;

  tracks.forEach((track) => {
    const totalWidth = track.scrollWidth;
    const loopWidth = totalWidth / 2;
    const pxPerSecond = 120;
    const duration = Math.max(
      10,
      Math.min(90, Math.round(loopWidth / pxPerSecond)),
    );

    track.style.animationDuration = `${duration}s`;
    track.style.animationPlayState = "running";
  });
});
