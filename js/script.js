const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");
const header = document.getElementById("header");

menuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");

  menuIcon.textContent = isOpen ? "☰" : "✕";
  menuBtn.setAttribute("aria-expanded", String(!isOpen));
});

// Close menu after clicking a mobile navigation link
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIcon.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
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

function updateHeaderOnScroll() {
  header?.classList.toggle("scrolled", window.scrollY > 0);
}

window.addEventListener("scroll", () => {
  updateHeaderOnScroll();

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

updateHeaderOnScroll();

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
const slides = [
  {
    image: "assets/mango.jpeg",
    category: "Mango",
    title: "Skweezy Mango Juice",
    description: "Mango-flavoured fruit juice.",
  },
  {
    image: "assets/cola.jpeg",
    category: "Flavors",
    title: "BIB's Cola",
    description: "Refreshing cola drink.",
  },
  {
    image: "assets/energy.jpeg",
    category: "Energy",
    title: "Energyza",
    description: "Energy drink for a refreshing boost.",
  },
  {
    image: "assets/water_2.png",
    category: "Water",
    title: "HydroPure Water",
    description: "Pure drinking water.",
  },
  {
    image: "assets/water_3.png",
    category: "Water",
    title: "HydroPure Water",
    description: "Pure drinking water.",
  },
  {
    image: "assets/water_1.jpeg",
    category: "Water",
    title: "HydroPure Water",
    description: "Pure drinking water.",
  },
  {
    image: "assets/orange_slice.png",
    category: "Flavors",
    title: "Skweezy Orange Juice",
    description: "Orange-flavoured fruit juice.",
  },
  {
    image: "assets/skweezy_all.png",
    category: "Flavors",
    title: "Skweezy Juice Drinks",
    description: "A selection of Skweezy fruit drinks.",
  },
  {
    image: "assets/img-slider.png",
    category: "Flavors",
    title: "Bibagry product range",
    description: "Refreshing drinks from Bibagry Limited.",
  },
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
          class="h-full w-full object-cover"
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
            href="gallery.html"
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
// grid system gallery
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");

  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("galleryModalImage");

  const closeButton = document.getElementById("closeGalleryModal");
  const prevButton = document.getElementById("prevGalleryImage");
  const nextButton = document.getElementById("nextGalleryImage");

  const counter = document.getElementById("galleryCounter");

  // --------------------------------
  // Get all gallery images
  // --------------------------------

  const images = Array.from(galleryItems).map((item) => {
    const img = item.querySelector("img");

    return {
      src: img.src,
      alt: img.alt,
    };
  });

  let currentIndex = 0;
  let isAnimating = false;

  // --------------------------------
  // Update Counter
  // --------------------------------

  function updateCounter() {
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  // --------------------------------
  // Open Modal
  // --------------------------------

  function openModal(index) {
    currentIndex = index;

    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].alt;

    updateCounter();

    modal.classList.remove("hidden");

    requestAnimationFrame(() => {
      modal.classList.add("flex", "opacity-100");

      modalImage.classList.remove("scale-95", "opacity-0");

      modalImage.classList.add("scale-100", "opacity-100");
    });

    document.body.style.overflow = "hidden";
  }

  // --------------------------------
  // Close Modal
  // --------------------------------

  function closeModal() {
    modal.classList.remove("opacity-100");

    modalImage.classList.remove("scale-100", "opacity-100");

    modalImage.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");

      document.body.style.overflow = "";
    }, 300);
  }

  // --------------------------------
  // Change Image
  // --------------------------------

  function changeImage(index, direction) {
    if (isAnimating) return;

    isAnimating = true;

    // Exit animation
    modalImage.classList.remove("scale-100", "opacity-100");

    modalImage.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      currentIndex = index;

      modalImage.src = images[currentIndex].src;
      modalImage.alt = images[currentIndex].alt;

      updateCounter();

      // Reset position
      modalImage.classList.remove("scale-95", "opacity-0");

      modalImage.classList.add("scale-95", "opacity-0");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          modalImage.classList.remove("scale-95", "opacity-0");

          modalImage.classList.add("scale-100", "opacity-100");

          setTimeout(() => {
            isAnimating = false;
          }, 400);
        });
      });
    }, 250);
  }

  // --------------------------------
  // Next
  // --------------------------------

  function nextImage() {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    changeImage(nextIndex, "next");
  }

  // --------------------------------
  // Previous
  // --------------------------------

  function previousImage() {
    const previousIndex =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    changeImage(previousIndex, "prev");
  }

  // --------------------------------
  // Gallery Item Click
  // --------------------------------

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openModal(index);
    });
  });

  // --------------------------------
  // Buttons
  // --------------------------------

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    nextImage();
  });

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    previousImage();
  });

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeModal();
  });

  // --------------------------------
  // Click Outside
  // --------------------------------

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // --------------------------------
  // Keyboard
  // --------------------------------

  document.addEventListener("keydown", (event) => {
    if (modal.classList.contains("hidden")) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
    }

    if (event.key === "ArrowRight") {
      nextImage();
    }

    if (event.key === "ArrowLeft") {
      previousImage();
    }
  });
});
