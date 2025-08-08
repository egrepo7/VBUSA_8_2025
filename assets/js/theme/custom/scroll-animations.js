/**
 * SCROLL ANIMATIONS - Modern page reveal effects
 * 
 * This module handles scroll-triggered animations for the about page and other pages.
 * Uses Intersection Observer API for better performance than scroll listeners.
 */

class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.observer = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        // Find all elements that should be animated
        this.findAnimatableElements();
        
        // Set up intersection observer
        this.createObserver();
        
        // Start observing elements
        this.startObserving();
        
        // Special handling for hero section
        this.animateHeroSection();
        
        console.log(`ScrollAnimations: Initialized with ${this.animatedElements.length} elements`);
    }

    findAnimatableElements() {
        // Define selectors for different types of animations
        const selectors = {
            fadeUp: [
                '.about-trusted__text',
                '.about-designed__column p',
                '.about-mission__text p',
                '.about-service__description',
                '.page-content p'
            ],
            
            sectionTitles: [
                '.about-trusted__title',
                '.about-designed__title',
                '.about-mission__title',
                '.about-services__title'
            ],
            
            serviceCards: [
                '.about-service'
            ],
            
            images: [
                '.about-trusted__image',
                '.about-designed__image-item',
                '.about-mission__image',
                '.about-service__image'
            ],
            
            columns: [
                '.about-designed__column'
            ]
        };

        // Add animation classes to elements
        selectors.fadeUp.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('fade-up', `stagger-${Math.min(index + 1, 6)}`);
                this.animatedElements.push(el);
            });
        });

        selectors.sectionTitles.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('section-title-animate');
                this.animatedElements.push(el);
            });
        });

        selectors.serviceCards.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('about-service');
                el.style.transitionDelay = `${index * 0.2}s`;
                this.animatedElements.push(el);
            });
        });

        selectors.images.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('image-animate');
                this.animatedElements.push(el);
            });
        });

        selectors.columns.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('column-animate');
                this.animatedElements.push(el);
            });
        });

        // Special handling for service titles and buttons
        document.querySelectorAll('.about-service__title').forEach((el, index) => {
            el.classList.add('fade-up');
            el.style.transitionDelay = `${0.2 + (index * 0.2)}s`;
            this.animatedElements.push(el);
        });

        document.querySelectorAll('.about-service__button').forEach((el, index) => {
            el.classList.add('fade-up');
            el.style.transitionDelay = `${0.4 + (index * 0.2)}s`;
            this.animatedElements.push(el);
        });
    }

    createObserver() {
        const options = {
            root: null, // Use viewport as root
            rootMargin: '-10% 0px -10% 0px', // Trigger when element is 10% visible
            threshold: 0.1 // Trigger when 10% of element is visible
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    // Stop observing this element once animated
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }

    startObserving() {
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    // Performance optimization: Clean up will-change after animations complete
    cleanupAnimation(element) {
        setTimeout(() => {
            element.classList.add('animation-complete');
            element.style.willChange = 'auto';
        }, 1000); // Wait for animation to complete
    }

    // Enhanced element animation with cleanup
    animateElement(element) {
        // Add a small delay to make the animation feel more natural
        setTimeout(() => {
            element.classList.add('animate-in');
            
            // Clean up performance properties after animation
            this.cleanupAnimation(element);
            
            // Emit custom event for other scripts to hook into
            element.dispatchEvent(new CustomEvent('animated-in', { 
                bubbles: true,
                detail: { element }
            }));
        }, 50);
    }

    animateHeroSection() {
        // Hero section should animate immediately when page loads
        const heroTitle = document.querySelector('.about-hero__title');
        const heroSubtitle = document.querySelector('.about-hero__subtitle');
        
        if (heroTitle || heroSubtitle) {
            // Small delay to let page settle
            setTimeout(() => {
                if (heroTitle) {
                    heroTitle.classList.add('animate-in');
                }
                if (heroSubtitle) {
                    heroSubtitle.classList.add('animate-in');
                }
            }, 200);
        }
    }

    // Public method to manually trigger animation on an element
    triggerAnimation(element) {
        if (element && !element.classList.contains('animate-in')) {
            this.animateElement(element);
        }
    }

    // Public method to add new elements for animation
    addElement(element, animationType = 'fade-up') {
        element.classList.add(animationType);
        this.animatedElements.push(element);
        this.observer.observe(element);
    }

    // Debug method to show all animated elements
    debugAnimatedElements() {
        console.log('ScrollAnimations Debug:', {
            totalElements: this.animatedElements.length,
            elementsByType: {
                fadeUp: this.animatedElements.filter(el => el.classList.contains('fade-up')).length,
                sectionTitles: this.animatedElements.filter(el => el.classList.contains('section-title-animate')).length,
                serviceCards: this.animatedElements.filter(el => el.classList.contains('about-service')).length,
                images: this.animatedElements.filter(el => el.classList.contains('image-animate')).length,
                columns: this.animatedElements.filter(el => el.classList.contains('column-animate')).length
            },
            elements: this.animatedElements
        });
    }
}

// Enhanced text reveal animation for special sections
class TextRevealAnimation {
    static revealText(element, options = {}) {
        const defaults = {
            wordDelay: 100,
            charDelay: 50,
            animationType: 'word' // 'word' or 'char'
        };
        
        const settings = { ...defaults, ...options };
        
        if (settings.animationType === 'word') {
            this.revealByWord(element, settings.wordDelay);
        } else {
            this.revealByChar(element, settings.charDelay);
        }
    }
    
    static revealByWord(element, delay) {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="word" style="opacity: 0; transform: translateY(20px);">${word}</span>`
        ).join(' ');
        
        const wordElements = element.querySelectorAll('.word');
        
        wordElements.forEach((word, index) => {
            setTimeout(() => {
                word.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }
    
    static revealByChar(element, delay) {
        const text = element.textContent;
        const chars = text.split('');
        
        element.innerHTML = chars.map(char => 
            char === ' ' ? ' ' : `<span class="char" style="opacity: 0;">${char}</span>`
        ).join('');
        
        const charElements = element.querySelectorAll('.char');
        
        charElements.forEach((char, index) => {
            setTimeout(() => {
                char.style.transition = 'opacity 0.3s ease';
                char.style.opacity = '1';
            }, index * delay);
        });
    }
}

// Enhanced page-specific animations
class AboutPageAnimations {
    static init() {
        // Check if we're on the about page
        if (!document.querySelector('.about-hero')) return;
        
        console.log('About Page Animations: Initializing...');
        
        // Add special text reveal animations
        this.setupTextReveal();
        
        // Add enhanced service card animations
        this.setupServiceCards();
        
        // Add mission section typing effect
        this.setupMissionText();
    }
    
    static setupTextReveal() {
        const titles = document.querySelectorAll('.about-trusted__title, .about-designed__title, .about-mission__title, .about-services__title');
        
        titles.forEach(title => {
            title.addEventListener('animated-in', () => {
                // Add text shimmer effect after title animates in
                setTimeout(() => {
                    title.style.animation = 'textShimmer 2s ease-out';
                }, 500);
            });
        });
    }
    
    static setupServiceCards() {
        const serviceCards = document.querySelectorAll('.about-service');
        
        serviceCards.forEach((card, index) => {
            card.addEventListener('animated-in', () => {
                // Add staggered glow effects
                setTimeout(() => {
                    card.classList.add('service-glow');
                }, index * 200);
            });
        });
    }
    
    static setupMissionText() {
        const missionTexts = document.querySelectorAll('.about-mission__text p');
        
        missionTexts.forEach((text, index) => {
            text.addEventListener('animated-in', () => {
                // Add cursor effect after text appears
                setTimeout(() => {
                    text.classList.add('typing-complete');
                }, 800);
            });
        });
    }
}

// Initialize scroll animations when the module loads
let scrollAnimations;

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    scrollAnimations = new ScrollAnimations();
    AboutPageAnimations.init();
});

// Export for use in other modules
export { ScrollAnimations, TextRevealAnimation, AboutPageAnimations };
