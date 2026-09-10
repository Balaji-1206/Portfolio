// ── SCROLL PROGRESS BAR ──────────────────────
const progressBar = document.getElementById('scrollProgressBar');
const updateScrollProgress = () => {
  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (window.scrollY / docHeight) * 100;
      progressBar.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';
    }
  }
};
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ── NAVBAR SCROLL SHADOW ─────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 15 ? '0 4px 28px rgba(0,0,0,0.5)' : '';
  }, { passive: true });
}

// ── BACK TO TOP BUTTON ───────────────────────
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── AMBIENT CURSOR SPOTLIGHT ─────────────────
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.innerWidth > 768) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  const renderGlow = () => {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(renderGlow);
  };
  requestAnimationFrame(renderGlow);
}

// ── INTERACTIVE NEURAL PARTICLES CANVAS ──────
const canvas = document.getElementById('neuralCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  const resize = () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  }, { passive: true });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 1.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse connection & gentle push
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 166, 35, 0.7)';
      ctx.fill();
    }
  }

  const count = Math.min(Math.floor(width / 26), 45);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  const animate = () => {
    if (window.scrollY < height + 100) {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 166, 35, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 107, 53, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(animate);
  };
  animate();
}

// ── DYNAMIC MULTI-ROLE TYPEWRITER ───────────
const typedTitle = document.getElementById('typedTitle');
if (typedTitle && typedTitle.getAttribute('data-roles')) {
  try {
    const roles = JSON.parse(typedTitle.getAttribute('data-roles'));
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let currentRole = roles[0];

    const typeSpeed = () => {
      const currentFull = roles[roleIdx];

      if (isDeleting) {
        charIdx--;
        typedTitle.textContent = currentFull.substring(0, charIdx);
      } else {
        charIdx++;
        typedTitle.textContent = currentFull.substring(0, charIdx);
      }

      let delta = isDeleting ? 40 : 85;

      if (!isDeleting && charIdx === currentFull.length) {
        delta = 2200; // Pause after typing
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        delta = 450; // Pause before typing next
      }

      setTimeout(typeSpeed, delta);
    };
    setTimeout(typeSpeed, 1000);
  } catch (_) {}
}

// ── 3D TILT EFFECT ON PROJECT CARDS ──────────
if (window.innerWidth > 800) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── ONE-CLICK COPY TO CLIPBOARD + TOAST ──────
const copyToast = document.getElementById('copyToast');
const toastMsg = document.getElementById('toastMsg');
let toastTimer = null;

const showToast = (text) => {
  if (copyToast) {
    if (toastMsg) toastMsg.textContent = text;
    copyToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2800);
  }
};

document.querySelectorAll('.copyable-card[data-copy]').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const val = card.getAttribute('data-copy');
    if (val && navigator.clipboard) {
      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied "${val}" to clipboard!`);
      }).catch(() => {
        showToast(`Copied to clipboard!`);
      });
    }
  });
});

// ── MOBILE NAV TOGGLE ────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── SMOOTH SCROLL FOR IN-PAGE ANCHORS ────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.length > 1) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        try {
          history.pushState(null, null, targetId);
        } catch (_) {}
      }
    }
  });
});

// ── SCROLLSPY (ACTIVE NAV LINK ON SCROLL) ────
const sections = document.querySelectorAll('section[id]');
if (sections.length > 1 && navLinks) {
  const onScrollSpy = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.querySelectorAll('a').forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href')?.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', onScrollSpy, { passive: true });
}

// ── ANIMATED NUMBERS COUNTER ON SCROLL ───────
function animateCount(el, target, duration = 1400, decimals = 0, suffix = '') {
  let start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * ease;
    el.textContent = current.toFixed(decimals) + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
    }
  }
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num[data-count]');
if (statNums.length && 'IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        animateCount(el, target, 1600, decimals, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statNums.forEach(el => countObserver.observe(el));
}

// ── DYNAMIC SCROLL REVEAL (STAGGERED) ────────
const revealElements = document.querySelectorAll('.stat-card, .timeline-card, .achievement-badge, .skill-card, .project-card, .contact-card, .section-header');
revealElements.forEach((el, index) => {
  el.classList.add('reveal-on-scroll');
  const delayClass = `reveal-delay-${(index % 4) + 1}`;
  el.classList.add(delayClass);
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -25px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  setTimeout(() => {
    revealElements.forEach(el => el.classList.add('revealed'));
  }, 1400);
} else {
  revealElements.forEach(el => el.classList.add('revealed'));
}

// ── SKILLS CATEGORY FILTERING ────────────────
const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');
if (filterButtons.length && skillCards.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.add('revealed');
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ── AUTO-DISMISS FLASH MESSAGES ──────────────
document.querySelectorAll('.flash').forEach(el => {
  setTimeout(() => el.remove(), 5000);
});
