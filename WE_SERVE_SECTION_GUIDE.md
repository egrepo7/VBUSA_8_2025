# We Serve Section Documentation

## Overview
A Nike-inspired, full-screen dynamic hero section that cycles through different client types with sophisticated scroll-based interaction. The section creates an immersive experience that holds users for several scroll events before transitioning to the next section.

## Features

### 🎨 Visual Design
- **Full viewport height (100vh)** for maximum impact
- **Large, bold typography** similar to Nike's about page
- **Dynamic text cycling** through client types
- **Gradient text effects** and smooth animations  
- **Dark, premium background** with floating elements
- **Responsive typography** that scales beautifully

### 🎯 Dynamic Text Cycling
The section cycles through these client types:
1. **PRO TOURS**
2. **CLUBS**
3. **ACADEMIES**
4. **CORPORATE**
5. **MIDDLE SCHOOLS**
6. **HIGH SCHOOLS**
7. **D1 COLLEGES**

### 🖱️ Advanced Scroll Behavior
- **Scroll locking**: Section captures 4 scroll events before allowing progression
- **Visual feedback**: Scroll progress indication and subtle scaling
- **Smooth transitions**: Animated exit when ready to continue
- **Touch support**: Works on mobile with swipe gestures
- **Keyboard accessibility**: Space/Enter to skip to next section

## Technical Implementation

### HTML Structure
```html
<section class="we-serve-section">
    <div class="we-serve-section__container">
        <h2 class="we-serve-section__text">
            <span class="we-serve-section__static">WE SERVE</span>
            <span class="we-serve-section__dynamic"></span>
        </h2>
        <div class="we-serve-section__scroll-indicator">
            Scroll to explore
        </div>
    </div>
</section>
```

### Animation System
- **Text entrance**: Static text slides up first, dynamic container follows
- **Word cycling**: Each word slides in from bottom with scale effect
- **Exit animations**: Words slide up and scale down when changing
- **Gradient effects**: Text has animated gradient backgrounds
- **Background animation**: Subtle floating elements for depth

### Performance Features
- **Intersection Observer**: Efficient viewport detection
- **will-change optimization**: GPU acceleration when needed
- **Event throttling**: Smooth scroll handling without lag
- **Automatic cleanup**: Removes performance properties after use
- **Mobile optimization**: Adjusted animations and touch handling

## Scroll Behavior Details

### Phase 1: Enter Section
1. User scrolls into section
2. Static "WE SERVE" text animates in (0.2s delay)
3. Dynamic container appears (0.6s delay)
4. Word cycling begins (1.5s delay)

### Phase 2: Hold in Section
1. First 4 scroll attempts are captured
2. Visual feedback shows scroll progress
3. Section locks temporarily after each scroll
4. Text continues cycling throughout

### Phase 3: Transition Out
1. After 4 scrolls, natural scroll is allowed
2. Section adds "transitioning-out" class
3. Text scales down and fades
4. Word cycling stops
5. Smooth transition to clients section

## Customization Options

### Changing Word List
Edit the `words` array in `we-serve-section.js`:

```javascript
this.words = [
    'YOUR CUSTOM',
    'CLIENT TYPES',
    'GO HERE'
];
```

### Adjusting Scroll Behavior
```javascript
this.maxScrolls = 6; // Change number of scroll captures
this.wordChangeInterval = 1500; // Change word cycling speed (ms)
```

### Modifying Visual Timing
Edit CSS transition timings in `_we-serve-section.scss`:

```scss
.we-serve-section__word {
    transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); // Slower
}
```

### Color Customization
```scss
.we-serve-section {
    // Change background gradient
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
    
    &__word {
        // Change text gradient
        background: linear-gradient(135deg, #ffffff 0%, #your-accent 50%, #ffffff 100%);
    }
}
```

## Responsive Behavior

### Desktop (1200px+)
- Large typography (up to 8rem)
- Full scroll behavior active
- 4 scroll captures
- Complex text gradients

### Tablet (768px - 1200px)
- Medium typography (up to 6rem)
- Reduced animation intensity
- Touch scroll support
- Simplified gradients

### Mobile (≤768px)
- Smaller typography (up to 4rem)
- Lighter animations
- Touch-optimized scrolling
- Single-finger swipe detection

## Accessibility Features

### Keyboard Navigation
- **Space/Enter**: Skip to next section
- **Tab navigation**: Focus management
- **Escape**: Stop animations (if implemented)

### Motion Preferences
```scss
@media (prefers-reduced-motion: reduce) {
    // Disables complex animations
    // Uses simple opacity transitions
    // Removes background motion
}
```

### High Contrast Mode
```scss
@media (prefers-contrast: high) {
    // Solid backgrounds
    // High contrast text
    // Simplified effects
}
```

## Browser Support

✅ **Modern Browsers** (Chrome 58+, Firefox 55+, Safari 12+)
- Full feature set
- Smooth animations
- Advanced scroll control

✅ **Older Browsers**
- Graceful degradation  
- Basic text display
- Standard scrolling

## Debugging & Development

### Console Commands
```javascript
// Access section instance
window.weServeSection

// Manual word change
window.weServeSection.nextWord()

// Check if section is in viewport
window.weServeSection.isInViewport()

// Stop/start word cycling
window.weServeSection.stopWordCycling()
window.weServeSection.startWordCycling()
```

### Debug Mode
Add to JavaScript for detailed logging:
```javascript
// Enable detailed console output
console.log('WeServeSection: Debug info...'); // Already included
```

### Visual Debug CSS
Temporarily add for development:
```scss
.we-serve-section__word {
    outline: 2px solid red; // See word boundaries
}

.we-serve-section.transitioning-out {
    background: blue; // See transition state
}
```

## Performance Considerations

### Optimizations Included
1. **Intersection Observer** for efficient viewport detection
2. **will-change properties** for GPU acceleration  
3. **Event throttling** to prevent scroll lag
4. **Automatic cleanup** of performance properties
5. **Mobile-specific** lighter animations

### Performance Tips
- Text animations use transform/opacity only
- Background effects are contained
- No layout-triggering properties
- Efficient word cycling algorithm

## Common Issues & Solutions

### Issue: Section not responding to scroll
**Solution**: Check if Intersection Observer is supported
```javascript
if ('IntersectionObserver' in window) {
    // Initialize section
} else {
    // Fallback behavior
}
```

### Issue: Text cycling too fast/slow
**Solution**: Adjust interval in constructor
```javascript
this.wordChangeInterval = setInterval(() => {
    this.changeWord();
}, 3000); // Change from 2000ms to 3000ms
```

### Issue: Mobile scrolling issues
**Solution**: Check touch event handling
```javascript
// Adjust touch sensitivity
if (deltaY > 30) { // Reduce from 50 to 30
    // Handle swipe
}
```

## Files Structure

```
├── templates/pages/custom/page/
│   └── about-us-custom.html              # HTML structure
├── assets/scss/components/custom/
│   └── _we-serve-section.scss          # All styles
└── assets/js/theme/custom/
    └── we-serve-section.js             # All functionality
```

---

**Current Status**: ✅ Active and built
**Integration**: Between Services and Clients sections  
**Version**: 1.0
**Last Updated**: August 8, 2025

**Next Steps**: Visit the about page and scroll to experience the section in action!
