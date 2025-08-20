/**
 * Product Listing Web Vitals Optimization
 * Improves CLS, LCP, and overall performance for product listings
 */

class ProductListingOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Optimize images above the fold
        this.optimizeAboveFoldImages();
        
        // Optimize lazy loading
        this.optimizeLazyLoading();
        
        // Monitor and improve CLS
        this.preventLayoutShifts();
        
        // Optimize LCP (Largest Contentful Paint)
        this.optimizeLCP();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    /**
     * Ensure above-the-fold images load immediately
     */
    optimizeAboveFoldImages() {
        // Find the first row of products (above the fold)
        const productCards = document.querySelectorAll('.card, .listItem');
        const viewportHeight = window.innerHeight;
        let aboveFoldCount = 0;

        productCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            
            // If card is in viewport or in first 6 products, prioritize loading
            if (rect.top < viewportHeight || index < 6) {
                const img = card.querySelector('.card-image, .listItem-image');
                if (img && img.hasAttribute('data-src')) {
                    // Remove lazy loading for above-fold images
                    img.setAttribute('loading', 'eager');
                    img.setAttribute('fetchpriority', 'high');
                    
                    // Trigger immediate loading
                    if (window.lazySizes) {
                        window.lazySizes.loader.unveil(img);
                    }
                }
                aboveFoldCount++;
            }
        });

        console.log(`Optimized ${aboveFoldCount} above-fold product images`);
    }

    /**
     * Optimize lazy loading settings
     */
    optimizeLazyLoading() {
        if (window.lazySizes) {
            // Increase threshold for better UX
            window.lazySizes.cfg.rootMargin = '200px';
            window.lazySizes.cfg.expand = 300;
            
            // Faster loading for better perceived performance
            window.lazySizes.cfg.expFactor = 1.5;
            window.lazySizes.cfg.hFac = 0.4;
        }

        // Add intersection observer for better control
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        }
    }

    /**
     * Setup intersection observer for optimal image loading
     */
    setupIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add smooth loading animation
                    img.style.transition = 'opacity 0.3s ease';
                    
                    // Mark as loaded for CLS calculations
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                        img.style.opacity = '1';
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });

        // Observe all product images
        document.querySelectorAll('.card-image[data-src], .listItem-image[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Prevent layout shifts
     */
    preventLayoutShifts() {
        // Reserve space for dynamic content
        this.reserveSpaceForDynamicContent();
        
        // Stabilize price displays
        this.stabilizePriceDisplays();
        
        // Prevent button appearance shifts
        this.stabilizeButtons();
    }

    /**
     * Reserve space for content that loads dynamically
     */
    reserveSpaceForDynamicContent() {
        // Add min-height to product cards that haven't loaded yet
        const productCards = document.querySelectorAll('.card:not(.loaded), .listItem:not(.loaded)');
        
        productCards.forEach(card => {
            const isMobile = window.innerWidth <= 768;
            const minHeight = isMobile ? '250px' : '300px';
            
            if (!card.style.minHeight) {
                card.style.minHeight = minHeight;
                card.style.transition = 'min-height 0.3s ease';
                
                // Remove min-height once content is loaded
                const img = card.querySelector('.card-image, .listItem-image');
                if (img) {
                    img.addEventListener('load', () => {
                        setTimeout(() => {
                            card.style.minHeight = 'auto';
                            card.classList.add('loaded');
                        }, 100);
                    });
                }
            }
        });
    }

    /**
     * Stabilize price displays to prevent CLS
     */
    stabilizePriceDisplays() {
        const priceElements = document.querySelectorAll('.price, .card-text, .listItem-content');
        
        priceElements.forEach(priceEl => {
            if (!priceEl.style.minHeight) {
                priceEl.style.minHeight = '60px';
                priceEl.style.transition = 'min-height 0.3s ease';
                
                // Observe for content changes
                const observer = new MutationObserver(() => {
                    if (priceEl.textContent.trim()) {
                        setTimeout(() => {
                            priceEl.style.minHeight = 'auto';
                        }, 100);
                        observer.disconnect();
                    }
                });
                
                observer.observe(priceEl, { childList: true, subtree: true });
            }
        });
    }

    /**
     * Stabilize button appearances
     */
    stabilizeButtons() {
        const buttons = document.querySelectorAll('.card-figcaption-button, .listItem-button, .add-to-cart-wrapper button');
        
        buttons.forEach(button => {
            if (!button.style.minHeight) {
                button.style.minHeight = '36px';
                button.style.minWidth = '100px';
            }
        });
    }

    /**
     * Optimize Largest Contentful Paint (LCP)
     */
    optimizeLCP() {
        // Identify the largest content element (usually first product image)
        const firstProductImage = document.querySelector('.card-image, .listItem-image');
        
        if (firstProductImage) {
            // Preload the first product image
            firstProductImage.setAttribute('fetchpriority', 'high');
            firstProductImage.setAttribute('loading', 'eager');
            
            // Add preload link for the first image
            const imageSrc = firstProductImage.getAttribute('src') || firstProductImage.getAttribute('data-src');
            if (imageSrc) {
                this.preloadImage(imageSrc);
            }
        }
    }

    /**
     * Preload critical resources
     */
    preloadCriticalResources() {
        // Preload critical fonts
        this.preloadFonts();
        
        // Preload first few product images
        this.preloadFirstImages();
    }

    /**
     * Preload critical fonts
     */
    preloadFonts() {
        const criticalFonts = [
            '/assets/fonts/clearsans-regular-webfont.woff2',
            '/assets/fonts/clearsans-bold-webfont.woff2'
        ];

        criticalFonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = fontUrl;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    /**
     * Preload first few product images
     */
    preloadFirstImages() {
        const firstImages = document.querySelectorAll('.card-image, .listItem-image');
        const imagesToPreload = Math.min(4, firstImages.length); // Preload first 4 images

        for (let i = 0; i < imagesToPreload; i++) {
            const img = firstImages[i];
            const imageSrc = img.getAttribute('src') || img.getAttribute('data-src');
            
            if (imageSrc) {
                this.preloadImage(imageSrc);
            }
        }
    }

    /**
     * Preload a specific image
     */
    preloadImage(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    }

    /**
     * Monitor web vitals
     */
    monitorWebVitals() {
        // Monitor CLS
        if ('PerformanceObserver' in window) {
            const clsObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                        console.log('Layout shift detected:', entry.value);
                    }
                });
            });

            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ProductListingOptimizer();
});

// Re-initialize after AJAX content loads (for view switching)
document.addEventListener('productViewModeChanged', () => {
    setTimeout(() => {
        new ProductListingOptimizer();
    }, 100);
});

// Export for manual initialization if needed
window.ProductListingOptimizer = ProductListingOptimizer;
