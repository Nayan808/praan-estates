'use strict';

// Page loader
(function () {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  // Hide loader after bar animation completes (~700ms)
  setTimeout(() => loader.classList.add('hide'), 700);
  setTimeout(() => loader.remove(), 1050);

})();

// Navbar scroll behavior + scroll progress bar
(function () {
  const nav = document.querySelector('.navbar');
  const progress = document.querySelector('.scroll-progress');
  const aqiOrbFixed = document.querySelector('.aqi-orb-fixed');
  const hero = document.querySelector('.hero, .project-hero');

  let heroHeight = hero ? hero.offsetHeight : 400;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docH = document.body.scrollHeight - window.innerHeight;

    // Navbar
    if (scrollY > 80) {
      nav && nav.classList.add('scrolled');
    } else {
      nav && nav.classList.remove('scrolled');
    }

    // Scroll progress
    if (progress && docH > 0) {
      progress.style.width = ((scrollY / docH) * 100) + '%';
    }

    // Fixed AQI orb
    if (aqiOrbFixed) {
      if (scrollY > heroHeight * 0.6) {
        aqiOrbFixed.classList.add('visible');
      } else {
        aqiOrbFixed.classList.remove('visible');
      }
    }
  }, { passive: true });

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      hamburger && hamburger.classList.remove('active');
      mobileMenu && mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger && hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

// Form validation
(function () {
  const forms = document.querySelectorAll('.enquiry-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        const wrap = field.closest('.form-field');
        const errMsg = wrap && wrap.querySelector('.form-error-msg');

        if (!field.value.trim()) {
          wrap && wrap.classList.add('error');
          if (errMsg) errMsg.textContent = 'This field is required.';
          valid = false;
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          wrap && wrap.classList.add('error');
          if (errMsg) errMsg.textContent = 'Please enter a valid email address.';
          valid = false;
        } else if (field.type === 'tel' && !/^[\d\s\+\-\(\)]{7,15}$/.test(field.value)) {
          wrap && wrap.classList.add('error');
          if (errMsg) errMsg.textContent = 'Please enter a valid phone number.';
          valid = false;
        } else {
          wrap && wrap.classList.remove('error');
        }
      });

      if (valid) {
        const btn = form.querySelector('.btn-submit');
        const successEl = document.getElementById('form-success');
        const errorEl   = document.getElementById('form-error-banner');

        btn.textContent = 'Sending…';
        btn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(form)
        })
        .then(r => r.json())
        .then(r => {
          if (r.success) {
            btn.style.display = 'none';
            if (successEl) successEl.style.display = 'block';
            form.reset();
          } else {
            btn.textContent = 'Send Enquiry';
            btn.disabled = false;
            if (errorEl) errorEl.style.display = 'block';
          }
        })
        .catch(() => {
          btn.textContent = 'Send Enquiry';
          btn.disabled = false;
          if (errorEl) errorEl.style.display = 'block';
        });
      }
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        const wrap = field.closest('.form-field');
        wrap && wrap.classList.remove('error');
      });
    });
  });
})();
