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

// ── NAVBAR SCROLL SHADOW & GLOW ──────────────
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

// ── HERO PARALLAX ON SCROLL ──────────────────
const orb1 = document.querySelector('.orb1');
const orb2 = document.querySelector('.orb2');
const orb3 = document.querySelector('.orb3');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < 1000) {
    if (orb1) orb1.style.transform = `translateY(${scrolled * 0.22}px)`;
    if (orb2) orb2.style.transform = `translateY(${scrolled * -0.16}px)`;
    if (orb3) orb3.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.08}px))`;
  }
}, { passive: true });

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
    const scrollPos = window.scrollY + 130;
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
    // Smooth ease-out cubic
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

  // Safety fallback: ensure elements become visible if scroll is very fast
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

// ── IMAGE PREVIEW ON URL CHANGE (ADMIN) ──────
document.querySelectorAll('input[type="url"][name="image_url"]').forEach(input => {
  input.addEventListener('blur', () => {
    let preview = input.parentElement.querySelector('.img-preview');
    if (!preview) {
      preview = document.createElement('img');
      preview.className = 'img-preview';
      input.parentElement.appendChild(preview);
    }
    preview.src = input.value;
    preview.onerror = () => preview.remove();
  });
});
