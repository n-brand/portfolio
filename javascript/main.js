// --- Theme Toggle ---
const themeToggle = document.querySelector('.theme-toggle');

const applyTheme = theme => {
    if (theme === 'light') {
        document.documentElement.dataset.theme = 'light';
    } else {
        delete document.documentElement.dataset.theme;
    }
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
        themeToggle.setAttribute('aria-label', theme === 'light' ? 'Dunkles Design aktivieren' : 'Helles Design aktivieren');
    }
};

applyTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {}
    });
}

// --- Active Navigation ---
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...navLinks].map(link => document.getElementById(link.dataset.section)).filter(Boolean);

const setActiveLink = () => {
    if (sections.length !== navLinks.length) {
        return;
    }

    const isStacked = window.matchMedia('(max-width: 900px)').matches;
    const scrollHeight = document.documentElement.scrollHeight;
    const isScrollable = scrollHeight > window.innerHeight + 4;
    const nearBottom = isScrollable && window.innerHeight + window.scrollY >= scrollHeight - 4;
    let current = sections[0];

    if (nearBottom) {
        current = sections[sections.length - 1];
    } else {
        sections.forEach(section => {
            if (isStacked || section.id !== 'about') {
                if (section.getBoundingClientRect().top <= 120) {
                    current = section;
                }
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current.id);
    });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('resize', setActiveLink);
setActiveLink();

// --- Projects Filter ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// --- Art Frames ---
const artFrames = document.querySelectorAll('.art-frames');

if (artFrames.length && window.matchMedia('(hover: none)').matches && 'IntersectionObserver' in window) {
    const framesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            framesObserver.unobserve(entry.target);
            entry.target.classList.add('is-playing');
            setTimeout(() => entry.target.classList.remove('is-playing'), 3200);
        });
    }, { threshold: 0.6 });

    artFrames.forEach(frames => framesObserver.observe(frames));
}

// --- Footer Year ---
document.getElementById('year').textContent = new Date().getFullYear();
