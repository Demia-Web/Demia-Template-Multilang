import { gsap } from "gsap";
import Lenis from "lenis";

// Debug
const debug = false;

// Lenis
const lenis = new Lenis();

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

var isLenisRunning = true;

function toggleLenis() {
  if (lenis) {
    if (isLenisRunning) {
      lenis.stop();
      isLenisRunning = false;
    } else {
      lenis.start();
      isLenisRunning = true;
    }
  } else {
  }
}

export function stopLenis() {
  lenis.stop();
}

export function startLenis() {
  lenis.start();
}

document.addEventListener("astro:page-load", () => {
  lenis.start();
});

// Debug per la dimensione dello schermo
document.addEventListener("astro:page-load", () => {
  function updateViewport() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const vwInRem = (vw / rem).toFixed(2);
    const vhInRem = (vh / rem).toFixed(2);
    console.log(`Current vw: ${vw}px | ${vwInRem}rem — Current vh: ${vh}px | ${vhInRem}rem`);
  }

  if (debug) {
    window.addEventListener("resize", updateViewport);
    updateViewport();
  }
});

// Menu
document.addEventListener("astro:page-load", () => {
  var icons = document.getElementsByClassName("menuIcon");
  var menu = document.getElementById("menu");
  var overlay = document.getElementById("overlay");

  Array.prototype.forEach.call(icons, function (icon) {
    icon.addEventListener("click", function () {
      var header = document.querySelector(".nav-down");
      icon.classList.toggle("active");
      menu.classList.toggle("show");
      overlay.classList.toggle("show");
      toggleLenis();
    });
  });
});

// Scroll link fluido
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetSelector = link.getAttribute("href");
    const target = document.querySelector(targetSelector);

    if (target) {
      const targetOffset = target.getBoundingClientRect().top + lenis.scroll;

      lenis.scrollTo(targetOffset, {
        duration: 0.6,
        easing: (t) =>
          // Cubic-bezier(0.57, 0, 0.58, 1) approximation
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    }
  });
});
