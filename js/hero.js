'use strict';

// Image crossfade slideshow
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let activeIndex = 0;
  slides[0].classList.add('active');

  function nextSlide() {
    slides[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add('active');
  }

  setInterval(nextSlide, 5500);
})();
