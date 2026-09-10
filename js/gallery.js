// Move the same images from the hero into the following grid, in either scroll direction.
(() => {
  const journey = document.querySelector(".gallery-journey");
  if (!journey) return;
  const hero = journey.querySelector(".gallery-hero");
  const origins = [...journey.querySelectorAll(".gallery-origin")];
  const targets = [...journey.querySelectorAll(".gallery-destination")];
  const images = origins.map(origin => origin.querySelector("img"));
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const angles = [-7, 6, 5, -6];
  let geometry = [], frame = 0, top = 0, distance = 1;
  function render() {
    frame = 0;
    if (motion.matches || !geometry.length) return;
    const raw = Math.min(1, Math.max(0, (scrollY - top) / distance));
    const progress = raw * raw * (3 - 2 * raw);
    geometry.forEach((item, i) => {
      const mix = (a, b) => a + (b - a) * progress;
      images[i].style.width = mix(item.width, item.endWidth) + "px";
      images[i].style.height = mix(item.height, item.endHeight) + "px";
      images[i].style.transform = "translate3d(" + mix(item.x, item.endX) + "px," + mix(item.y, item.endY) + "px,0) rotate(" + angles[i] * (1 - progress) + "deg)";
    });
  }
  function measure() {
    journey.classList.toggle("is-animated", !motion.matches);
    if (motion.matches) {
      images.forEach((img, i) => { img.removeAttribute("style"); origins[i].appendChild(img); });
      geometry = [];
      return;
    }
    images.forEach(img => journey.appendChild(img));
    const bounds = journey.getBoundingClientRect();
    top = bounds.top + scrollY;
    distance = Math.max(1, hero.offsetHeight * .85);
    geometry = origins.map((origin, i) => {
      const from = origin.getBoundingClientRect(), to = targets[i].getBoundingClientRect();
      return { x: from.left - bounds.left, y: from.top - bounds.top, width: from.width, height: from.height,
        endX: to.left - bounds.left, endY: to.top - bounds.top, endWidth: to.width, endHeight: to.height };
    });
    render();
  }
  addEventListener("scroll", () => { if (!frame && !motion.matches) frame = requestAnimationFrame(render); }, { passive: true });
  addEventListener("resize", measure);
  addEventListener("pageshow", measure);
  motion.addEventListener("change", measure);
  if ("ResizeObserver" in window) new ResizeObserver(measure).observe(journey);
  if (document.fonts) document.fonts.ready.then(measure);
  measure();
})();
