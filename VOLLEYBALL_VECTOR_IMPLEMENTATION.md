# Volleyball Vector Background Implementation

## Overview
The volleyball-vector.svg has been integrated into the WE SERVE section as a subtle, animated background element that enhances the visual appeal while maintaining text readability.

## Implementation Details

### File Location
- **Source SVG**: `assets/img/about/volleyball-vector.svg`
- **Implementation**: `assets/scss/components/custom/_we-serve-section.scss`

### Design Features

#### 1. **Positioning & Sizing**
- **Desktop**: Maximum 600px size, responsive to 80% viewport width
- **Mobile**: Maximum 400px size, responsive to 70% viewport width
- **Position**: Centered behind the text using absolute positioning

#### 2. **Visual Treatment**
- **Opacity**: 
  - Desktop: 8% opacity for subtle visibility
  - Mobile: 5% opacity for less distraction on smaller screens
- **Z-index**: Positioned between background gradient and text (z-index: 1)
- **Background Properties**:
  - `background-size: contain` - Maintains aspect ratio
  - `background-repeat: no-repeat` - Single instance
  - `background-position: center` - Centered alignment

#### 3. **Animation**
- **Animation Name**: `volleyballFloat`
- **Duration**: 15 seconds
- **Easing**: `ease-in-out infinite`
- **Effects**:
  - Subtle translation movements (2-4px range)
  - Minor rotation changes (±2 degrees)
  - Scale variations (0.95 to 1.05)
  - Synchronized with existing background animations

### Code Structure

```scss
// Main volleyball background implementation
.we-serve-section::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(80vw, 600px);
    height: min(80vw, 600px);
    transform: translate(-50%, -50%);
    background-image: url('../img/about/volleyball-vector.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.08;
    z-index: 1;
    pointer-events: none;
    animation: volleyballFloat 15s ease-in-out infinite;
}
```

### Animation Keyframes

```scss
@keyframes volleyballFloat {
    0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
    25% { transform: translate(-52%, -48%) rotate(2deg) scale(1.05); }
    50% { transform: translate(-48%, -52%) rotate(-1deg) scale(0.95); }
    75% { transform: translate(-50%, -46%) rotate(1deg) scale(1.02); }
}
```

## Accessibility Considerations

### Reduced Motion Support
- Animation is disabled for users with `prefers-reduced-motion: reduce`
- Volleyball remains static but visible for those who need reduced animations

### Performance Optimizations
- Uses CSS transforms instead of position changes for better performance
- `pointer-events: none` prevents interaction interference
- Optimized z-index layering to avoid rendering conflicts

## Responsive Behavior

### Desktop (>768px)
- Maximum size: 600px
- Opacity: 8%
- Full animation effects

### Mobile (≤768px)
- Maximum size: 400px
- Reduced opacity: 5%
- Same animation but less prominent
- Adjusted for smaller screens and touch interfaces

## Integration Benefits

1. **Brand Reinforcement**: Volleyball imagery reinforces the sports theme
2. **Visual Interest**: Subtle movement and presence without distraction
3. **Professional Appearance**: Low opacity maintains sophisticated look
4. **Responsive Design**: Adapts appropriately to all screen sizes
5. **Accessibility Compliant**: Respects user motion preferences

## Future Enhancements

### Potential Improvements
- **Dynamic Color**: Could tint the SVG based on the current cycling word
- **Interactive Effects**: Could pulse or brighten slightly during text transitions
- **Multiple Elements**: Could add smaller volleyball elements at corners
- **Parallax Effect**: Could move slightly with scroll position

### Customization Options
- Opacity can be easily adjusted in SCSS variables
- Animation timing can be modified for different effects
- Size constraints can be updated for different visual impact
- Multiple SVG files could be rotated for variety

## Technical Notes

### Browser Compatibility
- SVG backgrounds supported in all modern browsers
- CSS transforms and animations have excellent support
- Fallbacks gracefully to static positioning if needed

### File Size Impact
- SVG files are typically small and vector-based
- No additional HTTP requests due to CSS background implementation
- Minimal impact on page load performance

## Maintenance

### File Dependencies
- Ensure `volleyball-vector.svg` remains in `assets/img/about/` folder
- Path reference in SCSS must match file location
- Consider version control for SVG updates

### Testing Checklist
- [ ] Verify visibility on all screen sizes
- [ ] Test animation smoothness across devices
- [ ] Confirm text readability is not impacted
- [ ] Validate accessibility with screen readers
- [ ] Check reduced-motion preference handling
