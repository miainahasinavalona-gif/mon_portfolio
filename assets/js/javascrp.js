
// ── NAV scroll effect ──────────────────────────────
const nav = document.getElementById('header');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile nav toggle ──────────────────────────────
document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
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
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── Skill bars animation ───────────────────────────
const skillCards = document.querySelectorAll('.skill-card[data-pct]');
const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const pct = e.target.dataset.pct;
            const bar = e.target.querySelector('.bar-fill');
            setTimeout(() => { bar.style.width = pct + '%'; }, 200);
            barObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
skillCards.forEach(c => barObs.observe(c));

// ── Language bars animation ────────────────────────
const langBars = document.querySelectorAll('.bar-fill[data-pct]');
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
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--teal)' : '';
    });
});