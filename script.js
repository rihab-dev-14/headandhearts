
// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/95', 'shadow-md', 'py-2');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('bg-white/95', 'shadow-md', 'py-2');
        navbar.classList.add('py-4');
    }
});

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
});

const closeMenu = () => {
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
};

closeMenuBtn.addEventListener('click', closeMenu);
mobileMenuLinks.forEach(link => link.addEventListener('click', closeMenu));

// Modal Logic
const modal = document.getElementById('toloka-modal');
const tolokaForm = document.getElementById('toloka-form');
const successMessage = document.getElementById('success-message');
const formContainer = document.getElementById('form-container');

window.openModal = function() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Reset form after a delay
    setTimeout(() => {
        formContainer.classList.remove('hidden');
        successMessage.classList.add('hidden');
        tolokaForm.reset();
    }, 500);
}

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Form Submission
tolokaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formContainer.classList.add('hidden');
    successMessage.classList.remove('hidden');
});

// Event Filtering
window.filterEvents = function(type) {
    const cards = document.querySelectorAll('.event-card');
    const btnUpcoming = document.getElementById('btn-upcoming');
    const btnPast = document.getElementById('btn-past');

    cards.forEach(card => {
        if (card.classList.contains(type)) {
            card.classList.remove('hidden');
            // Trigger animation
            card.classList.remove('reveal');
            void card.offsetWidth; // Trigger reflow
            card.classList.add('reveal', 'active');
        } else {
            card.classList.add('hidden');
        }
    });

    if (type === 'upcoming') {
        btnUpcoming.classList.add('bg-brand-green', 'text-white', 'shadow-md');
        btnUpcoming.classList.remove('text-brand-green/50');
        btnPast.classList.remove('bg-brand-green', 'text-white', 'shadow-md');
        btnPast.classList.add('text-brand-green/50');
    } else {
        btnPast.classList.add('bg-brand-green', 'text-white', 'shadow-md');
        btnPast.classList.remove('text-brand-green/50');
        btnUpcoming.classList.remove('bg-brand-green', 'text-white', 'shadow-md');
        btnUpcoming.classList.add('text-brand-green/50');
    }
}

// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Initial check
revealOnScroll();

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
