// Smooth scrolling pour les liens de navigation
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

// Animation des barres de compétences au scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

// Observer les sections de compétences
document.querySelectorAll('.skill-category').forEach(section => {
    observer.observe(section);
});

// Animation fade-in pour les éléments au scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, { threshold: 0.1 });

// Observer les cartes de projet et autres éléments
document.querySelectorAll('.project-card, .timeline-item, .tech-icon').forEach(el => {
    fadeObserver.observe(el);
});

// Gestion du formulaire de contact
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulation d'envoi
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '📤 Envoi en cours...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = '✅ Message envoyé !';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.reset();
        }, 2000);
    }, 1500);
});

// Effet parallax léger sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
});

// Navigation active selon la section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Compteur animé pour les pourcentages de compétences
function animateCounters() {
    const counters = document.querySelectorAll('.skill-progress');
    counters.forEach(counter => {
        const target = parseInt(counter.style.width);
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.style.width = current + '%';
                requestAnimationFrame(updateCounter);
            } else {
                counter.style.width = target + '%';
            }
        };
        
        updateCounter();
    });
}

// Menu mobile responsive
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.classList.add('mobile-menu-btn');
            mobileBtn.innerHTML = '☰';
            mobileBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #764ba2;
                cursor: pointer;
            `;
            
            nav.appendChild(mobileBtn);
            
            mobileBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                navLinks.style.padding = '1rem';
            });
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    
    // Animation d'entrée pour le hero
    setTimeout(() => {
        document.querySelector('.hero-text').classList.add('animate-fadeInUp');
    }, 300);
});

// Redimensionnement de la fenêtre
window.addEventListener('resize', createMobileMenu);

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.transform = 'rotate(1deg)';
        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
            alert('🎉 Easter egg trouvé ! Vous êtes un vrai geek !');
        }, 1000);
        konamiCode = [];
    }
});

// Particules flottantes (effet visuel)
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 6 + 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
        `;
        hero.appendChild(particle);
    }
}

// Ajout des keyframes pour l'animation des particules  
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #be7ffeff;
        font-weight: 600;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
        33% { transform: translateY(-20px) rotate(120deg); opacity: 0.8; }
        66% { transform: translateY(-10px) rotate(240deg); opacity: 0.6; }
    }
    
    .skill-progress {
        transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-card:hover .project-image {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .hero-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .contact-info-grid {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .timeline {
            padding-left: 1rem;
        }
        
        .timeline-item {
            padding-left: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Initialisation des particules
setTimeout(createParticles, 1000);