/* ============================================
   UI.JS - Microinteracciones Bento UI
   Tilt 3D, Stagger reveals, Parallax
   ============================================ */

(function() {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scope = document.querySelector('.enhanced') || document.body;
  if (!scope) return;

  // 1) MOUSE GLOW: seguir el cursor en botones/tarjetas
  function trackMouseGlow(el) {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const mx = Math.round(e.clientX - r.left);
      const my = Math.round(e.clientY - r.top);
      el.style.setProperty('--mx', mx + 'px');
      el.style.setProperty('--my', my + 'px');
    });
  }
  scope.querySelectorAll('.btn, .card, .bento-item').forEach(trackMouseGlow);

  // 2) INTERSECTION OBSERVER: animaciones al entrar en viewport
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    scope.querySelectorAll('.anim-in, .anim-scale, .anim-rotate, .anim-blur, .anim-flip').forEach(el => io.observe(el));
  }

  // 3) TILT 3D avanzado en tarjetas y Bento items
  function tiltify(card) {
    if (prefersReduced) return;
    const max = 8; // grados máximos
    let raf = null;

    function onMove(e) {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = (-dy * max).toFixed(2);
      const ry = (dx * max).toFixed(2);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
    }

    function reset() {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = '';
    }

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', reset);
  }
  scope.querySelectorAll('.card, .bento-item, .tilt-3d').forEach(tiltify);

  // 4) RIPPLE en botones (feedback visual)
  function addRipple(btn) {
    btn.addEventListener('click', (e) => {
      const d = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      d.style.position = 'absolute';
      d.style.inset = '0';
      d.style.borderRadius = 'inherit';
      d.style.pointerEvents = 'none';
      d.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3), rgba(255,255,255,0))';
      d.style.transform = `translate(${e.clientX - rect.left - size/2}px, ${e.clientY - rect.top - size/2}px) scale(0)`;
      d.style.transition = 'transform 450ms ease, opacity 600ms ease';
      d.style.opacity = '1';
      btn.appendChild(d);
      requestAnimationFrame(() => {
        d.style.transform += ' scale(1.4)';
        d.style.opacity = '0';
      });
      setTimeout(() => d.remove(), 620);
    });
  }
  scope.querySelectorAll('.btn, .bento-action').forEach(addRipple);

  // 5) NAVEGACIÓN ACTIVA (marcar link actual)
  try {
    const path = location.pathname.replace(/\/+$/, '');
    (scope.querySelectorAll('.nav a') || []).forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href && path.endsWith(href.replace(/\/+$/, ''))) {
        a.classList.add('is-active');
      }
    });
  } catch (e) {}

  // 6) PARALLAX suave en scroll (aplicado a elementos con .parallax)
  if (!prefersReduced) {
    const parallaxElements = scope.querySelectorAll('.parallax');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.3;
            el.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // 7) STAGGER en hover para grupos de elementos
  const staggerGroups = scope.querySelectorAll('.stagger-group');
  staggerGroups.forEach(group => {
    const items = group.querySelectorAll('.stagger-item');
    group.addEventListener('mouseenter', () => {
      items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('stagger-hovered');
        }, i * 60);
      });
    });
    group.addEventListener('mouseleave', () => {
      items.forEach(item => item.classList.remove('stagger-hovered'));
    });
  });

  // 8) SMOOTH SCROLL interno
  scope.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 9) LAZY LOADING de imágenes con fade-in
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    scope.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  // 10) CONTADOR animado para números (stats)
  function animateCounter(el) {
    const target = parseInt(el.dataset.count || el.textContent.replace(/\D/g, ''));
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    scope.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
  }

})();