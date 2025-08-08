/**
 * WE SERVE SECTION - Scroll-driven text cycling with section locking
 * 
 * This module handles:
 * - Scroll-driven text cycling (no automatic timing)
 * - True section locking until all words are cycled
 * - Smooth scroll-to-next behavior after completion
 */

class WeServeSection {
    constructor() {
        this.section = null;
        this.dynamicContainer = null;
        this.words = [
            'HOMEOWNERS',
            'PRO TOURS',
            'D1 COLLEGES',
            'SPORTS COMPLEXES',
            'ACADEMIES',
            'CLUBS',
            'HIGH SCHOOLS',
            'MIDDLE SCHOOLS',
            'CORPORATE'
        ];
        this.currentWordIndex = 0;
        this.wordElements = [];
        this.isAnimating = false;
        this.scrollCount = 0;
        this.isLocked = false;
        this.hasCompletedCycle = false;
        this.lastScrollTime = 0;
        this.scrollThreshold = 300; // Minimum time between scroll events
        this.isAlreadyActive = false; // Track if section is already active
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSection());
        } else {
            this.setupSection();
        }
    }

    setupSection() {
        this.findElements();
        if (!this.section) return;
        
        this.createWordElements();
        this.setupIntersectionObserver();
        this.setupScrollLocking();
        this.bindEvents();
        
        console.log('WeServeSection: Initialized with scroll-driven cycling');
    }

    findElements() {
        this.section = document.querySelector('.we-serve-section');
        this.dynamicContainer = document.querySelector('.we-serve-section__dynamic');
    }

    createWordElements() {
        if (!this.dynamicContainer) {
            console.log('WeServeSection: Dynamic container not found');
            return;
        }
        
        // Clear existing content
        this.dynamicContainer.innerHTML = '';
        this.wordElements = [];
        
        // Create word elements
        this.words.forEach((word, index) => {
            const wordElement = document.createElement('span');
            wordElement.className = 'we-serve-section__word';
            wordElement.textContent = word;
            
            // First word starts as active
            if (index === 0) {
                wordElement.classList.add('active');
            }
            
            this.dynamicContainer.appendChild(wordElement);
            this.wordElements.push(wordElement);
        });
        
        console.log('WeServeSection: Created', this.wordElements.length, 'word elements');
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-1px 0px -99% 0px', // Only trigger when top edge is at viewport top
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Section top has reached viewport top - start locking
                    console.log('WeServeSection: Top edge reached viewport top - starting');
                    this.onEnterSection();
                } else {
                    // Section is no longer at viewport top - stop locking
                    console.log('WeServeSection: No longer at viewport top - stopping');
                    this.onExitSection();
                }
            });
        }, options);

        if (this.section) {
            this.observer.observe(this.section);
        }
    }

    onEnterSection() {
        console.log('WeServeSection: Entering section - hiding header and locking scroll');
        this.isLocked = true;
        
        // Only reset if this is a fresh entry (not if user scrolled up/down within section)
        if (!this.isAlreadyActive) {
            this.scrollCount = 0;
            this.hasCompletedCycle = false;
            this.currentWordIndex = 0;
            
            // Reset to first word
            this.showWord(0);
            
            this.isAlreadyActive = true;
        }
        
        // Hide header when in WE SERVE section
        document.body.classList.add('we-serve-active');
        
        // Show scroll indicator
        const scrollIndicator = document.querySelector('.we-serve-section__scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.classList.add('visible');
        }
        
        // Animate in the static text
        setTimeout(() => {
            const staticText = document.querySelector('.we-serve-section__static');
            if (staticText) staticText.classList.add('animate-in');
        }, 200);
        
        setTimeout(() => {
            const dynamicContainer = document.querySelector('.we-serve-section__dynamic');
            if (dynamicContainer) dynamicContainer.classList.add('animate-in');
        }, 600);
        
        this.updateScrollIndicator();
    }

    onExitSection() {
        console.log('WeServeSection: Exiting section - showing header and unlocking scroll');
        this.isLocked = false;
        
        // Reset the active state so next entry is fresh
        this.isAlreadyActive = false;
        
        // Reset cycle state and position when truly leaving the section
        this.scrollCount = 0;
        this.hasCompletedCycle = false;
        this.currentWordIndex = 0;
        
        // Show header when leaving WE SERVE section
        document.body.classList.remove('we-serve-active');
        
        // Hide scroll indicator
        const scrollIndicator = document.querySelector('.we-serve-section__scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.classList.remove('visible');
        }
        
        // Reset animation states
        const staticText = document.querySelector('.we-serve-section__static');
        const dynamicContainer = document.querySelector('.we-serve-section__dynamic');
        
        if (staticText) staticText.classList.remove('animate-in');
        if (dynamicContainer) dynamicContainer.classList.remove('animate-in');
    }

    setupScrollLocking() {
        // Scroll lock mechanism - prevent scrolling until all words are shown
        const handleScroll = (event) => {
            const now = Date.now();
            
            // Throttle scroll events to prevent overwhelming
            if (now - this.lastScrollTime < this.scrollThreshold) {
                if (this.isLocked && !this.hasCompletedCycle) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                return;
            }
            this.lastScrollTime = now;
            
            // Only handle if section is locked and visible
            if (!this.isLocked || !this.isInViewport()) return;
            
            const isScrollingDown = event.deltaY > 0;
            const isScrollingUp = event.deltaY < 0;
            
            if (isScrollingDown) {
                // Always prevent scroll and advance to next word while in section
                event.preventDefault();
                event.stopPropagation();
                
                this.advanceWord();
                
                // If cycle is complete and user continues scrolling down,
                // they can eventually leave the section naturally
            } else if (isScrollingUp) {
                // Handle reverse cycling on scroll up
                if (this.currentWordIndex > 0 || this.hasCompletedCycle) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    this.reverseWord();
                }
                // If at first word and scrolling up, allow scroll to previous section
            }
        };

        // Use passive: false to allow preventDefault
        document.addEventListener('wheel', handleScroll, { passive: false });
        
        // Enhanced touch handling
        this.setupTouchScrollLocking();
        
        // Keyboard handling
        this.setupKeyboardScrollLocking();
    }

    setupTouchScrollLocking() {
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartTime = 0;
        
        document.addEventListener('touchstart', (e) => {
            if (!this.isLocked || !this.isInViewport()) return;
            
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!this.isLocked || !this.isInViewport()) return;
            
            // Always prevent scrolling while in the section to allow cycling
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('touchend', (e) => {
            if (!this.isLocked || !this.isInViewport()) return;
            
            touchEndY = e.changedTouches[0].clientY;
            const swipeDistance = touchStartY - touchEndY;
            const swipeTime = Date.now() - touchStartTime;
            
            // Detect upward swipe (scrolling down)
            if (swipeDistance > 50 && swipeTime < 500) {
                this.advanceWord();
            }
            // Detect downward swipe (scrolling up)
            else if (swipeDistance < -50 && swipeTime < 500) {
                if (this.currentWordIndex > 0 || this.hasCompletedCycle) {
                    this.reverseWord();
                }
            }
        }, { passive: true });
    }

    setupKeyboardScrollLocking() {
        document.addEventListener('keydown', (e) => {
            if (!this.isLocked || !this.isInViewport()) return;
            
            // Handle forward scroll-like keys
            if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
                e.preventDefault();
                this.advanceWord();
            }
            
            // Handle reverse scroll-like keys
            if (['ArrowUp', 'PageUp'].includes(e.code)) {
                if (this.currentWordIndex > 0 || this.hasCompletedCycle) {
                    e.preventDefault();
                    this.reverseWord();
                }
            }
            
            // Skip section entirely with Escape
            if (e.code === 'Escape') {
                e.preventDefault();
                this.hasCompletedCycle = true;
                this.isLocked = false;
                
                // Scroll to next section to exit
                this.scrollToNextSection();
            }
        });
    }

    advanceWord() {
        if (this.isAnimating) return;
        
        // Calculate next word index - continue cycling infinitely
        const nextIndex = (this.currentWordIndex + 1) % this.words.length;
        
        // Mark completion on first full cycle, but continue cycling
        if (nextIndex === 0 && this.currentWordIndex === this.words.length - 1 && !this.hasCompletedCycle) {
            this.hasCompletedCycle = true;
            console.log('WeServeSection: Completed first full cycle - continuing to cycle');
        }
        
        this.showWord(nextIndex);
        this.currentWordIndex = nextIndex;
        this.scrollCount++;
        
        this.updateScrollIndicator();
        
        // Visual feedback
        this.addScrollFeedback();
    }

    reverseWord() {
        if (this.isAnimating) return;
        
        // Calculate previous word index - continue cycling infinitely in reverse
        const prevIndex = this.currentWordIndex === 0 ? this.words.length - 1 : this.currentWordIndex - 1;
        
        // If we were at the end of a completed cycle and now going backward, 
        // we're still in a completed cycle
        
        this.showWord(prevIndex);
        this.currentWordIndex = prevIndex;
        this.scrollCount = Math.max(0, this.scrollCount - 1);
        
        this.updateScrollIndicator();
        
        // Visual feedback
        this.addScrollFeedback();
        
        console.log('WeServeSection: Reversed to word:', this.words[prevIndex]);
    }

    showWord(index) {
        if (this.isAnimating || !this.wordElements[index]) return;
        
        this.isAnimating = true;
        
        // Hide all words
        this.wordElements.forEach((word, i) => {
            if (i !== index) {
                word.classList.remove('active');
            }
        });
        
        // Show target word after brief delay
        setTimeout(() => {
            if (this.wordElements[index]) {
                this.wordElements[index].classList.add('active');
            }
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 200);
        }, 100);
    }

    updateScrollIndicator() {
        const indicator = document.querySelector('.we-serve-section__scroll-indicator');
        if (!indicator) return;
        
        // Change indicator text based on completion status
        if (this.hasCompletedCycle) {
            indicator.textContent = 'Scroll to continue cycling or leave section';
            indicator.style.opacity = '0.8';
        } else {
            indicator.textContent = 'Scroll to continue';
            indicator.style.opacity = '1';
        }
        
        // Update progress bar - reset after each cycle for continuous indication
        const progress = ((this.currentWordIndex + 1) / this.words.length) * 100;
        this.dynamicContainer.style.setProperty('--progress', `${progress}%`);
    }

    addScrollFeedback() {
        // Subtle visual feedback when word changes
        const container = document.querySelector('.we-serve-section__container');
        if (container) {
            container.style.transform = 'scale(1.02)';
            setTimeout(() => {
                container.style.transform = 'scale(1)';
            }, 150);
        }
    }

    isInViewport() {
        if (!this.section) return false;
        
        const rect = this.section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Section is considered active if more than 60% visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibilityRatio = visibleHeight / windowHeight;
        
        return visibilityRatio > 0.6;
    }

    bindEvents() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause any animations when tab is not visible
                this.isAnimating = false;
            }
        });
    }

    handleResize() {
        // Recalculate viewport detection for mobile
        if (window.innerWidth <= 768) {
            this.scrollThreshold = 200; // Faster response on mobile
        } else {
            this.scrollThreshold = 300;
        }
    }

    // Public methods for debugging
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.isLocked = false;
    }

    // Manual controls for testing
    nextWord() {
        if (!this.isAnimating) {
            this.advanceWord();
        }
    }

    prevWord() {
        if (!this.isAnimating) {
            this.reverseWord();
        }
    }

    resetSection() {
        this.currentWordIndex = 0;
        this.scrollCount = 0;
        this.hasCompletedCycle = false;
        this.showWord(0);
        this.updateScrollIndicator();
    }

    scrollToNextSection() {
        const nextSection = this.section.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Enhanced text effects for premium feel
class WeServeTextEffects {
    static addGlitchEffect(element, duration = 200) {
        element.style.animation = `textGlitch ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
    
    static addShakeEffect(element, intensity = 2) {
        const originalTransform = element.style.transform;
        
        element.style.animation = `shake ${intensity}s ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
            element.style.transform = originalTransform;
        }, intensity * 1000);
    }
}

// Auto-initialize
let weServeSection;

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if the section exists
    if (document.querySelector('.we-serve-section')) {
        weServeSection = new WeServeSection();
        
        // Make available globally for debugging
        window.weServeSection = weServeSection;
        window.WeServeTextEffects = WeServeTextEffects;
    }
});

// Export for use in other modules
export { WeServeSection, WeServeTextEffects };
