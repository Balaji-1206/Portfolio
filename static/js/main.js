// ── NAVBAR SCROLL SHADOW & ACTIVE HIGHLIGHT ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 15 ? '0 4px 24px rgba(0,0,0,0.45)' : '';
  }, { passive: true });
}

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
    const scrollPos = window.scrollY + 120;
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

// ── AUTO-DISMISS FLASH MESSAGES ──────────────
document.querySelectorAll('.flash').forEach(el => {
  setTimeout(() => el.remove(), 5000);
});

// ── SCROLL REVEAL ANIMATIONS ─────────────────
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Safety fallback: ensure all items become visible after 1.2s in case of slow scroll
  setTimeout(() => {
    document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 1200);
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
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ── IMAGE PREVIEW ON URL CHANGE ──────────────
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
