'use strict';

// Scroll reveal via IntersectionObserver
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// Villa tabs (project page)
(function () {
  const tabs = document.querySelectorAll('.villa-tab');
  const contents = document.querySelectorAll('.villa-tab-content');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const content = document.querySelector(`.villa-tab-content[data-tab="${target}"]`);
      content && content.classList.add('active');
    });
  });
})();

// Layout plan hover tooltips (project page)
(function () {
  const planWrap = document.querySelector('.layout-plan-img-wrap');
  const tooltip = document.querySelector('.plot-tooltip');

  if (!planWrap || !tooltip) return;

  const plotAreas = planWrap.querySelectorAll('.plot-area');

  plotAreas.forEach(area => {
    area.addEventListener('mouseenter', (e) => {
      tooltip.querySelector('.plot-tooltip-plot').textContent = 'Plot ' + area.dataset.plot;
      tooltip.querySelector('.plot-tooltip-area').textContent = area.dataset.area + ' sq.m';
      tooltip.querySelector('.plot-tooltip-acres').textContent = area.dataset.acres + ' acres';
      tooltip.classList.add('visible');
    });

    area.addEventListener('mousemove', (e) => {
      const rect = planWrap.getBoundingClientRect();
      let x = e.clientX - rect.left + 12;
      let y = e.clientY - rect.top + 12;
      // Keep within bounds
      if (x + 180 > rect.width) x = e.clientX - rect.left - 180;
      if (y + 80 > rect.height) y = e.clientY - rect.top - 80;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });

    area.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
})();
