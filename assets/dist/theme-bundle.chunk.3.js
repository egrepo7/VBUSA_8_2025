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
      console.log('DOM ready, initializing split layout carousel');
      _this.enforceVerticalLayout();

      // Re-enforce after any slick initialization
      setTimeout(function () {
        console.log('Re-enforcing layout after 500ms delay');
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
        console.log('Setting up additional navigation handlers');
        _this.setupNavigationHandlers($('.productView.split-layout'));
      }, 1000);

      // Set up swipe functionality after a delay to ensure everything is loaded
      setTimeout(function () {
        console.log('Setting up swipe functionality');
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
        console.log('Intercepting Slick initialization for split layout');

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
    console.log('Pre-initializing split layout before Slick initialization');

    // Set up event listeners to intercept Slick initialization
    $thumbnails.on('beforeChange.splitLayout', function (event, slick) {
      console.log('Slick beforeChange event intercepted');
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
    console.log('Applying immediate layout fixes for split layout - AGGRESSIVE MODE');

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
    console.log('Applied immediate layout fixes for split layout - COMPLETE');
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
    console.log("Enforcing layout for split layout - Mobile: " + isMobile);

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
      console.log('Slick carousel initialized, enforcing layout');
      setTimeout(function () {
        _this4.enforceVerticalLayout();
      }, 50);
    });

    // Also listen for reInit
    $thumbnails.on('reInit', function (event, slick) {
      console.log('Slick carousel reinitialized, enforcing layout');
      setTimeout(function () {
        _this4.enforceVerticalLayout();
      }, 50);
    });

    // Listen for breakpoint changes
    $thumbnails.on('breakpoint', function (event, slick) {
      console.log('Slick carousel breakpoint changed, enforcing layout');
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
    console.log('Setting up navigation handlers for split layout - pseudo-element click detection');
    console.log('Found split layout containers:', $splitLayout.length);
    console.log('Found thumbnail containers:', $thumbnails.length);

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
      console.log('Click detected on thumbnails container:', {
        clickY: clickY,
        containerTop: containerTop,
        containerBottom: containerBottom,
        upArrowBottom: upArrowBottom,
        downArrowTop: downArrowTop
      });
      var $currentSplitLayout = $container.closest('.productView.split-layout');
      var $slickList = $container.find('.slick-list');
      if ($slickList.length === 0) {
        console.log('No slick-list found for scrolling');
        return;
      }

      // Check if click is in the up arrow area (::before)
      if (clickY >= containerTop && clickY <= upArrowBottom) {
        console.log('Up arrow area clicked (::before pseudo-element area)');
        var currentScrollTop = $slickList.scrollTop();
        var scrollAmount = 88; // thumbnail height (80px) + gap (8px)
        var newScrollTop = Math.max(0, currentScrollTop - scrollAmount);
        console.log("Scrolling up from " + currentScrollTop + " to " + newScrollTop);
        $slickList.animate({
          scrollTop: newScrollTop
        }, 300, function () {
          _this5.updateScrollArrowVisibility($currentSplitLayout);
        });
      }
      // Check if click is in the down arrow area (::after)
      else if (clickY >= downArrowTop && clickY <= containerBottom) {
        console.log('Down arrow area clicked (::after pseudo-element area)');
        var _currentScrollTop = $slickList.scrollTop();
        var _scrollAmount = 88; // thumbnail height (80px) + gap (8px)
        var maxScrollTop = $slickList[0].scrollHeight - $slickList.outerHeight();
        var _newScrollTop = Math.min(maxScrollTop, _currentScrollTop + _scrollAmount);
        console.log("Scrolling down from " + _currentScrollTop + " to " + _newScrollTop + ", max: " + maxScrollTop);
        $slickList.animate({
          scrollTop: _newScrollTop
        }, 300, function () {
          _this5.updateScrollArrowVisibility($currentSplitLayout);
        });
      } else {
        console.log('Click in middle area - no scroll action');
      }
    });

    // Update arrow visibility when Slick is initialized
    $thumbnails.on('init', function (event, slick) {
      console.log('Slick initialized, setting up scroll arrow visibility');
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
    console.log('Updating scroll arrow visibility for pseudo-elements:', {
      scrollTop: scrollTop,
      scrollHeight: scrollHeight,
      clientHeight: clientHeight,
      maxScrollTop: maxScrollTop,
      isScrollable: isScrollable
    });
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
    console.log('Setting up mobile horizontal scroll handlers');

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
      console.log('Mobile horizontal click detected:', {
        clickX: clickX,
        containerWidth: containerWidth,
        leftArrowZone: leftArrowZone,
        rightArrowZone: rightArrowZone
      });
      var $slickList = $container.find('.slick-list');
      if ($slickList.length === 0) return;
      if (clickX <= leftArrowZone) {
        // Clicked in left arrow area - scroll left
        console.log('Mobile left arrow area clicked');
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
        console.log('Mobile right arrow area clicked');
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
    console.log('Updating mobile horizontal arrow visibility:', {
      scrollLeft: scrollLeft,
      scrollWidth: scrollWidth,
      clientWidth: clientWidth,
      maxScrollLeft: maxScrollLeft,
      isScrollable: isScrollable
    });
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
    console.log('Setting up thumbnail click handlers for split layout');

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
      console.log('Split layout thumbnail clicked:', {
        type: type,
        target: $target[0]
      });

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
        console.log('Main image changed via image gallery instance');
      } else {
        // Fallback: manually change the main image
        _this7.changeMainImageManually($target, type);
        console.log('Main image changed via manual method');
      }
    });
    console.log('Thumbnail click handlers set up for split layout - hover disabled');
  };
  _proto.disableThumbnailHover = function disableThumbnailHover($splitLayout) {
    // Continuously disable hover functionality for split layout thumbnails
    var $thumbnails = $splitLayout.find('.productView-thumbnails');
    console.log('Disabling thumbnail hover for split layout');

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
    console.log('Thumbnail hover disabled for split layout');
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
    console.log('Manually changing main image:', {
      newImageUrl: newImageUrl,
      newImageSrcset: newImageSrcset,
      zoomImageUrl: zoomImageUrl,
      imageAlt: imageAlt,
      imageIndex: imageIndex
    });

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
    console.log('Main image manually updated');
  };
  _proto.setupMainImageSwipe = function setupMainImageSwipe() {
    var _this8 = this;
    console.log('Setting up main image swipe handlers');
    var $mainImageContainer = $('.productView.split-layout .productView-image .productView-img-container');
    if ($mainImageContainer.length === 0) {
      console.log('No main image container found for swipe');
      return;
    }
    console.log('Found main image container:', $mainImageContainer[0]);

    // Set up touch events for mobile and device emulation
    var startX = null;
    var startY = null;
    var isScrolling = null;

    // Remove any existing swipe handlers
    $mainImageContainer.off('.swipe');

    // Touch start
    $mainImageContainer.on('touchstart.swipe', function (e) {
      console.log('Touch start detected on main image:', e.originalEvent);
      var touch = e.originalEvent.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isScrolling = null;
      console.log('Touch start coordinates:', {
        startX: startX,
        startY: startY
      });

      // Add visual feedback
      $mainImageContainer.css('opacity', '0.9');
    });

    // Touch move
    $mainImageContainer.on('touchmove.swipe', function (e) {
      if (!startX || !startY) return;
      var touch = e.originalEvent.touches[0];
      var deltaX = touch.clientX - startX;
      var deltaY = touch.clientY - startY;
      console.log('Touch move - deltas:', {
        deltaX: deltaX,
        deltaY: deltaY
      });

      // Determine if user is scrolling vertically or swiping horizontally
      if (isScrolling === null) {
        isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
        console.log('Determined scrolling direction:', isScrolling ? 'vertical' : 'horizontal');
      }

      // If horizontal swipe, prevent default scrolling
      if (!isScrolling && Math.abs(deltaX) > 10) {
        e.preventDefault();
        console.log('Horizontal swipe detected, preventing default');

        // Add visual feedback during swipe
        var translateX = deltaX * 0.1; // Subtle movement feedback
        $mainImageContainer.css('transform', "translateX(" + translateX + "px)");
      }
    });

    // Touch end
    $mainImageContainer.on('touchend.swipe', function (e) {
      console.log('Touch end detected on main image');

      // Remove visual feedback
      $mainImageContainer.css({
        'opacity': '1',
        'transform': 'none'
      });
      if (!startX || !startY || isScrolling) {
        console.log('Touch end - no swipe action (scrolling or no start position)');
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
      console.log('Touch end - analyzing swipe:', {
        deltaX: deltaX,
        deltaY: deltaY,
        minSwipeDistance: minSwipeDistance
      });

      // Check for horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < 100) {
        if (deltaX > 0) {
          // Swipe right - go to previous image
          console.log('Swipe right detected - going to previous image');
          _this8.navigateToImage('previous');
        } else {
          // Swipe left - go to next image
          console.log('Swipe left detected - going to next image');
          _this8.navigateToImage('next');
        }
      } else {
        console.log('No swipe action - insufficient distance or vertical movement');
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
      console.log('Touch not supported - adding mouse events for desktop testing');
      $mainImageContainer.on('mousedown.swipe', function (e) {
        console.log('Mouse down detected on main image (desktop mode)');
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
        console.log('Mouse up detected on main image (desktop mode)');
        mouseDown = false;

        // Reset visual feedback
        $mainImageContainer.css({
          'opacity': '1',
          'transform': 'none'
        });
        var deltaX = e.clientX - mouseStartX;
        var deltaY = e.clientY - mouseStartY;
        var minSwipeDistance = 50;
        console.log('Mouse drag - analyzing swipe:', {
          deltaX: deltaX,
          deltaY: deltaY,
          minSwipeDistance: minSwipeDistance
        });

        // Check for horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < 100) {
          if (deltaX > 0) {
            // Drag right - go to previous image
            console.log('Mouse drag right detected - going to previous image');
            _this8.navigateToImage('previous');
          } else {
            // Drag left - go to next image
            console.log('Mouse drag left detected - going to next image');
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
      console.log('Touch supported - skipping mouse events (will use touch events in device emulation)');
    }
    console.log('Main image swipe handlers set up');
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
      console.log("Navigating to " + direction + " image via swipe");

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
    console.log("Testing swipe " + direction + " from console");
    this.navigateToImage(direction);
  }

  // Expose this instance globally for testing
  ;
  _proto.init = function init() {
    window.splitLayoutCarousel = this;
    console.log('Split layout carousel instance exposed as window.splitLayoutCarousel');
    console.log('Test swipe with: window.splitLayoutCarousel.testSwipe("next") or window.splitLayoutCarousel.testSwipe("previous")');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2R1YWwtcGFuZWwtc2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vaXRzLXByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9zcGxpdC1sYXlvdXQtY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyJdLCJuYW1lcyI6WyJOYXR1cmFsRHVhbFBhbmVsIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGV0YWlsc1BhbmVsIiwiaXNEZXNrdG9wIiwid2luZG93IiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJpbml0IiwiX3Byb3RvIiwicHJvdG90eXBlIiwiZW5hYmxlTW9iaWxlTGF5b3V0IiwiYm9keSIsInN0eWxlIiwib3ZlcmZsb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlUmVzaXplIiwiYmluZCIsInNldHVwU3RpY2t5QmVoYXZpb3IiLCJzZXR1cFF1YW50aXR5U2VsZWN0b3IiLCJwb3NpdGlvbiIsInF1YW50aXR5Q29udGFpbmVyIiwidG9wIiwid2FzRGVza3RvcCIsIklUU1Byb2R1Y3QiLCJjb250ZXh0IiwiU3BsaXRMYXlvdXRDYXJvdXNlbCIsImluaXRDYXJvdXNlbE92ZXJyaWRlIiwiX3RoaXMiLCJzZXR1cFByZUluaXRpYWxpemF0aW9uIiwiJCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImVuZm9yY2VWZXJ0aWNhbExheW91dCIsInNldFRpbWVvdXQiLCJvbiIsInNldHVwTmF2aWdhdGlvbkhhbmRsZXJzIiwic2V0dXBNYWluSW1hZ2VTd2lwZSIsIl90aGlzMiIsInJlYWR5U3RhdGUiLCJwcmVJbml0aWFsaXplTGF5b3V0IiwiaW50ZXJjZXB0U2xpY2tJbml0aWFsaXphdGlvbiIsIm9yaWdpbmFsU2xpY2siLCJmbiIsInNsaWNrIiwic2VsZiIsIm9wdGlvbnMiLCJoYXNDbGFzcyIsImNsb3Nlc3QiLCJsZW5ndGgiLCJhcHBseUltbWVkaWF0ZUxheW91dEZpeGVzIiwic3BsaXRMYXlvdXRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiaW5maW5pdGUiLCJhcnJvd3MiLCJkb3RzIiwidmFyaWFibGVXaWR0aCIsImFkYXB0aXZlSGVpZ2h0Iiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJ2ZXJ0aWNhbCIsImlubmVyV2lkdGgiLCJ2ZXJ0aWNhbFN3aXBpbmciLCJyZXN1bHQiLCJjYWxsIiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJfdGhpczMiLCIkc3BsaXRMYXlvdXQiLCIkdGh1bWJuYWlscyIsImZpbmQiLCJldmVudCIsInNldHVwVGh1bWJuYWlsQ2xpY2tIYW5kbGVycyIsImRpc2FibGVUaHVtYm5haWxIb3ZlciIsImlzTW9iaWxlIiwiY3NzIiwiaW1hZ2VTZWxlY3RvcnMiLCJzZWxlY3RvciIsImVhY2giLCJzZXRQcm9wZXJ0eSIsInNldEF0dHJpYnV0ZSIsIiRzbGlja0xpc3QiLCIkc2xpY2tUcmFjayIsIl90aGlzNCIsInJlbW92ZSIsImluZGV4IiwiJGxhc3RTbGlkZSIsInNldHVwTW9iaWxlSGFuZGxlcnMiLCJfdGhpczUiLCJvZmYiLCJlIiwicHJldmVudERlZmF1bHQiLCIkY29udGFpbmVyIiwiY3VycmVudFRhcmdldCIsImNvbnRhaW5lclJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGlja1kiLCJjbGllbnRZIiwiY29udGFpbmVyVG9wIiwiY29udGFpbmVyQm90dG9tIiwiYm90dG9tIiwiYXJyb3dIZWlnaHQiLCJ1cEFycm93Qm90dG9tIiwiZG93bkFycm93VG9wIiwiJGN1cnJlbnRTcGxpdExheW91dCIsImN1cnJlbnRTY3JvbGxUb3AiLCJzY3JvbGxUb3AiLCJzY3JvbGxBbW91bnQiLCJuZXdTY3JvbGxUb3AiLCJNYXRoIiwibWF4IiwiYW5pbWF0ZSIsInVwZGF0ZVNjcm9sbEFycm93VmlzaWJpbGl0eSIsIm1heFNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsIm91dGVySGVpZ2h0IiwibWluIiwiY2xpZW50SGVpZ2h0IiwiaXNTY3JvbGxhYmxlIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIl90aGlzNiIsImNsaWNrWCIsImNsaWVudFgiLCJsZWZ0IiwiY29udGFpbmVyV2lkdGgiLCJ3aWR0aCIsImFycm93V2lkdGgiLCJsZWZ0QXJyb3dab25lIiwicmlnaHRBcnJvd1pvbmUiLCJjdXJyZW50U2Nyb2xsTGVmdCIsInNjcm9sbExlZnQiLCJuZXdTY3JvbGxMZWZ0IiwidXBkYXRlTW9iaWxlQXJyb3dWaXNpYmlsaXR5IiwibWF4U2Nyb2xsTGVmdCIsInNjcm9sbFdpZHRoIiwib3V0ZXJXaWR0aCIsImNsaWVudFdpZHRoIiwiX3RoaXM3Iiwic3RvcFByb3BhZ2F0aW9uIiwiJHRhcmdldCIsInR5cGUiLCJhdHRyIiwidGFyZ2V0IiwiaW1hZ2VHYWxsZXJ5IiwicHJvZHVjdERldGFpbHMiLCIkcHJvZHVjdFZpZXciLCJkYXRhIiwic2VsZWN0TmV3SW1hZ2UiLCJjaGFuZ2VNYWluSW1hZ2VNYW51YWxseSIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsIiRtYWluSW1hZ2UiLCIkbWFpbkltYWdlQ29udGFpbmVyIiwibmV3SW1hZ2VVcmwiLCJuZXdJbWFnZVNyY3NldCIsInpvb21JbWFnZVVybCIsImltYWdlQWx0IiwiaW1hZ2VJbmRleCIsInNyYyIsInNyY3NldCIsImFsdCIsInRpdGxlIiwiJHpvb21Db250YWluZXIiLCJfdGhpczgiLCJzdGFydFgiLCJzdGFydFkiLCJpc1Njcm9sbGluZyIsIm9yaWdpbmFsRXZlbnQiLCJ0b3VjaCIsInRvdWNoZXMiLCJkZWx0YVgiLCJkZWx0YVkiLCJhYnMiLCJ0cmFuc2xhdGVYIiwiY2hhbmdlZFRvdWNoZXMiLCJtaW5Td2lwZURpc3RhbmNlIiwibmF2aWdhdGVUb0ltYWdlIiwibW91c2VEb3duIiwibW91c2VTdGFydFgiLCJtb3VzZVN0YXJ0WSIsImRpcmVjdGlvbiIsIiRhbGxUaHVtYm5haWxzIiwiJGN1cnJlbnRBY3RpdmUiLCJmaWx0ZXIiLCIkbmV4dFRodW1ibmFpbCIsImZpcnN0IiwiY3VycmVudEluZGV4IiwibmV4dEluZGV4IiwiZXEiLCJwcmV2SW5kZXgiLCJjbGlja0V2ZW50IiwiRXZlbnQiLCJ0ZXN0U3dpcGUiLCJzcGxpdExheW91dENhcm91c2VsIiwiUHJvZHVjdCIsIl9QYWdlTWFuYWdlciIsInVybCIsImxvY2F0aW9uIiwiaHJlZiIsIiRyZXZpZXdMaW5rIiwiJGJ1bGtQcmljaW5nTGluayIsInJldmlld01vZGFsIiwibW9kYWxGYWN0b3J5IiwiX2luaGVyaXRzTG9vc2UiLCJvblJlYWR5IiwiaW5kZXhPZiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJwYXRobmFtZSIsInZhbGlkYXRvciIsImNvbGxhcHNpYmxlRmFjdG9yeSIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCJidWxrUHJpY2luZ0hhbmRsZXIiLCIkcmV2aWV3Rm9ybSIsImNsYXNzaWZ5Rm9ybSIsImR1YWxQYW5lbFNjcm9sbCIsIkR1YWxQYW5lbFNjcm9sbCIsInJldmlldyIsIlJldmlldyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiJGZvcm0iLCJfIiwiaW5wdXQiLCIkaW5wdXQiLCJtc2dTcGFuSWQiLCJzaWJsaW5ncyIsInRyaWdnZXIiLCJQYWdlTWFuYWdlciIsIlZpZGVvR2FsbGVyeSIsIiRlbGVtZW50IiwiJHBsYXllciIsIiR2aWRlb3MiLCJjdXJyZW50VmlkZW8iLCJiaW5kRXZlbnRzIiwic2VsZWN0TmV3VmlkZW8iLCJpZCIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQSxJQVFxQkEsZ0JBQWdCO0VBQ2pDLFNBQUFBLGlCQUFBLEVBQWM7SUFDVixJQUFJLENBQUNDLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7SUFDaEUsSUFBSSxDQUFDQyxZQUFZLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBRTVELElBQUksQ0FBQyxJQUFJLENBQUNGLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQ0csWUFBWSxFQUFFO01BQ3ZDO0lBQ0o7SUFFQSxJQUFJLENBQUNDLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQ0MsT0FBTztJQUNqRSxJQUFJLENBQUNDLElBQUksQ0FBQyxDQUFDO0VBQ2Y7RUFBQyxJQUFBQyxNQUFBLEdBQUFWLGdCQUFBLENBQUFXLFNBQUE7RUFBQUQsTUFBQSxDQUVERCxJQUFJLEdBQUosU0FBQUEsSUFBSUEsQ0FBQSxFQUFHO0lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQ0osU0FBUyxFQUFFO01BQ2pCLElBQUksQ0FBQ08sa0JBQWtCLENBQUMsQ0FBQztNQUN6QjtJQUNKOztJQUVBO0lBQ0FWLFFBQVEsQ0FBQ1csSUFBSSxDQUFDQyxLQUFLLENBQUNDLFFBQVEsR0FBRyxNQUFNOztJQUVyQztJQUNBVCxNQUFNLENBQUNVLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUNDLFlBQVksQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUUvRDtJQUNBLElBQUksQ0FBQ0MsbUJBQW1CLENBQUMsQ0FBQzs7SUFFMUI7SUFD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QUFBLE9BQUE4TixZQUFBO0FBQUE7QUFHVSxTQUFTckIsWUFBWUEsQ0FBQSxFQUFHO0VBQ25DLElBQU1nQyxTQUFTLEdBQUcsZUFBZTtFQUNqQyxJQUFNQyxhQUFhLEdBQUc3TixDQUFDLFlBQVU0TixTQUFTLE1BQUcsQ0FBQztFQUU5Q0MsYUFBYSxDQUFDMUssSUFBSSxDQUFDLFVBQUNPLEtBQUssRUFBRW9LLE9BQU8sRUFBSztJQUNuQyxJQUFNQyxHQUFHLEdBQUcvTixDQUFDLENBQUM4TixPQUFPLENBQUM7SUFDdEIsSUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUN2RyxJQUFJLENBQUNvRyxTQUFTLENBQUMsWUFBWVgsWUFBWTtJQUVqRSxJQUFJZSxhQUFhLEVBQUU7TUFDZjtJQUNKO0lBRUFELEdBQUcsQ0FBQ3ZHLElBQUksQ0FBQ29HLFNBQVMsRUFBRSxJQUFJWCxZQUFZLENBQUNjLEdBQUcsQ0FBQyxDQUFDO0VBQzlDLENBQUMsQ0FBQztBQUNOLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE5hdHVyYWwgRHVhbCBQYW5lbCBCZWhhdmlvclxuICogLSBVc2VzIENTUyBzdGlja3kgcG9zaXRpb25pbmcgZm9yIG5hdHVyYWwgZmxvd1xuICogLSBSaWdodCBwYW5lbCBzdGlja3MgdW50aWwgaXRzIGNvbnRlbnQgZW5kc1xuICogLSBQYWdlIGZsb3dzIG5hdHVyYWxseTogaGVhZGVyIC0+IGR1YWwtcGFuZWwgLT4gcmVsYXRlZCBwcm9kdWN0cyAtPiBmb290ZXJcbiAqIC0gTm8gYXJ0aWZpY2lhbCBcInVubG9ja2luZ1wiIG9yIGNvbXBsZXggc2Nyb2xsIG1hbmFnZW1lbnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXR1cmFsRHVhbFBhbmVsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHVhbC1wYW5lbC1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5kZXRhaWxzUGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscy1wYW5lbCcpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lciB8fCAhdGhpcy5kZXRhaWxzUGFuZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNEZXNrdG9wID0gd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDEwMjVweCknKS5tYXRjaGVzO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEZXNrdG9wKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZU1vYmlsZUxheW91dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5hYmxlIG5hdHVyYWwgc2Nyb2xsaW5nIC0gbm8gYXJ0aWZpY2lhbCBzY3JvbGwgYmxvY2tpbmdcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICAgICAgXG4gICAgICAgIC8vIEhhbmRsZSB3aW5kb3cgcmVzaXplXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEVuc3VyZSBwcm9wZXIgc3RpY2t5IGJlaGF2aW9yXG4gICAgICAgIHRoaXMuc2V0dXBTdGlja3lCZWhhdmlvcigpO1xuICAgICAgICBcbiAgICAgICAgLy8gU2V0dXAgcXVhbnRpdHkgc2VsZWN0b3IgZnVuY3Rpb25zXG4gICAgICAgIHRoaXMuc2V0dXBRdWFudGl0eVNlbGVjdG9yKCk7XG4gICAgfVxuXG4gICAgc2V0dXBTdGlja3lCZWhhdmlvcigpIHtcbiAgICAgICAgLy8gRW5zdXJlIHRoZSBzdGlja3kgcG9zaXRpb25pbmcgd29ya3MgY29ycmVjdGx5XG4gICAgICAgIC8vIGJ5IG1ha2luZyBzdXJlIHRoZSBwYXJlbnQgaGFzIHByb3BlciBoZWlnaHRcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXR1cFF1YW50aXR5U2VsZWN0b3IoKSB7XG4gICAgICAgIC8vIFRoZSB0aGVtZSdzIG5hdGl2ZSBxdWFudGl0eSBzZWxlY3RvciB1c2VzIGRhdGEtcXVhbnRpdHktY2hhbmdlXG4gICAgICAgIC8vIGFuZCBpcyBoYW5kbGVkIGJ5IHRoZSBwcm9kdWN0LWRldGFpbHMuanMgbGlzdGVuUXVhbnRpdHlDaGFuZ2UoKSBtZXRob2RcbiAgICAgICAgLy8gV2UganVzdCBuZWVkIHRvIGVuc3VyZSBpdCB3b3JrcyBwcm9wZXJseSBpbiBvdXIgc3BsaXQgbGF5b3V0XG4gICAgICAgIFxuICAgICAgICBjb25zdCBxdWFudGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1YW50aXR5LWNoYW5nZV0nKTtcbiAgICAgICAgaWYgKHF1YW50aXR5Q29udGFpbmVyKSB7XG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhlIG5hdGl2ZSB0aGVtZSBmdW5jdGlvbmFsaXR5IGlzIHByb3Blcmx5IGluaXRpYWxpemVkXG4gICAgICAgICAgICAvLyBUaGUgdGhlbWUgaGFuZGxlcyB0aGlzIGF1dG9tYXRpY2FsbHkgdGhyb3VnaCBwcm9kdWN0LWRldGFpbHMuanNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuYWJsZU1vYmlsZUxheW91dCgpIHtcbiAgICAgICAgLy8gRm9yIG1vYmlsZSAtIGVuc3VyZSBub3JtYWwgZG9jdW1lbnQgZmxvd1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmRldGFpbHNQYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5kZXRhaWxzUGFuZWwuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgdGhpcy5kZXRhaWxzUGFuZWwuc3R5bGUudG9wID0gJ2F1dG8nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzaXplKCkge1xuICAgICAgICBjb25zdCB3YXNEZXNrdG9wID0gdGhpcy5pc0Rlc2t0b3A7XG4gICAgICAgIHRoaXMuaXNEZXNrdG9wID0gd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDEwMjVweCknKS5tYXRjaGVzO1xuICAgICAgICBcbiAgICAgICAgaWYgKHdhc0Rlc2t0b3AgIT09IHRoaXMuaXNEZXNrdG9wKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSB3aGVuIERPTSBpcyByZWFkeVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBuZXcgTmF0dXJhbER1YWxQYW5lbCgpO1xufSk7XG4iLCIvKipcbiAqIEludHVpdFNvbHV0aW9ucyAtIEN1c3RvbSBKUyB0aGF0IGZpcmVzIG9uIHRoZSBQRFBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJVFNQcm9kdWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBTcGxpdCBMYXlvdXQgQ2Fyb3VzZWwgT3ZlcnJpZGVcbiAqIEZvcmNlcyB2ZXJ0aWNhbCB0aHVtYm5haWwgbGF5b3V0IGZvciBzcGxpdCBsYXlvdXQgcHJvZHVjdCBwYWdlc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwbGl0TGF5b3V0Q2Fyb3VzZWwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRDYXJvdXNlbE92ZXJyaWRlKCk7XG4gICAgICAgIHRoaXMuaW5pdCgpOyAvLyBJbml0aWFsaXplIHRlc3QgaGVscGVyc1xuICAgIH1cblxuICAgIGluaXRDYXJvdXNlbE92ZXJyaWRlKCkge1xuICAgICAgICAvLyBQcmUtRE9NIHJlYWR5IHNldHVwIGZvciBzcGxpdCBsYXlvdXRzIHRvIHByZXZlbnQgRk9VQ1xuICAgICAgICB0aGlzLnNldHVwUHJlSW5pdGlhbGl6YXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFdhaXQgZm9yIERPTSB0byBiZSByZWFkeVxuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRE9NIHJlYWR5LCBpbml0aWFsaXppbmcgc3BsaXQgbGF5b3V0IGNhcm91c2VsJyk7XG4gICAgICAgICAgICB0aGlzLmVuZm9yY2VWZXJ0aWNhbExheW91dCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBSZS1lbmZvcmNlIGFmdGVyIGFueSBzbGljayBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlLWVuZm9yY2luZyBsYXlvdXQgYWZ0ZXIgNTAwbXMgZGVsYXknKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZm9yY2VWZXJ0aWNhbExheW91dCgpO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWxzbyBlbmZvcmNlIGFmdGVyIHdpbmRvdyByZXNpemVcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZm9yY2VWZXJ0aWNhbExheW91dCgpO1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2V0IHVwIGEgZmFsbGJhY2sgdG8gZW5zdXJlIGhhbmRsZXJzIGFyZSBhbHdheXMgc2V0IHVwXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2V0dGluZyB1cCBhZGRpdGlvbmFsIG5hdmlnYXRpb24gaGFuZGxlcnMnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTmF2aWdhdGlvbkhhbmRsZXJzKCQoJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQnKSk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2V0IHVwIHN3aXBlIGZ1bmN0aW9uYWxpdHkgYWZ0ZXIgYSBkZWxheSB0byBlbnN1cmUgZXZlcnl0aGluZyBpcyBsb2FkZWRcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZXR0aW5nIHVwIHN3aXBlIGZ1bmN0aW9uYWxpdHknKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTWFpbkltYWdlU3dpcGUoKTtcbiAgICAgICAgICAgIH0sIDEyMDApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgc2V0dXBQcmVJbml0aWFsaXphdGlvbigpIHtcbiAgICAgICAgLy8gRWFybHkgaW50ZXJ2ZW50aW9uIGJlZm9yZSBET00gcmVhZHkgZm9yIHNwbGl0IGxheW91dHNcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZUluaXRpYWxpemVMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVyY2VwdFNsaWNrSW5pdGlhbGl6YXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVJbml0aWFsaXplTGF5b3V0KCk7XG4gICAgICAgICAgICB0aGlzLmludGVyY2VwdFNsaWNrSW5pdGlhbGl6YXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpbnRlcmNlcHRTbGlja0luaXRpYWxpemF0aW9uKCkge1xuICAgICAgICAvLyBPdmVycmlkZSBTbGljayBpbml0aWFsaXphdGlvbiBmb3Igc3BsaXQgbGF5b3V0cyB0byBwcmV2ZW50IHNpemUganVtcGluZ1xuICAgICAgICBjb25zdCBvcmlnaW5hbFNsaWNrID0gJC5mbi5zbGljaztcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICAkLmZuLnNsaWNrID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBpcyBhIHNwbGl0IGxheW91dCB0aHVtYm5haWwgY2Fyb3VzZWxcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NsYXNzKCdwcm9kdWN0Vmlldy10aHVtYm5haWxzJykgJiYgdGhpcy5jbG9zZXN0KCcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnRlcmNlcHRpbmcgU2xpY2sgaW5pdGlhbGl6YXRpb24gZm9yIHNwbGl0IGxheW91dCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEFwcGx5IG91ciBmaXhlcyBCRUZPUkUgU2xpY2sgaW5pdGlhbGl6ZXNcbiAgICAgICAgICAgICAgICBzZWxmLmFwcGx5SW1tZWRpYXRlTGF5b3V0Rml4ZXModGhpcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gT3ZlcnJpZGUgU2xpY2sgb3B0aW9ucyBmb3Igc3BsaXQgbGF5b3V0XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BsaXRMYXlvdXRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogd2luZG93LmlubmVyV2lkdGggPiA3NjgsXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsU3dpcGluZzogd2luZG93LmlubmVyV2lkdGggPiA3NjhcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgU2xpY2sgd2l0aCBvdXIgb3B0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsU2xpY2suY2FsbCh0aGlzLCBzcGxpdExheW91dE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEFwcGx5IG91ciBmaXhlcyBBRlRFUiBTbGljayBpbml0aWFsaXplc1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuZm9yY2VWZXJ0aWNhbExheW91dCgpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEZvciBub24tc3BsaXQgbGF5b3V0IGNhcm91c2VscywgdXNlIG9yaWdpbmFsIFNsaWNrXG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxTbGljay5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gQ29weSBvdmVyIGFueSBzdGF0aWMgcHJvcGVydGllc1xuICAgICAgICBPYmplY3Qua2V5cyhvcmlnaW5hbFNsaWNrKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAkLmZuLnNsaWNrW2tleV0gPSBvcmlnaW5hbFNsaWNrW2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcmVJbml0aWFsaXplTGF5b3V0KCkge1xuICAgICAgICAvLyBBcHBseSBpbml0aWFsIHN0eWxlcyBiZWZvcmUgU2xpY2sgaGFzIGEgY2hhbmNlIHRvIGluaXRpYWxpemVcbiAgICAgICAgY29uc3QgJHNwbGl0TGF5b3V0ID0gJCgnLnByb2R1Y3RWaWV3LnNwbGl0LWxheW91dCcpO1xuICAgICAgICBpZiAoJHNwbGl0TGF5b3V0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgJHRodW1ibmFpbHMgPSAkc3BsaXRMYXlvdXQuZmluZCgnLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnKTtcbiAgICAgICAgaWYgKCR0aHVtYm5haWxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ1ByZS1pbml0aWFsaXppbmcgc3BsaXQgbGF5b3V0IGJlZm9yZSBTbGljayBpbml0aWFsaXphdGlvbicpO1xuICAgICAgICBcbiAgICAgICAgLy8gU2V0IHVwIGV2ZW50IGxpc3RlbmVycyB0byBpbnRlcmNlcHQgU2xpY2sgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgJHRodW1ibmFpbHMub24oJ2JlZm9yZUNoYW5nZS5zcGxpdExheW91dCcsIChldmVudCwgc2xpY2spID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTbGljayBiZWZvcmVDaGFuZ2UgZXZlbnQgaW50ZXJjZXB0ZWQnKTtcbiAgICAgICAgICAgIHRoaXMuZW5mb3JjZVZlcnRpY2FsTGF5b3V0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQXBwbHkgaW1tZWRpYXRlIGxheW91dCBmaXhlc1xuICAgICAgICB0aGlzLmFwcGx5SW1tZWRpYXRlTGF5b3V0Rml4ZXMoJHRodW1ibmFpbHMpO1xuICAgICAgICBcbiAgICAgICAgLy8gU2V0IHVwIHRodW1ibmFpbCBjbGljayBoYW5kbGVycyBlYXJseSB0byBvdmVycmlkZSBkZWZhdWx0IGJlaGF2aW9yXG4gICAgICAgIHRoaXMuc2V0dXBUaHVtYm5haWxDbGlja0hhbmRsZXJzKCQoJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQnKSk7XG4gICAgICAgIFxuICAgICAgICAvLyBEaXNhYmxlIGhvdmVyIGJlaGF2aW9yIGVhcmx5IHRvIHByZXZlbnQgdW53YW50ZWQgaW1hZ2UgY2hhbmdlc1xuICAgICAgICB0aGlzLmRpc2FibGVUaHVtYm5haWxIb3ZlcigkKCcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0JykpO1xuICAgICAgICBcbiAgICAgICAgLy8gU2V0IHVwIG1haW4gaW1hZ2Ugc3dpcGUgZm9yIG1vYmlsZVxuICAgICAgICB0aGlzLnNldHVwTWFpbkltYWdlU3dpcGUoKTtcbiAgICB9XG4gICAgXG4gICAgYXBwbHlJbW1lZGlhdGVMYXlvdXRGaXhlcygkdGh1bWJuYWlscykge1xuICAgICAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2ODtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdBcHBseWluZyBpbW1lZGlhdGUgbGF5b3V0IGZpeGVzIGZvciBzcGxpdCBsYXlvdXQgLSBBR0dSRVNTSVZFIE1PREUnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFwcGx5IHByZS1pbml0aWFsaXphdGlvbiBzdHlsZXMgdG8gcHJldmVudCBGT1VDXG4gICAgICAgICR0aHVtYm5haWxzLmNzcyh7XG4gICAgICAgICAgICAnb3BhY2l0eSc6ICcxJyxcbiAgICAgICAgICAgICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLFxuICAgICAgICAgICAgJ3dpZHRoJzogaXNNb2JpbGUgPyAnMTAwJScgOiAnODBweCcsXG4gICAgICAgICAgICAnbWluLXdpZHRoJzogaXNNb2JpbGUgPyAnMTAwJScgOiAnODBweCcsXG4gICAgICAgICAgICAnbWF4LXdpZHRoJzogaXNNb2JpbGUgPyAnbm9uZScgOiAnODBweCdcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBR0dSRVNTSVZFTFkgcHJlLXNldCBBTEwgcG9zc2libGUgdGh1bWJuYWlsIGltYWdlIHNlbGVjdG9yc1xuICAgICAgICBjb25zdCBpbWFnZVNlbGVjdG9ycyA9IFtcbiAgICAgICAgICAgICdpbWcnLFxuICAgICAgICAgICAgJ2xpIGltZycsIFxuICAgICAgICAgICAgJy5zbGljay1zbGlkZSBpbWcnLFxuICAgICAgICAgICAgJy5wcm9kdWN0Vmlldy10aHVtYm5haWwgaW1nJyxcbiAgICAgICAgICAgICcucHJvZHVjdFZpZXctdGh1bWJuYWlsLWxpbmsgaW1nJ1xuICAgICAgICBdO1xuICAgICAgICBcbiAgICAgICAgaW1hZ2VTZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICAgICAgICAkdGh1bWJuYWlscy5maW5kKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIEZvcmNlIGltbWVkaWF0ZSBzaXppbmcgd2l0aCBoaWdoIHByaW9yaXR5XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnd2lkdGgnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdtaW4td2lkdGgnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdtaW4taGVpZ2h0JywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWF4LXdpZHRoJywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWF4LWhlaWdodCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ29iamVjdC1maXQnLCAnY292ZXInLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgndHJhbnNpdGlvbicsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFNldCBhdHRyaWJ1dGVzIHRvIHByZXZlbnQgYW55IGF1dG9tYXRpYyByZXNpemluZ1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsICc4MCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnODAnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIFByZS1jb25maWd1cmUgU2xpY2sgY29udGFpbmVycyBpZiB0aGV5IGV4aXN0XG4gICAgICAgIGNvbnN0ICRzbGlja0xpc3QgPSAkdGh1bWJuYWlscy5maW5kKCcuc2xpY2stbGlzdCcpO1xuICAgICAgICBpZiAoJHNsaWNrTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkc2xpY2tMaXN0LmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnd2lkdGgnLCBpc01vYmlsZSA/ICcxMDAlJyA6ICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ2hlaWdodCcsIGlzTW9iaWxlID8gJzgwcHgnIDogJ2F1dG8nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnb3ZlcmZsb3cteCcsIGlzTW9iaWxlID8gJ2F1dG8nIDogJ2hpZGRlbicsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdvdmVyZmxvdy15JywgaXNNb2JpbGUgPyAnaGlkZGVuJyA6ICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0ICRzbGlja1RyYWNrID0gJHRodW1ibmFpbHMuZmluZCgnLnNsaWNrLXRyYWNrJyk7XG4gICAgICAgIGlmICgkc2xpY2tUcmFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkc2xpY2tUcmFjay5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnZmxleCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdmbGV4LWRpcmVjdGlvbicsIGlzTW9iaWxlID8gJ3JvdycgOiAnY29sdW1uJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgaXNNb2JpbGUgPyAnYXV0bycgOiAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCBpc01vYmlsZSA/ICc4MHB4JyA6ICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3RyYW5zZm9ybScsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ2xlZnQnLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd0b3AnLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdnYXAnLCBpc01vYmlsZSA/ICcxMnB4JyA6ICc4cHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ0FwcGxpZWQgaW1tZWRpYXRlIGxheW91dCBmaXhlcyBmb3Igc3BsaXQgbGF5b3V0IC0gQ09NUExFVEUnKTtcbiAgICB9XG5cbiAgICBlbmZvcmNlVmVydGljYWxMYXlvdXQoKSB7XG4gICAgICAgIGNvbnN0ICRzcGxpdExheW91dCA9ICQoJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICgkc3BsaXRMYXlvdXQubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBjb25zdCAkdGh1bWJuYWlscyA9ICRzcGxpdExheW91dC5maW5kKCcucHJvZHVjdFZpZXctdGh1bWJuYWlscycpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCR0aHVtYm5haWxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIEZPUkNFIEhJREUgQUxMIFNMSUNLIEFSUk9XU1xuICAgICAgICAkdGh1bWJuYWlscy5maW5kKCcuc2xpY2stcHJldiwgLnNsaWNrLW5leHQsIC5zbGljay1hcnJvdywgYnV0dG9uLnNsaWNrLXByZXYsIGJ1dHRvbi5zbGljay1uZXh0LCBidXR0b24uc2xpY2stYXJyb3cnKS5yZW1vdmUoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIElNTUVESUFURSBGSVg6IEZvcmNlIHRodW1ibmFpbCBpbWFnZSBzaXplcyBiZWZvcmUgYW55IG90aGVyIHByb2Nlc3NpbmdcbiAgICAgICAgJHRodW1ibmFpbHMuZmluZCgnaW1nJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ21pbi13aWR0aCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWluLWhlaWdodCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWF4LXdpZHRoJywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdtYXgtaGVpZ2h0JywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3Njg7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhgRW5mb3JjaW5nIGxheW91dCBmb3Igc3BsaXQgbGF5b3V0IC0gTW9iaWxlOiAke2lzTW9iaWxlfWApO1xuICAgICAgICBcbiAgICAgICAgLy8gQWxsIHByb2R1Y3RzIG5vdyB1c2UgU2xpY2sgbW9kZSAtIGFwcGx5IGxheW91dCBiYXNlZCBvbiBzY3JlZW4gc2l6ZVxuICAgICAgICBjb25zdCAkc2xpY2tUcmFjayA9ICR0aHVtYm5haWxzLmZpbmQoJy5zbGljay10cmFjaycpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCRzbGlja1RyYWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgICAgICAgICAgIC8vIE1vYmlsZTogaG9yaXpvbnRhbCBsYXlvdXRcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdmbGV4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdmbGV4LWRpcmVjdGlvbicsICdyb3cnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ2hlaWdodCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdnYXAnLCAnMTJweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgndHJhbnNmb3JtJywgJ25vbmUnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ2xlZnQnLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgndG9wJywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ21hcmdpbicsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdwYWRkaW5nJywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gRm9yY2UgaW5kaXZpZHVhbCBzbGlkZXMgdG8gYmUgaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrLmZpbmQoJy5zbGljay1zbGlkZScpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdpbmxpbmUtYmxvY2snLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ2hlaWdodCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdtYXJnaW4tYm90dG9tJywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ21hcmdpbi1yaWdodCcsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdmbG9hdCcsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd0cmFuc2Zvcm0nLCAnbm9uZScsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbGVmdCcsICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd0b3AnLCAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgncG9zaXRpb24nLCAncmVsYXRpdmUnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERlc2t0b3A6IHZlcnRpY2FsIGxheW91dFxuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2ZsZXgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ2ZsZXgtZGlyZWN0aW9uJywgJ2NvbHVtbicsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgJ2F1dG8nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ2dhcCcsICc4cHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ3RyYW5zZm9ybScsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdsZWZ0JywgJzAnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2tbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ3RvcCcsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja1RyYWNrWzBdLnN0eWxlLnNldFByb3BlcnR5KCdtYXJnaW4nLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tUcmFja1swXS5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZycsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEZvcmNlIGluZGl2aWR1YWwgc2xpZGVzIHRvIGJlIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgJHNsaWNrVHJhY2suZmluZCgnLnNsaWNrLXNsaWRlJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2Jsb2NrJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsICc4MHB4JywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScsICc4cHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoJ21hcmdpbi1yaWdodCcsICcwJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCdmbG9hdCcsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd0cmFuc2Zvcm0nLCAnbm9uZScsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgnbGVmdCcsICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KCd0b3AnLCAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eSgncG9zaXRpb24nLCAncmVsYXRpdmUnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIG1hcmdpbiBmcm9tIGxhc3Qgc2xpZGVcbiAgICAgICAgICAgICAgICBjb25zdCAkbGFzdFNsaWRlID0gJHNsaWNrVHJhY2suZmluZCgnLnNsaWNrLXNsaWRlOmxhc3QtY2hpbGQnKTtcbiAgICAgICAgICAgICAgICBpZiAoJGxhc3RTbGlkZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRsYXN0U2xpZGVbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ21hcmdpbi1ib3R0b20nLCAnMCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAvLyBBbHNvIGZvcmNlIHRoZSBzbGljay1saXN0IGNvbnRhaW5lclxuICAgICAgICBjb25zdCAkc2xpY2tMaXN0ID0gJHRodW1ibmFpbHMuZmluZCgnLnNsaWNrLWxpc3QnKTtcbiAgICAgICAgaWYgKCRzbGlja0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGlzTW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgLy8gTW9iaWxlOiBmdWxsIHdpZHRoLCBob3Jpem9udGFsIHNjcm9sbFxuICAgICAgICAgICAgICAgICRzbGlja0xpc3RbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgJzEwMCUnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdFswXS5zdHlsZS5zZXRQcm9wZXJ0eSgnaGVpZ2h0JywgJzgwcHgnLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdFswXS5zdHlsZS5zZXRQcm9wZXJ0eSgnb3ZlcmZsb3cteCcsICdhdXRvJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgICRzbGlja0xpc3RbMF0uc3R5bGUuc2V0UHJvcGVydHkoJ292ZXJmbG93LXknLCAnaGlkZGVuJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBEZXNrdG9wOiBmaXhlZCB3aWR0aCwgdmVydGljYWwgc2Nyb2xsXG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdFswXS5zdHlsZS5zZXRQcm9wZXJ0eSgnd2lkdGgnLCAnODBweCcsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tMaXN0WzBdLnN0eWxlLnNldFByb3BlcnR5KCdoZWlnaHQnLCAnYXV0bycsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tMaXN0WzBdLnN0eWxlLnNldFByb3BlcnR5KCdvdmVyZmxvdy14JywgJ2hpZGRlbicsICdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICAkc2xpY2tMaXN0WzBdLnN0eWxlLnNldFByb3BlcnR5KCdvdmVyZmxvdy15JywgJ2F1dG8nLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIExpc3RlbiBmb3Igc2xpY2sgZXZlbnRzIChhbGwgcHJvZHVjdHMgdXNlIFNsaWNrIG5vdylcbiAgICAgICAgLy8gSWYgc2xpY2sgaXNuJ3QgaW5pdGlhbGl6ZWQgeWV0LCBsaXN0ZW4gZm9yIGl0XG4gICAgICAgICR0aHVtYm5haWxzLm9uKCdpbml0JywgKGV2ZW50LCBzbGljaykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NsaWNrIGNhcm91c2VsIGluaXRpYWxpemVkLCBlbmZvcmNpbmcgbGF5b3V0Jyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZm9yY2VWZXJ0aWNhbExheW91dCgpO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFsc28gbGlzdGVuIGZvciByZUluaXRcbiAgICAgICAgJHRodW1ibmFpbHMub24oJ3JlSW5pdCcsIChldmVudCwgc2xpY2spID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTbGljayBjYXJvdXNlbCByZWluaXRpYWxpemVkLCBlbmZvcmNpbmcgbGF5b3V0Jyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZm9yY2VWZXJ0aWNhbExheW91dCgpO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIExpc3RlbiBmb3IgYnJlYWtwb2ludCBjaGFuZ2VzXG4gICAgICAgICR0aHVtYm5haWxzLm9uKCdicmVha3BvaW50JywgKGV2ZW50LCBzbGljaykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NsaWNrIGNhcm91c2VsIGJyZWFrcG9pbnQgY2hhbmdlZCwgZW5mb3JjaW5nIGxheW91dCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmZvcmNlVmVydGljYWxMYXlvdXQoKTtcbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgY2xpY2sgaGFuZGxlcnMgZm9yIGN1c3RvbSBuYXZpZ2F0aW9uIGFycm93c1xuICAgICAgICB0aGlzLnNldHVwTmF2aWdhdGlvbkhhbmRsZXJzKCRzcGxpdExheW91dCk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgbW9iaWxlLXNwZWNpZmljIGhhbmRsZXJzXG4gICAgICAgIHRoaXMuc2V0dXBNb2JpbGVIYW5kbGVycygkc3BsaXRMYXlvdXQpO1xuICAgICAgICBcbiAgICAgICAgLy8gT3ZlcnJpZGUgdGh1bWJuYWlsIGNsaWNrIGJlaGF2aW9yIGZvciBzcGxpdCBsYXlvdXRcbiAgICAgICAgdGhpcy5zZXR1cFRodW1ibmFpbENsaWNrSGFuZGxlcnMoJHNwbGl0TGF5b3V0KTtcbiAgICAgICAgXG4gICAgICAgIC8vIERpc2FibGUgaG92ZXIgYmVoYXZpb3IgZm9yIHNwbGl0IGxheW91dCB0aHVtYm5haWxzXG4gICAgICAgIHRoaXMuZGlzYWJsZVRodW1ibmFpbEhvdmVyKCRzcGxpdExheW91dCk7XG4gICAgICAgIFxuICAgICAgICAvLyBTZXQgdXAgbWFpbiBpbWFnZSBzd2lwZSBmb3IgbW9iaWxlXG4gICAgICAgIHRoaXMuc2V0dXBNYWluSW1hZ2VTd2lwZSgpO1xuICAgICAgICBcbiAgICAgICAgLy8gVXBkYXRlIGhhbmRsZXJzIG9uIHdpbmRvdyByZXNpemVcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTW9iaWxlSGFuZGxlcnMoJHNwbGl0TGF5b3V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTWFpbkltYWdlU3dpcGUoKTsgLy8gUmUtc2V0dXAgc3dpcGUgb24gcmVzaXplXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgc2V0dXBOYXZpZ2F0aW9uSGFuZGxlcnMoJHNwbGl0TGF5b3V0KSB7XG4gICAgICAgIGNvbnN0ICR0aHVtYm5haWxzID0gJHNwbGl0TGF5b3V0LmZpbmQoJy5wcm9kdWN0Vmlldy10aHVtYm5haWxzJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnU2V0dGluZyB1cCBuYXZpZ2F0aW9uIGhhbmRsZXJzIGZvciBzcGxpdCBsYXlvdXQgLSBwc2V1ZG8tZWxlbWVudCBjbGljayBkZXRlY3Rpb24nKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZvdW5kIHNwbGl0IGxheW91dCBjb250YWluZXJzOicsICRzcGxpdExheW91dC5sZW5ndGgpO1xuICAgICAgICBjb25zb2xlLmxvZygnRm91bmQgdGh1bWJuYWlsIGNvbnRhaW5lcnM6JywgJHRodW1ibmFpbHMubGVuZ3RoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVzZSBkb2N1bWVudC1sZXZlbCBkZWxlZ2F0aW9uIHRvIGNhcHR1cmUgY2xpY2tzIG9uIHRoZSB0aHVtYm5haWwgY29udGFpbmVyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2suc3BsaXQtbGF5b3V0LXBzZXVkbycpO1xuICAgICAgICBcbiAgICAgICAgLy8gSGFuZGxlIGNsaWNrcyBvbiB0aGUgdGh1bWJuYWlscyBjb250YWluZXIgdG8gZGV0ZWN0IHBzZXVkby1lbGVtZW50IGFyZWFzXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljay5zcGxpdC1sYXlvdXQtcHNldWRvJywgJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQgLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCAkY29udGFpbmVyID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9ICRjb250YWluZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBjbGlja1kgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJUb3AgPSBjb250YWluZXJSZWN0LnRvcDtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckJvdHRvbSA9IGNvbnRhaW5lclJlY3QuYm90dG9tO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBEZWZpbmUgYXJyb3cgYXJlYXMgLSB0b3AgNDBweCBhbmQgYm90dG9tIDQwcHggb2YgY29udGFpbmVyXG4gICAgICAgICAgICBjb25zdCBhcnJvd0hlaWdodCA9IDQwO1xuICAgICAgICAgICAgY29uc3QgdXBBcnJvd0JvdHRvbSA9IGNvbnRhaW5lclRvcCArIGFycm93SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgZG93bkFycm93VG9wID0gY29udGFpbmVyQm90dG9tIC0gYXJyb3dIZWlnaHQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBkZXRlY3RlZCBvbiB0aHVtYm5haWxzIGNvbnRhaW5lcjonLCB7XG4gICAgICAgICAgICAgICAgY2xpY2tZLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclRvcCxcbiAgICAgICAgICAgICAgICBjb250YWluZXJCb3R0b20sXG4gICAgICAgICAgICAgICAgdXBBcnJvd0JvdHRvbSxcbiAgICAgICAgICAgICAgICBkb3duQXJyb3dUb3BcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudFNwbGl0TGF5b3V0ID0gJGNvbnRhaW5lci5jbG9zZXN0KCcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0Jyk7XG4gICAgICAgICAgICBjb25zdCAkc2xpY2tMaXN0ID0gJGNvbnRhaW5lci5maW5kKCcuc2xpY2stbGlzdCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoJHNsaWNrTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gc2xpY2stbGlzdCBmb3VuZCBmb3Igc2Nyb2xsaW5nJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjbGljayBpcyBpbiB0aGUgdXAgYXJyb3cgYXJlYSAoOjpiZWZvcmUpXG4gICAgICAgICAgICBpZiAoY2xpY2tZID49IGNvbnRhaW5lclRvcCAmJiBjbGlja1kgPD0gdXBBcnJvd0JvdHRvbSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVcCBhcnJvdyBhcmVhIGNsaWNrZWQgKDo6YmVmb3JlIHBzZXVkby1lbGVtZW50IGFyZWEpJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNjcm9sbFRvcCA9ICRzbGlja0xpc3Quc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsQW1vdW50ID0gODg7IC8vIHRodW1ibmFpbCBoZWlnaHQgKDgwcHgpICsgZ2FwICg4cHgpXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U2Nyb2xsVG9wID0gTWF0aC5tYXgoMCwgY3VycmVudFNjcm9sbFRvcCAtIHNjcm9sbEFtb3VudCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNjcm9sbGluZyB1cCBmcm9tICR7Y3VycmVudFNjcm9sbFRvcH0gdG8gJHtuZXdTY3JvbGxUb3B9YCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBuZXdTY3JvbGxUb3BcbiAgICAgICAgICAgICAgICB9LCAzMDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxBcnJvd1Zpc2liaWxpdHkoJGN1cnJlbnRTcGxpdExheW91dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjbGljayBpcyBpbiB0aGUgZG93biBhcnJvdyBhcmVhICg6OmFmdGVyKVxuICAgICAgICAgICAgZWxzZSBpZiAoY2xpY2tZID49IGRvd25BcnJvd1RvcCAmJiBjbGlja1kgPD0gY29udGFpbmVyQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rvd24gYXJyb3cgYXJlYSBjbGlja2VkICg6OmFmdGVyIHBzZXVkby1lbGVtZW50IGFyZWEpJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNjcm9sbFRvcCA9ICRzbGlja0xpc3Quc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsQW1vdW50ID0gODg7IC8vIHRodW1ibmFpbCBoZWlnaHQgKDgwcHgpICsgZ2FwICg4cHgpXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4U2Nyb2xsVG9wID0gJHNsaWNrTGlzdFswXS5zY3JvbGxIZWlnaHQgLSAkc2xpY2tMaXN0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U2Nyb2xsVG9wID0gTWF0aC5taW4obWF4U2Nyb2xsVG9wLCBjdXJyZW50U2Nyb2xsVG9wICsgc2Nyb2xsQW1vdW50KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU2Nyb2xsaW5nIGRvd24gZnJvbSAke2N1cnJlbnRTY3JvbGxUb3B9IHRvICR7bmV3U2Nyb2xsVG9wfSwgbWF4OiAke21heFNjcm9sbFRvcH1gKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkc2xpY2tMaXN0LmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG5ld1Njcm9sbFRvcFxuICAgICAgICAgICAgICAgIH0sIDMwMCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbEFycm93VmlzaWJpbGl0eSgkY3VycmVudFNwbGl0TGF5b3V0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIGluIG1pZGRsZSBhcmVhIC0gbm8gc2Nyb2xsIGFjdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSBhcnJvdyB2aXNpYmlsaXR5IHdoZW4gU2xpY2sgaXMgaW5pdGlhbGl6ZWRcbiAgICAgICAgJHRodW1ibmFpbHMub24oJ2luaXQnLCAoZXZlbnQsIHNsaWNrKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2xpY2sgaW5pdGlhbGl6ZWQsIHNldHRpbmcgdXAgc2Nyb2xsIGFycm93IHZpc2liaWxpdHknKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsQXJyb3dWaXNpYmlsaXR5KCRzcGxpdExheW91dCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQWxzbyBsaXN0ZW4gZm9yIHNjcm9sbCBldmVudHMgb24gdGhlIHNsaWNrLWxpc3RcbiAgICAgICAgICAgICAgICBjb25zdCAkc2xpY2tMaXN0ID0gJHNwbGl0TGF5b3V0LmZpbmQoJy5zbGljay1saXN0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCRzbGlja0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2xpY2tMaXN0Lm9uKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbEFycm93VmlzaWJpbGl0eSgkc3BsaXRMYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2Nyb2xsQXJyb3dWaXNpYmlsaXR5KCRzcGxpdExheW91dCkge1xuICAgICAgICBjb25zdCAkdGh1bWJuYWlscyA9ICRzcGxpdExheW91dC5maW5kKCcucHJvZHVjdFZpZXctdGh1bWJuYWlscycpO1xuICAgICAgICBjb25zdCAkc2xpY2tMaXN0ID0gJHNwbGl0TGF5b3V0LmZpbmQoJy5zbGljay1saXN0Jyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoJHNsaWNrTGlzdC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9ICRzbGlja0xpc3Quc2Nyb2xsVG9wKCk7XG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9ICRzbGlja0xpc3RbMF0uc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBjb25zdCBjbGllbnRIZWlnaHQgPSAkc2xpY2tMaXN0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgIGNvbnN0IG1heFNjcm9sbFRvcCA9IHNjcm9sbEhlaWdodCAtIGNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgaXNTY3JvbGxhYmxlID0gc2Nyb2xsSGVpZ2h0ID4gY2xpZW50SGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIHNjcm9sbCBhcnJvdyB2aXNpYmlsaXR5IGZvciBwc2V1ZG8tZWxlbWVudHM6Jywge1xuICAgICAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgbWF4U2Nyb2xsVG9wLFxuICAgICAgICAgICAgaXNTY3JvbGxhYmxlXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFpc1Njcm9sbGFibGUpIHtcbiAgICAgICAgICAgIC8vIE5vdCBzY3JvbGxhYmxlIC0gaGlkZSBib3RoIHBzZXVkby1lbGVtZW50IGFycm93c1xuICAgICAgICAgICAgJHRodW1ibmFpbHMucmVtb3ZlQ2xhc3MoJ2Nhbi1zY3JvbGwtdXAgY2FuLXNjcm9sbC1kb3duJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFNob3cvaGlkZSB1cCBhcnJvdyAoOjpiZWZvcmUpIGJhc2VkIG9uIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICBpZiAoc2Nyb2xsVG9wIDw9IDUpIHtcbiAgICAgICAgICAgIC8vIEF0IG9yIG5lYXIgdGhlIHRvcCAtIGhpZGUgdXAgYXJyb3dcbiAgICAgICAgICAgICR0aHVtYm5haWxzLnJlbW92ZUNsYXNzKCdjYW4tc2Nyb2xsLXVwJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBOb3QgYXQgdG9wIC0gc2hvdyB1cCBhcnJvd1xuICAgICAgICAgICAgJHRodW1ibmFpbHMuYWRkQ2xhc3MoJ2Nhbi1zY3JvbGwtdXAnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU2hvdy9oaWRlIGRvd24gYXJyb3cgKDo6YWZ0ZXIpIGJhc2VkIG9uIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICBpZiAoc2Nyb2xsVG9wID49IG1heFNjcm9sbFRvcCAtIDUpIHtcbiAgICAgICAgICAgIC8vIEF0IG9yIG5lYXIgdGhlIGJvdHRvbSAtIGhpZGUgZG93biBhcnJvd1xuICAgICAgICAgICAgJHRodW1ibmFpbHMucmVtb3ZlQ2xhc3MoJ2Nhbi1zY3JvbGwtZG93bicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm90IGF0IGJvdHRvbSAtIHNob3cgZG93biBhcnJvd1xuICAgICAgICAgICAgJHRodW1ibmFpbHMuYWRkQ2xhc3MoJ2Nhbi1zY3JvbGwtZG93bicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHNldHVwTW9iaWxlSGFuZGxlcnMoJHNwbGl0TGF5b3V0KSB7XG4gICAgICAgIC8vIE9ubHkgc2V0IHVwIG1vYmlsZSBoYW5kbGVycyBvbiBtb2JpbGUgZGV2aWNlc1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0ICR0aHVtYm5haWxzID0gJHNwbGl0TGF5b3V0LmZpbmQoJy5wcm9kdWN0Vmlldy10aHVtYm5haWxzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXR0aW5nIHVwIG1vYmlsZSBob3Jpem9udGFsIHNjcm9sbCBoYW5kbGVycycpO1xuICAgICAgICBcbiAgICAgICAgLy8gSGFuZGxlIGhvcml6b250YWwgc2Nyb2xsIGZvciBtb2JpbGVcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljay5tb2JpbGUtaG9yaXpvbnRhbCcpO1xuICAgICAgICBcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrLm1vYmlsZS1ob3Jpem9udGFsJywgJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQgLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnLCAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gT25seSBvbiBtb2JpbGVcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0ICRjb250YWluZXIgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJSZWN0ID0gJGNvbnRhaW5lclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IGNsaWNrWCA9IGUuY2xpZW50WCAtIGNvbnRhaW5lclJlY3QubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyUmVjdC53aWR0aDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRGVmaW5lIGNsaWNrIHpvbmVzIGZvciBob3Jpem9udGFsIHNjcm9sbGluZ1xuICAgICAgICAgICAgY29uc3QgYXJyb3dXaWR0aCA9IDQwOyAvLyBXaWR0aCBvZiB0aGUgaG9yaXpvbnRhbCBhcnJvd3NcbiAgICAgICAgICAgIGNvbnN0IGxlZnRBcnJvd1pvbmUgPSBhcnJvd1dpZHRoO1xuICAgICAgICAgICAgY29uc3QgcmlnaHRBcnJvd1pvbmUgPSBjb250YWluZXJXaWR0aCAtIGFycm93V2lkdGg7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNb2JpbGUgaG9yaXpvbnRhbCBjbGljayBkZXRlY3RlZDonLCB7XG4gICAgICAgICAgICAgICAgY2xpY2tYLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoLFxuICAgICAgICAgICAgICAgIGxlZnRBcnJvd1pvbmUsXG4gICAgICAgICAgICAgICAgcmlnaHRBcnJvd1pvbmVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCAkc2xpY2tMaXN0ID0gJGNvbnRhaW5lci5maW5kKCcuc2xpY2stbGlzdCcpO1xuICAgICAgICAgICAgaWYgKCRzbGlja0xpc3QubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjbGlja1ggPD0gbGVmdEFycm93Wm9uZSkge1xuICAgICAgICAgICAgICAgIC8vIENsaWNrZWQgaW4gbGVmdCBhcnJvdyBhcmVhIC0gc2Nyb2xsIGxlZnRcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTW9iaWxlIGxlZnQgYXJyb3cgYXJlYSBjbGlja2VkJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNjcm9sbExlZnQgPSAkc2xpY2tMaXN0LnNjcm9sbExlZnQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxBbW91bnQgPSA5MjsgLy8gdGh1bWJuYWlsIHdpZHRoICg4MHB4KSArIGdhcCAoMTJweClcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTY3JvbGxMZWZ0ID0gTWF0aC5tYXgoMCwgY3VycmVudFNjcm9sbExlZnQgLSBzY3JvbGxBbW91bnQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICRzbGlja0xpc3QuYW5pbWF0ZSh7IHNjcm9sbExlZnQ6IG5ld1Njcm9sbExlZnQgfSwgMzAwLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9iaWxlQXJyb3dWaXNpYmlsaXR5KCRzcGxpdExheW91dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsaWNrWCA+PSByaWdodEFycm93Wm9uZSkge1xuICAgICAgICAgICAgICAgIC8vIENsaWNrZWQgaW4gcmlnaHQgYXJyb3cgYXJlYSAtIHNjcm9sbCByaWdodFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNb2JpbGUgcmlnaHQgYXJyb3cgYXJlYSBjbGlja2VkJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNjcm9sbExlZnQgPSAkc2xpY2tMaXN0LnNjcm9sbExlZnQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxBbW91bnQgPSA5MjsgLy8gdGh1bWJuYWlsIHdpZHRoICg4MHB4KSArIGdhcCAoMTJweClcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhTY3JvbGxMZWZ0ID0gJHNsaWNrTGlzdFswXS5zY3JvbGxXaWR0aCAtICRzbGlja0xpc3Qub3V0ZXJXaWR0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Njcm9sbExlZnQgPSBNYXRoLm1pbihtYXhTY3JvbGxMZWZ0LCBjdXJyZW50U2Nyb2xsTGVmdCArIHNjcm9sbEFtb3VudCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJHNsaWNrTGlzdC5hbmltYXRlKHsgc2Nyb2xsTGVmdDogbmV3U2Nyb2xsTGVmdCB9LCAzMDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2JpbGVBcnJvd1Zpc2liaWxpdHkoJHNwbGl0TGF5b3V0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBTZXQgdXAgbW9iaWxlIGFycm93IHZpc2liaWxpdHlcbiAgICAgICAgJHRodW1ibmFpbHMub24oJ2luaXQnLCAoZXZlbnQsIHNsaWNrKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNzY4KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9iaWxlQXJyb3dWaXNpYmlsaXR5KCRzcGxpdExheW91dCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkc2xpY2tMaXN0ID0gJHNwbGl0TGF5b3V0LmZpbmQoJy5zbGljay1saXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2xpY2tMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlja0xpc3Qub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vYmlsZUFycm93VmlzaWJpbGl0eSgkc3BsaXRMYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlTW9iaWxlQXJyb3dWaXNpYmlsaXR5KCRzcGxpdExheW91dCkge1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHJldHVybjsgLy8gT25seSBmb3IgbW9iaWxlXG4gICAgICAgIFxuICAgICAgICBjb25zdCAkdGh1bWJuYWlscyA9ICRzcGxpdExheW91dC5maW5kKCcucHJvZHVjdFZpZXctdGh1bWJuYWlscycpO1xuICAgICAgICBjb25zdCAkc2xpY2tMaXN0ID0gJHNwbGl0TGF5b3V0LmZpbmQoJy5zbGljay1saXN0Jyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoJHNsaWNrTGlzdC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSAkc2xpY2tMaXN0LnNjcm9sbExlZnQoKTtcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSAkc2xpY2tMaXN0WzBdLnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCBjbGllbnRXaWR0aCA9ICRzbGlja0xpc3Qub3V0ZXJXaWR0aCgpO1xuICAgICAgICBjb25zdCBtYXhTY3JvbGxMZWZ0ID0gc2Nyb2xsV2lkdGggLSBjbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaXNTY3JvbGxhYmxlID0gc2Nyb2xsV2lkdGggPiBjbGllbnRXaWR0aDtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBtb2JpbGUgaG9yaXpvbnRhbCBhcnJvdyB2aXNpYmlsaXR5OicsIHtcbiAgICAgICAgICAgIHNjcm9sbExlZnQsXG4gICAgICAgICAgICBzY3JvbGxXaWR0aCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoLFxuICAgICAgICAgICAgbWF4U2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIGlzU2Nyb2xsYWJsZVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmICghaXNTY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAkdGh1bWJuYWlscy5yZW1vdmVDbGFzcygnY2FuLXNjcm9sbC1sZWZ0IGNhbi1zY3JvbGwtcmlnaHQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU2hvdy9oaWRlIGxlZnQgYXJyb3dcbiAgICAgICAgaWYgKHNjcm9sbExlZnQgPD0gNSkge1xuICAgICAgICAgICAgJHRodW1ibmFpbHMucmVtb3ZlQ2xhc3MoJ2Nhbi1zY3JvbGwtbGVmdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRodW1ibmFpbHMuYWRkQ2xhc3MoJ2Nhbi1zY3JvbGwtbGVmdCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTaG93L2hpZGUgcmlnaHQgYXJyb3dcbiAgICAgICAgaWYgKHNjcm9sbExlZnQgPj0gbWF4U2Nyb2xsTGVmdCAtIDUpIHtcbiAgICAgICAgICAgICR0aHVtYm5haWxzLnJlbW92ZUNsYXNzKCdjYW4tc2Nyb2xsLXJpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGh1bWJuYWlscy5hZGRDbGFzcygnY2FuLXNjcm9sbC1yaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHNldHVwVGh1bWJuYWlsQ2xpY2tIYW5kbGVycygkc3BsaXRMYXlvdXQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NldHRpbmcgdXAgdGh1bWJuYWlsIGNsaWNrIGhhbmRsZXJzIGZvciBzcGxpdCBsYXlvdXQnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyB0aHVtYm5haWwgY2xpY2sgaGFuZGxlcnMgdGhhdCBvcGVuIFBob3RvU3dpcGVcbiAgICAgICAgY29uc3QgJHRodW1ibmFpbHMgPSAkc3BsaXRMYXlvdXQuZmluZCgnLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVuYmluZCBleGlzdGluZyBjbGljayBBTkQgaG92ZXIgaGFuZGxlcnMgZnJvbSBpbWFnZSBnYWxsZXJ5XG4gICAgICAgICR0aHVtYm5haWxzLmZpbmQoJ1tkYXRhLWltYWdlLWdhbGxlcnktaXRlbV0sIFtkYXRhLWltYWdlLWdhbGxlcnktdmlkZW9dJykub2ZmKCdjbGljayBtb3VzZWVudGVyJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgb3VyIGN1c3RvbSBjbGljayBoYW5kbGVyIGZvciB0aHVtYm5haWxzXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2suc3BsaXQtbGF5b3V0LXRodW1ibmFpbHMnKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrLnNwbGl0LWxheW91dC10aHVtYm5haWxzJywgJy5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQgLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMgW2RhdGEtaW1hZ2UtZ2FsbGVyeS1pdGVtXSwgLnByb2R1Y3RWaWV3LnNwbGl0LWxheW91dCAucHJvZHVjdFZpZXctdGh1bWJuYWlscyBbZGF0YS1pbWFnZS1nYWxsZXJ5LXZpZGVvXScsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9ICR0YXJnZXQuYXR0cignZGF0YS10eXBlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTcGxpdCBsYXlvdXQgdGh1bWJuYWlsIGNsaWNrZWQ6Jywge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAkdGFyZ2V0WzBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIGltYWdlIGdhbGxlcnkgaW5zdGFuY2UgZnJvbSB0aGUgZ2xvYmFsIHByb2R1Y3QgZGV0YWlsc1xuICAgICAgICAgICAgbGV0IGltYWdlR2FsbGVyeSA9IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZXJlJ3MgYSBnbG9iYWwgcHJvZHVjdCBkZXRhaWxzIGluc3RhbmNlXG4gICAgICAgICAgICBpZiAod2luZG93LnByb2R1Y3REZXRhaWxzICYmIHdpbmRvdy5wcm9kdWN0RGV0YWlscy5pbWFnZUdhbGxlcnkpIHtcbiAgICAgICAgICAgICAgICBpbWFnZUdhbGxlcnkgPSB3aW5kb3cucHJvZHVjdERldGFpbHMuaW1hZ2VHYWxsZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBbHRlcm5hdGl2ZTogY2hlY2sgaWYgaXQncyBzdG9yZWQgb24gdGhlIHByb2R1Y3RWaWV3IGVsZW1lbnRcbiAgICAgICAgICAgIGlmICghaW1hZ2VHYWxsZXJ5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RWaWV3ID0gJHRhcmdldC5jbG9zZXN0KCcucHJvZHVjdFZpZXcnKTtcbiAgICAgICAgICAgICAgICBpbWFnZUdhbGxlcnkgPSAkcHJvZHVjdFZpZXcuZGF0YSgnaW1hZ2VHYWxsZXJ5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpbWFnZUdhbGxlcnkgJiYgdHlwZW9mIGltYWdlR2FsbGVyeS5zZWxlY3ROZXdJbWFnZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgZXhpc3Rpbmcgc2VsZWN0TmV3SW1hZ2UgbWV0aG9kIHRvIGNoYW5nZSB0aGUgbWFpbiBpbWFnZVxuICAgICAgICAgICAgICAgIGltYWdlR2FsbGVyeS5zZWxlY3ROZXdJbWFnZShlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWFpbiBpbWFnZSBjaGFuZ2VkIHZpYSBpbWFnZSBnYWxsZXJ5IGluc3RhbmNlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrOiBtYW51YWxseSBjaGFuZ2UgdGhlIG1haW4gaW1hZ2VcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU1haW5JbWFnZU1hbnVhbGx5KCR0YXJnZXQsIHR5cGUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWluIGltYWdlIGNoYW5nZWQgdmlhIG1hbnVhbCBtZXRob2QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnVGh1bWJuYWlsIGNsaWNrIGhhbmRsZXJzIHNldCB1cCBmb3Igc3BsaXQgbGF5b3V0IC0gaG92ZXIgZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgXG4gICAgZGlzYWJsZVRodW1ibmFpbEhvdmVyKCRzcGxpdExheW91dCkge1xuICAgICAgICAvLyBDb250aW51b3VzbHkgZGlzYWJsZSBob3ZlciBmdW5jdGlvbmFsaXR5IGZvciBzcGxpdCBsYXlvdXQgdGh1bWJuYWlsc1xuICAgICAgICBjb25zdCAkdGh1bWJuYWlscyA9ICRzcGxpdExheW91dC5maW5kKCcucHJvZHVjdFZpZXctdGh1bWJuYWlscycpO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ0Rpc2FibGluZyB0aHVtYm5haWwgaG92ZXIgZm9yIHNwbGl0IGxheW91dCcpO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVtb3ZlIGFueSBob3ZlciBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgJHRodW1ibmFpbHMuZmluZCgnW2RhdGEtaW1hZ2UtZ2FsbGVyeS1pdGVtXSwgW2RhdGEtaW1hZ2UtZ2FsbGVyeS12aWRlb10nKS5vZmYoJ21vdXNlZW50ZXIgbW91c2VvdmVyIGhvdmVyJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgYSBuby1vcCBob3ZlciBoYW5kbGVyIHRvIHByZXZlbnQgZnV0dXJlIGhvdmVyIGV2ZW50c1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ21vdXNlZW50ZXIuc3BsaXQtbGF5b3V0LW5vLWhvdmVyJyk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWVudGVyLnNwbGl0LWxheW91dC1uby1ob3ZlcicsICcucHJvZHVjdFZpZXcuc3BsaXQtbGF5b3V0IC5wcm9kdWN0Vmlldy10aHVtYm5haWxzIFtkYXRhLWltYWdlLWdhbGxlcnktaXRlbV0sIC5wcm9kdWN0Vmlldy5zcGxpdC1sYXlvdXQgLnByb2R1Y3RWaWV3LXRodW1ibmFpbHMgW2RhdGEtaW1hZ2UtZ2FsbGVyeS12aWRlb10nLCAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gUHJldmVudCBob3ZlciBmcm9tIGNoYW5naW5nIG1haW4gaW1hZ2VcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ1RodW1ibmFpbCBob3ZlciBkaXNhYmxlZCBmb3Igc3BsaXQgbGF5b3V0Jyk7XG4gICAgfVxuICAgIFxuICAgIGNoYW5nZU1haW5JbWFnZU1hbnVhbGx5KCR0YXJnZXQsIHR5cGUpIHtcbiAgICAgICAgLy8gTWFudWFsIG1ldGhvZCB0byBjaGFuZ2UgbWFpbiBpbWFnZSBpZiBpbWFnZSBnYWxsZXJ5IGluc3RhbmNlIGlzIG5vdCBhdmFpbGFibGVcbiAgICAgICAgY29uc3QgJG1haW5JbWFnZSA9ICQoJy5wcm9kdWN0Vmlldy1pbWFnZSBbZGF0YS1tYWluLWltYWdlXScpO1xuICAgICAgICBjb25zdCAkbWFpbkltYWdlQ29udGFpbmVyID0gJCgnLnByb2R1Y3RWaWV3LWltYWdlIC5wcm9kdWN0Vmlldy1pbWctY29udGFpbmVyIGEnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICgkbWFpbkltYWdlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IHRoZSBuZXcgaW1hZ2UgZGF0YSBmcm9tIHRoZSB0aHVtYm5haWxcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VVcmwgPSAkdGFyZ2V0LmF0dHIoYGRhdGEtJHt0eXBlfS1nYWxsZXJ5LW5ldy1pbWFnZS11cmxgKTtcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VTcmNzZXQgPSAkdGFyZ2V0LmF0dHIoYGRhdGEtJHt0eXBlfS1nYWxsZXJ5LW5ldy1pbWFnZS1zcmNzZXRgKTtcbiAgICAgICAgY29uc3Qgem9vbUltYWdlVXJsID0gJHRhcmdldC5hdHRyKGBkYXRhLSR7dHlwZX0tZ2FsbGVyeS16b29tLWltYWdlLXVybGApO1xuICAgICAgICBjb25zdCBpbWFnZUFsdCA9ICR0YXJnZXQuZmluZCgnaW1nJykuYXR0cignYWx0Jyk7XG4gICAgICAgIGNvbnN0IGltYWdlSW5kZXggPSAkdGFyZ2V0LmF0dHIoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghbmV3SW1hZ2VVcmwpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYW51YWxseSBjaGFuZ2luZyBtYWluIGltYWdlOicsIHtcbiAgICAgICAgICAgIG5ld0ltYWdlVXJsLFxuICAgICAgICAgICAgbmV3SW1hZ2VTcmNzZXQsXG4gICAgICAgICAgICB6b29tSW1hZ2VVcmwsXG4gICAgICAgICAgICBpbWFnZUFsdCxcbiAgICAgICAgICAgIGltYWdlSW5kZXhcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBVcGRhdGUgdGhlIG1haW4gaW1hZ2VcbiAgICAgICAgJG1haW5JbWFnZS5hdHRyKHtcbiAgICAgICAgICAgIHNyYzogbmV3SW1hZ2VVcmwsXG4gICAgICAgICAgICBzcmNzZXQ6IG5ld0ltYWdlU3Jjc2V0IHx8ICcnLFxuICAgICAgICAgICAgYWx0OiBpbWFnZUFsdCB8fCAnJyxcbiAgICAgICAgICAgIHRpdGxlOiBpbWFnZUFsdCB8fCAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgbWFpbiBpbWFnZSBjb250YWluZXIgbGluayBmb3IgUGhvdG9Td2lwZVxuICAgICAgICBpZiAoJG1haW5JbWFnZUNvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLmF0dHIoe1xuICAgICAgICAgICAgICAgICdkYXRhLWluZGV4JzogaW1hZ2VJbmRleCxcbiAgICAgICAgICAgICAgICAnZGF0YS10eXBlJzogdHlwZSxcbiAgICAgICAgICAgICAgICAnaHJlZic6IHpvb21JbWFnZVVybCB8fCBuZXdJbWFnZVVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSBhY3RpdmUgdGh1bWJuYWlsIHN0YXRlXG4gICAgICAgICQoJy5wcm9kdWN0Vmlldy10aHVtYm5haWxzIFtkYXRhLWltYWdlLWdhbGxlcnktaXRlbV0sIC5wcm9kdWN0Vmlldy10aHVtYm5haWxzIFtkYXRhLWltYWdlLWdhbGxlcnktdmlkZW9dJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgbWFpbiBpbWFnZSB6b29tIGZ1bmN0aW9uYWxpdHkgaWYgaXQgZXhpc3RzXG4gICAgICAgIGNvbnN0ICR6b29tQ29udGFpbmVyID0gJCgnLnByb2R1Y3RWaWV3LWltYWdlIFtkYXRhLXpvb20taW1hZ2VdJyk7XG4gICAgICAgIGlmICgkem9vbUNvbnRhaW5lci5sZW5ndGggPiAwICYmIHpvb21JbWFnZVVybCkge1xuICAgICAgICAgICAgJHpvb21Db250YWluZXIuYXR0cignZGF0YS16b29tLWltYWdlJywgem9vbUltYWdlVXJsKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ01haW4gaW1hZ2UgbWFudWFsbHkgdXBkYXRlZCcpO1xuICAgIH1cbiAgICBcbiAgICBzZXR1cE1haW5JbWFnZVN3aXBlKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnU2V0dGluZyB1cCBtYWluIGltYWdlIHN3aXBlIGhhbmRsZXJzJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCAkbWFpbkltYWdlQ29udGFpbmVyID0gJCgnLnByb2R1Y3RWaWV3LnNwbGl0LWxheW91dCAucHJvZHVjdFZpZXctaW1hZ2UgLnByb2R1Y3RWaWV3LWltZy1jb250YWluZXInKTtcbiAgICAgICAgaWYgKCRtYWluSW1hZ2VDb250YWluZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gbWFpbiBpbWFnZSBjb250YWluZXIgZm91bmQgZm9yIHN3aXBlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdGb3VuZCBtYWluIGltYWdlIGNvbnRhaW5lcjonLCAkbWFpbkltYWdlQ29udGFpbmVyWzBdKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNldCB1cCB0b3VjaCBldmVudHMgZm9yIG1vYmlsZSBhbmQgZGV2aWNlIGVtdWxhdGlvblxuICAgICAgICBsZXQgc3RhcnRYID0gbnVsbDtcbiAgICAgICAgbGV0IHN0YXJ0WSA9IG51bGw7XG4gICAgICAgIGxldCBpc1Njcm9sbGluZyA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyBSZW1vdmUgYW55IGV4aXN0aW5nIHN3aXBlIGhhbmRsZXJzXG4gICAgICAgICRtYWluSW1hZ2VDb250YWluZXIub2ZmKCcuc3dpcGUnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRvdWNoIHN0YXJ0XG4gICAgICAgICRtYWluSW1hZ2VDb250YWluZXIub24oJ3RvdWNoc3RhcnQuc3dpcGUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RvdWNoIHN0YXJ0IGRldGVjdGVkIG9uIG1haW4gaW1hZ2U6JywgZS5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgICAgICBzdGFydFggPSB0b3VjaC5jbGllbnRYO1xuICAgICAgICAgICAgc3RhcnRZID0gdG91Y2guY2xpZW50WTtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nID0gbnVsbDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RvdWNoIHN0YXJ0IGNvb3JkaW5hdGVzOicsIHsgc3RhcnRYLCBzdGFydFkgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFkZCB2aXN1YWwgZmVlZGJhY2tcbiAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIuY3NzKCdvcGFjaXR5JywgJzAuOScpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRvdWNoIG1vdmVcbiAgICAgICAgJG1haW5JbWFnZUNvbnRhaW5lci5vbigndG91Y2htb3ZlLnN3aXBlJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmICghc3RhcnRYIHx8ICFzdGFydFkpIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdG91Y2ggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWCA9IHRvdWNoLmNsaWVudFggLSBzdGFydFg7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVkgPSB0b3VjaC5jbGllbnRZIC0gc3RhcnRZO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVG91Y2ggbW92ZSAtIGRlbHRhczonLCB7IGRlbHRhWCwgZGVsdGFZIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaWYgdXNlciBpcyBzY3JvbGxpbmcgdmVydGljYWxseSBvciBzd2lwaW5nIGhvcml6b250YWxseVxuICAgICAgICAgICAgaWYgKGlzU2Nyb2xsaW5nID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXNTY3JvbGxpbmcgPSBNYXRoLmFicyhkZWx0YVkpID4gTWF0aC5hYnMoZGVsdGFYKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGV0ZXJtaW5lZCBzY3JvbGxpbmcgZGlyZWN0aW9uOicsIGlzU2Nyb2xsaW5nID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIGhvcml6b250YWwgc3dpcGUsIHByZXZlbnQgZGVmYXVsdCBzY3JvbGxpbmdcbiAgICAgICAgICAgIGlmICghaXNTY3JvbGxpbmcgJiYgTWF0aC5hYnMoZGVsdGFYKSA+IDEwKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIb3Jpem9udGFsIHN3aXBlIGRldGVjdGVkLCBwcmV2ZW50aW5nIGRlZmF1bHQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBBZGQgdmlzdWFsIGZlZWRiYWNrIGR1cmluZyBzd2lwZVxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZVggPSBkZWx0YVggKiAwLjE7IC8vIFN1YnRsZSBtb3ZlbWVudCBmZWVkYmFja1xuICAgICAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIuY3NzKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZVh9cHgpYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gVG91Y2ggZW5kXG4gICAgICAgICRtYWluSW1hZ2VDb250YWluZXIub24oJ3RvdWNoZW5kLnN3aXBlJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUb3VjaCBlbmQgZGV0ZWN0ZWQgb24gbWFpbiBpbWFnZScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBSZW1vdmUgdmlzdWFsIGZlZWRiYWNrXG4gICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMScsXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghc3RhcnRYIHx8ICFzdGFydFkgfHwgaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVG91Y2ggZW5kIC0gbm8gc3dpcGUgYWN0aW9uIChzY3JvbGxpbmcgb3Igbm8gc3RhcnQgcG9zaXRpb24pJyk7XG4gICAgICAgICAgICAgICAgc3RhcnRYID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlzU2Nyb2xsaW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgZGVsdGFYID0gdG91Y2guY2xpZW50WCAtIHN0YXJ0WDtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IHRvdWNoLmNsaWVudFkgLSBzdGFydFk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIE1pbmltdW0gc3dpcGUgZGlzdGFuY2VcbiAgICAgICAgICAgIGNvbnN0IG1pblN3aXBlRGlzdGFuY2UgPSA1MDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RvdWNoIGVuZCAtIGFuYWx5emluZyBzd2lwZTonLCB7IGRlbHRhWCwgZGVsdGFZLCBtaW5Td2lwZURpc3RhbmNlIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgaG9yaXpvbnRhbCBzd2lwZVxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPiBtaW5Td2lwZURpc3RhbmNlICYmIE1hdGguYWJzKGRlbHRhWSkgPCAxMDApIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFYID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTd2lwZSByaWdodCAtIGdvIHRvIHByZXZpb3VzIGltYWdlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTd2lwZSByaWdodCBkZXRlY3RlZCAtIGdvaW5nIHRvIHByZXZpb3VzIGltYWdlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0ltYWdlKCdwcmV2aW91cycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN3aXBlIGxlZnQgLSBnbyB0byBuZXh0IGltYWdlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTd2lwZSBsZWZ0IGRldGVjdGVkIC0gZ29pbmcgdG8gbmV4dCBpbWFnZScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9JbWFnZSgnbmV4dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIHN3aXBlIGFjdGlvbiAtIGluc3VmZmljaWVudCBkaXN0YW5jZSBvciB2ZXJ0aWNhbCBtb3ZlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBSZXNldCB2YWx1ZXNcbiAgICAgICAgICAgIHN0YXJ0WCA9IG51bGw7XG4gICAgICAgICAgICBzdGFydFkgPSBudWxsO1xuICAgICAgICAgICAgaXNTY3JvbGxpbmcgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIE1vdXNlIGV2ZW50cyBmb3IgZGVza3RvcCB0ZXN0aW5nICh3aGVuIE5PVCBpbiBkZXZpY2UgZW11bGF0aW9uIG1vZGUpXG4gICAgICAgIGxldCBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgbGV0IG1vdXNlU3RhcnRYID0gbnVsbDtcbiAgICAgICAgbGV0IG1vdXNlU3RhcnRZID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8vIE9ubHkgYWRkIG1vdXNlIGV2ZW50cyBpZiB0b3VjaCBpcyBOT1Qgc3VwcG9ydGVkIChwdXJlIGRlc2t0b3ApXG4gICAgICAgIGlmICghKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUb3VjaCBub3Qgc3VwcG9ydGVkIC0gYWRkaW5nIG1vdXNlIGV2ZW50cyBmb3IgZGVza3RvcCB0ZXN0aW5nJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIub24oJ21vdXNlZG93bi5zd2lwZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01vdXNlIGRvd24gZGV0ZWN0ZWQgb24gbWFpbiBpbWFnZSAoZGVza3RvcCBtb2RlKScpO1xuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgbW91c2VTdGFydFggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgbW91c2VTdGFydFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgJG1haW5JbWFnZUNvbnRhaW5lci5jc3MoJ29wYWNpdHknLCAnMC45Jyk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIub24oJ21vdXNlbW92ZS5zd2lwZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YVggPSBlLmNsaWVudFggLSBtb3VzZVN0YXJ0WDtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YVkgPSBlLmNsaWVudFkgLSBtb3VzZVN0YXJ0WTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHRleHQgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFZpc3VhbCBmZWVkYmFjayBkdXJpbmcgZHJhZ1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YVgpID4gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgJG1haW5JbWFnZUNvbnRhaW5lci5jc3MoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGVYKCR7ZGVsdGFYICogMC4yfXB4KWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLm9uKCdtb3VzZXVwLnN3aXBlJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIW1vdXNlRG93bikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNb3VzZSB1cCBkZXRlY3RlZCBvbiBtYWluIGltYWdlIChkZXNrdG9wIG1vZGUpJyk7XG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgdmlzdWFsIGZlZWRiYWNrXG4gICAgICAgICAgICAgICAgJG1haW5JbWFnZUNvbnRhaW5lci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnb3BhY2l0eSc6ICcxJyxcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhWCA9IGUuY2xpZW50WCAtIG1vdXNlU3RhcnRYO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IGUuY2xpZW50WSAtIG1vdXNlU3RhcnRZO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pblN3aXBlRGlzdGFuY2UgPSA1MDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTW91c2UgZHJhZyAtIGFuYWx5emluZyBzd2lwZTonLCB7IGRlbHRhWCwgZGVsdGFZLCBtaW5Td2lwZURpc3RhbmNlIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBob3Jpem9udGFsIHN3aXBlXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPiBtaW5Td2lwZURpc3RhbmNlICYmIE1hdGguYWJzKGRlbHRhWSkgPCAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlbHRhWCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERyYWcgcmlnaHQgLSBnbyB0byBwcmV2aW91cyBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01vdXNlIGRyYWcgcmlnaHQgZGV0ZWN0ZWQgLSBnb2luZyB0byBwcmV2aW91cyBpbWFnZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvSW1hZ2UoJ3ByZXZpb3VzJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEcmFnIGxlZnQgLSBnbyB0byBuZXh0IGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTW91c2UgZHJhZyBsZWZ0IGRldGVjdGVkIC0gZ29pbmcgdG8gbmV4dCBpbWFnZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvSW1hZ2UoJ25leHQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBIYW5kbGUgbW91c2UgbGVhdmUgdG8gcmVzZXQgc3RhdGVcbiAgICAgICAgICAgICRtYWluSW1hZ2VDb250YWluZXIub24oJ21vdXNlbGVhdmUuc3dpcGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1vdXNlRG93bikge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJG1haW5JbWFnZUNvbnRhaW5lci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RvdWNoIHN1cHBvcnRlZCAtIHNraXBwaW5nIG1vdXNlIGV2ZW50cyAod2lsbCB1c2UgdG91Y2ggZXZlbnRzIGluIGRldmljZSBlbXVsYXRpb24pJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdNYWluIGltYWdlIHN3aXBlIGhhbmRsZXJzIHNldCB1cCcpO1xuICAgIH1cbiAgICBcbiAgICBuYXZpZ2F0ZVRvSW1hZ2UoZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0ICR0aHVtYm5haWxzID0gJCgnLnByb2R1Y3RWaWV3LnNwbGl0LWxheW91dCAucHJvZHVjdFZpZXctdGh1bWJuYWlscycpO1xuICAgICAgICBjb25zdCAkYWxsVGh1bWJuYWlscyA9ICR0aHVtYm5haWxzLmZpbmQoJ1tkYXRhLWltYWdlLWdhbGxlcnktaXRlbV0sIFtkYXRhLWltYWdlLWdhbGxlcnktdmlkZW9dJyk7XG4gICAgICAgIGNvbnN0ICRjdXJyZW50QWN0aXZlID0gJGFsbFRodW1ibmFpbHMuZmlsdGVyKCcuaXMtYWN0aXZlJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoJGFsbFRodW1ibmFpbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBsZXQgJG5leHRUaHVtYm5haWwgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKCRjdXJyZW50QWN0aXZlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gTm8gYWN0aXZlIHRodW1ibmFpbCwgc3RhcnQgd2l0aCBmaXJzdFxuICAgICAgICAgICAgJG5leHRUaHVtYm5haWwgPSAkYWxsVGh1bWJuYWlscy5maXJzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gJGFsbFRodW1ibmFpbHMuaW5kZXgoJGN1cnJlbnRBY3RpdmUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4ICsgMSkgJSAkYWxsVGh1bWJuYWlscy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgJG5leHRUaHVtYm5haWwgPSAkYWxsVGh1bWJuYWlscy5lcShuZXh0SW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdwcmV2aW91cycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2SW5kZXggPSBjdXJyZW50SW5kZXggPT09IDAgPyAkYWxsVGh1bWJuYWlscy5sZW5ndGggLSAxIDogY3VycmVudEluZGV4IC0gMTtcbiAgICAgICAgICAgICAgICAkbmV4dFRodW1ibmFpbCA9ICRhbGxUaHVtYm5haWxzLmVxKHByZXZJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICgkbmV4dFRodW1ibmFpbCAmJiAkbmV4dFRodW1ibmFpbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTmF2aWdhdGluZyB0byAke2RpcmVjdGlvbn0gaW1hZ2UgdmlhIHN3aXBlYCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRyaWdnZXIgY2xpY2sgb24gdGhlIHRodW1ibmFpbCB0byBjaGFuZ2UgdGhlIG1haW4gaW1hZ2VcbiAgICAgICAgICAgIGNvbnN0IGNsaWNrRXZlbnQgPSAkLkV2ZW50KCdjbGljaycsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiAkbmV4dFRodW1ibmFpbFswXSxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgICAgICAgICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gJG5leHRUaHVtYm5haWwuYXR0cignZGF0YS10eXBlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRyeSB0byB1c2UgaW1hZ2UgZ2FsbGVyeSBpbnN0YW5jZSBmaXJzdFxuICAgICAgICAgICAgbGV0IGltYWdlR2FsbGVyeSA9IG51bGw7XG4gICAgICAgICAgICBpZiAod2luZG93LnByb2R1Y3REZXRhaWxzICYmIHdpbmRvdy5wcm9kdWN0RGV0YWlscy5pbWFnZUdhbGxlcnkpIHtcbiAgICAgICAgICAgICAgICBpbWFnZUdhbGxlcnkgPSB3aW5kb3cucHJvZHVjdERldGFpbHMuaW1hZ2VHYWxsZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaW1hZ2VHYWxsZXJ5ICYmIHR5cGVvZiBpbWFnZUdhbGxlcnkuc2VsZWN0TmV3SW1hZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpbWFnZUdhbGxlcnkuc2VsZWN0TmV3SW1hZ2UoY2xpY2tFdmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlTWFpbkltYWdlTWFudWFsbHkoJG5leHRUaHVtYm5haWwsIHR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEhlbHBlciBtZXRob2QgZm9yIHRlc3Rpbmcgc3dpcGUgZnVuY3Rpb25hbGl0eSBmcm9tIGRlc2t0b3AgY29uc29sZVxuICAgIHRlc3RTd2lwZShkaXJlY3Rpb24gPSAnbmV4dCcpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFRlc3Rpbmcgc3dpcGUgJHtkaXJlY3Rpb259IGZyb20gY29uc29sZWApO1xuICAgICAgICB0aGlzLm5hdmlnYXRlVG9JbWFnZShkaXJlY3Rpb24pO1xuICAgIH1cbiAgICBcbiAgICAvLyBFeHBvc2UgdGhpcyBpbnN0YW5jZSBnbG9iYWxseSBmb3IgdGVzdGluZ1xuICAgIGluaXQoKSB7XG4gICAgICAgIHdpbmRvdy5zcGxpdExheW91dENhcm91c2VsID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coJ1NwbGl0IGxheW91dCBjYXJvdXNlbCBpbnN0YW5jZSBleHBvc2VkIGFzIHdpbmRvdy5zcGxpdExheW91dENhcm91c2VsJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUZXN0IHN3aXBlIHdpdGg6IHdpbmRvdy5zcGxpdExheW91dENhcm91c2VsLnRlc3RTd2lwZShcIm5leHRcIikgb3Igd2luZG93LnNwbGl0TGF5b3V0Q2Fyb3VzZWwudGVzdFN3aXBlKFwicHJldmlvdXNcIiknKTtcbiAgICB9XG59XG4iLCIvKlxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xuICovXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IFJldmlldyBmcm9tICcuL3Byb2R1Y3QvcmV2aWV3cyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tICcuL2NvbW1vbi9wcm9kdWN0LWRldGFpbHMnO1xuaW1wb3J0IHZpZGVvR2FsbGVyeSBmcm9tICcuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeSc7XG5pbXBvcnQgeyBjbGFzc2lmeUZvcm0gfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IElUU1Byb2R1Y3QgZnJvbSAnLi9jdXN0b20vaXRzLXByb2R1Y3QnO1xuaW1wb3J0IER1YWxQYW5lbFNjcm9sbCBmcm9tICcuL2N1c3RvbS9kdWFsLXBhbmVsLXNjcm9sbCc7XG5pbXBvcnQgU3BsaXRMYXlvdXRDYXJvdXNlbCBmcm9tICcuL2N1c3RvbS9zcGxpdC1sYXlvdXQtY2Fyb3VzZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICAgICAgdGhpcy5yZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeSgnI21vZGFsLXJldmlldy1mb3JtJylbMF07XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xvc2UuZm5kdG4ucmV2ZWFsJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHZhbGlkYXRvcjtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJCgnLnByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XG5cbiAgICAgICAgdGhpcy5idWxrUHJpY2luZ0hhbmRsZXIoKTtcblxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcblxuICAgICAgICB0aGlzLklUU1Byb2R1Y3QgPSBuZXcgSVRTUHJvZHVjdCh0aGlzLmNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBkdWFsLXBhbmVsIHNjcm9sbCBzeW5jaHJvbml6YXRpb24gZm9yIHNwbGl0IGxheW91dFxuICAgICAgICB0aGlzLmR1YWxQYW5lbFNjcm9sbCA9IG5ldyBEdWFsUGFuZWxTY3JvbGwoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEluaXRpYWxpemUgc3BsaXQgbGF5b3V0IGNhcm91c2VsIG92ZXJyaWRlXG4gICAgICAgIHRoaXMuc3BsaXRMYXlvdXRDYXJvdXNlbCA9IG5ldyBTcGxpdExheW91dENhcm91c2VsKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoJHJldmlld0Zvcm0ubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldyh7ICRyZXZpZXdGb3JtIH0pO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyZXZpZXdGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW50dWl0U29sdXRpb25zIC0gQ3VzdG9tIFByb2R1Y3RcbiAgICAgICAgICovXG4gICAgfVxuXG4gICAgYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRmb3JtKSB7XG4gICAgICAgICRmb3JtLmZpbmQoJ1tkYXRhLWlucHV0XScpLmVhY2goKF8sIGlucHV0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkaW5wdXQgPSAkKGlucHV0KTtcbiAgICAgICAgICAgIGNvbnN0IG1zZ1NwYW5JZCA9IGAkeyRpbnB1dC5hdHRyKCduYW1lJyl9LW1zZ2A7XG5cbiAgICAgICAgICAgICRpbnB1dC5zaWJsaW5ncygnc3BhbicpLmF0dHIoJ2lkJywgbXNnU3BhbklkKTtcbiAgICAgICAgICAgICRpbnB1dC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgbXNnU3BhbklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvZHVjdFJldmlld0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLiRyZXZpZXdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWxrUHJpY2luZ0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjYnVsa19wcmljaW5nJykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBWaWRlb0dhbGxlcnkge1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHBsYXllciA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLXBsYXllcl0nKTtcbiAgICAgICAgdGhpcy4kdmlkZW9zID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8taXRlbV0nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7fTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0TmV3VmlkZW8oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHtcbiAgICAgICAgICAgIGlkOiAkdGFyZ2V0LmRhdGEoJ3ZpZGVvSWQnKSxcbiAgICAgICAgICAgICRzZWxlY3RlZFRodW1iOiAkdGFyZ2V0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0TWFpblZpZGVvKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGh1bWIoKTtcbiAgICB9XG5cbiAgICBzZXRNYWluVmlkZW8oKSB7XG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBgLy93d3cueW91dHViZS5jb20vZW1iZWQvJHt0aGlzLmN1cnJlbnRWaWRlby5pZH1gKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVUaHVtYigpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8uJHNlbGVjdGVkVGh1bWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld1ZpZGVvLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmlkZW9HYWxsZXJ5KCkge1xuICAgIGNvbnN0IHBsdWdpbktleSA9ICd2aWRlby1nYWxsZXJ5JztcbiAgICBjb25zdCAkdmlkZW9HYWxsZXJ5ID0gJChgW2RhdGEtJHtwbHVnaW5LZXl9XWApO1xuXG4gICAgJHZpZGVvR2FsbGVyeS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCAkZWwgPSAkKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpc0luaXRpYWxpemVkID0gJGVsLmRhdGEocGx1Z2luS2V5KSBpbnN0YW5jZW9mIFZpZGVvR2FsbGVyeTtcblxuICAgICAgICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsLmRhdGEocGx1Z2luS2V5LCBuZXcgVmlkZW9HYWxsZXJ5KCRlbCkpO1xuICAgIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==