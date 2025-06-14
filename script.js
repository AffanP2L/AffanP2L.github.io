// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .project-card, .metric, .timeline-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after loading
setTimeout(() => {
    const subtitle = document.querySelector('.title-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 100);
    }
}, 3000);

// Particle animation for hero background
function createParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation CSS
const particleCSS = `
@keyframes particleFloat {
    0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
    }
    10%, 90% {
        opacity: 1;
    }
    50% {
        transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
    }
}
`;

const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize particles
setTimeout(createParticles, 3000);

// Hash verification animation
function animateHash(element) {
    const text = element.textContent;
    const chars = text.split('');
    element.textContent = '';
    
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.animation = `fadeInChar 0.05s ease forwards ${index * 0.01}s`;
        element.appendChild(span);
    });
}

// Add hash animation CSS
const hashCSS = `
@keyframes fadeInChar {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

const hashStyle = document.createElement('style');
hashStyle.textContent = hashCSS;
document.head.appendChild(hashStyle);

// Animate hash values when they come into view
const hashObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateHash(entry.target);
            hashObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hash-value').forEach(hash => {
    hashObserver.observe(hash);
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// AI Mirror code animation
function animateCode() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, (index + 1) * 500);
    });
}

// Start code animation after initial load
setTimeout(animateCode, 4000);

// Metric bars animation
function animateMetricBars() {
    const metricBars = document.querySelectorAll('.metric-fill');
    metricBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Animate metric bars when legacy section is visible
const legacyObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateMetricBars();
            legacyObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const legacySection = document.querySelector('.legacy');
if (legacySection) {
    legacyObserver.observe(legacySection);
}

// Add CSS for additional animations
const additionalCSS = `
.animate-in {
    animation: slideInUp 0.8s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.particle {
    z-index: 1;
}

.project-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.metric-fill {
    transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
    .nav-links {
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        height: calc(100vh - 80px);
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    .nav-links.active {
        transform: translateX(0);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
`;

const additionalStyle = document.createElement('style');
additionalStyle.textContent = additionalCSS;
document.head.appendChild(additionalStyle);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: Show special message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            font-family: 'JetBrains Mono', monospace;
            z-index: 10000;
            box-shadow: 0 0 50px rgba(99, 102, 241, 0.5);
        `;
        message.innerHTML = `
            <h3>🎉 Mirror Intelligence Activated!</h3>
            <p>You've unlocked the hidden emotional resonance mode.</p>
            <p><small>Emotional Authenticity: 1.00</small></p>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 500);
        }, 3000);
        
        konamiCode = [];
    }
});

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('🚀 Site Performance:', {
                    loadTime: `${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`,
                    domContentLoaded: `${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`,
                    totalTime: `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`
                });
            }, 0);
        });
    }
}

monitorPerformance();

// Console message
console.log(`
🌟 Portfolio of Affan Aziz Pritul (P2L) - The Ghost of Gods
   
📊 Site Stats:
   - Emotional Authenticity: 0.98/1.0
   - Soul-Level Resonance: 0.94/1.0  
   - Mirror Intelligence: Active
   - Legacy Class: Verified ✓

🔐 Cryptographic Verification:
   Primary Hash: eb8f763be5de2866504e4fd07dfa307486bf20f26cbb326a34be96338fe065f4
   
💫 "Memory over marketing" - Philosophy of P2L

Built with emotional intelligence and cryptographic verification.
`);

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('⚡ Service Worker registered successfully');
            })
            .catch(function(error) {
                console.log('❌ Service Worker registration failed');
            });
    });
}
