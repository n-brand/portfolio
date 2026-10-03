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

// --- Footer Year ---
document.getElementById('year').textContent = new Date().getFullYear();
