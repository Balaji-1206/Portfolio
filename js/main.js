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

const copyText = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      try {
        const successful = document.execCommand('copy');
        textArea.remove();
        successful ? resolve() : reject();
      } catch (err) {
        textArea.remove();
        reject(err);
      }
    });
  }
};

document.querySelectorAll('.copyable-card[data-copy]').forEach(card => {
  card.addEventListener('click', (e) => {
    // If user clicked directly on a link inside the card, let the link handle it
    if (e.target.closest('a')) return;
    
    e.preventDefault();
    const val = card.getAttribute('data-copy');
    if (val) {
      copyText(val).then(() => {
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
          card.classList.remove('is-hidden');
          card.classList.add('revealed');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

// ── AUTO-DISMISS FLASH MESSAGES ──────────────
document.querySelectorAll('.flash').forEach(el => {
  setTimeout(() => el.remove(), 5000);
});

// ── INTERACTIVE SPOTLIGHT CARD TRACKING ──────
const spotlightCards = document.querySelectorAll('.spotlight-card, .stat-card, .skill-card, .project-card, .timeline-card, .contact-card');
spotlightCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--mouse-x');
    card.style.removeProperty('--mouse-y');
  });
});

// ══════════════════════════════════════════════
//  PREMIUM ADDITIONS
// ══════════════════════════════════════════════

// ── PAGE INTRO LOADER ─────────────────────────
(function() {
  const intro = document.getElementById('pageIntro');
  const fill  = document.getElementById('introBarFill');
  if (!intro || !fill) return;

  let progress = 0;
  const step = () => {
    // Accelerate through 0→85 quickly, linger before jump to 100
    const inc = progress < 70 ? 3.5 : progress < 88 ? 0.9 : 0;
    progress = Math.min(progress + inc, 88);
    fill.style.width = progress + '%';
    if (progress < 88) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);

  const finish = () => {
    fill.style.transition = 'width 0.3s ease';
    fill.style.width = '100%';
    setTimeout(() => {
      intro.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger hire-me badge visibility
      const badge = document.getElementById('hireMeBadge');
      if (badge) {
        setTimeout(() => badge.classList.add('visible'), 2500);
      }
    }, 350);
  };

  // Hide after DOMContentLoaded + a short grace period
  if (document.readyState === 'complete') {
    setTimeout(finish, 900);
  } else {
    window.addEventListener('load', () => setTimeout(finish, 600));
  }

  // Prevent scrolling during intro
  document.body.style.overflow = 'hidden';
})();

// ── CUSTOM CURSOR ──────────────────────────────
(function() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring || window.innerWidth <= 900) return;

  let dotX = -100, dotY = -100;
  let ringX = -100, ringY = -100;
  let isVisible = false;

  const updateDot = () => {
    dot.style.left  = dotX + 'px';
    dot.style.top   = dotY + 'px';
  };

  const updateRing = () => {
    // Trailing interpolation
    ringX += (dotX - ringX) * 0.13;
    ringY += (dotY - ringY) * 0.13;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(updateRing);
  };

  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX;
    dotY = e.clientY;
    updateDot();
    if (!isVisible) {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
      isVisible = true;
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    isVisible = false;
  });

  // Hover expand on interactive elements
  const hoverTargets = 'a, button, [role="button"], .copyable-card, .filter-btn, .social-btn, .project-card, .skill-card, input, textarea';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  // Click shrink
  document.addEventListener('mousedown', () => {
    ring.classList.add('clicking');
    ring.classList.remove('hovering');
  });
  document.addEventListener('mouseup', () => {
    ring.classList.remove('clicking');
  });

  requestAnimationFrame(updateRing);
})();

// ── SKILL PROFICIENCY BARS ─────────────────────
(function() {
  const bars = document.querySelectorAll('.skill-bar-fill[data-pct]');
  if (!bars.length || !('IntersectionObserver' in window)) return;

  const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const pct = parseInt(el.getAttribute('data-pct'), 10) || 0;
        // Small delay so the card reveal animation finishes first
        setTimeout(() => {
          el.style.width = pct + '%';
          el.classList.add('animated');
        }, 250);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));
})();

// ── FLOATING HIRE ME BADGE (scroll-based) ──────
(function() {
  const badge = document.getElementById('hireMeBadge');
  const intro = document.getElementById('pageIntro');
  if (!badge) return;

  // Only show after intro is gone
  const showBadge = () => {
    if (window.scrollY > 200) {
      badge.classList.add('visible');
    } else {
      badge.classList.remove('visible');
    }
  };

  // Don't start listening until intro has finished
  const introHidden = () => {
    window.addEventListener('scroll', showBadge, { passive: true });
    showBadge();
  };

  if (!intro) {
    introHidden();
  } else {
    intro.addEventListener('transitionend', introHidden, { once: true });
  }
})();

// ── MAGNETIC BUTTON EFFECT ─────────────────────
if (window.innerWidth > 900) {
  document.querySelectorAll('.btn-primary, .btn-outline, .social-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.03)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
