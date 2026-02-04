// KhelVista Website JavaScript
// Mobile Navigation, Smooth Scrolling, and Animations

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Animated Counter for Stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');

            // Animate stat counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => observer.observe(stat));

// Observe all cards for fade-in animation
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    if (!card.classList.contains('fade-in-up')) {
        observer.observe(card);
    }
});

// Observe gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    if (!item.classList.contains('fade-in-up')) {
        observer.observe(item);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.phone || !data.email || !data.sport) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            showFormMessage('Please enter a valid phone number', 'error');
            return;
        }

        // Show error message directing to call
        showFormMessage('⚠️ Oops! There was an error submitting your request. Please call us directly at +91 6002036204 to book your slot.', 'error');

        // Log to console (for demonstration)
        console.log('Form submitted:', data);
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.style.display = 'block';

        if (type === 'success') {
            formMessage.style.background = 'rgba(34, 197, 94, 0.1)';
            formMessage.style.border = '1px solid rgba(34, 197, 94, 0.3)';
            formMessage.style.color = 'var(--primary-green)';
        } else {
            formMessage.style.background = 'rgba(239, 68, 68, 0.1)';
            formMessage.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            formMessage.style.color = '#ef4444';
        }

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Input focus effects
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.style.borderColor = 'var(--primary-green)';
        this.style.outline = 'none';
    });

    input.addEventListener('blur', function () {
        this.style.borderColor = 'var(--glass-border)';
    });
});

// Parallax effect disabled - was causing sections to scroll at different speeds
// window.addEventListener('scroll', () => {
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         const scrolled = window.pageYOffset;
//         const parallax = scrolled * 0.5;
//         hero.style.transform = `translateY(${parallax}px)`;
//     }
// });

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add fade-in class to elements that should animate immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
});

console.log('KhelVista website loaded successfully! 🏏⚽');
