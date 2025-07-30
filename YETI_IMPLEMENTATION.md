# Split Panel Product Page Implementation

## Overview
Successfully implemented a split-screen product page layout with sophisticated scroll synchronization, featuring a design inspired by modern e-commerce sites like Yeti, but using generic, non-branded naming conventions.

## ✅ Completed Features

### 1. Split-Screen Layout
- **Left Panel**: Product images, carousel, videos, and page builder content
- **Right Panel**: Product details, title, price, description, options, and add-to-cart
- Both panels are independently scrollable

### 2. Advanced Scroll Synchronization
- Right panel scrolls first (priority)
- When right panel reaches bottom, further scrolling moves the left panel
- When scrolling up from left panel at top, right panel takes over
- Smooth scroll animations with visual feedback
- Mobile-responsive: disables custom scroll sync on screens < 1024px

### 3. Enhanced UI/UX
- **Floating Label System**: Consistent floating labels for all product option dropdowns
- **Premium Styling**: Gradients, shadows, and hover effects
- **Responsive Design**: Mobile-first approach with tablet/desktop enhancements
- **Visual Feedback**: Subtle opacity changes to show which panel is active

### 4. Enhanced Features
- **Sticky Header**: Sitewide header now fixed to top with backdrop blur
- **PDP Description Region**: Added `{{{region name="pdp-description"}}}` to left panel under video
- **Content Stacking**: Left side properly stacked: images → carousel → video → description → page builder
- **Generic Naming**: All "yeti" references replaced with generic "dual-panel", "media-panel", "details-panel"
- Smooth scroll behavior with `requestAnimationFrame`
- Debounced wheel events to prevent performance issues
- Proper focus management and ARIA labels
- Touch-friendly mobile experience

## 📁 Files Created/Modified

### New Files:
- `/assets/js/theme/custom/dual-panel-scroll.js` - Scroll synchronization logic
- `/assets/scss/components/custom/_split-layout.scss` - Layout and styling
- `/dual-panel-test.html` - Standalone test page for scroll behavior

### Modified Files:
- `/templates/components/products/product-view.html` - Split layout structure with pdp-description region
- `/assets/js/theme/product.js` - Initialize DualPanelScrollSync
- `/assets/js/theme/global.js` - Add sticky header class to body
- `/assets/scss/components/_components.scss` - Import new SCSS
- `/templates/components/products/options/set-select.html` - Floating labels
- `/templates/components/products/options/product-list.html` - Floating labels
- `/templates/components/products/options/date.html` - Floating labels
- `/assets/scss/components/custom/_floating-label.scss` - Floating label styles

## 🚀 Testing Instructions

### 1. Build & Deploy
```bash
cd /path/to/theme
npm run buildDev  # For development
# or
npm run build    # For production
```

### 2. Test Scroll Behavior
1. Visit any product page
2. Scroll down - right panel should scroll first
3. Continue scrolling when right panel reaches bottom - left panel should take over
4. Scroll up - when left panel reaches top, right panel should take over
5. Test on mobile - should use normal scrolling behavior

### 3. Test Floating Labels
1. Visit product with dropdown options (size, color, etc.)
2. Click on dropdowns - labels should float up when selected
3. Test error states and validation

### 4. Standalone Testing
- Open `/dual-panel-test.html` in browser for isolated scroll testing
- Visual indicator shows which panel is currently active

## 🎨 Key Design Features

### Visual Polish
- Left panel: Light gray background (#f8f9fa) with elevated product images
- Right panel: White with subtle gradient and left shadow
- Enhanced product images with hover effects
- Premium add-to-cart button with gradient and elevation
- Smooth transitions and micro-interactions
- Sticky header with backdrop blur effect

### Content Organization
- **Left Panel**: Product images → carousel → video → description region → page builder content
- **Right Panel**: Title, price, description, options, add-to-cart, product info
- **Description Region**: New `{{{region name="pdp-description"}}}` with styled container

### Responsive Behavior
- **Desktop (>1024px)**: Full split-screen with scroll sync
- **Tablet (≤1024px)**: Stacked layout, normal scrolling
- **Mobile (≤768px)**: Optimized spacing and typography

## 🔧 Customization Options

### Scroll Behavior
```javascript
// Access the scroll sync instance
window.dualPanelScroll.setScrollFocus('media');    // Force media panel focus
window.dualPanelScroll.setScrollFocus('details');  // Force details panel focus
window.dualPanelScroll.resetScrollState();         // Reset to initial state
```

### Layout Dimensions
```scss
// Adjust details panel width in _split-layout.scss
.details-panel {
    flex: 0 0 480px; // Change 480px to desired width
}

// Adjust sticky header offset
body.has-sticky-header {
    padding-top: 80px; // Adjust based on header height
}
```

### Breakpoints
```scss
// Modify responsive breakpoints in _split-layout.scss
@media (max-width: 1024px) { /* Tablet styles */ }
@media (max-width: 768px)  { /* Mobile styles */ }
```

### Content Regions
```handlebars
<!-- Add custom content to description section -->
{{{region name="pdp-description"}}}

<!-- Existing regions in left panel -->
{{{region name="product_content_left"}}}
{{{region name="product_below_content"}}}
```

## 🐛 Troubleshooting

### Build Issues
- Ensure all SCSS imports are in `_components.scss`
- Check that JavaScript imports use correct relative paths
- Run `npm run stylelint:fix` for SCSS linting issues

### Scroll Sync Not Working
- Check browser console for JavaScript errors
- Ensure elements have correct IDs: `mediaPanel`, `detailsPanel`
- Verify the layout container has class `dual-panel-container`

### Mobile Issues
- Scroll sync automatically disables on mobile
- Check responsive breakpoints if layout looks incorrect
- Ensure viewport meta tag is properly configured

## 🚀 Future Enhancements

1. **Sticky Add-to-Cart**: Floating cart button when scrolling
2. **Advanced Gallery**: Zoom, 360° view, AR features
3. **Scroll Progress**: Visual indicator of scroll position
4. **Performance**: Intersection Observer for better scroll detection
5. **Analytics**: Track scroll engagement and interaction patterns

---

**Status**: ✅ Ready for production  
**Browser Support**: Chrome, Firefox, Safari, Edge (modern versions)  
**Performance Impact**: Minimal - optimized with debouncing and RAF
