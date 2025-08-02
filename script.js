document.addEventListener('DOMContentLoaded', () => {
    console.log('Resume script loaded');

    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const currentYearSpan = document.getElementById('current-year');

    // Set initial theme from local storage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.className = savedTheme + '-mode';
    if (savedTheme === 'light') {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('open');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
        body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                body.classList.remove('no-scroll');
            }
        });
    });

    // Slider functionality for skills, projects, and relevant experience
    function setupSlider(sliderId, prevBtnId, nextBtnId, wrapperId) {
        const slider = document.getElementById(sliderId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const wrapper = document.getElementById(wrapperId);

        if (!slider || !prevBtn || !nextBtn || !wrapper) {
            console.error(`Slider elements not found for ID: ${sliderId}`);
            return;
        }

        nextBtn.addEventListener('click', () => {
            wrapper.scrollBy({
                left: slider.offsetWidth / 3, // Scroll by approximately one card width
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            wrapper.scrollBy({
                left: -slider.offsetWidth / 3,
                behavior: 'smooth'
            });
        });
    }

    setupSlider('skills-slider', 'skills-prev-btn', 'skills-next-btn', 'skills-slider-wrapper');
    setupSlider('projects-slider', 'projects-prev-btn', 'projects-next-btn', 'projects-slider-wrapper');
    setupSlider('relevant-exp-slider', 'relevant-exp-prev-btn', 'relevant-exp-next-btn', 'relevant-exp-slider-wrapper');

    // Update current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});