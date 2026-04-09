/* ============================================
   BlackVerse — Main JavaScript
   Pure vanilla JS, zero libraries
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initParallaxOrbs();
  initScrollReveal();
  initCounters();
  initTypingEffect();
  initMobileMenu();
  initContactForm();
  initGpuCards();
  initComparisonBars();
  initNavbarHide();
});

/* ============================================
   NAVBAR — Hide/Show on scroll
   ============================================ */

function initNavbarHide() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScrollY = 0;
  let ticking = false;

  function updateNavbar() {
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */

function initCursor() {
  const cursor = document.querySelector('.cursor-dot');
  if (!cursor || window.matchMedia('(hover: none)').matches) return;

  let mx = 0, my = 0;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  const interactives = 'a, button, input, select, textarea, .tag, .gpu-card, .stat-pill, .glass';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) cursor.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) cursor.classList.remove('hover');
  });

  function loop() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.transform = `translate(${cx - cursor.offsetWidth / 2}px, ${cy - cursor.offsetHeight / 2}px)`;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ============================================
   PARALLAX ORBS
   ============================================ */

function initParallaxOrbs() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const speeds = [30, -20, 15];

  function loop() {
    orbs.forEach((orb, i) => {
      const speed = speeds[i] || 10;
      const tx = mx * speed;
      const ty = my * speed;
      orb.style.transform = `translate(${tx}px, ${ty}px)`;
    });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ============================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================ */

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = el.getAttribute('data-count');
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 1800;
  const start = performance.now();

  const isNumeric = !isNaN(parseFloat(target));

  if (!isNumeric) {
    el.textContent = prefix + target + suffix;
    return;
  }

  const end = parseFloat(target);
  const isFloat = target.includes('.');

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isFloat ? (eased * end).toFixed(1) : Math.floor(eased * end);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = prefix + target + suffix;
  }

  requestAnimationFrame(step);
}

/* ============================================
   TYPING EFFECT
   ============================================ */

function initTypingEffect() {
  const terminal = document.querySelector('.terminal-body');
  if (!terminal) return;

  const lines = terminal.querySelectorAll('.terminal-line');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeLines(lines);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(terminal);
}

function typeLines(lines) {
  let lineIdx = 0;
  let charIdx = 0;
  let fullText = '';

  function type() {
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];
    if (!line.dataset.fullHtml) {
      line.dataset.fullHtml = line.innerHTML;
    }
    fullText = line.dataset.fullHtml;

    if (!line.classList.contains('typed')) {
      line.innerHTML = '';
      line.classList.add('typed');
    }

    charIdx++;
    line.innerHTML = fullText.substring(0, charIdx);

    if (charIdx < fullText.length) {
      const speed = fullText[charIdx - 1] === '<' ? 0 : 18 + Math.random() * 30;
      setTimeout(type, speed);
    } else {
      charIdx = 0;
      lineIdx++;
      setTimeout(type, 300 + Math.random() * 200);
    }
  }

  type();
}

/* ============================================
   MOBILE MENU
   ============================================ */

function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================
   CONTACT FORM
   ============================================ */

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const res = await fetch('https://discord.com/api/webhooks/1453184485414797315/VVTQGoahHYjZy8pDW4-j9k089RZyYTFILUTBb8t48K0NcICm_ObgtyuxyCGhNRBZCZof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '@everyone @here',
          embeds: [{
            title: '💬 Nuevo Mensaje',
            color: 8073407,
            fields: [
              { name: '👤 Nombre', value: name, inline: true },
              { name: '📧 Email', value: email, inline: true },
              { name: '📋 Asunto', value: subject },
              { name: '💬 Mensaje', value: message }
            ],
            timestamp: new Date().toISOString(),
            footer: { text: 'Blackverse Contact' }
          }]
        })
      });

      if (res.ok) {
        alert('Mensaje enviado con exito.');
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      alert('Mensaje enviado. Si no llega, contacta por otro medio.');
      form.reset();
    } finally {
      btn.textContent = orig;
      btn.disabled = false;
    }
  });
}

/* ============================================
   GPU CARDS — entrance animation
   ============================================ */

function initGpuCards() {
  const cards = document.querySelectorAll('.gpu-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    observer.observe(card);
  });
}

/* ============================================
   COMPARISON BARS
   ============================================ */

function initComparisonBars() {
  const bars = document.querySelectorAll('.comparison-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}