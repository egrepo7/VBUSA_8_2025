# Modern Scroll Animations Documentation

## Overview
This system provides modern, smooth scroll-triggered animations for the about page and other content sections. The animations use the **Intersection Observer API** for optimal performance and provide a contemporary web experience similar to premium websites.

## Features

### 🎨 Animation Types Available

1. **Fade Up** - Elements slide up and fade in
2. **Fade Left** - Elements slide in from the left
3. **Fade Right** - Elements slide in from the right
4. **Scale Fade** - Elements scale up while fading in
5. **Section Titles** - Special animations with underline reveals
6. **Images** - Smooth scale and fade effects
7. **Service Cards** - Alternating slide directions
8. **Hero Section** - Immediate animations on page load

### 🚀 Performance Features

- **Intersection Observer API** - No scroll event listeners (better performance)
- **Will-change optimization** - GPU acceleration for smooth animations
- **Automatic cleanup** - Removes performance properties after animations
- **Reduced motion support** - Respects user accessibility preferences
- **Mobile optimized** - Adjusted animations for touch devices

### 🎯 About Page Specific Features

- **Hero Section** - Immediate fade-in on page load
- **Section Titles** - Animated underlines and background effects
- **Service Cards** - Staggered reveals with glow effects
- **Images** - Hover effects and parallax-like reveals
- **Text Content** - Typing cursor effects and shimmer animations

## How It Works

### Automatic Detection
The system automatically detects and animates these elements:

**Fade Up Elements:**
- `.about-trusted__text`
- `.about-designed__column p`
- `.about-mission__text p`
- `.about-service__description`
- `.page-content p`

**Section Titles:**
- `.about-trusted__title`
- `.about-designed__title`
- `.about-mission__title`
- `.about-services__title`

**Service Cards:**
- `.about-service`

**Images:**
- `.about-trusted__image`
- `.about-designed__image-item`
- `.about-mission__image`
- `.about-service__image`

**Columns:**
- `.about-designed__column`

### Animation Triggers
- Elements animate when **10% visible** in the viewport
- Uses **rootMargin: '-10% 0px -10% 0px'** for natural feel
- Each element only animates once (one-time trigger)

## Usage Examples

### Adding Custom Animations to New Elements

```javascript
// Get the scroll animations instance
const scrollAnimations = window.scrollAnimations;

// Add a new element with fade-up animation
const newElement = document.querySelector('.my-custom-element');
scrollAnimations.addElement(newElement, 'fade-up');

// Manually trigger animation
scrollAnimations.triggerAnimation(newElement);
```

### Custom CSS Classes

```scss
// Add to any element for scroll animations
.my-element {
    // Apply one of these classes:
    @extend .fade-up;      // Slides up and fades in
    @extend .fade-left;    // Slides in from left
    @extend .fade-right;   // Slides in from right
    @extend .fade-scale;   // Scales up and fades in
    @extend .blur-focus;   // Blur to focus transition
    
    // Add staggered delay
    @extend .stagger-1;    // 0.1s delay
    @extend .stagger-2;    // 0.2s delay
    // ... up to .stagger-6
}
```

### Event Listeners

```javascript
// Listen for when elements animate in
document.addEventListener('animated-in', (event) => {
    const animatedElement = event.detail.element;
    console.log('Element animated:', animatedElement);
    
    // Add custom behavior after animation
    animatedElement.classList.add('custom-post-animation');
});
```

## Animation Timing

### Default Timings
- **Duration**: 0.8s (most animations)
- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth, modern feel)
- **Stagger delays**: 0.1s - 0.6s between elements
- **Hero animations**: 1s duration with delays

### Service Cards Specific
- **Base delay**: Each card has 0.2s stagger
- **Direction**: Even cards slide from left, odd from right
- **Glow effect**: Triggered 200ms after reveal

## Files Structure

```
assets/
├── scss/components/custom/
│   └── _scroll-animations.scss     # All animation styles
└── js/theme/custom/
    └── scroll-animations.js        # Animation logic
```

## Browser Support

✅ **Supported Browsers:**
- Chrome/Edge 58+
- Firefox 55+
- Safari 12+
- iOS Safari 12+
- Chrome Mobile 58+

✅ **Fallbacks:**
- Graceful degradation for older browsers
- Respects `prefers-reduced-motion`
- Elements remain visible if JS fails

## Performance Considerations

### Optimizations Included
1. **Intersection Observer** instead of scroll listeners
2. **will-change** property for GPU acceleration
3. **Automatic cleanup** after animations complete
4. **Reduced motion queries** for accessibility
5. **Mobile-specific** lighter animations

### Performance Tips
- Animations are GPU-accelerated
- No layout thrashing (uses transform/opacity only)
- Minimal JavaScript execution
- Automatic memory cleanup

## Customization

### Adjusting Animation Speed
Edit `_scroll-animations.scss`:

```scss
.fade-up {
    transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); // Slower
}
```

### Changing Trigger Points
Edit `scroll-animations.js`:

```javascript
const options = {
    rootMargin: '-20% 0px -20% 0px', // Trigger later
    threshold: 0.2 // Require more visibility
};
```

### Adding New Animation Types
1. Add CSS in `_scroll-animations.scss`:

```scss
.my-custom-animation {
    opacity: 0;
    transform: rotateX(90deg);
    transition: all 0.8s ease;
    
    &.animate-in {
        opacity: 1;
        transform: rotateX(0deg);
    }
}
```

2. Update JavaScript in `scroll-animations.js`:

```javascript
// In findAnimatableElements() method
selectors.customAnimations = ['.my-animated-element'];

selectors.customAnimations.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.add('my-custom-animation');
        this.animatedElements.push(el);
    });
});
```

## Debugging

### Console Methods
```javascript
// View all animated elements
scrollAnimations.debugAnimatedElements();

// Check if system is working
console.log('ScrollAnimations active:', !!window.scrollAnimations);
```

### Visual Debugging
Add to your CSS temporarily:

```scss
.fade-up, .fade-left, .fade-right, .section-title-animate {
    outline: 2px solid red !important; // See detection
}

.animate-in {
    outline: 2px solid green !important; // See animations
}
```

## Best Practices

### Do:
✅ Use consistent timing across related elements
✅ Test on mobile devices
✅ Respect user accessibility preferences
✅ Keep animations subtle and purposeful
✅ Test with slow network connections

### Don't:
❌ Animate too many elements at once
❌ Use overly long animation durations
❌ Ignore reduced motion preferences
❌ Animate layout properties (width, height, etc.)
❌ Chain too many complex animations

---

**Current Status**: ✅ Active with 3-card grid layout
**Version**: 1.0
**Last Updated**: August 8, 2025
