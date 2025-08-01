/**
 * Split Layout Carousel Override
 * Forces vertical thumbnail layout for split layout product pages
 */

export default class SplitLayoutCarousel {
    constructor() {
        this.initCarouselOverride();
        this.init(); // Initialize test helpers
    }

    initCarouselOverride() {
        // Pre-DOM ready setup for split layouts to prevent FOUC
        this.setupPreInitialization();
        
        // Wait for DOM to be ready
        $(document).ready(() => {
            // console.log('DOM ready, initializing split layout carousel');
            this.enforceVerticalLayout();
            
            // Re-enforce after any slick initialization
            setTimeout(() => {
                // console.log('Re-enforcing layout after 500ms delay');
                this.enforceVerticalLayout();
            }, 500);
            
            // Also enforce after window resize
            $(window).on('resize', () => {
                setTimeout(() => {
                    this.enforceVerticalLayout();
                }, 100);
            });
            
            // Set up a fallback to ensure handlers are always set up
            setTimeout(() => {
                // console.log('Setting up additional navigation handlers');
                this.setupNavigationHandlers($('.productView.split-layout'));
            }, 1000);
            
            // Set up swipe functionality after a delay to ensure everything is loaded
            setTimeout(() => {
                // console.log('Setting up swipe functionality');
                this.setupMainImageSwipe();
            }, 1200);
        });
    }
    
    setupPreInitialization() {
        // Early intervention before DOM ready for split layouts
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.preInitializeLayout();
                this.interceptSlickInitialization();
            });
        } else {
            this.preInitializeLayout();
            this.interceptSlickInitialization();
        }
    }
    
    interceptSlickInitialization() {
        // Override Slick initialization for split layouts to prevent size jumping
        const originalSlick = $.fn.slick;
        const self = this;
        
        $.fn.slick = function(options) {
            // Check if this is a split layout thumbnail carousel
            if (this.hasClass('productView-thumbnails') && this.closest('.productView.split-layout').length > 0) {
                // console.log('Intercepting Slick initialization for split layout');
                
                // Apply our fixes BEFORE Slick initializes
                self.applyImmediateLayoutFixes(this);
                
                // Override Slick options for split layout
                const splitLayoutOptions = {
                    ...options,
                    infinite: false,
                    arrows: false,
                    dots: false,
                    variableWidth: false,
                    adaptiveHeight: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: window.innerWidth > 768,
                    verticalSwiping: window.innerWidth > 768
                };
                
                // Initialize Slick with our options
                const result = originalSlick.call(this, splitLayoutOptions);
                
                // Apply our fixes AFTER Slick initializes
                setTimeout(() => {
                    self.enforceVerticalLayout();
                }, 0);
                
                return result;
            }
            
            // For non-split layout carousels, use original Slick
            return originalSlick.call(this, options);
        };
        
        // Copy over any static properties
        Object.keys(originalSlick).forEach(key => {
            $.fn.slick[key] = originalSlick[key];
        });
    }
    
    preInitializeLayout() {
        // Apply initial styles before Slick has a chance to initialize
        const $splitLayout = $('.productView.split-layout');
        if ($splitLayout.length === 0) return;
        
        const $thumbnails = $splitLayout.find('.productView-thumbnails');
        if ($thumbnails.length === 0) return;
        
        // console.log('Pre-initializing split layout before Slick initialization');
        
        // Set up event listeners to intercept Slick initialization
        $thumbnails.on('beforeChange.splitLayout', (event, slick) => {
            // console.log('Slick beforeChange event intercepted');
            this.enforceVerticalLayout();
        });
        
        // Apply immediate layout fixes
        this.applyImmediateLayoutFixes($thumbnails);
        
        // Set up thumbnail click handlers early to override default behavior
        this.setupThumbnailClickHandlers($('.productView.split-layout'));
        
        // Disable hover behavior early to prevent unwanted image changes
        this.disableThumbnailHover($('.productView.split-layout'));
        
        // Set up main image swipe for mobile
        this.setupMainImageSwipe();
    }
    
    applyImmediateLayoutFixes($thumbnails) {
        const isMobile = window.innerWidth <= 768;
        
        // console.log('Applying immediate layout fixes for split layout - AGGRESSIVE MODE');
        
        // Apply pre-initialization styles to prevent FOUC
        $thumbnails.css({
            'opacity': '1',
            'visibility': 'visible',
            'width': isMobile ? '100%' : '80px',
            'min-width': isMobile ? '100%' : '80px',
            'max-width': isMobile ? 'none' : '80px'
        });
        
        // AGGRESSIVELY pre-set ALL possible thumbnail image selectors
        const imageSelectors = [
            'img',
            'li img', 
            '.slick-slide img',
            '.productView-thumbnail img',
            '.productView-thumbnail-link img'
        ];
        
        imageSelectors.forEach(selector => {
            $thumbnails.find(selector).each(function() {
                // Force immediate sizing with high priority
                this.style.setProperty('width', '80px', 'important');
                this.style.setProperty('height', '80px', 'important');
                this.style.setProperty('min-width', '80px', 'important');
                this.style.setProperty('min-height', '80px', 'important');
                this.style.setProperty('max-width', '80px', 'important');
                this.style.setProperty('max-height', '80px', 'important');
                this.style.setProperty('object-fit', 'cover', 'important');
                this.style.setProperty('transition', 'none', 'important');
                
                // Set attributes to prevent any automatic resizing
                this.setAttribute('width', '80');
                this.setAttribute('height', '80');
            });
        });
        
        // Pre-configure Slick containers if they exist
        const $slickList = $thumbnails.find('.slick-list');
        if ($slickList.length > 0) {
            $slickList.each(function() {
                this.style.setProperty('width', isMobile ? '100%' : '80px', 'important');
                this.style.setProperty('height', isMobile ? '80px' : 'auto', 'important');
                this.style.setProperty('overflow-x', isMobile ? 'auto' : 'hidden', 'important');
                this.style.setProperty('overflow-y', isMobile ? 'hidden' : 'auto', 'important');
            });
        }
        
        const $slickTrack = $thumbnails.find('.slick-track');
        if ($slickTrack.length > 0) {
            $slickTrack.each(function() {
                this.style.setProperty('display', 'flex', 'important');
                this.style.setProperty('flex-direction', isMobile ? 'row' : 'column', 'important');
                this.style.setProperty('width', isMobile ? 'auto' : '80px', 'important');
                this.style.setProperty('height', isMobile ? '80px' : 'auto', 'important');
                this.style.setProperty('transform', 'none', 'important');
                this.style.setProperty('left', '0', 'important');
                this.style.setProperty('top', '0', 'important');
                this.style.setProperty('gap', isMobile ? '12px' : '8px', 'important');
            });
        }
        
        // console.log('Applied immediate layout fixes for split layout - COMPLETE');
    }

    enforceVerticalLayout() {
        const $splitLayout = $('.productView.split-layout');
        
        if ($splitLayout.length === 0) return;
        
        const $thumbnails = $splitLayout.find('.productView-thumbnails');
        
        if ($thumbnails.length === 0) return;

        // FORCE HIDE ALL SLICK ARROWS
        $thumbnails.find('.slick-prev, .slick-next, .slick-arrow, button.slick-prev, button.slick-next, button.slick-arrow').remove();
        
        // IMMEDIATE FIX: Force thumbnail image sizes before any other processing
        $thumbnails.find('img').each(function() {
            this.style.setProperty('width', '80px', 'important');
            this.style.setProperty('height', '80px', 'important');
            this.style.setProperty('min-width', '80px', 'important');
            this.style.setProperty('min-height', '80px', 'important');
            this.style.setProperty('max-width', '80px', 'important');
            this.style.setProperty('max-height', '80px', 'important');
        });
        
        const isMobile = window.innerWidth <= 768;
        
        // console.log(`Enforcing layout for split layout - Mobile: ${isMobile}`);
        
        // All products now use Slick mode - apply layout based on screen size
        const $slickTrack = $thumbnails.find('.slick-track');
        
        if ($slickTrack.length > 0) {
            if (isMobile) {
                // Mobile: horizontal layout
                $slickTrack[0].style.setProperty('display', 'flex', 'important');
                $slickTrack[0].style.setProperty('flex-direction', 'row', 'important');
                $slickTrack[0].style.setProperty('height', '80px', 'important');
                $slickTrack[0].style.setProperty('width', 'auto', 'important');
                $slickTrack[0].style.setProperty('gap', '12px', 'important');
                $slickTrack[0].style.setProperty('transform', 'none', 'important');
                $slickTrack[0].style.setProperty('left', '0', 'important');
                $slickTrack[0].style.setProperty('top', '0', 'important');
                $slickTrack[0].style.setProperty('margin', '0', 'important');
                $slickTrack[0].style.setProperty('padding', '0', 'important');
                
                // Force individual slides to be horizontal
                $slickTrack.find('.slick-slide').each(function(index) {
                    this.style.setProperty('display', 'inline-block', 'important');
                    this.style.setProperty('width', '80px', 'important');
                    this.style.setProperty('height', '80px', 'important');
                    this.style.setProperty('margin-bottom', '0', 'important');
                    this.style.setProperty('margin-right', '0', 'important');
                    this.style.setProperty('float', 'none', 'important');
                    this.style.setProperty('transform', 'none', 'important');
                    this.style.setProperty('left', 'auto', 'important');
                    this.style.setProperty('top', 'auto', 'important');
                    this.style.setProperty('position', 'relative', 'important');
                });
            } else {
                // Desktop: vertical layout
                $slickTrack[0].style.setProperty('display', 'flex', 'important');
                $slickTrack[0].style.setProperty('flex-direction', 'column', 'important');
                $slickTrack[0].style.setProperty('height', 'auto', 'important');
                $slickTrack[0].style.setProperty('width', '80px', 'important');
                $slickTrack[0].style.setProperty('gap', '8px', 'important');
                $slickTrack[0].style.setProperty('transform', 'none', 'important');
                $slickTrack[0].style.setProperty('left', '0', 'important');
                $slickTrack[0].style.setProperty('top', '0', 'important');
                $slickTrack[0].style.setProperty('margin', '0', 'important');
                $slickTrack[0].style.setProperty('padding', '0', 'important');
                
                // Force individual slides to be vertical
                $slickTrack.find('.slick-slide').each(function(index) {
                    this.style.setProperty('display', 'block', 'important');
                    this.style.setProperty('width', '80px', 'important');
                    this.style.setProperty('height', 'auto', 'important');
                    this.style.setProperty('margin-bottom', '8px', 'important');
                    this.style.setProperty('margin-right', '0', 'important');
                    this.style.setProperty('float', 'none', 'important');
                    this.style.setProperty('transform', 'none', 'important');
                    this.style.setProperty('left', 'auto', 'important');
                    this.style.setProperty('top', 'auto', 'important');
                    this.style.setProperty('position', 'relative', 'important');
                });
                
                // Remove margin from last slide
                const $lastSlide = $slickTrack.find('.slick-slide:last-child');
                if ($lastSlide.length > 0) {
                    $lastSlide[0].style.setProperty('margin-bottom', '0', 'important');
                }
            }
        }
            
        // Also force the slick-list container
        const $slickList = $thumbnails.find('.slick-list');
        if ($slickList.length > 0) {
            if (isMobile) {
                // Mobile: full width, horizontal scroll
                $slickList[0].style.setProperty('width', '100%', 'important');
                $slickList[0].style.setProperty('height', '80px', 'important');
                $slickList[0].style.setProperty('overflow-x', 'auto', 'important');
                $slickList[0].style.setProperty('overflow-y', 'hidden', 'important');
            } else {
                // Desktop: fixed width, vertical scroll
                $slickList[0].style.setProperty('width', '80px', 'important');
                $slickList[0].style.setProperty('height', 'auto', 'important');
                $slickList[0].style.setProperty('overflow-x', 'hidden', 'important');
                $slickList[0].style.setProperty('overflow-y', 'auto', 'important');
            }
        }
        
        // Listen for slick events (all products use Slick now)
        // If slick isn't initialized yet, listen for it
        $thumbnails.on('init', (event, slick) => {
            // console.log('Slick carousel initialized, enforcing layout');
            setTimeout(() => {
                this.enforceVerticalLayout();
            }, 50);
        });
        
        // Also listen for reInit
        $thumbnails.on('reInit', (event, slick) => {
            // console.log('Slick carousel reinitialized, enforcing layout');
            setTimeout(() => {
                this.enforceVerticalLayout();
            }, 50);
        });
        
        // Listen for breakpoint changes
        $thumbnails.on('breakpoint', (event, slick) => {
            // console.log('Slick carousel breakpoint changed, enforcing layout');
            setTimeout(() => {
                this.enforceVerticalLayout();
            }, 50);
        });
        
        // Add click handlers for custom navigation arrows
        this.setupNavigationHandlers($splitLayout);
        
        // Add mobile-specific handlers
        this.setupMobileHandlers($splitLayout);
        
        // Override thumbnail click behavior for split layout
        this.setupThumbnailClickHandlers($splitLayout);
        
        // Disable hover behavior for split layout thumbnails
        this.disableThumbnailHover($splitLayout);
        
        // Set up main image swipe for mobile
        this.setupMainImageSwipe();
        
        // Update handlers on window resize
        $(window).on('resize', () => {
            setTimeout(() => {
                this.setupMobileHandlers($splitLayout);
                this.setupMainImageSwipe(); // Re-setup swipe on resize
            }, 100);
        });
    }
    
    setupNavigationHandlers($splitLayout) {
        const $thumbnails = $splitLayout.find('.productView-thumbnails');
        
        // console.log('Setting up navigation handlers for split layout - pseudo-element click detection');
        // console.log('Found split layout containers:', $splitLayout.length);
        // console.log('Found thumbnail containers:', $thumbnails.length);
        
        // Use document-level delegation to capture clicks on the thumbnail container
        $(document).off('click.split-layout-pseudo');
        
        // Handle clicks on the thumbnails container to detect pseudo-element areas
        $(document).on('click.split-layout-pseudo', '.productView.split-layout .productView-thumbnails', (e) => {
            e.preventDefault();
            
            const $container = $(e.currentTarget);
            const containerRect = $container[0].getBoundingClientRect();
            const clickY = e.clientY;
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;
            
            // Define arrow areas - top 40px and bottom 40px of container
            const arrowHeight = 40;
            const upArrowBottom = containerTop + arrowHeight;
            const downArrowTop = containerBottom - arrowHeight;
            
            // console.log('Click detected on thumbnails container:', {
            //     clickY,
            //     containerTop,
            //     containerBottom,
            //     upArrowBottom,
            //     downArrowTop
            // });
            
            const $currentSplitLayout = $container.closest('.productView.split-layout');
            const $slickList = $container.find('.slick-list');
            
            if ($slickList.length === 0) {
                // console.log('No slick-list found for scrolling');
                return;
            }
            
            // Check if click is in the up arrow area (::before)
            if (clickY >= containerTop && clickY <= upArrowBottom) {
                // console.log('Up arrow area clicked (::before pseudo-element area)');
                
                const currentScrollTop = $slickList.scrollTop();
                const scrollAmount = 88; // thumbnail height (80px) + gap (8px)
                const newScrollTop = Math.max(0, currentScrollTop - scrollAmount);
                
                // console.log(`Scrolling up from ${currentScrollTop} to ${newScrollTop}`);
                
                $slickList.animate({
                    scrollTop: newScrollTop
                }, 300, () => {
                    this.updateScrollArrowVisibility($currentSplitLayout);
                });
            }
            // Check if click is in the down arrow area (::after)
            else if (clickY >= downArrowTop && clickY <= containerBottom) {
                // console.log('Down arrow area clicked (::after pseudo-element area)');
                
                const currentScrollTop = $slickList.scrollTop();
                const scrollAmount = 88; // thumbnail height (80px) + gap (8px)
                const maxScrollTop = $slickList[0].scrollHeight - $slickList.outerHeight();
                const newScrollTop = Math.min(maxScrollTop, currentScrollTop + scrollAmount);
                
                // console.log(`Scrolling down from ${currentScrollTop} to ${newScrollTop}, max: ${maxScrollTop}`);
                
                $slickList.animate({
                    scrollTop: newScrollTop
                }, 300, () => {
                    this.updateScrollArrowVisibility($currentSplitLayout);
                });
            } else {
                // console.log('Click in middle area - no scroll action');
            }
        });
        
        // Update arrow visibility when Slick is initialized
        $thumbnails.on('init', (event, slick) => {
            // console.log('Slick initialized, setting up scroll arrow visibility');
            setTimeout(() => {
                this.updateScrollArrowVisibility($splitLayout);
                
                // Also listen for scroll events on the slick-list
                const $slickList = $splitLayout.find('.slick-list');
                if ($slickList.length > 0) {
                    $slickList.on('scroll', () => {
                        this.updateScrollArrowVisibility($splitLayout);
                    });
                }
            }, 100);
        });
    }
    
    updateScrollArrowVisibility($splitLayout) {
        const $thumbnails = $splitLayout.find('.productView-thumbnails');
        const $slickList = $splitLayout.find('.slick-list');
        
        if ($slickList.length === 0) return;
        
        const scrollTop = $slickList.scrollTop();
        const scrollHeight = $slickList[0].scrollHeight;
        const clientHeight = $slickList.outerHeight();
        const maxScrollTop = scrollHeight - clientHeight;
        const isScrollable = scrollHeight > clientHeight;
        
        // console.log('Updating scroll arrow visibility for pseudo-elements:', {
        //     scrollTop,
        //     scrollHeight,
        //     clientHeight,
        //     maxScrollTop,
        //     isScrollable
        // });
        
        if (!isScrollable) {
            // Not scrollable - hide both pseudo-element arrows
            $thumbnails.removeClass('can-scroll-up can-scroll-down');
            return;
        }
        
        // Show/hide up arrow (::before) based on scroll position
        if (scrollTop <= 5) {
            // At or near the top - hide up arrow
            $thumbnails.removeClass('can-scroll-up');
        } else {
            // Not at top - show up arrow
            $thumbnails.addClass('can-scroll-up');
        }
        
        // Show/hide down arrow (::after) based on scroll position
        if (scrollTop >= maxScrollTop - 5) {
            // At or near the bottom - hide down arrow
            $thumbnails.removeClass('can-scroll-down');
        } else {
            // Not at bottom - show down arrow
            $thumbnails.addClass('can-scroll-down');
        }
    }
    
    setupMobileHandlers($splitLayout) {
        // Only set up mobile handlers on mobile devices
        if (window.innerWidth > 768) return;
        
        const $thumbnails = $splitLayout.find('.productView-thumbnails');
        // console.log('Setting up mobile horizontal scroll handlers');
        
        // Handle horizontal scroll for mobile
        $(document).off('click.mobile-horizontal');
        
        $(document).on('click.mobile-horizontal', '.productView.split-layout .productView-thumbnails', (e) => {
            // Only on mobile
            if (window.innerWidth > 768) return;
            
            e.preventDefault();
            
            const $container = $(e.currentTarget);
            const containerRect = $container[0].getBoundingClientRect();
            const clickX = e.clientX - containerRect.left;
            const containerWidth = containerRect.width;
            
            // Define click zones for horizontal scrolling
            const arrowWidth = 40; // Width of the horizontal arrows
            const leftArrowZone = arrowWidth;
            const rightArrowZone = containerWidth - arrowWidth;
            
            // console.log('Mobile horizontal click detected:', {
            //     clickX,
            //     containerWidth,
            //     leftArrowZone,
            //     rightArrowZone
            // });
            
            const $slickList = $container.find('.slick-list');
            if ($slickList.length === 0) return;
            
            if (clickX <= leftArrowZone) {
                // Clicked in left arrow area - scroll left
                // console.log('Mobile left arrow area clicked');
                const currentScrollLeft = $slickList.scrollLeft();
                const scrollAmount = 92; // thumbnail width (80px) + gap (12px)
                const newScrollLeft = Math.max(0, currentScrollLeft - scrollAmount);
                
                $slickList.animate({ scrollLeft: newScrollLeft }, 300, () => {
                    this.updateMobileArrowVisibility($splitLayout);
                });
                
            } else if (clickX >= rightArrowZone) {
                // Clicked in right arrow area - scroll right
                // console.log('Mobile right arrow area clicked');
                const currentScrollLeft = $slickList.scrollLeft();
                const scrollAmount = 92; // thumbnail width (80px) + gap (12px)
                const maxScrollLeft = $slickList[0].scrollWidth - $slickList.outerWidth();
                const newScrollLeft = Math.min(maxScrollLeft, currentScrollLeft + scrollAmount);
                
                $slickList.animate({ scrollLeft: newScrollLeft }, 300, () => {
                    this.updateMobileArrowVisibility($splitLayout);
                });
            }
        });
        
        // Set up mobile arrow visibility
        $thumbnails.on('init', (event, slick) => {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.updateMobileArrowVisibility($splitLayout);
                    
                    const $slickList = $splitLayout.find('.slick-list');
                    if ($slickList.length > 0) {
                        $slickList.on('scroll', () => {
                            this.updateMobileArrowVisibility($splitLayout);
                        });
                    }
                }, 100);
            }
        });
    }
    
    updateMobileArrowVisibility($splitLayout) {
        if (window.innerWidth > 768) return; // Only for mobile
        
        const $thumbnails = $splitLayout.find('.productView-thumbnails');
        const $slickList = $splitLayout.find('.slick-list');
        
        if ($slickList.length === 0) return;
        
        const scrollLeft = $slickList.scrollLeft();
        const scrollWidth = $slickList[0].scrollWidth;
        const clientWidth = $slickList.outerWidth();
        const maxScrollLeft = scrollWidth - clientWidth;
        const isScrollable = scrollWidth > clientWidth;
        
        // console.log('Updating mobile horizontal arrow visibility:', {
        //     scrollLeft,
        //     scrollWidth,
        //     clientWidth,
        //     maxScrollLeft,
        //     isScrollable
        // });
        
        if (!isScrollable) {
            $thumbnails.removeClass('can-scroll-left can-scroll-right');
            return;
        }
        
        // Show/hide left arrow
        if (scrollLeft <= 5) {
            $thumbnails.removeClass('can-scroll-left');
        } else {
            $thumbnails.addClass('can-scroll-left');
        }
        
        // Show/hide right arrow
        if (scrollLeft >= maxScrollLeft - 5) {
            $thumbnails.removeClass('can-scroll-right');
        } else {
            $thumbnails.addClass('can-scroll-right');
        }
    }
    
    setupThumbnailClickHandlers($splitLayout) {
        // console.log('Setting up thumbnail click handlers for split layout');
        
        // Remove existing thumbnail click handlers that open PhotoSwipe
        const $thumbnails = $splitLayout.find('.productView-thumbnails');
        
        // Unbind existing click AND hover handlers from image gallery
        $thumbnails.find('[data-image-gallery-item], [data-image-gallery-video]').off('click mouseenter');
        
        // Add our custom click handler for thumbnails
        $(document).off('click.split-layout-thumbnails');
        $(document).on('click.split-layout-thumbnails', '.productView.split-layout .productView-thumbnails [data-image-gallery-item], .productView.split-layout .productView-thumbnails [data-image-gallery-video]', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const $target = $(e.currentTarget);
            const type = $target.attr('data-type');
            
            // console.log('Split layout thumbnail clicked:', {
            //     type: type,
            //     target: $target[0]
            // });
            
            // Try to find the image gallery instance from the global product details
            let imageGallery = null;
            
            // Check if there's a global product details instance
            if (window.productDetails && window.productDetails.imageGallery) {
                imageGallery = window.productDetails.imageGallery;
            }
            
            // Alternative: check if it's stored on the productView element
            if (!imageGallery) {
                const $productView = $target.closest('.productView');
                imageGallery = $productView.data('imageGallery');
            }
            
            if (imageGallery && typeof imageGallery.selectNewImage === 'function') {
                // Use the existing selectNewImage method to change the main image
                imageGallery.selectNewImage(e);
                // console.log('Main image changed via image gallery instance');
            } else {
                // Fallback: manually change the main image
                this.changeMainImageManually($target, type);
                // console.log('Main image changed via manual method');
            }
        });
        
        // console.log('Thumbnail click handlers set up for split layout - hover disabled');
    }
    
    disableThumbnailHover($splitLayout) {
        // Continuously disable hover functionality for split layout thumbnails
        const $thumbnails = $splitLayout.find('.productView-thumbnails');
        
        // console.log('Disabling thumbnail hover for split layout');
        
        // Remove any hover event listeners
        $thumbnails.find('[data-image-gallery-item], [data-image-gallery-video]').off('mouseenter mouseover hover');
        
        // Add a no-op hover handler to prevent future hover events
        $(document).off('mouseenter.split-layout-no-hover');
        $(document).on('mouseenter.split-layout-no-hover', '.productView.split-layout .productView-thumbnails [data-image-gallery-item], .productView.split-layout .productView-thumbnails [data-image-gallery-video]', (e) => {
            // Prevent hover from changing main image
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        });
        
        // console.log('Thumbnail hover disabled for split layout');
    }
    
    changeMainImageManually($target, type) {
        // Manual method to change main image if image gallery instance is not available
        const $mainImage = $('.productView-image [data-main-image]');
        const $mainImageContainer = $('.productView-image .productView-img-container a');
        
        if ($mainImage.length === 0) return;
        
        // Get the new image data from the thumbnail
        const newImageUrl = $target.attr(`data-${type}-gallery-new-image-url`);
        const newImageSrcset = $target.attr(`data-${type}-gallery-new-image-srcset`);
        const zoomImageUrl = $target.attr(`data-${type}-gallery-zoom-image-url`);
        const imageAlt = $target.find('img').attr('alt');
        const imageIndex = $target.attr('data-index');
        
        if (!newImageUrl) return;
        
        // console.log('Manually changing main image:', {
        //     newImageUrl,
        //     newImageSrcset,
        //     zoomImageUrl,
        //     imageAlt,
        //     imageIndex
        // });
        
        // Update the main image
        $mainImage.attr({
            src: newImageUrl,
            srcset: newImageSrcset || '',
            alt: imageAlt || '',
            title: imageAlt || ''
        });
        
        // Update the main image container link for PhotoSwipe
        if ($mainImageContainer.length > 0) {
            $mainImageContainer.attr({
                'data-index': imageIndex,
                'data-type': type,
                'href': zoomImageUrl || newImageUrl
            });
        }
        
        // Update active thumbnail state
        $('.productView-thumbnails [data-image-gallery-item], .productView-thumbnails [data-image-gallery-video]').removeClass('is-active');
        $target.addClass('is-active');
        
        // Update the main image zoom functionality if it exists
        const $zoomContainer = $('.productView-image [data-zoom-image]');
        if ($zoomContainer.length > 0 && zoomImageUrl) {
            $zoomContainer.attr('data-zoom-image', zoomImageUrl);
        }
        
        // console.log('Main image manually updated');
    }
    
    setupMainImageSwipe() {
        // console.log('Setting up main image swipe handlers');
        
        const $mainImageContainer = $('.productView.split-layout .productView-image .productView-img-container');
        if ($mainImageContainer.length === 0) {
            // console.log('No main image container found for swipe');
            return;
        }
        
        // console.log('Found main image container:', $mainImageContainer[0]);
        
        // Set up touch events for mobile and device emulation
        let startX = null;
        let startY = null;
        let isScrolling = null;
        
        // Remove any existing swipe handlers
        $mainImageContainer.off('.swipe');
        
        // Touch start
        $mainImageContainer.on('touchstart.swipe', (e) => {
            // console.log('Touch start detected on main image:', e.originalEvent);
            const touch = e.originalEvent.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isScrolling = null;
            
            // console.log('Touch start coordinates:', { startX, startY });
            
            // Add visual feedback
            $mainImageContainer.css('opacity', '0.9');
        });
        
        // Touch move
        $mainImageContainer.on('touchmove.swipe', (e) => {
            if (!startX || !startY) return;
            
            const touch = e.originalEvent.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            // console.log('Touch move - deltas:', { deltaX, deltaY });
            
            // Determine if user is scrolling vertically or swiping horizontally
            if (isScrolling === null) {
                isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
                // console.log('Determined scrolling direction:', isScrolling ? 'vertical' : 'horizontal');
            }
            
            // If horizontal swipe, prevent default scrolling
            if (!isScrolling && Math.abs(deltaX) > 10) {
                e.preventDefault();
                // console.log('Horizontal swipe detected, preventing default');
                
                // Add visual feedback during swipe
                const translateX = deltaX * 0.1; // Subtle movement feedback
                $mainImageContainer.css('transform', `translateX(${translateX}px)`);
            }
        });
        
        // Touch end
        $mainImageContainer.on('touchend.swipe', (e) => {
            // console.log('Touch end detected on main image');
            
            // Remove visual feedback
            $mainImageContainer.css({
                'opacity': '1',
                'transform': 'none'
            });
            
            if (!startX || !startY || isScrolling) {
                // console.log('Touch end - no swipe action (scrolling or no start position)');
                startX = null;
                startY = null;
                isScrolling = null;
                return;
            }
            
            const touch = e.originalEvent.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            // Minimum swipe distance
            const minSwipeDistance = 50;
            
            // console.log('Touch end - analyzing swipe:', { deltaX, deltaY, minSwipeDistance });
            
            // Check for horizontal swipe
            if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < 100) {
                if (deltaX > 0) {
                    // Swipe right - go to previous image
                    // console.log('Swipe right detected - going to previous image');
                    this.navigateToImage('previous');
                } else {
                    // Swipe left - go to next image
                    // console.log('Swipe left detected - going to next image');
                    this.navigateToImage('next');
                }
            } else {
                // console.log('No swipe action - insufficient distance or vertical movement');
            }
            
            // Reset values
            startX = null;
            startY = null;
            isScrolling = null;
        });
        
        // Mouse events for desktop testing (when NOT in device emulation mode)
        let mouseDown = false;
        let mouseStartX = null;
        let mouseStartY = null;
        
        // Only add mouse events if touch is NOT supported (pure desktop)
        if (!('ontouchstart' in window)) {
            // console.log('Touch not supported - adding mouse events for desktop testing');
            
            $mainImageContainer.on('mousedown.swipe', (e) => {
                // console.log('Mouse down detected on main image (desktop mode)');
                mouseDown = true;
                mouseStartX = e.clientX;
                mouseStartY = e.clientY;
                $mainImageContainer.css('opacity', '0.9');
                e.preventDefault();
            });
            
            $mainImageContainer.on('mousemove.swipe', (e) => {
                if (!mouseDown) return;
                
                const deltaX = e.clientX - mouseStartX;
                const deltaY = e.clientY - mouseStartY;
                
                // Prevent text selection
                e.preventDefault();
                
                // Visual feedback during drag
                if (Math.abs(deltaX) > 10) {
                    $mainImageContainer.css('transform', `translateX(${deltaX * 0.2}px)`);
                }
            });
            
            $mainImageContainer.on('mouseup.swipe', (e) => {
                if (!mouseDown) return;
                
                // console.log('Mouse up detected on main image (desktop mode)');
                mouseDown = false;
                
                // Reset visual feedback
                $mainImageContainer.css({
                    'opacity': '1',
                    'transform': 'none'
                });
                
                const deltaX = e.clientX - mouseStartX;
                const deltaY = e.clientY - mouseStartY;
                const minSwipeDistance = 50;
                
                // console.log('Mouse drag - analyzing swipe:', { deltaX, deltaY, minSwipeDistance });
                
                // Check for horizontal swipe
                if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < 100) {
                    if (deltaX > 0) {
                        // Drag right - go to previous image
                        // console.log('Mouse drag right detected - going to previous image');
                        this.navigateToImage('previous');
                    } else {
                        // Drag left - go to next image
                        // console.log('Mouse drag left detected - going to next image');
                        this.navigateToImage('next');
                    }
                }
            });
            
            // Handle mouse leave to reset state
            $mainImageContainer.on('mouseleave.swipe', () => {
                if (mouseDown) {
                    mouseDown = false;
                    $mainImageContainer.css({
                        'opacity': '1',
                        'transform': 'none'
                    });
                }
            });
        } else {
            // console.log('Touch supported - skipping mouse events (will use touch events in device emulation)');
        }
        
        // console.log('Main image swipe handlers set up');
    }
    
    navigateToImage(direction) {
        const $thumbnails = $('.productView.split-layout .productView-thumbnails');
        const $allThumbnails = $thumbnails.find('[data-image-gallery-item], [data-image-gallery-video]');
        const $currentActive = $allThumbnails.filter('.is-active');
        
        if ($allThumbnails.length === 0) return;
        
        let $nextThumbnail = null;
        
        if ($currentActive.length === 0) {
            // No active thumbnail, start with first
            $nextThumbnail = $allThumbnails.first();
        } else {
            const currentIndex = $allThumbnails.index($currentActive);
            
            if (direction === 'next') {
                const nextIndex = (currentIndex + 1) % $allThumbnails.length;
                $nextThumbnail = $allThumbnails.eq(nextIndex);
            } else if (direction === 'previous') {
                const prevIndex = currentIndex === 0 ? $allThumbnails.length - 1 : currentIndex - 1;
                $nextThumbnail = $allThumbnails.eq(prevIndex);
            }
        }
        
        if ($nextThumbnail && $nextThumbnail.length > 0) {
            // console.log(`Navigating to ${direction} image via swipe`);
            
            // Trigger click on the thumbnail to change the main image
            const clickEvent = $.Event('click', {
                currentTarget: $nextThumbnail[0],
                preventDefault: function() {},
                stopPropagation: function() {}
            });
            
            const type = $nextThumbnail.attr('data-type');
            
            // Try to use image gallery instance first
            let imageGallery = null;
            if (window.productDetails && window.productDetails.imageGallery) {
                imageGallery = window.productDetails.imageGallery;
            }
            
            if (imageGallery && typeof imageGallery.selectNewImage === 'function') {
                imageGallery.selectNewImage(clickEvent);
            } else {
                this.changeMainImageManually($nextThumbnail, type);
            }
        }
    }
    
    // Helper method for testing swipe functionality from desktop console
    testSwipe(direction = 'next') {
        // console.log(`Testing swipe ${direction} from console`);
        this.navigateToImage(direction);
    }
    
    // Expose this instance globally for testing
    init() {
        window.splitLayoutCarousel = this;
        // console.log('Split layout carousel instance exposed as window.splitLayoutCarousel');
        // console.log('Test swipe with: window.splitLayoutCarousel.testSwipe("next") or window.splitLayoutCarousel.testSwipe("previous")');
    }
}
