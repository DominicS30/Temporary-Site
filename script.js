// Enhanced Interactive Elements for Werkflows Landing Page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    // setupMouseTracking(); // Removed to stop background movement
    setupScrollAnimations();
    setupInteractiveElements();
    startTypingAnimation();
});

// Initialize entrance animations
function initializeAnimations() {
    const elements = document.querySelectorAll('.feature-card');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Mouse tracking for interactive background
function setupMouseTracking() {
    const backgroundAnimation = document.querySelector('.background-animation');
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });

    function updateBackground() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        backgroundAnimation.style.transform = `translate(${targetX * 0.5}px, ${targetY * 0.5}px)`;
        requestAnimationFrame(updateBackground);
    }
    
    updateBackground();
}

// Scroll-based animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .status-card, .hero-text');
    animatedElements.forEach(el => observer.observe(el));
}

// Interactive hover effects
function setupInteractiveElements() {
    // Enhanced feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Status card pulse effect on hover
    const statusCard = document.querySelector('.status-card');
    if (statusCard) {
        statusCard.addEventListener('mouseenter', function() {
            const pulseDot = this.querySelector('.pulse-dot');
            if (pulseDot) {
                pulseDot.style.animationDuration = '0.5s';
            }
        });
        
        statusCard.addEventListener('mouseleave', function() {
            const pulseDot = this.querySelector('.pulse-dot');
            if (pulseDot) {
                pulseDot.style.animationDuration = '2s';
            }
        });
    }

    // Logo interaction
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Typing animation for hero subtitle
function startTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = 'Redefined';
    const originalText = subtitle.textContent;
    
    // Only run if the text matches what we expect
    if (originalText.trim() === text) {
        subtitle.textContent = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                subtitle.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
                // Add cursor blink effect
                subtitle.style.borderRight = '2px solid #667eea';
                subtitle.style.animation = 'blink 1s infinite';
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                    subtitle.style.animation = 'none';
                }, 3000);
            }
        }, 150);
    }
}

// Parallax effect for background elements
function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.background-animation');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add CSS for blink animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #667eea; }
        51%, 100% { border-color: transparent; }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize parallax with throttling
setupParallaxEffect = throttle(setupParallaxEffect, 16);

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Console easter egg
console.log('%cWerkflows 🤖', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cBuilding the future of AI automation...', 'color: #764ba2; font-size: 14px;');