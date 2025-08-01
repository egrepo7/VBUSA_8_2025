(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./assets/js/theme/custom/dual-panel-scroll.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/custom/dual-panel-scroll.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NaturalDualPanel; });
/**
 * Natural Dual Panel Behavior
 * - Uses CSS sticky positioning for natural flow
 * - Right panel sticks until its content ends
 * - Page flows naturally: header -> dual-panel -> related products -> footer
 * - No artificial "unlocking" or complex scroll management
 */
var NaturalDualPanel = /*#__PURE__*/function () {
  function NaturalDualPanel() {
    this.container = document.querySelector('.dual-panel-container');
    this.detailsPanel = document.querySelector('.details-panel');
    if (!this.container || !this.detailsPanel) {
      return;
    }
    this.isDesktop = window.matchMedia('(min-width: 1025px)').matches;
    this.init();
  }
  var _proto = NaturalDualPanel.prototype;
  _proto.init = function init() {
    if (!this.isDesktop) {
      this.enableMobileLayout();
      return;
    }

    // Enable natural scrolling - no artificial scroll blocking
    document.body.style.overflow = 'auto';

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));

    // Ensure proper sticky behavior
    this.setupStickyBehavior();

    // Setup quantity selector functions
    this.setupQuantitySelector();
  };
  _proto.setupStickyBehavior = function setupStickyBehavior() {
    // Ensure the sticky positioning works correctly
    // by making sure the parent has proper height
    if (this.container) {
      this.container.style.position = 'relative';
    }
  };
  _proto.setupQuantitySelector = function setupQuantitySelector() {
    // The theme's native quantity selector uses data-quantity-change
    // and is handled by the product-details.js listenQuantityChange() method
    // We just need to ensure it works properly in our split layout

    var quantityContainer = document.querySelector('[data-quantity-change]');
    if (quantityContainer) {
      // Ensure the native theme functionality is properly initialized
      // The theme handles this automatically through product-details.js
    }
  };
  _proto.enableMobileLayout = function enableMobileLayout() {
    // For mobile - ensure normal document flow
    document.body.style.overflow = 'auto';
    if (this.container) {
      this.container.style.position = 'relative';
    }
    if (this.detailsPanel) {
      this.detailsPanel.style.position = 'relative';
      this.detailsPanel.style.top = 'auto';
    }
  };
  _proto.handleResize = function handleResize() {
    var wasDesktop = this.isDesktop;
    this.isDesktop = window.matchMedia('(min-width: 1025px)').matches;
    if (wasDesktop !== this.isDesktop) {
      this.init();
    }
  };
  return NaturalDualPanel;
}(); // Initialize when DOM is ready

document.addEventListener('DOMContentLoaded', function () {
  new NaturalDualPanel();
});

/***/ }),

/***/ "./assets/js/theme/custom/its-product.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/custom/its-product.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ITSProduct; });
/**
 * IntuitSolutions - Custom JS that fires on the PDP
 */
var ITSProduct = function ITSProduct(context) {};


/***/ }),

/***/ "./assets/js/theme/custom/split-layout-carousel.js":
/*!*********************************************************!*\
  !*** ./assets/js/theme/custom/split-layout-carousel.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SplitLayoutCarousel; });
/**
 * Split Layout Carousel Override
 * Forces vertical thumbnail layout for split layout product pages
 */
var SplitLayoutCarousel = /*#__PURE__*/function () {
  function SplitLayoutCarousel() {
    this.initCarouselOverride();
    this.init(); // Initialize test helpers
  }
  var _proto = SplitLayoutCarousel.prototype;
  _proto.initCarouselOverride = function initCarouselOverride() {
    var _this = this;
    // Pre-DOM ready setup for split layouts to prevent FOUC
    this.setupPreInitialization();

    // Wait for DOM to be ready
    $(document).ready(function () {
      // console.log('DOM ready, initializing split layout carousel');
      _this.enforceVerticalLayout();

      // Re-enforce after any slick initialization
      setTimeout(function () {
        // console.log('Re-enforcing layout after 500ms delay');
        _this.enforceVerticalLayout();
      }, 500);

      // Also enforce after window resize
      $(window).on('resize', function () {
        setTimeout(function () {
          _this.enforceVerticalLayout();
        }, 100);
      });

      // Set up a fallback to ensure handlers are always set up
      setTimeout(function () {
        // console.log('Setting up additional navigation handlers');
        _this.setupNavigationHandlers($('.productView.split-layout'));
      }, 1000);

      // Set up swipe functionality after a delay to ensure everything is loaded
      setTimeout(function () {
        // console.log('Setting up swipe functionality');
        _this.setupMainImageSwipe();
      }, 1200);
    });
  };
  _proto.setupPreInitialization = function setupPreInitialization() {
    var _this2 = this;
    // Early intervention before DOM ready for split layouts
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        _this2.preInitializeLayout();
        _this2.interceptSlickInitialization();
      });
    } else {
      this.preInitializeLayout();
      this.interceptSlickInitialization();
    }
  };
  _proto.interceptSlickInitialization = function interceptSlickInitialization() {
    // Override Slick initialization for split layouts to prevent size jumping
    var originalSlick = $.fn.slick;
    var self = this;
    $.fn.slick = function (options) {
      // Check if this is a split layout thumbnail carousel
      if (this.hasClass('productView-thumbnails') && this.closest('.productView.split-layout').length > 0) {
        // console.log('Intercepting Slick initialization for split layout');

        // Apply our fixes BEFORE Slick initializes
        self.applyImmediateLayoutFixes(this);

        // Override Slick options for split layout
        var splitLayoutOptions = Object.assign({}, options, {
          infinite: false,
          arrows: false,
          dots: false,
          variableWidth: false,
          adaptiveHeight: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: window.innerWidth > 768,
          verticalSwiping: window.innerWidth > 768
        });

        // Initialize Slick with our options
        var result = originalSlick.call(this, splitLayoutOptions);

        // Apply our fixes AFTER Slick initializes
        setTimeout(function () {
          self.enforceVerticalLayout();
        }, 0);
        return result;
      }

      // For non-split layout carousels, use original Slick
      return originalSlick.call(this, options);
    };

    // Copy over any static properties
    Object.keys(originalSlick).forEach(function (key) {
      $.fn.slick[key] = originalSlick[key];
    });
  };
  _proto.preInitializeLayout = function preInitializeLayout() {
    var _this3 = this;
    // Apply initial styles before Slick has a chance to initialize
    var $splitLayout = $('.productView.split-layout');
    if ($splitLayout.length === 0) return;
    var $thumbnails = $splitLayout.find('.productView-thumbnails');
    if ($thumbnails.length === 0) return;

    // console.log('Pre-initializing split layout before Slick initialization');

    // Set up event listeners to intercept Slick initialization
    $thumbnails.on('beforeChange.splitLayout', function (event, slick) {
      // console.log('Slick beforeChange event intercepted');
      _this3.enforceVerticalLayout();
    });

    // Apply immediate layout fixes
    this.applyImmediateLayoutFixes($thumbnails);

    // Set up thumbnail click handlers early to override default behavior
    this.setupThumbnailClickHandlers($('.productView.split-layout'));

    // Disable hover behavior early to prevent unwanted image changes
    this.disableThumbnailHover($('.productView.split-layout'));

    // Set up main image swipe for mobile
    this.setupMainImageSwipe();
  };
  _proto.applyImmediateLayoutFixes = function applyImmediateLayoutFixes($thumbnails) {
    var isMobile = window.innerWidth <= 768;

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
    var imageSelectors = ['img', 'li img', '.slick-slide img', '.productView-thumbnail img', '.productView-thumbnail-link img'];
    imageSelectors.forEach(function (selector) {
      $thumbnails.find(selector).each(function () {
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
    var $slickList = $thumbnails.find('.slick-list');
    if ($slickList.length > 0) {
      $slickList.each(function () {
        this.style.setProperty('width', isMobile ? '100%' : '80px', 'important');
        this.style.setProperty('height', isMobile ? '80px' : 'auto', 'important');
        this.style.setProperty('overflow-x', isMobile ? 'auto' : 'hidden', 'important');
        this.style.setProperty('overflow-y', isMobile ? 'hidden' : 'auto', 'important');
      });
    }
    var $slickTrack = $thumbnails.find('.slick-track');
    if ($slickTrack.length > 0) {
      $slickTrack.each(function () {
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
  };
  _proto.enforceVerticalLayout = function enforceVerticalLayout() {
    var _this4 = this;
    var $splitLayout = $('.productView.split-layout');
    if ($splitLayout.length === 0) return;
    var $thumbnails = $splitLayout.find('.productView-thumbnails');
    if ($thumbnails.length === 0) return;

    // FORCE HIDE ALL SLICK ARROWS
    $thumbnails.find('.slick-prev, .slick-next, .slick-arrow, button.slick-prev, button.slick-next, button.slick-arrow').remove();

    // IMMEDIATE FIX: Force thumbnail image sizes before any other processing
    $thumbnails.find('img').each(function () {
      this.style.setProperty('width', '80px', 'important');
      this.style.setProperty('height', '80px', 'important');
      this.style.setProperty('min-width', '80px', 'important');
      this.style.setProperty('min-height', '80px', 'important');
      this.style.setProperty('max-width', '80px', 'important');
      this.style.setProperty('max-height', '80px', 'important');
    });
    var isMobile = window.innerWidth <= 768;

    // console.log(`Enforcing layout for split layout - Mobile: ${isMobile}`);

    // All products now use Slick mode - apply layout based on screen size
    var $slickTrack = $thumbnails.find('.slick-track');
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
        $slickTrack.find('.slick-slide').each(function (index) {
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
        $slickTrack.find('.slick-slide').each(function (index) {
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
        var $lastSlide = $slickTrack.find('.slick-slide:last-child');
        if ($lastSlide.length > 0) {
          $lastSlide[0].style.setProperty('margin-bottom', '0', 'important');
        }
      }
    }

    // Also force the slick-list container
    var $slickList = $thumbnails.find('.slick-list');
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
    $thumbnails.on('init', function (event, slick) {
      // console.log('Slick carousel initialized, enforcing layout');
      setTimeout(function () {
        _this4.enforceVerticalLayout();
      }, 50);
    });

    // Also listen for reInit
    $thumbnails.on('reInit', function (event, slick) {
      // console.log('Slick carousel reinitialized, enforcing layout');
      setTimeout(function () {
        _this4.enforceVerticalLayout();
      }, 50);
    });

    // Listen for breakpoint changes
    $thumbnails.on('breakpoint', function (event, slick) {
      // console.log('Slick carousel breakpoint changed, enforcing layout');
      setTimeout(function () {
        _this4.enforceVerticalLayout();
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
    $(window).on('resize', function () {
      setTimeout(function () {
        _this4.setupMobileHandlers($splitLayout);
        _this4.setupMainImageSwipe(); // Re-setup swipe on resize
      }, 100);
    });
  };
  _proto.setupNavigationHandlers = function setupNavigationHandlers($splitLayout) {
    var _this5 = this;
    var $thumbnails = $splitLayout.find('.productView-thumbnails');

    // console.log('Setting up navigation handlers for split layout - pseudo-element click detection');
    // console.log('Found split layout containers:', $splitLayout.length);
    // console.log('Found thumbnail containers:', $thumbnails.length);

    // Use document-level delegation to capture clicks on the thumbnail container
    $(document).off('click.split-layout-pseudo');

    // Handle clicks on the thumbnails container to detect pseudo-element areas
    $(document).on('click.split-layout-pseudo', '.productView.split-layout .productView-thumbnails', function (e) {
      e.preventDefault();
      var $container = $(e.currentTarget);
      var containerRect = $container[0].getBoundingClientRect();
      var clickY = e.clientY;
      var containerTop = containerRect.top;
      var containerBottom = containerRect.bottom;

      // Define arrow areas - top 40px and bottom 40px of container
      var arrowHeight = 40;
      var upArrowBottom = containerTop + arrowHeight;
      var downArrowTop = containerBottom - arrowHeight;

      // console.log('Click detected on thumbnails container:', {
      //     clickY,
      //     containerTop,
      //     containerBottom,
      //     upArrowBottom,
      //     downArrowTop
      // });

      var $currentSplitLayout = $container.closest('.productView.split-layout');
      var $slickList = $container.find('.slick-list');
      if ($slickList.length === 0) {
        // console.log('No slick-list found for scrolling');
        return;
      }

      // Check if click is in the up arrow area (::before)
      if (clickY >= containerTop && clickY <= upArrowBottom) {
        // console.log('Up arrow area clicked (::before pseudo-element area)');

        var currentScrollTop = $slickList.scrollTop();
        var scrollAmount = 88; // thumbnail height (80px) + gap (8px)
        var newScrollTop = Math.max(0, currentScrollTop - scrollAmount);

        // console.log(`Scrolling up from ${currentScrollTop} to ${newScrollTop}`);

        $slickList.animate({
          scrollTop: newScrollTop
        }, 300, function () {
          _this5.updateScrollArrowVisibility($currentSplitLayout);
        });
      }
      // Check if click is in the down arrow area (::after)
      else if (clickY >= downArrowTop && clickY <= containerBottom) {
        // console.log('Down arrow area clicked (::after pseudo-element area)');

        var _currentScrollTop = $slickList.scrollTop();
        var _scrollAmount = 88; // thumbnail height (80px) + gap (8px)
        var maxScrollTop = $slickList[0].scrollHeight - $slickList.outerHeight();
        var _newScrollTop = Math.min(maxScrollTop, _currentScrollTop + _scrollAmount);

        // console.log(`Scrolling down from ${currentScrollTop} to ${newScrollTop}, max: ${maxScrollTop}`);

        $slickList.animate({
          scrollTop: _newScrollTop
        }, 300, function () {
          _this5.updateScrollArrowVisibility($currentSplitLayout);
        });
      } else {
        // console.log('Click in middle area - no scroll action');
      }
    });

    // Update arrow visibility when Slick is initialized
    $thumbnails.on('init', function (event, slick) {
      // console.log('Slick initialized, setting up scroll arrow visibility');
      setTimeout(function () {
        _this5.updateScrollArrowVisibility($splitLayout);

        // Also listen for scroll events on the slick-list
        var $slickList = $splitLayout.find('.slick-list');
        if ($slickList.length > 0) {
          $slickList.on('scroll', function () {
            _this5.updateScrollArrowVisibility($splitLayout);
          });
        }
      }, 100);
    });
  };
  _proto.updateScrollArrowVisibility = function updateScrollArrowVisibility($splitLayout) {
    var $thumbnails = $splitLayout.find('.productView-thumbnails');
    var $slickList = $splitLayout.find('.slick-list');
    if ($slickList.length === 0) return;
    var scrollTop = $slickList.scrollTop();
    var scrollHeight = $slickList[0].scrollHeight;
    var clientHeight = $slickList.outerHeight();
    var maxScrollTop = scrollHeight - clientHeight;
    var isScrollable = scrollHeight > clientHeight;

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
  };
  _proto.setupMobileHandlers = function setupMobileHandlers($splitLayout) {
    var _this6 = this;
    // Only set up mobile handlers on mobile devices
    if (window.innerWidth > 768) return;
    var $thumbnails = $splitLayout.find('.productView-thumbnails');
    // console.log('Setting up mobile horizontal scroll handlers');

    // Handle horizontal scroll for mobile
    $(document).off('click.mobile-horizontal');
    $(document).on('click.mobile-horizontal', '.productView.split-layout .productView-thumbnails', function (e) {
      // Only on mobile
      if (window.innerWidth > 768) return;
      e.preventDefault();
      var $container = $(e.currentTarget);
      var containerRect = $container[0].getBoundingClientRect();
      var clickX = e.clientX - containerRect.left;
      var containerWidth = containerRect.width;

      // Define click zones for horizontal scrolling
      var arrowWidth = 40; // Width of the horizontal arrows
      var leftArrowZone = arrowWidth;
      var rightArrowZone = containerWidth - arrowWidth;

      // console.log('Mobile horizontal click detected:', {
      //     clickX,
      //     containerWidth,
      //     leftArrowZone,
      //     rightArrowZone
      // });

      var $slickList = $container.find('.slick-list');
      if ($slickList.length === 0) return;
      if (clickX <= leftArrowZone) {
        // Clicked in left arrow area - scroll left
        // console.log('Mobile left arrow area clicked');
        var currentScrollLeft = $slickList.scrollLeft();
        var scrollAmount = 92; // thumbnail width (80px) + gap (12px)
        var newScrollLeft = Math.max(0, currentScrollLeft - scrollAmount);
        $slickList.animate({
          scrollLeft: newScrollLeft
        }, 300, function () {
          _this6.updateMobileArrowVisibility($splitLayout);
        });
      } else if (clickX >= rightArrowZone) {
        // Clicked in right arrow area - scroll right
        // console.log('Mobile right arrow area clicked');
        var _currentScrollLeft = $slickList.scrollLeft();
        var _scrollAmount2 = 92; // thumbnail width (80px) + gap (12px)
        var maxScrollLeft = $slickList[0].scrollWidth - $slickList.outerWidth();
        var _newScrollLeft = Math.min(maxScrollLeft, _currentScrollLeft + _scrollAmount2);
        $slickList.animate({
          scrollLeft: _newScrollLeft
        }, 300, function () {
          _this6.updateMobileArrowVisibility($splitLayout);
        });
      }
    });

    // Set up mobile arrow visibility
    $thumbnails.on('init', function (event, slick) {
      if (window.innerWidth <= 768) {
        setTimeout(function () {
          _this6.updateMobileArrowVisibility($splitLayout);
          var $slickList = $splitLayout.find('.slick-list');
          if ($slickList.length > 0) {
            $slickList.on('scroll', function () {
              _this6.updateMobileArrowVisibility($splitLayout);
            });
          }
        }, 100);
      }
    });
  };
  _proto.updateMobileArrowVisibility = function updateMobileArrowVisibility($splitLayout) {
    if (window.innerWidth > 768) return; // Only for mobile

    var $thumbnails = $splitLayout.find('.productView-thumbnails');
    var $slickList = $splitLayout.find('.slick-list');
    if ($slickList.length === 0) return;
    var scrollLeft = $slickList.scrollLeft();
    var scrollWidth = $slickList[0].scrollWidth;
    var clientWidth = $slickList.outerWidth();
    var maxScrollLeft = scrollWidth - clientWidth;
    var isScrollable = scrollWidth > clientWidth;

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
  };
  _proto.setupThumbnailClickHandlers = function setupThumbnailClickHandlers($splitLayout) {
    var _this7 = this;
    // console.log('Setting up thumbnail click handlers for split layout');

    // Remove existing thumbnail click handlers that open PhotoSwipe
    var $thumbnails = $splitLayout.find('.productView-thumbnails');

    // Unbind existing click AND hover handlers from image gallery
    $thumbnails.find('[data-image-gallery-item], [data-image-gallery-video]').off('click mouseenter');

    // Add our custom click handler for thumbnails
    $(document).off('click.split-layout-thumbnails');
    $(document).on('click.split-layout-thumbnails', '.productView.split-layout .productView-thumbnails [data-image-gallery-item], .productView.split-layout .productView-thumbnails [data-image-gallery-video]', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var $target = $(e.currentTarget);
      var type = $target.attr('data-type');

      // console.log('Split layout thumbnail clicked:', {
      //     type: type,
      //     target: $target[0]
      // });

      // Try to find the image gallery instance from the global product details
      var imageGallery = null;

      // Check if there's a global product details instance
      if (window.productDetails && window.productDetails.imageGallery) {
        imageGallery = window.productDetails.imageGallery;
      }

      // Alternative: check if it's stored on the productView element
      if (!imageGallery) {
        var $productView = $target.closest('.productView');
        imageGallery = $productView.data('imageGallery');
      }
      if (imageGallery && typeof imageGallery.selectNewImage === 'function') {
        // Use the existing selectNewImage method to change the main image
        imageGallery.selectNewImage(e);
        // console.log('Main image changed via image gallery instance');
      } else {
        // Fallback: manually change the main image
        _this7.changeMainImageManually($target, type);
        // console.log('Main image changed via manual method');
      }
    });

    // console.log('Thumbnail click handlers set up for split layout - hover disabled');
  };
  _proto.disableThumbnailHover = function disableThumbnailHover($splitLayout) {
    // Continuously disable hover functionality for split layout thumbnails
    var $thumbnails = $splitLayout.find('.productView-thumbnails');

    // console.log('Disabling thumbnail hover for split layout');

    // Remove any hover event listeners
    $thumbnails.find('[data-image-gallery-item], [data-image-gallery-video]').off('mouseenter mouseover hover');

    // Add a no-op hover handler to prevent future hover events
    $(document).off('mouseenter.split-layout-no-hover');
    $(document).on('mouseenter.split-layout-no-hover', '.productView.split-layout .productView-thumbnails [data-image-gallery-item], .productView.split-layout .productView-thumbnails [data-image-gallery-video]', function (e) {
      // Prevent hover from changing main image
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    });

    // console.log('Thumbnail hover disabled for split layout');
  };
  _proto.changeMainImageManually = function changeMainImageManually($target, type) {
    // Manual method to change main image if image gallery instance is not available
    var $mainImage = $('.productView-image [data-main-image]');
    var $mainImageContainer = $('.productView-image .productView-img-container a');
    if ($mainImage.length === 0) return;

    // Get the new image data from the thumbnail
    var newImageUrl = $target.attr("data-" + type + "-gallery-new-image-url");
    var newImageSrcset = $target.attr("data-" + type + "-gallery-new-image-srcset");
    var zoomImageUrl = $target.attr("data-" + type + "-gallery-zoom-image-url");
    var imageAlt = $target.find('img').attr('alt');
    var imageIndex = $target.attr('data-index');
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
    var $zoomContainer = $('.productView-image [data-zoom-image]');
    if ($zoomContainer.length > 0 && zoomImageUrl) {
      $zoomContainer.attr('data-zoom-image', zoomImageUrl);
    }

    // console.log('Main image manually updated');
  };
  _proto.setupMainImageSwipe = function setupMainImageSwipe() {
    var _this8 = this;
    // console.log('Setting up main image swipe handlers');

    var $mainImageContainer = $('.productView.split-layout .productView-image .productView-img-container');
    if ($mainImageContainer.length === 0) {
      // console.log('No main image container found for swipe');
      return;
    }

    // console.log('Found main image container:', $mainImageContainer[0]);

    // Set up touch events for mobile and device emulation
    var startX = null;
    var startY = null;
    var isScrolling = null;

    // Remove any existing swipe handlers
    $mainImageContainer.off('.swipe');

    // Touch start
    $mainImageContainer.on('touchstart.swipe', function (e) {
      // console.log('Touch start detected on main image:', e.originalEvent);
      var touch = e.originalEvent.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isScrolling = null;

      // console.log('Touch start coordinates:', { startX, startY });

      // Add visual feedback
      $mainImageContainer.css('opacity', '0.9');
    });

    // Touch move
    $mainImageContainer.on('touchmove.swipe', function (e) {
      if (!startX || !startY) return;
      var touch = e.originalEvent.touches[0];
      var deltaX = touch.clientX - startX;
      var deltaY = touch.clientY - startY;

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
        var translateX = deltaX * 0.1; // Subtle movement feedback
        $mainImageContainer.css('transform', "translateX(" + translateX + "px)");
      }
    });

    // Touch end
    $mainImageContainer.on('touchend.swipe', function (e) {
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
      var touch = e.originalEvent.changedTouches[0];
      var deltaX = touch.clientX - startX;
      var deltaY = touch.clientY - startY;

      // Minimum swipe distance
      var minSwipeDistance = 50;

      // console.log('Touch end - analyzing swipe:', { deltaX, deltaY, minSwipeDistance });

      // Check for horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < 100) {
        if (deltaX > 0) {
          // Swipe right - go to previous image
          // console.log('Swipe right detected - going to previous image');
          _this8.navigateToImage('previous');
        } else {
          // Swipe left - go to next image
          // console.log('Swipe left detected - going to next image');
          _this8.navigateToImage('next');
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
    var mouseDown = false;
    var mouseStartX = null;
    var mouseStartY = null;

    // Only add mouse events if touch is NOT supported (pure desktop)
    if (!('ontouchstart' in window)) {
      // console.log('Touch not supported - adding mouse events for desktop testing');

      $mainImageContainer.on('mousedown.swipe', function (e) {
        // console.log('Mouse down detected on main image (desktop mode)');
        mouseDown = true;
        mouseStartX = e.clientX;
        mouseStartY = e.clientY;
        $mainImageContainer.css('opacity', '0.9');
        e.preventDefault();
      });
      $mainImageContainer.on('mousemove.swipe', function (e) {
        if (!mouseDown) return;
        var deltaX = e.clientX - mouseStartX;
        var deltaY = e.clientY - mouseStartY;

        // Prevent text selection
        e.preventDefault();

        // Visual feedback during drag
        if (Math.abs(deltaX) > 10) {
          $mainImageContainer.css('transform', "translateX(" + deltaX * 0.2 + "px)");
        }
      });
      $mainImageContainer.on('mouseup.swipe', function (e) {
        if (!mouseDown) return;

        // console.log('Mouse up detected on main image (desktop mode)');
        mouseDown = false;

        // Reset visual feedback
        $mainImageContainer.css({
          'opacity': '1',
          'transform': 'none'
        });
        var deltaX = e.clientX - mouseStartX;
        var deltaY = e.clientY - mouseStartY;
        var minSwipeDistance = 50;

        // console.log('Mouse drag - analyzing swipe:', { deltaX, deltaY, minSwipeDistance });

        // Check for horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < 100) {
          if (deltaX > 0) {
            // Drag right - go to previous image
            // console.log('Mouse drag right detected - going to previous image');
            _this8.navigateToImage('previous');
          } else {
            // Drag left - go to next image
            // console.log('Mouse drag left detected - going to next image');
            _this8.navigateToImage('next');
          }
        }
      });

      // Handle mouse leave to reset state
      $mainImageContainer.on('mouseleave.swipe', function () {
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
  };
  _proto.navigateToImage = function navigateToImage(direction) {
    var $thumbnails = $('.productView.split-layout .productView-thumbnails');
    var $allThumbnails = $thumbnails.find('[data-image-gallery-item], [data-image-gallery-video]');
    var $currentActive = $allThumbnails.filter('.is-active');
    if ($allThumbnails.length === 0) return;
    var $nextThumbnail = null;
    if ($currentActive.length === 0) {
      // No active thumbnail, start with first
      $nextThumbnail = $allThumbnails.first();
    } else {
      var currentIndex = $allThumbnails.index($currentActive);
      if (direction === 'next') {
        var nextIndex = (currentIndex + 1) % $allThumbnails.length;
        $nextThumbnail = $allThumbnails.eq(nextIndex);
      } else if (direction === 'previous') {
        var prevIndex = currentIndex === 0 ? $allThumbnails.length - 1 : currentIndex - 1;
        $nextThumbnail = $allThumbnails.eq(prevIndex);
      }
    }
    if ($nextThumbnail && $nextThumbnail.length > 0) {
      // console.log(`Navigating to ${direction} image via swipe`);

      // Trigger click on the thumbnail to change the main image
      var clickEvent = $.Event('click', {
        currentTarget: $nextThumbnail[0],
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      var type = $nextThumbnail.attr('data-type');

      // Try to use image gallery instance first
      var imageGallery = null;
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
  ;
  _proto.testSwipe = function testSwipe(direction) {
    if (direction === void 0) {
      direction = 'next';
    }
    // console.log(`Testing swipe ${direction} from console`);
    this.navigateToImage(direction);
  }

  // Expose this instance globally for testing
  ;
  _proto.init = function init() {
    window.splitLayoutCarousel = this;
    // console.log('Split layout carousel instance exposed as window.splitLayoutCarousel');
    // console.log('Test swipe with: window.splitLayoutCarousel.testSwipe("next") or window.splitLayoutCarousel.testSwipe("previous")');
  };
  return SplitLayoutCarousel;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _custom_its_product__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom/its-product */ "./assets/js/theme/custom/its-product.js");
/* harmony import */ var _custom_dual_panel_scroll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./custom/dual-panel-scroll */ "./assets/js/theme/custom/dual-panel-scroll.js");
/* harmony import */ var _custom_split_layout_carousel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./custom/split-layout-carousel */ "./assets/js/theme/custom/split-layout-carousel.js");
/* harmony import */ var _product_image_gallery__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./product/image-gallery */ "./assets/js/theme/product/image-gallery.js");
/* harmony import */ var _product_image_gallery__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_product_image_gallery__WEBPACK_IMPORTED_MODULE_10__);
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/*
 Import all product specific js
 */











var Product = /*#__PURE__*/function (_PageManager) {
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    return _this;
  }
  _inheritsLoose(Product, _PageManager);
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    this.ITSProduct = new _custom_its_product__WEBPACK_IMPORTED_MODULE_7__["default"](this.context);

    // Initialize dual-panel scroll synchronization for split layout
    this.dualPanelScroll = new _custom_dual_panel_scroll__WEBPACK_IMPORTED_MODULE_8__["default"]();

    // Initialize split layout carousel override
    this.splitLayoutCarousel = new _custom_split_layout_carousel__WEBPACK_IMPORTED_MODULE_9__["default"]();
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $reviewForm: $reviewForm
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();

    /**
     * IntuitSolutions - Custom Product
     */
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/image-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/image-gallery.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(document).ready(function () {
  function initMainImageSlick() {
    if (window.innerWidth > 768) return;
    if (typeof $.fn.slick !== 'function') return;
    if (!window.BCData || !window.BCData.product_images || !window.BCData.product_images.length) return;
    var $mainImageDesktop = $('.main-image-desktop');
    if (!$mainImageDesktop.length) return;
    if ($('.main-image-slick').length) return;
    var images = window.BCData.product_images;
    var $slick = $('<div class="main-image-slick"></div>');
    images.forEach(function (img) {
      var $slide = $('<div></div>');
      var $figure = $('<figure class="productView-image" data-image-gallery-main></figure>');
      var $container = $('<div class="productView-img-container"></div>');
      var $a = $('<a></a>').attr('href', img.url_zoom).attr('data-type', 'image').attr('target', '_blank');
      var $img = $('<img>').attr('src', img.url_zoom).attr('alt', img.alt || '');
      $a.append($img);
      $container.append($a);
      $figure.append($container);
      $slide.append($figure);
      $slick.append($slide);
    });
    $mainImageDesktop.after($slick);
    $slick.slick({
      dots: true,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    });
  }
  var tries = 0;
  var maxTries = 10;
  var interval = setInterval(function () {
    tries++;
    initMainImageSlick();
    if ($('.main-image-slick').length || tries >= maxTries) {
      clearInterval(interval);
    }
  }, 200);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2R1YWwtcGFuZWwtc2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vaXRzLXByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9zcGxpdC1sYXlvdXQtY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvaW1hZ2UtZ2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbIk5hdHVyYWxEdWFsUGFuZWwiLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkZXRhaWxzUGFuZWwiLCJpc0Rlc2t0b3AiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImluaXQiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJlbmFibGVNb2JpbGVMYXlvdXQiLCJib2R5Iiwic3R5bGUiLCJvdmVyZmxvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVSZXNpemUiLCJiaW5kIiwic2V0dXBTdGlja3lCZWhhdmlvciIsInNldHVwUXVhbnRpdHlTZWxlY3RvciIsInBvc2l0aW9uIiwicXVhbnRpdHlDb250YWluZXIiLCJ0b3AiLCJ3YXNEZXNrdG9wIiwiSVRTUHJvZHVjdCIsImNvbnRleHQiLCJTcGxpdExheW91dENhcm91c2VsIiwiaW5pdENhcm91c2VsT3ZlcnJpZGUiLCJfdGhpcyIsInNldHVwUHJlSW5pdGlhbGl6YXRpb24iLCIkIiwicmVhZHkiLCJlbmZvcmNlVmVydGljYWxMYXlvdXQiLCJzZXRUaW1lb3V0Iiwib24iLCJzZXR1cE5hdmlnYXRpb25IYW5kbGVycyIsInNldHVwTWFpbkltYWdlU3dpcGUiLCJfdGhpczIiLCJyZWFkeVN0YXRlIiwicHJlSW5pdGlhbGl6ZUxheW91dCIsImludGVyY2VwdFNsaWNrSW5pdGlhbGl6YXRpb24iLCJvcmlnaW5hbFNsaWNrIiwiZm4iLCJzbGljayIsInNlbGYiLCJvcHRpb25zIiwiaGFzQ2xhc3MiLCJjbG9zZXN0IiwibGVuZ3RoIiwiYXBwbHlJbW1lZGlhdGVMYXlvdXRGaXhlcyIsInNwbGl0TGF5b3V0T3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsImluZmluaXRlIiwiYXJyb3dzIiwiZG90cyIsInZhcmlhYmxlV2lkdGgiLCJhZGFwdGl2ZUhlaWdodCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwidmVydGljYWwiLCJpbm5lcldpZHRoIiwidmVydGljYWxTd2lwaW5nIiwicmVzdWx0IiwiY2FsbCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiX3RoaXMzIiwiJHNwbGl0TGF5b3V0IiwiJHRodW1ibmFpbHMiLCJmaW5kIiwiZXZlbnQiLCJzZXR1cFRodW1ibmFpbENsaWNrSGFuZGxlcnMiLCJkaXNhYmxlVGh1bWJuYWlsSG92ZXIiLCJpc01vYmlsZSIsImNzcyIsImltYWdlU2VsZWN0b3JzIiwic2VsZWN0b3IiLCJlYWNoIiwic2V0UHJvcGVydHkiLCJzZXRBdHRyaWJ1dGUiLCIkc2xpY2tMaXN0IiwiJHNsaWNrVHJhY2siLCJfdGhpczQiLCJyZW1vdmUiLCJpbmRleCIsIiRsYXN0U2xpZGUiLCJzZXR1cE1vYmlsZUhhbmRsZXJzIiwiX3RoaXM1Iiwib2ZmIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJGNvbnRhaW5lciIsImN1cnJlbnRUYXJnZXQiLCJjb250YWluZXJSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpY2tZIiwiY2xpZW50WSIsImNvbnRhaW5lclRvcCIsImNvbnRhaW5lckJvdHRvbSIsImJvdHRvbSIsImFycm93SGVpZ2h0IiwidXBBcnJvd0JvdHRvbSIsImRvd25BcnJvd1RvcCIsIiRjdXJyZW50U3BsaXRMYXlvdXQiLCJjdXJyZW50U2Nyb2xsVG9wIiwic2Nyb2xsVG9wIiwic2Nyb2xsQW1vdW50IiwibmV3U2Nyb2xsVG9wIiwiTWF0aCIsIm1heCIsImFuaW1hdGUiLCJ1cGRhdGVTY3JvbGxBcnJvd1Zpc2liaWxpdHkiLCJtYXhTY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJvdXRlckhlaWdodCIsIm1pbiIsImNsaWVudEhlaWdodCIsImlzU2Nyb2xsYWJsZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJfdGhpczYiLCJjbGlja1giLCJjbGllbnRYIiwibGVmdCIsImNvbnRhaW5lcldpZHRoIiwid2lkdGgiLCJhcnJvd1dpZHRoIiwibGVmdEFycm93Wm9uZSIsInJpZ2h0QXJyb3dab25lIiwiY3VycmVudFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0IiwibmV3U2Nyb2xsTGVmdCIsInVwZGF0ZU1vYmlsZUFycm93VmlzaWJpbGl0eSIsIm1heFNjcm9sbExlZnQiLCJzY3JvbGxXaWR0aCIsIm91dGVyV2lkdGgiLCJjbGllbnRXaWR0aCIsIl90aGlzNyIsInN0b3BQcm9wYWdhdGlvbiIsIiR0YXJnZXQiLCJ0eXBlIiwiYXR0ciIsImltYWdlR2FsbGVyeSIsInByb2R1Y3REZXRhaWxzIiwiJHByb2R1Y3RWaWV3IiwiZGF0YSIsInNlbGVjdE5ld0ltYWdlIiwiY2hhbmdlTWFpbkltYWdlTWFudWFsbHkiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCIkbWFpbkltYWdlIiwiJG1haW5JbWFnZUNvbnRhaW5lciIsIm5ld0ltYWdlVXJsIiwibmV3SW1hZ2VTcmNzZXQiLCJ6b29tSW1hZ2VVcmwiLCJpbWFnZUFsdCIsImltYWdlSW5kZXgiLCJzcmMiLCJzcmNzZXQiLCJhbHQiLCJ0aXRsZSIsIiR6b29tQ29udGFpbmVyIiwiX3RoaXM4Iiwic3RhcnRYIiwic3RhcnRZIiwiaXNTY3JvbGxpbmciLCJ0b3VjaCIsIm9yaWdpbmFsRXZlbnQiLCJ0b3VjaGVzIiwiZGVsdGFYIiwiZGVsdGFZIiwiYWJzIiwidHJhbnNsYXRlWCIsImNoYW5nZWRUb3VjaGVzIiwibWluU3dpcGVEaXN0YW5jZSIsIm5hdmlnYXRlVG9JbWFnZSIsIm1vdXNlRG93biIsIm1vdXNlU3RhcnRYIiwibW91c2VTdGFydFkiLCJkaXJlY3Rpb24iLCIkYWxsVGh1bWJuYWlscyIsIiRjdXJyZW50QWN0aXZlIiwiZmlsdGVyIiwiJG5leHRUaHVtYm5haWwiLCJmaXJzdCIsImN1cnJlbnRJbmRleCIsIm5leHRJbmRleCIsImVxIiwicHJldkluZGV4IiwiY2xpY2tFdmVudCIsIkV2ZW50IiwidGVzdFN3aXBlIiwic3BsaXRMYXlvdXRDYXJvdXNlbCIsIlByb2R1Y3QiLCJfUGFnZU1hbmFnZXIiLCJ1cmwiLCJsb2NhdGlvbiIsImhyZWYiLCIkcmV2aWV3TGluayIsIiRidWxrUHJpY2luZ0xpbmsiLCJyZXZpZXdNb2RhbCIsIm1vZGFsRmFjdG9yeSIsIl9pbmhlcml0c0xvb3NlIiwib25SZWFkeSIsImluZGV4T2YiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwicGF0aG5hbWUiLCJ2YWxpZGF0b3IiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJQcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInNldFByb2R1Y3RWYXJpYW50IiwidmlkZW9HYWxsZXJ5IiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwiJHJldmlld0Zvcm0iLCJjbGFzc2lmeUZvcm0iLCJkdWFsUGFuZWxTY3JvbGwiLCJEdWFsUGFuZWxTY3JvbGwiLCJyZXZpZXciLCJSZXZpZXciLCJyZWdpc3RlclZhbGlkYXRpb24iLCJhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJwcm9kdWN0UmV2aWV3SGFuZGxlciIsIiRmb3JtIiwiXyIsImlucHV0IiwiJGlucHV0IiwibXNnU3BhbklkIiwic2libGluZ3MiLCJ0cmlnZ2VyIiwiUGFnZU1hbmFnZXIiLCJpbml0TWFpbkltYWdlU2xpY2siLCJwcm9kdWN0X2ltYWdlcyIsIiRtYWluSW1hZ2VEZXNrdG9wIiwiaW1hZ2VzIiwiJHNsaWNrIiwiaW1nIiwiJHNsaWRlIiwiJGZpZ3VyZSIsIiRhIiwidXJsX3pvb20iLCIkaW1nIiwiYXBwZW5kIiwiYWZ0ZXIiLCJzcGVlZCIsInRyaWVzIiwibWF4VHJpZXMiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIlZpZGVvR2FsbGVyeSIsIiRlbGVtZW50IiwiJHBsYXllciIsIiR2aWRlb3MiLCJjdXJyZW50VmlkZW8iLCJiaW5kRXZlbnRzIiwic2VsZWN0TmV3VmlkZW8iLCJpZCIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQSxJQVFxQkEsZ0JBQWdCO0VBQ2pDLFNBQUFBLGlCQUFBLEVBQWM7SUFDVixJQUFJLENBQUNDLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7SUFDaEUsSUFBSSxDQUFDQyxZQUFZLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBRTVELElBQUksQ0FBQyxJQUFJLENBQUNGLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQ0csWUFBWSxFQUFFO01BQ3ZDO0lBQ0o7SUFFQSxJQUFJLENBQUNDLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQ0MsT0FBTztJQUNqRSxJQUFJLENBQUNDLElBQUksQ0FBQyxDQUFDO0VBQ2Y7RUFBQyxJQUFBQyxNQUFBLEdBQUFWLGdCQUFBLENBQUFXLFNBQUE7RUFBQUQsTUFBQSxDQUVERCxJQUFJLEdBQUosU0FBQUEsSUFBSUEsQ0FBQSxFQUFHO0lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQ0osU0FBUyxFQUFFO01BQ2pCLElB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LFlBQVk7SUFFakUsSUFBSWUsYUFBYSxFQUFFO01BQ2Y7SUFDSjtJQUVBRCxHQUFHLENBQUMxSCxJQUFJLENBQUN1SCxTQUFTLEVBQUUsSUFBSVgsWUFBWSxDQUFDYyxHQUFHLENBQUMsQ0FBQztFQUM5QyxDQUFDLENBQUM7QUFDTixDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBOYXR1cmFsIER1YWwgUGFuZWwgQmVoYXZpb3JcbiAqIC0gVXNlcyBDU1Mgc3RpY2t5IHBvc2l0aW9uaW5nIGZvciBuYXR1cmFsIGZsb3dcbiAqIC0gUmlnaHQgcGFuZWwgc3RpY2tzIHVudGlsIGl0cyBjb250ZW50IGVuZHNcbiAqIC0gUGFnZSBmbG93cyBuYXR1cmFsbHk6IGhlYWRlciAtPiBkdWFsLXBhbmVsIC0+IHJlbGF0ZWQgcHJvZHVjdHMgLT4gZm9vdGVyXG4gKiAtIE5vIGFydGlmaWNpYWwgXCJ1bmxvY2tpbmdcIiBvciBjb21wbGV4IHNjcm9sbCBtYW5hZ2VtZW50XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF0dXJhbER1YWxQYW5lbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmR1YWwtcGFuZWwtY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMuZGV0YWlsc1BhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbHMtcGFuZWwnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5jb250YWluZXIgfHwgIXRoaXMuZGV0YWlsc1BhbmVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzRGVza3RvcCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAxMDI1cHgpJykubWF0Y2hlcztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGVza3RvcCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGVNb2JpbGVMYXlvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuYWJsZSBuYXR1cmFsIHNjcm9sbGluZyAtIG5vIGFydGlmaWNpYWwgc2Nyb2xsIGJsb2NraW5nXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgICAgIFxuICAgICAgICAvLyBIYW5kbGUgd2luZG93IHJlc2l6ZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIFxuICAgICAgICAvLyBFbnN1cmUgcHJvcGVyIHN0aWNreSBiZWhhdmlvclxuICAgICAgICB0aGlzLnNldHVwU3RpY2t5QmVoYXZpb3IoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNldHVwIHF1YW50aXR5IHNlbGVjdG9yIGZ1bmN0aW9uc1xuICAgICAgICB0aGlzLnNldHVwUXVhbnRpdHlTZWxlY3RvcigpO1xuICAgIH1cblxuICAgIHNldHVwU3RpY2t5QmVoYXZpb3IoKSB7XG4gICAgICAgIC8vIEVuc3VyZSB0aGUgc3RpY2t5IHBvc2l0aW9uaW5nIHdvcmtzIGNvcnJlY3RseVxuICAgICAgICAvLyBieSBtYWtpbmcgc3VyZSB0aGUgcGFyZW50IGhhcyBwcm9wZXIgaGVpZ2h0XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0dXBRdWFudGl0eVNlbGVjdG9yKCkge1xuICAgICAgICAvLyBUaGUgdGhlbWUncyBuYXRpdmUgcXVhbnRpdHkgc2VsZWN0b3IgdXNlcyBkYXRhLXF1YW50aXR5LWNoYW5nZVxuICAgICAgICAvLyBhbmQgaXMgaGFuZGxlZCBieSB0aGUgcHJvZHVjdC1kZXRhaWxzLmpzIGxpc3RlblF1YW50aXR5Q2hhbmdlKCkgbWV0aG9kXG4gICAgICAgIC8vIFdlIGp1c3QgbmVlZCB0byBlbnN1cmUgaXQgd29ya3MgcHJvcGVybHkgaW4gb3VyIHNwbGl0IGxheW91dFxuICAgICAgICBcbiAgICAgICAgY29uc3QgcXVhbnRpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWFudGl0eS1jaGFuZ2VdJyk7XG4gICAgICAgIGlmIChxdWFudGl0eUNvbnRhaW5lcikge1xuICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSBuYXRpdmUgdGhlbWUgZnVuY3Rpb25hbGl0eSBpcyBwcm9wZXJseSBpbml0aWFsaXplZFxuICAgICAgICAgICAgLy8gVGhlIHRoZW1lIGhhbmRsZXMgdGhpcyBhdXRvbWF0aWNhbGx5IHRocm91Z2ggcHJvZHVjdC1kZXRhaWxzLmpzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVNb2JpbGVMYXlvdXQoKSB7XG4gICAgICAgIC8vIEZvciBtb2JpbGUgLSBlbnN1cmUgbm9ybWFsIGRvY3VtZW50IGZsb3dcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5kZXRhaWxzUGFuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsc1BhbmVsLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsc1BhbmVsLnN0eWxlLnRvcCA9ICdhdXRvJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICAgICAgY29uc3Qgd2FzRGVza3RvcCA9IHRoaXMuaXNEZXNrdG9wO1xuICAgICAgICB0aGlzLmlzRGVza3RvcCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAxMDI1cHgpJykubWF0Y2hlcztcbiAgICAgICAgXG4gICAgICAgIGlmICh3YXNEZXNrdG9wICE9PSB0aGlzLmlzRGVza3RvcCkge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIEluaXRpYWxpemUgd2hlbiBET00gaXMgcmVhZHlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbmV3IE5hdHVyYWxEdWFsUGFuZWwoKTtcbn0pO1xuIiwiLyoqXG4gKiBJbnR1aXRTb2x1dGlvbnMgLSBDdXN0b20gSlMgdGhhdCBmaXJlcyBvbiB0aGUgUERQXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVRTUHJvZHVjdCB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgIH1cbn1cbiIsIi8qKlxuICogU3BsaXQgTGF5b3V0IENhcm91c2VsIE92ZXJyaWRlXG4gKiBGb3JjZXMgdmVydGljYWwgdGh1bWJuYWlsIGxheW91dCBmb3Igc3BsaXQgbGF5b3V0IHByb2R1Y3QgcGFnZXNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGxpdExheW91dENhcm91c2VsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0Q2Fyb3VzZWxPdmVycmlkZSgpO1xuICAgICAgICB0aGlzLmluaXQoKTsgLy8gSW5pdGlhbGl6ZSB0ZXN0IGhlbHBlcnNcbiAgICB9XG5cbiAgICBpbml0Q2Fyb3VzZWxPdmVycmlkZSgpIHtcbiAgICAgICAgLy8gUHJlLURPTSByZWFkeSBzZXR1cCBmb3Igc3BsaXQgbGF5b3V0cyB0byBwcmV2ZW50IEZPVUNcbiAgICAgICAgdGhpcy5zZXR1cFByZUluaXRpYWxpemF0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBXYWl0IGZvciBET00gdG8gYmUgcmVhZHlcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0RPTSByZWFkeSwgaW5pdGlhbGl6aW5nIHNwbGl0IGxheW91dCBjYXJvdXNlbCcpO1xuICAgICAgICAgICAgdGhpcy5lbmZvcmNlVmVydGljYWxMYXlvdXQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUmUtZW5mb3JjZSBhZnRlciBhbnkgc2xpY2sgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZS1lbmZvcmNpbmcgbGF5b3V0IGFmdGVyIDUwMG1zIGRlbGF5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmZvcmNlVmVydGljYWxMYXlvdXQoKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFsc28gZW5mb3JjZSBhZnRlciB3aW5kb3cgcmVzaXplXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmZvcmNlVmVydGljYWxMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNldCB1cCBhIGZhbGxiYWNrIHRvIGVuc3VyZSBoYW5kbGVycyBhcmUgYWx3YXlzIHNldCB1cFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NldHRpbmcgdXAgYWRkaXRpb25hbCBuYXZpZ2F0aW9uIGhhbmRsZXJzJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cE5hdmlnYXRpb25IYW5kbGVycygkKCcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0JykpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNldCB1cCBzd2lwZSBmdW5jdGlvbmFsaXR5IGFmdGVyIGEgZGVsYXkgdG8gZW5zdXJlIGV2ZXJ5dGhpbmcgaXMgbG9hZGVkXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2V0dGluZyB1cCBzd2lwZSBmdW5jdGlvbmFsaXR5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cE1haW5JbWFnZVN3aXBlKCk7XG4gICAgICAgICAgICB9LCAxMjAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHNldHVwUHJlSW5pdGlhbGl6YXRpb24oKSB7XG4gICAgICAgIC8vIEVhcmx5IGludGVydmVudGlvbiBiZWZvcmUgRE9NIHJlYWR5IGZvciBzcGxpdCBsYXlvdXRzXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVJbml0aWFsaXplTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcmNlcHRTbGlja0luaXRpYWxpemF0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJlSW5pdGlhbGl6ZUxheW91dCgpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcmNlcHRTbGlja0luaXRpYWxpemF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaW50ZXJjZXB0U2xpY2tJbml0aWFsaXphdGlvbigpIHtcbiAgICAgICAgLy8gT3ZlcnJpZGUgU2xpY2sgaW5pdGlhbGl6YXRpb24gZm9yIHNwbGl0IGxheW91dHMgdG8gcHJldmVudCBzaXplIGp1bXBpbmdcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxTbGljayA9ICQuZm4uc2xpY2s7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgJC5mbi5zbGljayA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoaXMgaXMgYSBzcGxpdCBsYXlvdXQgdGh1bWJuYWlsIGNhcm91c2VsXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNDbGFzcygncHJvZHVjdFZpZXctdGh1bWJuYWlscycpICYmIHRoaXMuY2xvc2VzdCgnLnByb2R1Y3RWaWV3LnNwbGl0LWxheW91dCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnSW50ZXJjZXB0aW5nIFNsaWNrIGluaXRpYWxpemF0aW9uIGZvciBzcGxpdCBsYXlvdXQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBvdXIgZml4ZXMgQkVGT1JFIFNsaWNrIGluaXRpYWxpemVzXG4gICAgICAgICAgICAgICAgc2VsZi5hcHBseUltbWVkaWF0ZUxheW91dEZpeGVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIE92ZXJyaWRlIFNsaWNrIG9wdGlvbnMgZm9yIHNwbGl0IGxheW91dFxuICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0TGF5b3V0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWw6IHdpbmRvdy5pbm5lcldpZHRoID4gNzY4LFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IHdpbmRvdy5pbm5lcldpZHRoID4gNzY4XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIFNsaWNrIHdpdGggb3VyIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbFNsaWNrLmNhbGwodGhpcywgc3BsaXRMYXlvdXRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBvdXIgZml4ZXMgQUZURVIgU2xpY2sgaW5pdGlhbGl6ZXNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmZvcmNlVmVydGljYWxMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBGb3Igbm9uLXNwbGl0IGxheW91dCBjYXJvdXNlbHMsIHVzZSBvcmlnaW5hbCBTbGlja1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsU2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8vIENvcHkgb3ZlciBhbnkgc3RhdGljIHByb3BlcnRpZXNcbiAgICAgICAgT2JqZWN0LmtleXMob3JpZ2luYWxTbGljaykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgJC5mbi5zbGlja1trZXldID0gb3JpZ2luYWxTbGlja1trZXldO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJlSW5pdGlhbGl6ZUxheW91dCgpIHtcbiAgICAgICAgLy8gQXBwbHkgaW5pdGlhbCBzdHlsZXMgYmVmb3JlIFNsaWNrIGhhcyBhIGNoYW5jZSB0byBpbml0aWFsaXplXG4gICAgICAgIGNvbnN0ICRzcGxpdExheW91dCA9ICQoJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQnKTtcbiAgICAgICAgaWYgKCRzcGxpdExheW91dC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0ICR0aHVtYm5haWxzID0gJHNwbGl0TGF5b3V0LmZpbmQoJy5wcm9kdWN0Vmlldy10aHVtYm5haWxzJyk7XG4gICAgICAgIGlmICgkdGh1bWJuYWlscy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdQcmUtaW5pdGlhbGl6aW5nIHNwbGl0IGxheW91dCBiZWZvcmUgU2xpY2sgaW5pdGlhbGl6YXRpb24nKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNldCB1cCBldmVudCBsaXN0ZW5lcnMgdG8gaW50ZXJjZXB0IFNsaWNrIGluaXRpYWxpemF0aW9uXG4gICAgICAgICR0aHVtYm5haWxzLm9uKCdiZWZvcmVDaGFuZ2Uuc3BsaXRMYXlvdXQnLCAoZXZlbnQsIHNsaWNrKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2xpY2sgYmVmb3JlQ2hhbmdlIGV2ZW50IGludGVyY2VwdGVkJyk7XG4gICAgICAgICAgICB0aGlzLmVuZm9yY2VWZXJ0aWNhbExheW91dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFwcGx5IGltbWVkaWF0ZSBsYXlvdXQgZml4ZXNcbiAgICAgICAgdGhpcy5hcHBseUltbWVkaWF0ZUxheW91dEZpeGVzKCR0aHVtYm5haWxzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNldCB1cCB0aHVtYm5haWwgY2xpY2sgaGFuZGxlcnMgZWFybHkgdG8gb3ZlcnJpZGUgZGVmYXVsdCBiZWhhdmlvclxuICAgICAgICB0aGlzLnNldHVwVGh1bWJuYWlsQ2xpY2tIYW5kbGVycygkKCcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0JykpO1xuICAgICAgICBcbiAgICAgICAgLy8gRGlzYWJsZSBob3ZlciBiZWhhdmlvciBlYXJseSB0byBwcmV2ZW50IHVud2FudGVkIGltYWdlIGNoYW5nZXNcbiAgICAgICAgdGhpcy5kaXNhYmxlVGh1bWJuYWlsSG92ZXIoJCgnLnByb2R1Y3RWaWV3LnNwbGl0LWxheW91dCcpKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNldCB1cCBtYWluIGltYWdlIHN3aXBlIGZvciBtb2JpbGVcbiAgICAgICAgdGhpcy5zZXR1cE1haW5JbWFnZVN3aXBlKCk7XG4gICAgfVxuICAgIFxuICAgIGFwcGx5SW1tZWRpYXRlTGF5b3V0Rml4ZXMoJHRodW1ibmFpbHMpIHtcbiAgICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3Njg7XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQXBwbHlpbmcgaW1tZWRpYXRlIGxheW91dCBmaXhlcyBmb3Igc3BsaXQgbGF5b3V0IC0gQUdHUkVTU0lWRSBNT0RFJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBcHBseSBwcmUtaW5pdGlhbGl6YXRpb24gc3R5bGVzIHRvIHByZXZlbnQgRk9VQ1xuICAgICAgICAkdGh1bWJuYWlscy5jc3Moe1xuICAgICAgICAgICAgJ29wYWNpdHknOiAnMScsXG4gICAgICAgICAgICAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgICd3aWR0aCc6IGlzTW9iaWxlID8gJzEwMCUnIDogJzgwcHgnLFxuICAgICAgICAgICAgJ21pbi13aWR0aCc6IGlzTW9iaWxlID8gJzEwMCUnIDogJzgwcHgnLFxuICAgICAgICAgICAgJ21heC13aWR0aCc6IGlzTW9iaWxlID8gJ25vbmUnIDogJzgwcHgnXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQUdHUkVTU0lWRUxZIHByZS1zZXQgQUxMIHBvc3NpYmxlIHRodW1ibmFpbCBpbWFnZSBzZWxlY3RvcnNcbiAgICAgICAgY29uc3QgaW1hZ2VTZWxlY3RvcnMgPSBbXG4gICAgICAgICAgICAnaW1nJyxcbiAgICAgICAgICAgICdsaSBpbWcnLCBcbiAgICAgICAgICAgICcuc2xpY2stc2xpZGUgaW1nJyxcbiAgICAgICAgICAgICcucHJvZHVjdFZpZXctdGh1bWJuYWlsIGltZycsXG4gICAgICAgICAgICAnLnByb2R1Y3RWaWV3LXRodW1ibmFpbC1saW5rIGltZydcbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIGltYWdlU2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuICAgICAgICAgICAgJHRodW1ibmFpbHMuZmluZChzZWxlY3RvcikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBGb3JjZSBpbW1lZGlhdGUgc2l6aW5nIHdpdGggaGlnaCBwcmlvcml0eVxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWluLXdpZHRoJywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWluLWhlaWdodCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ21heC13aWR0aCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ21heC1oZWlnaHQnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdvYmplY3QtZml0JywgJ2NvdmVyJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3RyYW5zaXRpb24nLCAnbm9uZScsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBTZXQgYXR0cmlidXRlcyB0byBwcmV2ZW50IGFueSBhdXRvbWF0aWMgcmVzaXppbmdcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnODAnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzgwJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBQcmUtY29uZmlndXJlIFNsaWNrIGNvbnRhaW5lcnMgaWYgdGhleSBleGlzdFxuICAgICAgICBjb25zdCAkc2xpY2tMaXN0ID0gJHRodW1ibmFpbHMuZmluZCgnLnNsaWNrLWxpc3QnKTtcbiAgICAgICAgaWYgKCRzbGlja0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJHNsaWNrTGlzdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgaXNNb2JpbGUgPyAnMTAwJScgOiAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCBpc01vYmlsZSA/ICc4MHB4JyA6ICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ292ZXJmbG93LXgnLCBpc01vYmlsZSA/ICdhdXRvJyA6ICdoaWRkZW4nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnb3ZlcmZsb3cteScsIGlzTW9iaWxlID8gJ2hpZGRlbicgOiAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCAkc2xpY2tUcmFjayA9ICR0aHVtYm5haWxzLmZpbmQoJy5zbGljay10cmFjaycpO1xuICAgICAgICBpZiAoJHNsaWNrVHJhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJHNsaWNrVHJhY2suZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2ZsZXgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnZmxleC1kaXJlY3Rpb24nLCBpc01vYmlsZSA/ICdyb3cnIDogJ2NvbHVtbicsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsIGlzTW9iaWxlID8gJ2F1dG8nIDogJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgaXNNb2JpbGUgPyAnODBweCcgOiAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd0cmFuc2Zvcm0nLCAnbm9uZScsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdsZWZ0JywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgndG9wJywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnZ2FwJywgaXNNb2JpbGUgPyAnMTJweCcgOiAnOHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBcHBsaWVkIGltbWVkaWF0ZSBsYXlvdXQgZml4ZXMgZm9yIHNwbGl0IGxheW91dCAtIENPTVBMRVRFJyk7XG4gICAgfVxuXG4gICAgZW5mb3JjZVZlcnRpY2FsTGF5b3V0KCkge1xuICAgICAgICBjb25zdCAkc3BsaXRMYXlvdXQgPSAkKCcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0Jyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoJHNwbGl0TGF5b3V0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgJHRodW1ibmFpbHMgPSAkc3BsaXRMYXlvdXQuZmluZCgnLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICgkdGh1bWJuYWlscy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICAvLyBGT1JDRSBISURFIEFMTCBTTElDSyBBUlJPV1NcbiAgICAgICAgJHRodW1ibmFpbHMuZmluZCgnLnNsaWNrLXByZXYsIC5zbGljay1uZXh0LCAuc2xpY2stYXJyb3csIGJ1dHRvbi5zbGljay1wcmV2LCBidXR0b24uc2xpY2stbmV4dCwgYnV0dG9uLnNsaWNrLWFycm93JykucmVtb3ZlKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBJTU1FRElBVEUgRklYOiBGb3JjZSB0aHVtYm5haWwgaW1hZ2Ugc2l6ZXMgYmVmb3JlIGFueSBvdGhlciBwcm9jZXNzaW5nXG4gICAgICAgICR0aHVtYm5haWxzLmZpbmQoJ2ltZycpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdtaW4td2lkdGgnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ21pbi1oZWlnaHQnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ21heC13aWR0aCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWF4LWhlaWdodCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlzTW9iaWxlID0gd2luZG93LmlubmVyV2lkdGggPD0gNzY4O1xuICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEVuZm9yY2luZyBsYXlvdXQgZm9yIHNwbGl0IGxheW91dCAtIE1vYmlsZTogJHtpc01vYmlsZX1gKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFsbCBwcm9kdWN0cyBub3cgdXNlIFNsaWNrIG1vZGUgLSBhcHBseSBsYXlvdXQgYmFzZWQgb24gc2NyZWVuIHNpemVcbiAgICAgICAgY29uc3QgJHNsaWNrVHJhY2sgPSAkdGh1bWJuYWlscy5maW5kKCcuc2xpY2stdHJhY2snKTtcbiAgICAgICAgXG4gICAgICAgIGlmICgkc2xpY2tUcmFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoaXNNb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAvLyBNb2JpbGU6IGhvcml6b250YWwgbGF5b3V0XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnZmxleCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgnZmxleC1kaXJlY3Rpb24nLCAncm93JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgnd2lkdGgnLCAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgnZ2FwJywgJzEycHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ3RyYW5zZm9ybScsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdsZWZ0JywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ3RvcCcsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdtYXJnaW4nLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZycsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEZvcmNlIGluZGl2aWR1YWwgc2xpZGVzIHRvIGJlIGhvcml6b250YWxcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFjay5maW5kKCcuc2xpY2stc2xpZGUnKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdtYXJnaW4tcmlnaHQnLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnZmxvYXQnLCAnbm9uZScsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgndHJhbnNmb3JtJywgJ25vbmUnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ2xlZnQnLCAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgndG9wJywgJ2F1dG8nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBEZXNrdG9wOiB2ZXJ0aWNhbCBsYXlvdXRcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdmbGV4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdmbGV4LWRpcmVjdGlvbicsICdjb2x1bW4nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ2hlaWdodCcsICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdnYXAnLCAnOHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCd0cmFuc2Zvcm0nLCAnbm9uZScsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgnbGVmdCcsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCd0b3AnLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgnbWFyZ2luJywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ3BhZGRpbmcnLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBGb3JjZSBpbmRpdmlkdWFsIHNsaWRlcyB0byBiZSB2ZXJ0aWNhbFxuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrLmZpbmQoJy5zbGljay1zbGlkZScpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdibG9jaycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnd2lkdGgnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgJ2F1dG8nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ21hcmdpbi1ib3R0b20nLCAnOHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdtYXJnaW4tcmlnaHQnLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnZmxvYXQnLCAnbm9uZScsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgndHJhbnNmb3JtJywgJ25vbmUnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ2xlZnQnLCAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgndG9wJywgJ2F1dG8nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBtYXJnaW4gZnJvbSBsYXN0IHNsaWRlXG4gICAgICAgICAgICAgICAgY29uc3QgJGxhc3RTbGlkZSA9ICRzbGlja1RyYWNrLmZpbmQoJy5zbGljay1zbGlkZTpsYXN0LWNoaWxkJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRsYXN0U2xpZGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkbGFzdFNsaWRlWzBdLnN0eWxlLnNldFByb3BlcnR5KCdtYXJnaW4tYm90dG9tJywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gQWxzbyBmb3JjZSB0aGUgc2xpY2stbGlzdCBjb250YWluZXJcbiAgICAgICAgY29uc3QgJHNsaWNrTGlzdCA9ICR0aHVtYm5haWxzLmZpbmQoJy5zbGljay1saXN0Jyk7XG4gICAgICAgIGlmICgkc2xpY2tMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgICAgICAgICAgIC8vIE1vYmlsZTogZnVsbCB3aWR0aCwgaG9yaXpvbnRhbCBzY3JvbGxcbiAgICAgICAgICAgICAgICAkc2xpY2tMaXN0WzBdLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsICcxMDAlJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja0xpc3RbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ2hlaWdodCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja0xpc3RbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ292ZXJmbG93LXgnLCAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tMaXN0WzBdLnN0eWxlLnNldFByb3BlcnR5KCdvdmVyZmxvdy15JywgJ2hpZGRlbicsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRGVza3RvcDogZml4ZWQgd2lkdGgsIHZlcnRpY2FsIHNjcm9sbFxuICAgICAgICAgICAgICAgICRzbGlja0xpc3RbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdFswXS5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgJ2F1dG8nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdFswXS5zdHlsZS5zZXRQcm9wZXJ0eSgnb3ZlcmZsb3cteCcsICdoaWRkZW4nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdFswXS5zdHlsZS5zZXRQcm9wZXJ0eSgnb3ZlcmZsb3cteScsICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBMaXN0ZW4gZm9yIHNsaWNrIGV2ZW50cyAoYWxsIHByb2R1Y3RzIHVzZSBTbGljayBub3cpXG4gICAgICAgIC8vIElmIHNsaWNrIGlzbid0IGluaXRpYWxpemVkIHlldCwgbGlzdGVuIGZvciBpdFxuICAgICAgICAkdGh1bWJuYWlscy5vbignaW5pdCcsIChldmVudCwgc2xpY2spID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTbGljayBjYXJvdXNlbCBpbml0aWFsaXplZCwgZW5mb3JjaW5nIGxheW91dCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmZvcmNlVmVydGljYWxMYXlvdXQoKTtcbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBbHNvIGxpc3RlbiBmb3IgcmVJbml0XG4gICAgICAgICR0aHVtYm5haWxzLm9uKCdyZUluaXQnLCAoZXZlbnQsIHNsaWNrKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2xpY2sgY2Fyb3VzZWwgcmVpbml0aWFsaXplZCwgZW5mb3JjaW5nIGxheW91dCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmZvcmNlVmVydGljYWxMYXlvdXQoKTtcbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBMaXN0ZW4gZm9yIGJyZWFrcG9pbnQgY2hhbmdlc1xuICAgICAgICAkdGh1bWJuYWlscy5vbignYnJlYWtwb2ludCcsIChldmVudCwgc2xpY2spID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTbGljayBjYXJvdXNlbCBicmVha3BvaW50IGNoYW5nZWQsIGVuZm9yY2luZyBsYXlvdXQnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5mb3JjZVZlcnRpY2FsTGF5b3V0KCk7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIGNsaWNrIGhhbmRsZXJzIGZvciBjdXN0b20gbmF2aWdhdGlvbiBhcnJvd3NcbiAgICAgICAgdGhpcy5zZXR1cE5hdmlnYXRpb25IYW5kbGVycygkc3BsaXRMYXlvdXQpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIG1vYmlsZS1zcGVjaWZpYyBoYW5kbGVyc1xuICAgICAgICB0aGlzLnNldHVwTW9iaWxlSGFuZGxlcnMoJHNwbGl0TGF5b3V0KTtcbiAgICAgICAgXG4gICAgICAgIC8vIE92ZXJyaWRlIHRodW1ibmFpbCBjbGljayBiZWhhdmlvciBmb3Igc3BsaXQgbGF5b3V0XG4gICAgICAgIHRoaXMuc2V0dXBUaHVtYm5haWxDbGlja0hhbmRsZXJzKCRzcGxpdExheW91dCk7XG4gICAgICAgIFxuICAgICAgICAvLyBEaXNhYmxlIGhvdmVyIGJlaGF2aW9yIGZvciBzcGxpdCBsYXlvdXQgdGh1bWJuYWlsc1xuICAgICAgICB0aGlzLmRpc2FibGVUaHVtYm5haWxIb3Zlcigkc3BsaXRMYXlvdXQpO1xuICAgICAgICBcbiAgICAgICAgLy8gU2V0IHVwIG1haW4gaW1hZ2Ugc3dpcGUgZm9yIG1vYmlsZVxuICAgICAgICB0aGlzLnNldHVwTWFpbkltYWdlU3dpcGUoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSBoYW5kbGVycyBvbiB3aW5kb3cgcmVzaXplXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cE1vYmlsZUhhbmRsZXJzKCRzcGxpdExheW91dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cE1haW5JbWFnZVN3aXBlKCk7IC8vIFJlLXNldHVwIHN3aXBlIG9uIHJlc2l6ZVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHNldHVwTmF2aWdhdGlvbkhhbmRsZXJzKCRzcGxpdExheW91dCkge1xuICAgICAgICBjb25zdCAkdGh1bWJuYWlscyA9ICRzcGxpdExheW91dC5maW5kKCcucHJvZHVjdFZpZXctdGh1bWJuYWlscycpO1xuICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1NldHRpbmcgdXAgbmF2aWdhdGlvbiBoYW5kbGVycyBmb3Igc3BsaXQgbGF5b3V0IC0gcHNldWRvLWVsZW1lbnQgY2xpY2sgZGV0ZWN0aW9uJyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdGb3VuZCBzcGxpdCBsYXlvdXQgY29udGFpbmVyczonLCAkc3BsaXRMYXlvdXQubGVuZ3RoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0ZvdW5kIHRodW1ibmFpbCBjb250YWluZXJzOicsICR0aHVtYm5haWxzLmxlbmd0aCk7XG4gICAgICAgIFxuICAgICAgICAvLyBVc2UgZG9jdW1lbnQtbGV2ZWwgZGVsZWdhdGlvbiB0byBjYXB0dXJlIGNsaWNrcyBvbiB0aGUgdGh1bWJuYWlsIGNvbnRhaW5lclxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrLnNwbGl0LWxheW91dC1wc2V1ZG8nKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEhhbmRsZSBjbGlja3Mgb24gdGhlIHRodW1ibmFpbHMgY29udGFpbmVyIHRvIGRldGVjdCBwc2V1ZG8tZWxlbWVudCBhcmVhc1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2suc3BsaXQtbGF5b3V0LXBzZXVkbycsICcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0IC5wcm9kdWN0Vmlldy10aHVtYm5haWxzJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgJGNvbnRhaW5lciA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSAkY29udGFpbmVyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgY2xpY2tZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyVG9wID0gY29udGFpbmVyUmVjdC50b3A7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJCb3R0b20gPSBjb250YWluZXJSZWN0LmJvdHRvbTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRGVmaW5lIGFycm93IGFyZWFzIC0gdG9wIDQwcHggYW5kIGJvdHRvbSA0MHB4IG9mIGNvbnRhaW5lclxuICAgICAgICAgICAgY29uc3QgYXJyb3dIZWlnaHQgPSA0MDtcbiAgICAgICAgICAgIGNvbnN0IHVwQXJyb3dCb3R0b20gPSBjb250YWluZXJUb3AgKyBhcnJvd0hlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGRvd25BcnJvd1RvcCA9IGNvbnRhaW5lckJvdHRvbSAtIGFycm93SGVpZ2h0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQ2xpY2sgZGV0ZWN0ZWQgb24gdGh1bWJuYWlscyBjb250YWluZXI6Jywge1xuICAgICAgICAgICAgLy8gICAgIGNsaWNrWSxcbiAgICAgICAgICAgIC8vICAgICBjb250YWluZXJUb3AsXG4gICAgICAgICAgICAvLyAgICAgY29udGFpbmVyQm90dG9tLFxuICAgICAgICAgICAgLy8gICAgIHVwQXJyb3dCb3R0b20sXG4gICAgICAgICAgICAvLyAgICAgZG93bkFycm93VG9wXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgJGN1cnJlbnRTcGxpdExheW91dCA9ICRjb250YWluZXIuY2xvc2VzdCgnLnByb2R1Y3RWaWV3LnNwbGl0LWxheW91dCcpO1xuICAgICAgICAgICAgY29uc3QgJHNsaWNrTGlzdCA9ICRjb250YWluZXIuZmluZCgnLnNsaWNrLWxpc3QnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCRzbGlja0xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ05vIHNsaWNrLWxpc3QgZm91bmQgZm9yIHNjcm9sbGluZycpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY2xpY2sgaXMgaW4gdGhlIHVwIGFycm93IGFyZWEgKDo6YmVmb3JlKVxuICAgICAgICAgICAgaWYgKGNsaWNrWSA+PSBjb250YWluZXJUb3AgJiYgY2xpY2tZIDw9IHVwQXJyb3dCb3R0b20pIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnVXAgYXJyb3cgYXJlYSBjbGlja2VkICg6OmJlZm9yZSBwc2V1ZG8tZWxlbWVudCBhcmVhKScpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxUb3AgPSAkc2xpY2tMaXN0LnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbEFtb3VudCA9IDg4OyAvLyB0aHVtYm5haWwgaGVpZ2h0ICg4MHB4KSArIGdhcCAoOHB4KVxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Njcm9sbFRvcCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTY3JvbGxUb3AgLSBzY3JvbGxBbW91bnQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBTY3JvbGxpbmcgdXAgZnJvbSAke2N1cnJlbnRTY3JvbGxUb3B9IHRvICR7bmV3U2Nyb2xsVG9wfWApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICRzbGlja0xpc3QuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogbmV3U2Nyb2xsVG9wXG4gICAgICAgICAgICAgICAgfSwgMzAwLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsQXJyb3dWaXNpYmlsaXR5KCRjdXJyZW50U3BsaXRMYXlvdXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY2xpY2sgaXMgaW4gdGhlIGRvd24gYXJyb3cgYXJlYSAoOjphZnRlcilcbiAgICAgICAgICAgIGVsc2UgaWYgKGNsaWNrWSA+PSBkb3duQXJyb3dUb3AgJiYgY2xpY2tZIDw9IGNvbnRhaW5lckJvdHRvbSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdEb3duIGFycm93IGFyZWEgY2xpY2tlZCAoOjphZnRlciBwc2V1ZG8tZWxlbWVudCBhcmVhKScpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxUb3AgPSAkc2xpY2tMaXN0LnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbEFtb3VudCA9IDg4OyAvLyB0aHVtYm5haWwgaGVpZ2h0ICg4MHB4KSArIGdhcCAoOHB4KVxuICAgICAgICAgICAgICAgIGNvbnN0IG1heFNjcm9sbFRvcCA9ICRzbGlja0xpc3RbMF0uc2Nyb2xsSGVpZ2h0IC0gJHNsaWNrTGlzdC5vdXRlckhlaWdodCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Njcm9sbFRvcCA9IE1hdGgubWluKG1heFNjcm9sbFRvcCwgY3VycmVudFNjcm9sbFRvcCArIHNjcm9sbEFtb3VudCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFNjcm9sbGluZyBkb3duIGZyb20gJHtjdXJyZW50U2Nyb2xsVG9wfSB0byAke25ld1Njcm9sbFRvcH0sIG1heDogJHttYXhTY3JvbGxUb3B9YCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBuZXdTY3JvbGxUb3BcbiAgICAgICAgICAgICAgICB9LCAzMDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxBcnJvd1Zpc2liaWxpdHkoJGN1cnJlbnRTcGxpdExheW91dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdDbGljayBpbiBtaWRkbGUgYXJlYSAtIG5vIHNjcm9sbCBhY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgYXJyb3cgdmlzaWJpbGl0eSB3aGVuIFNsaWNrIGlzIGluaXRpYWxpemVkXG4gICAgICAgICR0aHVtYm5haWxzLm9uKCdpbml0JywgKGV2ZW50LCBzbGljaykgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NsaWNrIGluaXRpYWxpemVkLCBzZXR0aW5nIHVwIHNjcm9sbCBhcnJvdyB2aXNpYmlsaXR5Jyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbEFycm93VmlzaWJpbGl0eSgkc3BsaXRMYXlvdXQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEFsc28gbGlzdGVuIGZvciBzY3JvbGwgZXZlbnRzIG9uIHRoZSBzbGljay1saXN0XG4gICAgICAgICAgICAgICAgY29uc3QgJHNsaWNrTGlzdCA9ICRzcGxpdExheW91dC5maW5kKCcuc2xpY2stbGlzdCcpO1xuICAgICAgICAgICAgICAgIGlmICgkc2xpY2tMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWNrTGlzdC5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxBcnJvd1Zpc2liaWxpdHkoJHNwbGl0TGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNjcm9sbEFycm93VmlzaWJpbGl0eSgkc3BsaXRMYXlvdXQpIHtcbiAgICAgICAgY29uc3QgJHRodW1ibmFpbHMgPSAkc3BsaXRMYXlvdXQuZmluZCgnLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnKTtcbiAgICAgICAgY29uc3QgJHNsaWNrTGlzdCA9ICRzcGxpdExheW91dC5maW5kKCcuc2xpY2stbGlzdCcpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCRzbGlja0xpc3QubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSAkc2xpY2tMaXN0LnNjcm9sbFRvcCgpO1xuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSAkc2xpY2tMaXN0WzBdLnNjcm9sbEhlaWdodDtcbiAgICAgICAgY29uc3QgY2xpZW50SGVpZ2h0ID0gJHNsaWNrTGlzdC5vdXRlckhlaWdodCgpO1xuICAgICAgICBjb25zdCBtYXhTY3JvbGxUb3AgPSBzY3JvbGxIZWlnaHQgLSBjbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGlzU2Nyb2xsYWJsZSA9IHNjcm9sbEhlaWdodCA+IGNsaWVudEhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdVcGRhdGluZyBzY3JvbGwgYXJyb3cgdmlzaWJpbGl0eSBmb3IgcHNldWRvLWVsZW1lbnRzOicsIHtcbiAgICAgICAgLy8gICAgIHNjcm9sbFRvcCxcbiAgICAgICAgLy8gICAgIHNjcm9sbEhlaWdodCxcbiAgICAgICAgLy8gICAgIGNsaWVudEhlaWdodCxcbiAgICAgICAgLy8gICAgIG1heFNjcm9sbFRvcCxcbiAgICAgICAgLy8gICAgIGlzU2Nyb2xsYWJsZVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmICghaXNTY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAvLyBOb3Qgc2Nyb2xsYWJsZSAtIGhpZGUgYm90aCBwc2V1ZG8tZWxlbWVudCBhcnJvd3NcbiAgICAgICAgICAgICR0aHVtYm5haWxzLnJlbW92ZUNsYXNzKCdjYW4tc2Nyb2xsLXVwIGNhbi1zY3JvbGwtZG93bicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTaG93L2hpZGUgdXAgYXJyb3cgKDo6YmVmb3JlKSBiYXNlZCBvbiBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8PSA1KSB7XG4gICAgICAgICAgICAvLyBBdCBvciBuZWFyIHRoZSB0b3AgLSBoaWRlIHVwIGFycm93XG4gICAgICAgICAgICAkdGh1bWJuYWlscy5yZW1vdmVDbGFzcygnY2FuLXNjcm9sbC11cCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm90IGF0IHRvcCAtIHNob3cgdXAgYXJyb3dcbiAgICAgICAgICAgICR0aHVtYm5haWxzLmFkZENsYXNzKCdjYW4tc2Nyb2xsLXVwJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFNob3cvaGlkZSBkb3duIGFycm93ICg6OmFmdGVyKSBiYXNlZCBvbiBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGxUb3AgLSA1KSB7XG4gICAgICAgICAgICAvLyBBdCBvciBuZWFyIHRoZSBib3R0b20gLSBoaWRlIGRvd24gYXJyb3dcbiAgICAgICAgICAgICR0aHVtYm5haWxzLnJlbW92ZUNsYXNzKCdjYW4tc2Nyb2xsLWRvd24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vdCBhdCBib3R0b20gLSBzaG93IGRvd24gYXJyb3dcbiAgICAgICAgICAgICR0aHVtYm5haWxzLmFkZENsYXNzKCdjYW4tc2Nyb2xsLWRvd24nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzZXR1cE1vYmlsZUhhbmRsZXJzKCRzcGxpdExheW91dCkge1xuICAgICAgICAvLyBPbmx5IHNldCB1cCBtb2JpbGUgaGFuZGxlcnMgb24gbW9iaWxlIGRldmljZXNcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCAkdGh1bWJuYWlscyA9ICRzcGxpdExheW91dC5maW5kKCcucHJvZHVjdFZpZXctdGh1bWJuYWlscycpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnU2V0dGluZyB1cCBtb2JpbGUgaG9yaXpvbnRhbCBzY3JvbGwgaGFuZGxlcnMnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEhhbmRsZSBob3Jpem9udGFsIHNjcm9sbCBmb3IgbW9iaWxlXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2subW9iaWxlLWhvcml6b250YWwnKTtcbiAgICAgICAgXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2JpbGUtaG9yaXpvbnRhbCcsICcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0IC5wcm9kdWN0Vmlldy10aHVtYm5haWxzJywgKGUpID0+IHtcbiAgICAgICAgICAgIC8vIE9ubHkgb24gbW9iaWxlXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCAkY29udGFpbmVyID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9ICRjb250YWluZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBjbGlja1ggPSBlLmNsaWVudFggLSBjb250YWluZXJSZWN0LmxlZnQ7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IGNvbnRhaW5lclJlY3Qud2lkdGg7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIERlZmluZSBjbGljayB6b25lcyBmb3IgaG9yaXpvbnRhbCBzY3JvbGxpbmdcbiAgICAgICAgICAgIGNvbnN0IGFycm93V2lkdGggPSA0MDsgLy8gV2lkdGggb2YgdGhlIGhvcml6b250YWwgYXJyb3dzXG4gICAgICAgICAgICBjb25zdCBsZWZ0QXJyb3dab25lID0gYXJyb3dXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0QXJyb3dab25lID0gY29udGFpbmVyV2lkdGggLSBhcnJvd1dpZHRoO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTW9iaWxlIGhvcml6b250YWwgY2xpY2sgZGV0ZWN0ZWQ6Jywge1xuICAgICAgICAgICAgLy8gICAgIGNsaWNrWCxcbiAgICAgICAgICAgIC8vICAgICBjb250YWluZXJXaWR0aCxcbiAgICAgICAgICAgIC8vICAgICBsZWZ0QXJyb3dab25lLFxuICAgICAgICAgICAgLy8gICAgIHJpZ2h0QXJyb3dab25lXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgJHNsaWNrTGlzdCA9ICRjb250YWluZXIuZmluZCgnLnNsaWNrLWxpc3QnKTtcbiAgICAgICAgICAgIGlmICgkc2xpY2tMaXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY2xpY2tYIDw9IGxlZnRBcnJvd1pvbmUpIHtcbiAgICAgICAgICAgICAgICAvLyBDbGlja2VkIGluIGxlZnQgYXJyb3cgYXJlYSAtIHNjcm9sbCBsZWZ0XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01vYmlsZSBsZWZ0IGFycm93IGFyZWEgY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxMZWZ0ID0gJHNsaWNrTGlzdC5zY3JvbGxMZWZ0KCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsQW1vdW50ID0gOTI7IC8vIHRodW1ibmFpbCB3aWR0aCAoODBweCkgKyBnYXAgKDEycHgpXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U2Nyb2xsTGVmdCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTY3JvbGxMZWZ0IC0gc2Nyb2xsQW1vdW50KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkc2xpY2tMaXN0LmFuaW1hdGUoeyBzY3JvbGxMZWZ0OiBuZXdTY3JvbGxMZWZ0IH0sIDMwMCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vYmlsZUFycm93VmlzaWJpbGl0eSgkc3BsaXRMYXlvdXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGlja1ggPj0gcmlnaHRBcnJvd1pvbmUpIHtcbiAgICAgICAgICAgICAgICAvLyBDbGlja2VkIGluIHJpZ2h0IGFycm93IGFyZWEgLSBzY3JvbGwgcmlnaHRcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTW9iaWxlIHJpZ2h0IGFycm93IGFyZWEgY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxMZWZ0ID0gJHNsaWNrTGlzdC5zY3JvbGxMZWZ0KCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsQW1vdW50ID0gOTI7IC8vIHRodW1ibmFpbCB3aWR0aCAoODBweCkgKyBnYXAgKDEycHgpXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4U2Nyb2xsTGVmdCA9ICRzbGlja0xpc3RbMF0uc2Nyb2xsV2lkdGggLSAkc2xpY2tMaXN0Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTY3JvbGxMZWZ0ID0gTWF0aC5taW4obWF4U2Nyb2xsTGVmdCwgY3VycmVudFNjcm9sbExlZnQgKyBzY3JvbGxBbW91bnQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICRzbGlja0xpc3QuYW5pbWF0ZSh7IHNjcm9sbExlZnQ6IG5ld1Njcm9sbExlZnQgfSwgMzAwLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9iaWxlQXJyb3dWaXNpYmlsaXR5KCRzcGxpdExheW91dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gU2V0IHVwIG1vYmlsZSBhcnJvdyB2aXNpYmlsaXR5XG4gICAgICAgICR0aHVtYm5haWxzLm9uKCdpbml0JywgKGV2ZW50LCBzbGljaykgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vYmlsZUFycm93VmlzaWJpbGl0eSgkc3BsaXRMYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJHNsaWNrTGlzdCA9ICRzcGxpdExheW91dC5maW5kKCcuc2xpY2stbGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWNrTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpY2tMaXN0Lm9uKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2JpbGVBcnJvd1Zpc2liaWxpdHkoJHNwbGl0TGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZU1vYmlsZUFycm93VmlzaWJpbGl0eSgkc3BsaXRMYXlvdXQpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSByZXR1cm47IC8vIE9ubHkgZm9yIG1vYmlsZVxuICAgICAgICBcbiAgICAgICAgY29uc3QgJHRodW1ibmFpbHMgPSAkc3BsaXRMYXlvdXQuZmluZCgnLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnKTtcbiAgICAgICAgY29uc3QgJHNsaWNrTGlzdCA9ICRzcGxpdExheW91dC5maW5kKCcuc2xpY2stbGlzdCcpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCRzbGlja0xpc3QubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzY3JvbGxMZWZ0ID0gJHNsaWNrTGlzdC5zY3JvbGxMZWZ0KCk7XG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gJHNsaWNrTGlzdFswXS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3QgY2xpZW50V2lkdGggPSAkc2xpY2tMaXN0Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgY29uc3QgbWF4U2Nyb2xsTGVmdCA9IHNjcm9sbFdpZHRoIC0gY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGlzU2Nyb2xsYWJsZSA9IHNjcm9sbFdpZHRoID4gY2xpZW50V2lkdGg7XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnVXBkYXRpbmcgbW9iaWxlIGhvcml6b250YWwgYXJyb3cgdmlzaWJpbGl0eTonLCB7XG4gICAgICAgIC8vICAgICBzY3JvbGxMZWZ0LFxuICAgICAgICAvLyAgICAgc2Nyb2xsV2lkdGgsXG4gICAgICAgIC8vICAgICBjbGllbnRXaWR0aCxcbiAgICAgICAgLy8gICAgIG1heFNjcm9sbExlZnQsXG4gICAgICAgIC8vICAgICBpc1Njcm9sbGFibGVcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWlzU2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgJHRodW1ibmFpbHMucmVtb3ZlQ2xhc3MoJ2Nhbi1zY3JvbGwtbGVmdCBjYW4tc2Nyb2xsLXJpZ2h0Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFNob3cvaGlkZSBsZWZ0IGFycm93XG4gICAgICAgIGlmIChzY3JvbGxMZWZ0IDw9IDUpIHtcbiAgICAgICAgICAgICR0aHVtYm5haWxzLnJlbW92ZUNsYXNzKCdjYW4tc2Nyb2xsLWxlZnQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0aHVtYm5haWxzLmFkZENsYXNzKCdjYW4tc2Nyb2xsLWxlZnQnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU2hvdy9oaWRlIHJpZ2h0IGFycm93XG4gICAgICAgIGlmIChzY3JvbGxMZWZ0ID49IG1heFNjcm9sbExlZnQgLSA1KSB7XG4gICAgICAgICAgICAkdGh1bWJuYWlscy5yZW1vdmVDbGFzcygnY2FuLXNjcm9sbC1yaWdodCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRodW1ibmFpbHMuYWRkQ2xhc3MoJ2Nhbi1zY3JvbGwtcmlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzZXR1cFRodW1ibmFpbENsaWNrSGFuZGxlcnMoJHNwbGl0TGF5b3V0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdTZXR0aW5nIHVwIHRodW1ibmFpbCBjbGljayBoYW5kbGVycyBmb3Igc3BsaXQgbGF5b3V0Jyk7XG4gICAgICAgIFxuICAgICAgICAvLyBSZW1vdmUgZXhpc3RpbmcgdGh1bWJuYWlsIGNsaWNrIGhhbmRsZXJzIHRoYXQgb3BlbiBQaG90b1N3aXBlXG4gICAgICAgIGNvbnN0ICR0aHVtYm5haWxzID0gJHNwbGl0TGF5b3V0LmZpbmQoJy5wcm9kdWN0Vmlldy10aHVtYm5haWxzJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBVbmJpbmQgZXhpc3RpbmcgY2xpY2sgQU5EIGhvdmVyIGhhbmRsZXJzIGZyb20gaW1hZ2UgZ2FsbGVyeVxuICAgICAgICAkdGh1bWJuYWlscy5maW5kKCdbZGF0YS1pbWFnZS1nYWxsZXJ5LWl0ZW1dLCBbZGF0YS1pbWFnZS1nYWxsZXJ5LXZpZGVvXScpLm9mZignY2xpY2sgbW91c2VlbnRlcicpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIG91ciBjdXN0b20gY2xpY2sgaGFuZGxlciBmb3IgdGh1bWJuYWlsc1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrLnNwbGl0LWxheW91dC10aHVtYm5haWxzJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljay5zcGxpdC1sYXlvdXQtdGh1bWJuYWlscycsICcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0IC5wcm9kdWN0Vmlldy10aHVtYm5haWxzIFtkYXRhLWltYWdlLWdhbGxlcnktaXRlbV0sIC5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQgLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMgW2RhdGEtaW1hZ2UtZ2FsbGVyeS12aWRlb10nLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAkdGFyZ2V0LmF0dHIoJ2RhdGEtdHlwZScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3BsaXQgbGF5b3V0IHRodW1ibmFpbCBjbGlja2VkOicsIHtcbiAgICAgICAgICAgIC8vICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgLy8gICAgIHRhcmdldDogJHRhcmdldFswXVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBpbWFnZSBnYWxsZXJ5IGluc3RhbmNlIGZyb20gdGhlIGdsb2JhbCBwcm9kdWN0IGRldGFpbHNcbiAgICAgICAgICAgIGxldCBpbWFnZUdhbGxlcnkgPSBudWxsO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSdzIGEgZ2xvYmFsIHByb2R1Y3QgZGV0YWlscyBpbnN0YW5jZVxuICAgICAgICAgICAgaWYgKHdpbmRvdy5wcm9kdWN0RGV0YWlscyAmJiB3aW5kb3cucHJvZHVjdERldGFpbHMuaW1hZ2VHYWxsZXJ5KSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VHYWxsZXJ5ID0gd2luZG93LnByb2R1Y3REZXRhaWxzLmltYWdlR2FsbGVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWx0ZXJuYXRpdmU6IGNoZWNrIGlmIGl0J3Mgc3RvcmVkIG9uIHRoZSBwcm9kdWN0VmlldyBlbGVtZW50XG4gICAgICAgICAgICBpZiAoIWltYWdlR2FsbGVyeSkge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0VmlldyA9ICR0YXJnZXQuY2xvc2VzdCgnLnByb2R1Y3RWaWV3Jyk7XG4gICAgICAgICAgICAgICAgaW1hZ2VHYWxsZXJ5ID0gJHByb2R1Y3RWaWV3LmRhdGEoJ2ltYWdlR2FsbGVyeScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaW1hZ2VHYWxsZXJ5ICYmIHR5cGVvZiBpbWFnZUdhbGxlcnkuc2VsZWN0TmV3SW1hZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIGV4aXN0aW5nIHNlbGVjdE5ld0ltYWdlIG1ldGhvZCB0byBjaGFuZ2UgdGhlIG1haW4gaW1hZ2VcbiAgICAgICAgICAgICAgICBpbWFnZUdhbGxlcnkuc2VsZWN0TmV3SW1hZ2UoZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gaW1hZ2UgY2hhbmdlZCB2aWEgaW1hZ2UgZ2FsbGVyeSBpbnN0YW5jZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBGYWxsYmFjazogbWFudWFsbHkgY2hhbmdlIHRoZSBtYWluIGltYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYWluSW1hZ2VNYW51YWxseSgkdGFyZ2V0LCB0eXBlKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFpbiBpbWFnZSBjaGFuZ2VkIHZpYSBtYW51YWwgbWV0aG9kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1RodW1ibmFpbCBjbGljayBoYW5kbGVycyBzZXQgdXAgZm9yIHNwbGl0IGxheW91dCAtIGhvdmVyIGRpc2FibGVkJyk7XG4gICAgfVxuICAgIFxuICAgIGRpc2FibGVUaHVtYm5haWxIb3Zlcigkc3BsaXRMYXlvdXQpIHtcbiAgICAgICAgLy8gQ29udGludW91c2x5IGRpc2FibGUgaG92ZXIgZnVuY3Rpb25hbGl0eSBmb3Igc3BsaXQgbGF5b3V0IHRodW1ibmFpbHNcbiAgICAgICAgY29uc3QgJHRodW1ibmFpbHMgPSAkc3BsaXRMYXlvdXQuZmluZCgnLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdEaXNhYmxpbmcgdGh1bWJuYWlsIGhvdmVyIGZvciBzcGxpdCBsYXlvdXQnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJlbW92ZSBhbnkgaG92ZXIgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICR0aHVtYm5haWxzLmZpbmQoJ1tkYXRhLWltYWdlLWdhbGxlcnktaXRlbV0sIFtkYXRhLWltYWdlLWdhbGxlcnktdmlkZW9dJykub2ZmKCdtb3VzZWVudGVyIG1vdXNlb3ZlciBob3ZlcicpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIGEgbm8tb3AgaG92ZXIgaGFuZGxlciB0byBwcmV2ZW50IGZ1dHVyZSBob3ZlciBldmVudHNcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdtb3VzZWVudGVyLnNwbGl0LWxheW91dC1uby1ob3ZlcicpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignbW91c2VlbnRlci5zcGxpdC1sYXlvdXQtbm8taG92ZXInLCAnLnByb2R1Y3RWaWV3LnNwbGl0LWxheW91dCAucHJvZHVjdFZpZXctdGh1bWJuYWlscyBbZGF0YS1pbWFnZS1nYWxsZXJ5LWl0ZW1dLCAucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0IC5wcm9kdWN0Vmlldy10aHVtYm5haWxzIFtkYXRhLWltYWdlLWdhbGxlcnktdmlkZW9dJywgKGUpID0+IHtcbiAgICAgICAgICAgIC8vIFByZXZlbnQgaG92ZXIgZnJvbSBjaGFuZ2luZyBtYWluIGltYWdlXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdUaHVtYm5haWwgaG92ZXIgZGlzYWJsZWQgZm9yIHNwbGl0IGxheW91dCcpO1xuICAgIH1cbiAgICBcbiAgICBjaGFuZ2VNYWluSW1hZ2VNYW51YWxseSgkdGFyZ2V0LCB0eXBlKSB7XG4gICAgICAgIC8vIE1hbnVhbCBtZXRob2QgdG8gY2hhbmdlIG1haW4gaW1hZ2UgaWYgaW1hZ2UgZ2FsbGVyeSBpbnN0YW5jZSBpcyBub3QgYXZhaWxhYmxlXG4gICAgICAgIGNvbnN0ICRtYWluSW1hZ2UgPSAkKCcucHJvZHVjdFZpZXctaW1hZ2UgW2RhdGEtbWFpbi1pbWFnZV0nKTtcbiAgICAgICAgY29uc3QgJG1haW5JbWFnZUNvbnRhaW5lciA9ICQoJy5wcm9kdWN0Vmlldy1pbWFnZSAucHJvZHVjdFZpZXctaW1nLWNvbnRhaW5lciBhJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoJG1haW5JbWFnZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIC8vIEdldCB0aGUgbmV3IGltYWdlIGRhdGEgZnJvbSB0aGUgdGh1bWJuYWlsXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlVXJsID0gJHRhcmdldC5hdHRyKGBkYXRhLSR7dHlwZX0tZ2FsbGVyeS1uZXctaW1hZ2UtdXJsYCk7XG4gICAgICAgIGNvbnN0IG5ld0ltYWdlU3Jjc2V0ID0gJHRhcmdldC5hdHRyKGBkYXRhLSR7dHlwZX0tZ2FsbGVyeS1uZXctaW1hZ2Utc3Jjc2V0YCk7XG4gICAgICAgIGNvbnN0IHpvb21JbWFnZVVybCA9ICR0YXJnZXQuYXR0cihgZGF0YS0ke3R5cGV9LWdhbGxlcnktem9vbS1pbWFnZS11cmxgKTtcbiAgICAgICAgY29uc3QgaW1hZ2VBbHQgPSAkdGFyZ2V0LmZpbmQoJ2ltZycpLmF0dHIoJ2FsdCcpO1xuICAgICAgICBjb25zdCBpbWFnZUluZGV4ID0gJHRhcmdldC5hdHRyKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW5ld0ltYWdlVXJsKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFudWFsbHkgY2hhbmdpbmcgbWFpbiBpbWFnZTonLCB7XG4gICAgICAgIC8vICAgICBuZXdJbWFnZVVybCxcbiAgICAgICAgLy8gICAgIG5ld0ltYWdlU3Jjc2V0LFxuICAgICAgICAvLyAgICAgem9vbUltYWdlVXJsLFxuICAgICAgICAvLyAgICAgaW1hZ2VBbHQsXG4gICAgICAgIC8vICAgICBpbWFnZUluZGV4XG4gICAgICAgIC8vIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBtYWluIGltYWdlXG4gICAgICAgICRtYWluSW1hZ2UuYXR0cih7XG4gICAgICAgICAgICBzcmM6IG5ld0ltYWdlVXJsLFxuICAgICAgICAgICAgc3Jjc2V0OiBuZXdJbWFnZVNyY3NldCB8fCAnJyxcbiAgICAgICAgICAgIGFsdDogaW1hZ2VBbHQgfHwgJycsXG4gICAgICAgICAgICB0aXRsZTogaW1hZ2VBbHQgfHwgJydcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgdGhlIG1haW4gaW1hZ2UgY29udGFpbmVyIGxpbmsgZm9yIFBob3RvU3dpcGVcbiAgICAgICAgaWYgKCRtYWluSW1hZ2VDb250YWluZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJG1haW5JbWFnZUNvbnRhaW5lci5hdHRyKHtcbiAgICAgICAgICAgICAgICAnZGF0YS1pbmRleCc6IGltYWdlSW5kZXgsXG4gICAgICAgICAgICAgICAgJ2RhdGEtdHlwZSc6IHR5cGUsXG4gICAgICAgICAgICAgICAgJ2hyZWYnOiB6b29tSW1hZ2VVcmwgfHwgbmV3SW1hZ2VVcmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgYWN0aXZlIHRodW1ibmFpbCBzdGF0ZVxuICAgICAgICAkKCcucHJvZHVjdFZpZXctdGh1bWJuYWlscyBbZGF0YS1pbWFnZS1nYWxsZXJ5LWl0ZW1dLCAucHJvZHVjdFZpZXctdGh1bWJuYWlscyBbZGF0YS1pbWFnZS1nYWxsZXJ5LXZpZGVvXScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgdGhlIG1haW4gaW1hZ2Ugem9vbSBmdW5jdGlvbmFsaXR5IGlmIGl0IGV4aXN0c1xuICAgICAgICBjb25zdCAkem9vbUNvbnRhaW5lciA9ICQoJy5wcm9kdWN0Vmlldy1pbWFnZSBbZGF0YS16b29tLWltYWdlXScpO1xuICAgICAgICBpZiAoJHpvb21Db250YWluZXIubGVuZ3RoID4gMCAmJiB6b29tSW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICR6b29tQ29udGFpbmVyLmF0dHIoJ2RhdGEtem9vbS1pbWFnZScsIHpvb21JbWFnZVVybCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdNYWluIGltYWdlIG1hbnVhbGx5IHVwZGF0ZWQnKTtcbiAgICB9XG4gICAgXG4gICAgc2V0dXBNYWluSW1hZ2VTd2lwZSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1NldHRpbmcgdXAgbWFpbiBpbWFnZSBzd2lwZSBoYW5kbGVycycpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgJG1haW5JbWFnZUNvbnRhaW5lciA9ICQoJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQgLnByb2R1Y3RWaWV3LWltYWdlIC5wcm9kdWN0Vmlldy1pbWctY29udGFpbmVyJyk7XG4gICAgICAgIGlmICgkbWFpbkltYWdlQ29udGFpbmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ05vIG1haW4gaW1hZ2UgY29udGFpbmVyIGZvdW5kIGZvciBzd2lwZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnRm91bmQgbWFpbiBpbWFnZSBjb250YWluZXI6JywgJG1haW5JbWFnZUNvbnRhaW5lclswXSk7XG4gICAgICAgIFxuICAgICAgICAvLyBTZXQgdXAgdG91Y2ggZXZlbnRzIGZvciBtb2JpbGUgYW5kIGRldmljZSBlbXVsYXRpb25cbiAgICAgICAgbGV0IHN0YXJ0WCA9IG51bGw7XG4gICAgICAgIGxldCBzdGFydFkgPSBudWxsO1xuICAgICAgICBsZXQgaXNTY3JvbGxpbmcgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVtb3ZlIGFueSBleGlzdGluZyBzd2lwZSBoYW5kbGVyc1xuICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLm9mZignLnN3aXBlJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBUb3VjaCBzdGFydFxuICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLm9uKCd0b3VjaHN0YXJ0LnN3aXBlJywgKGUpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdUb3VjaCBzdGFydCBkZXRlY3RlZCBvbiBtYWluIGltYWdlOicsIGUub3JpZ2luYWxFdmVudCk7XG4gICAgICAgICAgICBjb25zdCB0b3VjaCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdO1xuICAgICAgICAgICAgc3RhcnRYID0gdG91Y2guY2xpZW50WDtcbiAgICAgICAgICAgIHN0YXJ0WSA9IHRvdWNoLmNsaWVudFk7XG4gICAgICAgICAgICBpc1Njcm9sbGluZyA9IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdUb3VjaCBzdGFydCBjb29yZGluYXRlczonLCB7IHN0YXJ0WCwgc3RhcnRZIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBZGQgdmlzdWFsIGZlZWRiYWNrXG4gICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLmNzcygnb3BhY2l0eScsICcwLjknKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBUb3VjaCBtb3ZlXG4gICAgICAgICRtYWluSW1hZ2VDb250YWluZXIub24oJ3RvdWNobW92ZS5zd2lwZScsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0WCB8fCAhc3RhcnRZKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgICAgICBjb25zdCBkZWx0YVggPSB0b3VjaC5jbGllbnRYIC0gc3RhcnRYO1xuICAgICAgICAgICAgY29uc3QgZGVsdGFZID0gdG91Y2guY2xpZW50WSAtIHN0YXJ0WTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1RvdWNoIG1vdmUgLSBkZWx0YXM6JywgeyBkZWx0YVgsIGRlbHRhWSB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHVzZXIgaXMgc2Nyb2xsaW5nIHZlcnRpY2FsbHkgb3Igc3dpcGluZyBob3Jpem9udGFsbHlcbiAgICAgICAgICAgIGlmIChpc1Njcm9sbGluZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlzU2Nyb2xsaW5nID0gTWF0aC5hYnMoZGVsdGFZKSA+IE1hdGguYWJzKGRlbHRhWCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0RldGVybWluZWQgc2Nyb2xsaW5nIGRpcmVjdGlvbjonLCBpc1Njcm9sbGluZyA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiBob3Jpem9udGFsIHN3aXBlLCBwcmV2ZW50IGRlZmF1bHQgc2Nyb2xsaW5nXG4gICAgICAgICAgICBpZiAoIWlzU2Nyb2xsaW5nICYmIE1hdGguYWJzKGRlbHRhWCkgPiAxMCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnSG9yaXpvbnRhbCBzd2lwZSBkZXRlY3RlZCwgcHJldmVudGluZyBkZWZhdWx0Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQWRkIHZpc3VhbCBmZWVkYmFjayBkdXJpbmcgc3dpcGVcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2xhdGVYID0gZGVsdGFYICogMC4xOyAvLyBTdWJ0bGUgbW92ZW1lbnQgZmVlZGJhY2tcbiAgICAgICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLmNzcygndHJhbnNmb3JtJywgYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGVYfXB4KWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRvdWNoIGVuZFxuICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLm9uKCd0b3VjaGVuZC5zd2lwZScsIChlKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnVG91Y2ggZW5kIGRldGVjdGVkIG9uIG1haW4gaW1hZ2UnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUmVtb3ZlIHZpc3VhbCBmZWVkYmFja1xuICAgICAgICAgICAgJG1haW5JbWFnZUNvbnRhaW5lci5jc3Moe1xuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzEnLFxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0YXJ0WCB8fCAhc3RhcnRZIHx8IGlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1RvdWNoIGVuZCAtIG5vIHN3aXBlIGFjdGlvbiAoc2Nyb2xsaW5nIG9yIG5vIHN0YXJ0IHBvc2l0aW9uKScpO1xuICAgICAgICAgICAgICAgIHN0YXJ0WCA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3RhcnRZID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpc1Njcm9sbGluZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0b3VjaCA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWCA9IHRvdWNoLmNsaWVudFggLSBzdGFydFg7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVkgPSB0b3VjaC5jbGllbnRZIC0gc3RhcnRZO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBNaW5pbXVtIHN3aXBlIGRpc3RhbmNlXG4gICAgICAgICAgICBjb25zdCBtaW5Td2lwZURpc3RhbmNlID0gNTA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdUb3VjaCBlbmQgLSBhbmFseXppbmcgc3dpcGU6JywgeyBkZWx0YVgsIGRlbHRhWSwgbWluU3dpcGVEaXN0YW5jZSB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGhvcml6b250YWwgc3dpcGVcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YVgpID4gbWluU3dpcGVEaXN0YW5jZSAmJiBNYXRoLmFicyhkZWx0YVkpIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhWCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3dpcGUgcmlnaHQgLSBnbyB0byBwcmV2aW91cyBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3dpcGUgcmlnaHQgZGV0ZWN0ZWQgLSBnb2luZyB0byBwcmV2aW91cyBpbWFnZScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9JbWFnZSgncHJldmlvdXMnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBTd2lwZSBsZWZ0IC0gZ28gdG8gbmV4dCBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3dpcGUgbGVmdCBkZXRlY3RlZCAtIGdvaW5nIHRvIG5leHQgaW1hZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvSW1hZ2UoJ25leHQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdObyBzd2lwZSBhY3Rpb24gLSBpbnN1ZmZpY2llbnQgZGlzdGFuY2Ugb3IgdmVydGljYWwgbW92ZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUmVzZXQgdmFsdWVzXG4gICAgICAgICAgICBzdGFydFggPSBudWxsO1xuICAgICAgICAgICAgc3RhcnRZID0gbnVsbDtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBNb3VzZSBldmVudHMgZm9yIGRlc2t0b3AgdGVzdGluZyAod2hlbiBOT1QgaW4gZGV2aWNlIGVtdWxhdGlvbiBtb2RlKVxuICAgICAgICBsZXQgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgIGxldCBtb3VzZVN0YXJ0WCA9IG51bGw7XG4gICAgICAgIGxldCBtb3VzZVN0YXJ0WSA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyBPbmx5IGFkZCBtb3VzZSBldmVudHMgaWYgdG91Y2ggaXMgTk9UIHN1cHBvcnRlZCAocHVyZSBkZXNrdG9wKVxuICAgICAgICBpZiAoISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnVG91Y2ggbm90IHN1cHBvcnRlZCAtIGFkZGluZyBtb3VzZSBldmVudHMgZm9yIGRlc2t0b3AgdGVzdGluZycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLm9uKCdtb3VzZWRvd24uc3dpcGUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdNb3VzZSBkb3duIGRldGVjdGVkIG9uIG1haW4gaW1hZ2UgKGRlc2t0b3AgbW9kZSknKTtcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1vdXNlU3RhcnRYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIG1vdXNlU3RhcnRZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIuY3NzKCdvcGFjaXR5JywgJzAuOScpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLm9uKCdtb3VzZW1vdmUuc3dpcGUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbW91c2VEb3duKSByZXR1cm47XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsdGFYID0gZS5jbGllbnRYIC0gbW91c2VTdGFydFg7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsdGFZID0gZS5jbGllbnRZIC0gbW91c2VTdGFydFk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCB0ZXh0IHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBWaXN1YWwgZmVlZGJhY2sgZHVyaW5nIGRyYWdcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGFYKSA+IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIuY3NzKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlWCgke2RlbHRhWCAqIDAuMn1weClgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJG1haW5JbWFnZUNvbnRhaW5lci5vbignbW91c2V1cC5zd2lwZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTW91c2UgdXAgZGV0ZWN0ZWQgb24gbWFpbiBpbWFnZSAoZGVza3RvcCBtb2RlKScpO1xuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHZpc3VhbCBmZWVkYmFja1xuICAgICAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMScsXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YVggPSBlLmNsaWVudFggLSBtb3VzZVN0YXJ0WDtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YVkgPSBlLmNsaWVudFkgLSBtb3VzZVN0YXJ0WTtcbiAgICAgICAgICAgICAgICBjb25zdCBtaW5Td2lwZURpc3RhbmNlID0gNTA7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01vdXNlIGRyYWcgLSBhbmFseXppbmcgc3dpcGU6JywgeyBkZWx0YVgsIGRlbHRhWSwgbWluU3dpcGVEaXN0YW5jZSB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgaG9yaXpvbnRhbCBzd2lwZVxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YVgpID4gbWluU3dpcGVEaXN0YW5jZSAmJiBNYXRoLmFicyhkZWx0YVkpIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWx0YVggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEcmFnIHJpZ2h0IC0gZ28gdG8gcHJldmlvdXMgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdNb3VzZSBkcmFnIHJpZ2h0IGRldGVjdGVkIC0gZ29pbmcgdG8gcHJldmlvdXMgaW1hZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0ltYWdlKCdwcmV2aW91cycpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRHJhZyBsZWZ0IC0gZ28gdG8gbmV4dCBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01vdXNlIGRyYWcgbGVmdCBkZXRlY3RlZCAtIGdvaW5nIHRvIG5leHQgaW1hZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0ltYWdlKCduZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSGFuZGxlIG1vdXNlIGxlYXZlIHRvIHJlc2V0IHN0YXRlXG4gICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLm9uKCdtb3VzZWxlYXZlLnN3aXBlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb3VzZURvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdUb3VjaCBzdXBwb3J0ZWQgLSBza2lwcGluZyBtb3VzZSBldmVudHMgKHdpbGwgdXNlIHRvdWNoIGV2ZW50cyBpbiBkZXZpY2UgZW11bGF0aW9uKScpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFpbiBpbWFnZSBzd2lwZSBoYW5kbGVycyBzZXQgdXAnKTtcbiAgICB9XG4gICAgXG4gICAgbmF2aWdhdGVUb0ltYWdlKGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCAkdGh1bWJuYWlscyA9ICQoJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQgLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnKTtcbiAgICAgICAgY29uc3QgJGFsbFRodW1ibmFpbHMgPSAkdGh1bWJuYWlscy5maW5kKCdbZGF0YS1pbWFnZS1nYWxsZXJ5LWl0ZW1dLCBbZGF0YS1pbWFnZS1nYWxsZXJ5LXZpZGVvXScpO1xuICAgICAgICBjb25zdCAkY3VycmVudEFjdGl2ZSA9ICRhbGxUaHVtYm5haWxzLmZpbHRlcignLmlzLWFjdGl2ZScpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCRhbGxUaHVtYm5haWxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgbGV0ICRuZXh0VGh1bWJuYWlsID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGlmICgkY3VycmVudEFjdGl2ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIE5vIGFjdGl2ZSB0aHVtYm5haWwsIHN0YXJ0IHdpdGggZmlyc3RcbiAgICAgICAgICAgICRuZXh0VGh1bWJuYWlsID0gJGFsbFRodW1ibmFpbHMuZmlyc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9ICRhbGxUaHVtYm5haWxzLmluZGV4KCRjdXJyZW50QWN0aXZlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gKGN1cnJlbnRJbmRleCArIDEpICUgJGFsbFRodW1ibmFpbHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICRuZXh0VGh1bWJuYWlsID0gJGFsbFRodW1ibmFpbHMuZXEobmV4dEluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncHJldmlvdXMnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gY3VycmVudEluZGV4ID09PSAwID8gJGFsbFRodW1ibmFpbHMubGVuZ3RoIC0gMSA6IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgJG5leHRUaHVtYm5haWwgPSAkYWxsVGh1bWJuYWlscy5lcShwcmV2SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoJG5leHRUaHVtYm5haWwgJiYgJG5leHRUaHVtYm5haWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYE5hdmlnYXRpbmcgdG8gJHtkaXJlY3Rpb259IGltYWdlIHZpYSBzd2lwZWApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIGNsaWNrIG9uIHRoZSB0aHVtYm5haWwgdG8gY2hhbmdlIHRoZSBtYWluIGltYWdlXG4gICAgICAgICAgICBjb25zdCBjbGlja0V2ZW50ID0gJC5FdmVudCgnY2xpY2snLCB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogJG5leHRUaHVtYm5haWxbMF0sXG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHt9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdHlwZSA9ICRuZXh0VGh1bWJuYWlsLmF0dHIoJ2RhdGEtdHlwZScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUcnkgdG8gdXNlIGltYWdlIGdhbGxlcnkgaW5zdGFuY2UgZmlyc3RcbiAgICAgICAgICAgIGxldCBpbWFnZUdhbGxlcnkgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5wcm9kdWN0RGV0YWlscyAmJiB3aW5kb3cucHJvZHVjdERldGFpbHMuaW1hZ2VHYWxsZXJ5KSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VHYWxsZXJ5ID0gd2luZG93LnByb2R1Y3REZXRhaWxzLmltYWdlR2FsbGVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGltYWdlR2FsbGVyeSAmJiB0eXBlb2YgaW1hZ2VHYWxsZXJ5LnNlbGVjdE5ld0ltYWdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VHYWxsZXJ5LnNlbGVjdE5ld0ltYWdlKGNsaWNrRXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU1haW5JbWFnZU1hbnVhbGx5KCRuZXh0VGh1bWJuYWlsLCB0eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBIZWxwZXIgbWV0aG9kIGZvciB0ZXN0aW5nIHN3aXBlIGZ1bmN0aW9uYWxpdHkgZnJvbSBkZXNrdG9wIGNvbnNvbGVcbiAgICB0ZXN0U3dpcGUoZGlyZWN0aW9uID0gJ25leHQnKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBUZXN0aW5nIHN3aXBlICR7ZGlyZWN0aW9ufSBmcm9tIGNvbnNvbGVgKTtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvSW1hZ2UoZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXhwb3NlIHRoaXMgaW5zdGFuY2UgZ2xvYmFsbHkgZm9yIHRlc3RpbmdcbiAgICBpbml0KCkge1xuICAgICAgICB3aW5kb3cuc3BsaXRMYXlvdXRDYXJvdXNlbCA9IHRoaXM7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdTcGxpdCBsYXlvdXQgY2Fyb3VzZWwgaW5zdGFuY2UgZXhwb3NlZCBhcyB3aW5kb3cuc3BsaXRMYXlvdXRDYXJvdXNlbCcpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnVGVzdCBzd2lwZSB3aXRoOiB3aW5kb3cuc3BsaXRMYXlvdXRDYXJvdXNlbC50ZXN0U3dpcGUoXCJuZXh0XCIpIG9yIHdpbmRvdy5zcGxpdExheW91dENhcm91c2VsLnRlc3RTd2lwZShcInByZXZpb3VzXCIpJyk7XG4gICAgfVxufVxuIiwiLypcbiBJbXBvcnQgYWxsIHByb2R1Y3Qgc3BlY2lmaWMganNcbiAqL1xuaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBSZXZpZXcgZnJvbSAnLi9wcm9kdWN0L3Jldmlld3MnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgUHJvZHVjdERldGFpbHMgZnJvbSAnLi9jb21tb24vcHJvZHVjdC1kZXRhaWxzJztcbmltcG9ydCB2aWRlb0dhbGxlcnkgZnJvbSAnLi9wcm9kdWN0L3ZpZGVvLWdhbGxlcnknO1xuaW1wb3J0IHsgY2xhc3NpZnlGb3JtIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBJVFNQcm9kdWN0IGZyb20gJy4vY3VzdG9tL2l0cy1wcm9kdWN0JztcbmltcG9ydCBEdWFsUGFuZWxTY3JvbGwgZnJvbSAnLi9jdXN0b20vZHVhbC1wYW5lbC1zY3JvbGwnO1xuaW1wb3J0IFNwbGl0TGF5b3V0Q2Fyb3VzZWwgZnJvbSAnLi9jdXN0b20vc3BsaXQtbGF5b3V0LWNhcm91c2VsJztcbmltcG9ydCAnLi9wcm9kdWN0L2ltYWdlLWdhbGxlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICAgICAgdGhpcy5yZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeSgnI21vZGFsLXJldmlldy1mb3JtJylbMF07XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xvc2UuZm5kdG4ucmV2ZWFsJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHZhbGlkYXRvcjtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJCgnLnByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XG5cbiAgICAgICAgdGhpcy5idWxrUHJpY2luZ0hhbmRsZXIoKTtcblxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcblxuICAgICAgICB0aGlzLklUU1Byb2R1Y3QgPSBuZXcgSVRTUHJvZHVjdCh0aGlzLmNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBkdWFsLXBhbmVsIHNjcm9sbCBzeW5jaHJvbml6YXRpb24gZm9yIHNwbGl0IGxheW91dFxuICAgICAgICB0aGlzLmR1YWxQYW5lbFNjcm9sbCA9IG5ldyBEdWFsUGFuZWxTY3JvbGwoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEluaXRpYWxpemUgc3BsaXQgbGF5b3V0IGNhcm91c2VsIG92ZXJyaWRlXG4gICAgICAgIHRoaXMuc3BsaXRMYXlvdXRDYXJvdXNlbCA9IG5ldyBTcGxpdExheW91dENhcm91c2VsKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoJHJldmlld0Zvcm0ubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldyh7ICRyZXZpZXdGb3JtIH0pO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyZXZpZXdGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW50dWl0U29sdXRpb25zIC0gQ3VzdG9tIFByb2R1Y3RcbiAgICAgICAgICovXG4gICAgfVxuXG4gICAgYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRmb3JtKSB7XG4gICAgICAgICRmb3JtLmZpbmQoJ1tkYXRhLWlucHV0XScpLmVhY2goKF8sIGlucHV0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkaW5wdXQgPSAkKGlucHV0KTtcbiAgICAgICAgICAgIGNvbnN0IG1zZ1NwYW5JZCA9IGAkeyRpbnB1dC5hdHRyKCduYW1lJyl9LW1zZ2A7XG5cbiAgICAgICAgICAgICRpbnB1dC5zaWJsaW5ncygnc3BhbicpLmF0dHIoJ2lkJywgbXNnU3BhbklkKTtcbiAgICAgICAgICAgICRpbnB1dC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgbXNnU3BhbklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvZHVjdFJldmlld0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLiRyZXZpZXdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWxrUHJpY2luZ0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjYnVsa19wcmljaW5nJykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGluaXRNYWluSW1hZ2VTbGljaygpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zbGljayAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuICAgICAgICBpZiAoIXdpbmRvdy5CQ0RhdGEgfHwgIXdpbmRvdy5CQ0RhdGEucHJvZHVjdF9pbWFnZXMgfHwgIXdpbmRvdy5CQ0RhdGEucHJvZHVjdF9pbWFnZXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyICRtYWluSW1hZ2VEZXNrdG9wID0gJCgnLm1haW4taW1hZ2UtZGVza3RvcCcpO1xuICAgICAgICBpZiAoISRtYWluSW1hZ2VEZXNrdG9wLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBpZiAoJCgnLm1haW4taW1hZ2Utc2xpY2snKS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgaW1hZ2VzID0gd2luZG93LkJDRGF0YS5wcm9kdWN0X2ltYWdlcztcbiAgICAgICAgdmFyICRzbGljayA9ICQoJzxkaXYgY2xhc3M9XCJtYWluLWltYWdlLXNsaWNrXCI+PC9kaXY+Jyk7XG4gICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltZykge1xuICAgICAgICAgICAgdmFyICRzbGlkZSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICB2YXIgJGZpZ3VyZSA9ICQoJzxmaWd1cmUgY2xhc3M9XCJwcm9kdWN0Vmlldy1pbWFnZVwiIGRhdGEtaW1hZ2UtZ2FsbGVyeS1tYWluPjwvZmlndXJlPicpO1xuICAgICAgICAgICAgdmFyICRjb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwicHJvZHVjdFZpZXctaW1nLWNvbnRhaW5lclwiPjwvZGl2PicpO1xuICAgICAgICAgICAgdmFyICRhID0gJCgnPGE+PC9hPicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBpbWcudXJsX3pvb20pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtdHlwZScsICdpbWFnZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICAgICAgICAgIHZhciAkaW1nID0gJCgnPGltZz4nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBpbWcudXJsX3pvb20pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2FsdCcsIGltZy5hbHQgfHwgJycpO1xuICAgICAgICAgICAgJGEuYXBwZW5kKCRpbWcpO1xuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoJGEpO1xuICAgICAgICAgICAgJGZpZ3VyZS5hcHBlbmQoJGNvbnRhaW5lcik7XG4gICAgICAgICAgICAkc2xpZGUuYXBwZW5kKCRmaWd1cmUpO1xuICAgICAgICAgICAgJHNsaWNrLmFwcGVuZCgkc2xpZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgJG1haW5JbWFnZURlc2t0b3AuYWZ0ZXIoJHNsaWNrKTtcbiAgICAgICAgJHNsaWNrLnNsaWNrKHtcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgdHJpZXMgPSAwO1xuICAgIGNvbnN0IG1heFRyaWVzID0gMTA7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgdHJpZXMrKztcbiAgICAgICAgaW5pdE1haW5JbWFnZVNsaWNrKCk7XG4gICAgICAgIGlmICgkKCcubWFpbi1pbWFnZS1zbGljaycpLmxlbmd0aCB8fCB0cmllcyA+PSBtYXhUcmllcykge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9LCAyMDApO1xufSk7IiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge1xuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xuICAgIH1cblxuICAgIHNldE1haW5WaWRlbygpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlby4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XG4gICAgY29uc3QgcGx1Z2luS2V5ID0gJ3ZpZGVvLWdhbGxlcnknO1xuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XG5cbiAgICAkdmlkZW9HYWxsZXJ5LmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xuXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9