const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });
}

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
  if (
    currentPage === "about.html" ||
    currentPage === "about" ||
    currentPage === "gallery.html" ||
    currentPage === "gallery"
  ) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isAboutPage = href === "about.html" || href === "about";
      const isGalleryPage = href === "gallery.html" || href === "gallery";
      const activePage =
        currentPage === "about.html" || currentPage === "about"
          ? isAboutPage
          : isGalleryPage;
      link.classList.toggle("active", activePage);
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
        link.getAttribute("href") === "#" + current ||
          (current === "gallery" &&
            (link.getAttribute("href") === "gallery.html" ||
              link.getAttribute("href") === "gallery")),
      );
    });
  }
});

// Set initial active state on page load
if (
  currentPage === "about.html" ||
  currentPage === "about" ||
  currentPage === "gallery.html" ||
  currentPage === "gallery"
) {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isAboutPage = href === "about.html" || href === "about";
    const isGalleryPage = href === "gallery.html" || href === "gallery";
    const activePage =
      currentPage === "about.html" || currentPage === "about"
        ? isAboutPage
        : isGalleryPage;
    link.classList.toggle("active", activePage);
  });
} else {
  const firstNav = document.querySelector(".nav-link.active");
  if (!firstNav) {
    document.querySelector(".nav-link")?.classList.add("active");
  }
}

// Back to Top Button Functionality
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
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
}

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
/* ==========================================
   RESPONSIVE 3D IMAGE CAROUSEL
   13 ITEMS
========================================== */

/* ------------------------------------------
   CAROUSEL DATA
------------------------------------------ */

const slides = [
  {
    image: "assets/skweezy-group.jpg",
    category: "Mango",
    title: "Skweezy-Mango",
    description: " demo text lorem ipsum dolor sit amet.",
  },

  {
    image: "assets/smoovy-group.jpg",
    category: "Flavors",
    title: "Creative Brand Identity",
    description: "lorem ipsum dolor sit amet.",
  },

  {
    image: "assets/tangawizi-group.jpg",
    category: "Ginger",
    title: "Tangawizi-Ginger",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

  {
    image: "assets/cola-group.jpg",
    category: "Cola",
    title: "Cola Drink",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

  {
    image: "assets/hydropure-group.jpg",
    category: "Water",
    title: "hydropure Water",
    description: "lorem ipsum dolor sit amet.",
  },

  {
    image: "assets/gallery-1.png",
    category: "Water",
    title: "pure Water",
    description: "lorem ipsum dolor sit amet.",
  },

  {
    image: "assets/gallery-2.png",
    category: "water",
    title: "lemon soda",
    description: "lorem ipsum dolor sit amet.",
  },

  {
    image: "assets/gallery-3.png",
    category: "lorem",
    title: "lorem",
    description: "lorem ipsum dolor sit amet.",
  },

  {
    image: "assets/gallery-5.png",
    category: "lorem",
    title: "lorem",
    description: "lorem ipsum dolor sit amet.",
  },

  {
    image: "assets/gallery-6.png",
    category: "lorem",
    title: "lorem",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

  // {
  //   image:
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
  //   category: "Analytics",
  //   title: "Data Driven Design",
  //   description: "Turning meaningful data into better digital experiences.",
  // },

  // {
  //   image:
  //     "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  //   category: "Development",
  //   title: "Modern Development",
  //   description:
  //     "Fast, scalable and responsive digital products for modern brands.",
  // },

  // {
  //   image:
  //     "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=1200&q=85",
  //   category: "Innovation",
  //   title: "Ideas That Inspire",
  //   description:
  //     "Innovative concepts that turn simple ideas into memorable experiences.",
  // },
];

/* ------------------------------------------
   DOM ELEMENTS
------------------------------------------ */

const track = document.getElementById("carousel-track");
const dotsContainer = document.getElementById("dots");
const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

/* ------------------------------------------
   VARIABLES
------------------------------------------ */

let current = 0;

let autoplay = null;

const autoplayDelay = 3500;

/* ------------------------------------------
   CREATE CARDS
------------------------------------------ */

function createCards() {
  track.innerHTML = "";

  slides.forEach((slide, index) => {
    const card = document.createElement("article");

    card.className = `
      carousel-card
      absolute
      w-[275px]
      overflow-hidden
      rounded-[2rem]
      bg-white
      shadow-soft
      transition-all
      duration-700
      ease-in-out
      sm:w-[360px]
      lg:w-[420px]
    `;

    card.innerHTML = `

      <div class="relative h-[390px] sm:h-[470px]">

        <!-- Image -->

        <img
          src="${slide.image}"
          alt="${slide.title}"
          loading="${index === 0 ? "eager" : "lazy"}"
          class="h-full w-full object-contain"
        />


        <!-- Gradient -->

        <div
          class="absolute inset-0
                 bg-gradient-to-t
                 from-bib-dark/90
                 via-bib-dark/20
                 to-transparent"
        ></div>


        <!-- Badge -->

        <div class="absolute left-5 top-5">

          <span
            class="inline-flex rounded-full
                   bg-bib-green
                   px-4 py-2
                   font-body
                   text-[10px]
                   font-bold
                   uppercase
                   tracking-wider
                   text-white
                   shadow-lg"
          >
            Featured
          </span>

        </div>


        <!-- Content -->

        <div
          class="absolute bottom-0 left-0 right-0 p-6 sm:p-7"
        >

          <p
            class="font-body
                   text-[11px]
                   font-semibold
                   uppercase
                   tracking-[0.2em]
                   text-dark"
          >
            ${slide.category}
          </p>


          <h3
            class="mt-2
                   font-display
                   text-2xl
                   font-bold
                   leading-tight
                   text-white
                   sm:text-3xl"
          >
            ${slide.title}
          </h3>


          <p
            class="mt-3
                   font-body
                   text-sm
                   leading-6
                   text-white/75"
          >
            ${slide.description}
          </p>


          <a
            href="#"
            class="mt-5
                   inline-flex
                   items-center
                   gap-2
                   rounded-full
                  bg-bib-green
                   px-5
                   py-3
                   font-body
                   text-sm
                   font-bold
                   text-white
                   transition
                   duration-300
                  hover:bg-green-700 "
          >

            View gallery

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>

          </a>

        </div>

      </div>
    `;

    track.appendChild(card);
  });

  updateCards();
}

/* ------------------------------------------
   UPDATE 3D CARDS
------------------------------------------ */

function updateCards() {
  const cards = document.querySelectorAll(".carousel-card");

  const total = slides.length;

  cards.forEach((card, index) => {
    let position = index - current;

    /* Infinite Loop */

    if (position > total / 2) {
      position -= total;
    }

    if (position < -total / 2) {
      position += total;
    }

    /* ----------------------------------
       CENTER CARD
    ---------------------------------- */

    if (position === 0) {
      card.style.transform =
        "translateX(0) translateZ(80px) rotateY(0deg) scale(1)";

      card.style.opacity = "1";

      card.style.zIndex = "30";

      card.style.filter = "none";
    } else if (position === -1) {
      /* ----------------------------------
       LEFT CARD
    ---------------------------------- */
      card.style.transform =
        "translateX(-250px) translateZ(-80px) rotateY(18deg) scale(.78)";

      card.style.opacity = ".65";

      card.style.zIndex = "20";

      card.style.filter = "brightness(.75)";
    } else if (position === 1) {
      /* ----------------------------------
       RIGHT CARD
    ---------------------------------- */
      card.style.transform =
        "translateX(250px) translateZ(-80px) rotateY(-18deg) scale(.78)";

      card.style.opacity = ".65";

      card.style.zIndex = "20";

      card.style.filter = "brightness(.75)";
    } else {
      /* ----------------------------------
       OTHER CARDS
    ---------------------------------- */
      card.style.transform = "translateX(0) translateZ(-300px) scale(.5)";

      card.style.opacity = "0";

      card.style.zIndex = "0";
    }
  });

  updateDots();
}

/* ------------------------------------------
   CREATE DOTS
------------------------------------------ */

function createDots() {
  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.type = "button";

    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    dot.className =
      index === 0
        ? "h-2.5 w-8 rounded-full bg-bib-green transition-all duration-300"
        : "h-2.5 w-2.5 rounded-full bg-bib-dark/20 transition-all duration-300 hover:bg-bib-orange";

    dot.addEventListener("click", () => {
      current = index;

      updateCards();

      restartAutoplay();
    });

    dotsContainer.appendChild(dot);
  });
}

/* ------------------------------------------
   UPDATE DOTS
------------------------------------------ */

function updateDots() {
  const dots = dotsContainer.querySelectorAll("button");

  dots.forEach((dot, index) => {
    if (index === current) {
      dot.className =
        "h-2.5 w-8 rounded-full bg-bib-green transition-all duration-300";
    } else {
      dot.className =
        "h-2.5 w-2.5 rounded-full bg-bib-dark/20 transition-all duration-300 hover:bg-bib-orange";
    }
  });
}

/* ------------------------------------------
   NEXT SLIDE
------------------------------------------ */

function nextSlide() {
  current = (current + 1) % slides.length;

  updateCards();
}

/* ------------------------------------------
   PREVIOUS SLIDE
------------------------------------------ */

function previousSlide() {
  current = (current - 1 + slides.length) % slides.length;

  updateCards();
}

/* ------------------------------------------
   BUTTON EVENTS
------------------------------------------ */

nextBtn.addEventListener("click", () => {
  nextSlide();

  restartAutoplay();
});

prevBtn.addEventListener("click", () => {
  previousSlide();

  restartAutoplay();
});

/* ------------------------------------------
   AUTOPLAY
------------------------------------------ */

function startAutoplay() {
  stopAutoplay();

  autoplay = setInterval(() => {
    nextSlide();
  }, autoplayDelay);
}

function stopAutoplay() {
  if (autoplay !== null) {
    clearInterval(autoplay);

    autoplay = null;
  }
}

function restartAutoplay() {
  stopAutoplay();

  startAutoplay();
}

/* ------------------------------------------
   PAUSE ON HOVER
------------------------------------------ */

carousel.addEventListener("mouseenter", stopAutoplay);

carousel.addEventListener("mouseleave", startAutoplay);

/* ------------------------------------------
   INITIALIZE
------------------------------------------ */

createCards();

createDots();

startAutoplay();

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("heroParticles");

  const colors = [
    "#3DAE2B", // BIB Green
    "#B8DF5A", // BIB Lime
    "#F7A51A", // BIB Orange
    "#FFF9EA", // Cream
    "#8BCF45",
    "#FFD166",
  ];

  const shapes = ["●", "●", "●", "◆", "✦"];

  for (let i = 1; i <= 80; i++) {
    const particle = document.createElement("span");

    const size = Math.random() * 7 + 4;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 25 + 25;
    const delay = Math.random() * -30;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    particle.innerHTML = shape;

    particle.style.position = "absolute";
    particle.style.left = left + "%";
    particle.style.top = top + "%";
    particle.style.fontSize = size + "px";
    particle.style.color = color;
    particle.style.opacity = Math.random() * 0.35 + 0.45;
    particle.style.textShadow = `0 0 10px ${color}`;
    particle.style.animation = `
        heroParticleFloat ${duration}s ease-in-out ${delay}s infinite
      `;

    container.appendChild(particle);
  }
});
