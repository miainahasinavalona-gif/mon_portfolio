// ── NAV scroll effect ──────────────────────────────
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Close mobile nav on scroll
window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
}, { passive: true });

// ── Mobile nav toggle ──────────────────────────────
navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// ── Keyboard navigation for mobile menu ──────────────────────────────
navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
    }
});

document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
            document.body.style.overflow = '';
        }
    });
});

// ── Scroll reveal ──────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ── Skill bars animation ───────────────────────────
const skillCards = document.querySelectorAll('.skill-card[data-pct]');
const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const pct = e.target.dataset.pct;
            const bar = e.target.querySelector('.bar-fill');
            if (bar) {
                setTimeout(() => { bar.style.width = pct + '%'; }, 200);
            }
            barObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
skillCards.forEach(c => barObs.observe(c));

// ── Language bars animation ────────────────────────
const langBars = document.querySelectorAll('.lang-item .bar-fill[data-pct]');
const langObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const pct = e.target.dataset.pct;
            setTimeout(() => { e.target.style.width = pct + '%'; }, 300);
            langObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
langBars.forEach(b => langObs.observe(b));

// ── Smooth active nav link ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY + 150; // Offset for fixed nav
    sections.forEach(s => {
        if (scrollY >= s.offsetTop) current = s.id;
    });
    navLinkElements.forEach(a => {
        const href = a.getAttribute('href');
        if (href === '#' + current) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
}, { passive: true });

// ── Smooth scroll for anchor links ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = nav.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ── WIP progress bar animation ────────────────────
const wipFill = document.querySelector('.wip-fill');
if (wipFill) {
    const wipObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = '40%';
                wipObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    wipObs.observe(wipFill);
}

// ── Parallax effect for hero orbs (optional, subtle) ─────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
    const orbs = document.querySelectorAll('.hero-orb');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        orbs.forEach((orb, index) => {
            const speed = 0.05 + (index * 0.02);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });
}

// ── Focus visible polyfill for older browsers ──────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});