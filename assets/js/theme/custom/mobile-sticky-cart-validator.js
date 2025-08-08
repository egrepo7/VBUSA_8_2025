/**
 * Mobile Sticky Cart Validator
 * 
 * Implements scroll-to-error and popup notification functionality
 * similar to VolleyballUSA.com. Only activates on mobile when 
 * sticky cart is visible - won't interfere with desktop dual-panel scrolling.
 */

export default class MobileStickyCartValidator {
    constructor() {
        this.init();
    }

    init() {
        console.log('🚀 Mobile Sticky Cart Validator initialized');
        this.setupClickHandler();
        this.setupGlobalFunctions();
    }

    setupClickHandler() {
        // Only handle clicks on mobile sticky cart add-to-cart button
        $(document).on('click', '.sticky-cart-section-mobile #form-action-addToCart-mobile', (e) => {
            console.log('📱 Mobile sticky cart button clicked');
            
            // Only proceed if sticky cart is visible (mobile/tablet view)
            if ($('.sticky-cart-section-mobile').is(':visible')) {
                const formId = $(e.target).attr('form') || 'productOptionsForm-inline';
                const $form = $('#' + formId);
                
                console.log('📋 Form selector:', formId);
                console.log('📋 Form found:', $form.length > 0);
                
                if ($form.length) {
                    e.preventDefault();
                    console.log('🛑 Default form submission prevented for mobile sticky cart');
                    
                    // Check for validation errors
                    if (this.validateForm($form)) {
                        console.log('✅ Validation passed - submitting form');
                        $form.submit();
                    } else {
                        console.log('❌ Validation failed - triggering scroll to first error');
                        this.scrollToFirstValidationError($form);
                    }
                } else {
                    console.log('❌ No form found, returning');
                }
            } else {
                console.log('🖥️ Sticky cart not visible (desktop view), allowing normal behavior');
            }
        });
    }

    validateForm($form) {
        // Check for required selects that haven't been selected
        const $requiredSelects = $form.find('select[required]');
        const $unselectedRequired = $requiredSelects.filter(function() {
            return $(this).val() === '' || $(this).prop('selectedIndex') === 0;
        });
        
        console.log('🔍 Required selects found:', $requiredSelects.length);
        console.log('🔍 Unselected required:', $unselectedRequired.length);
        
        return $unselectedRequired.length === 0;
    }

    scrollToFirstValidationError($form) {
        console.log('🔍 Starting scroll to first validation error');
        
        setTimeout(() => {
            console.log('⏱️ After 100ms delay, looking for error fields...');
            
            // Look for existing form validation errors first
            let $errorField = $form.find('.form-field--error').first();
            
            if ($errorField.length === 0) {
                $errorField = $('.form-field--error').first();
                console.log('🔍 Error fields on entire page:', $('.form-field--error').length);
            }
            
            if ($errorField.length > 0) {
                console.log('✅ Found error field:', $errorField.attr('class') || 'no class');
                this.smoothScrollToElement($errorField, 'Error Field');
            } else {
                console.log('🔍 No error fields found, looking for unselected required options...');
                
                // Find first unselected required option
                const $unselectedRequired = $form.find('[data-product-attribute] select').filter(function() {
                    const $select = $(this);
                    const $attribute = $select.closest('[data-product-attribute]');
                    const isRequired = $attribute.find('label').text().toLowerCase().includes('required') || 
                                     $select.attr('required') !== undefined;
                    const isUnselected = $select.val() === '' || $select.prop('selectedIndex') === 0;
                    
                    if (isRequired && isUnselected) {
                        console.log('🎯 Found unselected required option:', $attribute.find('label').text().trim());
                    }
                    
                    return isRequired && isUnselected;
                }).first().closest('[data-product-attribute]');
                
                if ($unselectedRequired.length > 0) {
                    console.log('✅ Scrolling to unselected required option');
                    this.smoothScrollToElement($unselectedRequired, 'Required Option');
                } else {
                    console.log('🔍 No unselected required options, scrolling to form');
                    this.smoothScrollToElement($form, 'Form');
                }
            }
        }, 100);
    }

    smoothScrollToElement($element, elementName = 'Element') {
        if ($element.length) {
            const currentScroll = $(window).scrollTop();
            const elementOffset = $element.offset();
            const targetScroll = elementOffset.top - 100;
            
            console.log('🎯 Scrolling to ' + elementName + ':');
            console.log('📍 Element offset:', elementOffset);
            console.log('📏 Current scroll position:', currentScroll);
            console.log('📏 Target scroll position:', targetScroll);
            console.log('📐 Distance to scroll:', Math.abs(targetScroll - currentScroll), 'pixels');
            
            $('html, body').animate({
                scrollTop: targetScroll
            }, {
                duration: 600,
                easing: 'swing',
                start: function() {
                    console.log('🎬 Scroll animation started');
                },
                complete: function() {
                    console.log('✅ Scroll animation completed');
                    console.log('📏 Final scroll position:', $(window).scrollTop());
                    
                    // Add highlight effect
                    $element.addClass('scroll-highlight');
                    console.log('✨ Highlight effect applied');
                    
                    setTimeout(() => {
                        $element.removeClass('scroll-highlight');
                        console.log('✨ Highlight effect removed');
                    }, 2000);
                    
                    // Show notification popup
                    this.showRequiredOptionsNotification();
                }.bind(this)
            });
        } else {
            console.log('❌ No element to scroll to');
        }
    }

    showRequiredOptionsNotification() {
        console.log('📢 Showing required options notification');
        
        // Remove any existing notifications
        $('.required-options-notification').remove();
        
        // Create notification HTML
        const $notification = $(`
            <div class="required-options-notification">
                <div class="notification-content">
                    <div class="notification-icon">⚠️</div>
                    <div class="notification-text">
                        <strong>Required Options Missing</strong>
                        <p>Please select all required options before adding to cart</p>
                        <small class="notification-hint">Click to dismiss</small>
                    </div>
                    <button class="notification-close">&times;</button>
                </div>
            </div>
        `);
        
        // Add to body and show with fade effect
        $('body').append($notification);
        $notification.hide().fadeIn(400);
        
        // Click to dismiss entire notification
        $notification.on('click', function(e) {
            console.log('📢 Notification clicked - dismissing');
            $(this).fadeOut(300, function() {
                $(this).remove();
            });
        });
        
        // Close button (prevent event bubbling)
        $notification.find('.notification-close').on('click', function(e) {
            e.stopPropagation();
            console.log('📢 Close button clicked - dismissing');
            $(this).closest('.required-options-notification').fadeOut(300, function() {
                $(this).remove();
            });
        });
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            $notification.fadeOut(400, function() {
                $(this).remove();
            });
        }, 5000);
        
        console.log('📢 Notification displayed');
    }

    setupGlobalFunctions() {
        // Global test function for debugging
        window.showRequiredOptionsNotification = this.showRequiredOptionsNotification.bind(this);
        window.testNotification = () => {
            console.log('🧪 Testing notification display');
            this.showRequiredOptionsNotification();
        };
        
        console.log('✅ Global functions available: showRequiredOptionsNotification(), testNotification()');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MobileStickyCartValidator();
});