# GitHub Copilot Instructions for Volleyball USA Theme

## Project Context
This is a BigCommerce Stencil theme for Volleyball USA (vbusa_theme_2025-08). Follow these conventions when generating code suggestions.

## Core Principles

### Web Vitals & CLS Prevention - PRIORITY #0 (HIGHEST)
- **ALWAYS prevent Cumulative Layout Shift (CLS)**
- Reserve space with `min-height`, `aspect-ratio`, and explicit dimensions
- Use `.cls-safe-transition` and `.cls-safe-hover` utility classes
- Preload critical images in `<head>` with `<link rel="preload">`
- Never use layout-affecting animations (width, height, margin, padding changes)
- Only animate `transform`, `opacity`, `background-color`, `color`, `box-shadow`
- Add `aspect-ratio` to all image containers and dynamic content
- Test with slow 3G and verify no layout shifts occur during loading

### Core Web Vitals Standards
```scss
// ✅ CLS-Safe Animations
.safe-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover { transform: translateY(-2px); }
}

// ❌ CLS-Causing Animations (NEVER USE)
.bad-hover {
    &:hover { 
        margin-top: -4px; // Causes layout shift
        height: 110%; // Causes layout shift
    }
}

// ✅ Image CLS Prevention
.image-container {
    aspect-ratio: 4/3;
    min-height: 200px;
    background: #f0f0f0; // Fallback while loading
}
```

### DRY (Don't Repeat Yourself) - PRIORITY #1
- **Always search for existing classes before creating new ones**
- Reuse `.category-card`, `.container`, `.h1-h6`, and other existing theme classes
- Only create new classes for truly unique styling needs
- Use class composition: `<div class="category-card buying-guide__card">`

### Class Naming (BEM)
```
.block                  // Component root
.block__element        // Child element
.block__element--modifier  // Variation
```

### SCSS Organization
```scss
.component {
    // 1. CLS Prevention (aspect-ratio, min-height)
    // 2. Layout (position, display, width)
    // 3. Box model (margin, padding, border)  
    // 4. Visual (background, color, shadow)
    // 5. CLS-Safe Animation (transform, opacity only)
    // 6. Hover states (CLS-safe only)
    // 7. Media queries (mobile-first)
}
```

## Template Patterns

### Handlebars Component Structure
```handlebars
{{!-- Preload critical images in head section --}}
{{#partial "head"}}
    {{#if category.image}}
        <link rel="preload" as="image" href="{{getImage category.image 'zoom_size'}}" />
    {{/if}}
{{/partial}}

{{!-- Always use category-aware conditionals --}}
{{#contains ../category.url "category-name"}}
    <div class="existing-class new-class">
        <div class="existing-class__element">
            <!-- Reuse existing content structure -->
        </div>
    </div>
{{/contains}}
```

### Component Integration
```handlebars
<section class="component-section" style="min-height: 400px; aspect-ratio: 16/9;">
    <div class="container"> {{!-- Existing layout class --}}
        {{> components/custom/component-name}}
    </div>
</section>
```

## Style Rules

### ❌ DON'T
- Use `!important` declarations
- Recreate existing card/button/layout styles
- Create entirely new class hierarchies when existing ones work
- Use inline styles for complex styling
- Animate layout properties (width, height, margin, padding)
- Create components without reserved space (min-height, aspect-ratio)
- Load images without proper dimensions or preloading

### ✅ DO
- Search existing SCSS first: `grep -r "style-property" assets/scss/`
- Use higher specificity instead of `!important`
- Leverage existing `.category-card` structure for card components
- Use existing button classes (`.category-card__button`)
- Follow mobile-first responsive design
- Always add aspect-ratio to image containers
- Preload critical above-the-fold images
- Use CLS-safe animations (transform, opacity only)

## Animation Standards
```scss
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

&:hover {
    transform: translateY(-4px) scale(1.02);
}

@media (prefers-reduced-motion: reduce) {
    transition: box-shadow 0.3s ease;
    &:hover { transform: none; }
}
```

## Common Reusable Classes
- `.category-card` - Base card component
- `.category-card__image` - Card background/image
- `.category-card__content` - Card content positioning
- `.category-card__title` - Card headings
- `.category-card__button` - Card CTAs
- `.container` - Layout wrapper
- `.h1`, `.h2`, `.h3` - Typography hierarchy

## Before Creating New Styles
1. Search existing SCSS for similar patterns
2. Check if existing `.category-card` structure can be reused
3. Look for existing button/typography/layout classes
4. Only override properties that truly need to differ

## Component Checklist
- [ ] Uses existing theme classes where possible
- [ ] Category-aware with Handlebars conditionals
- [ ] Mobile-first responsive design
- [ ] Includes accessibility attributes
- [ ] Consistent hover animations
- [ ] No `!important` declarations
- [ ] **CLS Prevention**: Reserved space with min-height/aspect-ratio
- [ ] **Critical Images**: Preloaded in `<head>` section
- [ ] **Safe Animations**: Only transform/opacity, no layout properties
- [ ] **Performance**: Optimized loading without layout shifts

## Web Vitals Excellence Guidelines

### CLS (Cumulative Layout Shift) - Target: < 0.1
```scss
// ✅ ALWAYS include these for any component
.component {
    min-height: 200px; // Reserve space immediately
    aspect-ratio: 16/9; // Prevent reflow on content load
}

// ✅ Image containers MUST have dimensions
.image-container {
    aspect-ratio: 4/3;
    min-height: 150px;
    background-color: #f0f0f0; // Fallback color
}
```

### LCP (Largest Contentful Paint) - Target: < 2.5s
```handlebars
{{!-- Preload LCP candidates --}}
{{#partial "head"}}
    <link rel="preload" as="image" href="{{cdn 'hero-image.jpg'}}" />
    <link rel="preload" as="font" href="{{cdn 'fonts/primary.woff2'}}" crossorigin />
{{/partial}}
```

### FID/INP (Interaction Responsiveness) - Target: < 100ms
- Keep JavaScript minimal on initial load
- Use CSS transitions instead of JavaScript animations
- Debounce scroll and resize event handlers

### Performance Patterns
```scss
// ✅ Efficient animations
.efficient-hover {
    will-change: transform; // Hint to browser
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-2px) scale(1.02);
    }
}

// ❌ Inefficient animations (NEVER USE)
.bad-animation {
    &:hover {
        width: 110%; // Forces layout recalculation
        height: 110%; // Forces layout recalculation
    }
}
```

### Critical Resource Loading Strategy
1. **Above-the-fold**: Preload in `<head>`
2. **Below-the-fold**: Use `loading="lazy"`
3. **Interactive elements**: Ensure immediate response capability
4. **Fonts**: Use `font-display: swap` and preload critical fonts

### Testing Commands
```bash
# Lighthouse CI (add to development workflow)
npm install -g @lhci/cli
lhci autorun

# Core Web Vitals testing
# Test on slow 3G network in Chrome DevTools
# Verify CLS score < 0.1
# Verify LCP score < 2.5s
```
