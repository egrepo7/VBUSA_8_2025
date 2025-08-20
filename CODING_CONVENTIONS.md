# BigCommerce Stencil Theme - Coding Conventions & Patterns

## Project Overview
This document outlines the coding patterns, conventions, and best practices for the Volleyball USA BigCommerce Stencil theme (vbusa_theme_2025-08).

---

## 🏗️ Project Structure

### Template Organization
```
templates/
├── components/
│   ├── common/           # Shared components (breadcrumbs, etc.)
│   └── custom/           # Project-specific components
│       ├── buying-guide.html
│       ├── category-cards.html
│       ├── category-faq.html
│       └── category-hero.html
├── layout/               # Base layouts
├── pages/
│   └── custom/           # Custom page templates
│       └── category/
│           └── category-top-level.html
└── partials/             # Reusable template fragments
```

### SCSS Architecture
```
assets/scss/
├── components/
│   ├── common/           # Base component styles
│   └── custom/           # Project-specific component styles
│       ├── _buying-guide.scss
│       ├── _category-cards.scss
│       ├── _category-faq.scss
│       └── _category-hero.scss
├── settings/             # Variables, mixins
├── tools/                # Functions, mixins
└── theme.scss           # Main import file
```

---

## 🎨 CSS/SCSS Conventions

### Class Naming (BEM Methodology)
```scss
// Block__Element--Modifier pattern
.category-hero                    // Block
.category-hero__title            // Element
.category-hero__title--large     // Modifier

// Component-specific examples:
.buying-guide-section           // Section wrapper
.buying-guide__card            // Card container
.buying-guide__image           // Image element
.category-card__content        // Content element
.category-card__button         // Button element
```

### SCSS Organization Principles
```scss
// 1. Component root class first
.buying-guide__card {
    // Layout properties
    position: relative;
    width: 100%;
    
    // Box model
    margin: 0;
    padding: 0;
    border-radius: 16px;
    
    // Visual properties
    background: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    
    // Animation properties
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    // Hover states
    &:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
    }
    
    // Responsive design (mobile-first)
    @media (max-width: 768px) {
        border-radius: 12px;
    }
}
```

### Avoid !important
❌ **DON'T:**
```scss
.buying-guide__title {
    color: #1e293b !important;
    font-family: 'Open Sans' !important;
}
```

✅ **DO:** Use higher specificity
```scss
.buying-guide__card .buying-guide__image .category-card__content .category-card__title {
    color: #1e293b;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
}
```

### Animation Standards
```scss
// Consistent easing curves
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

// Hover effects
&:hover {
    transform: translateY(-4px) scale(1.02);  // Subtle lift + scale
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
    transition: box-shadow 0.3s ease;
    
    &:hover {
        transform: none;
    }
}
```

---

## 📝 Handlebars Templates

### Component Structure Pattern
```handlebars
{{!-- Component: components/custom/buying-guide.html --}}
{{!-- Category-aware content switching --}}
{{#contains ../category.url "volleyball-nets"}}
    <div class="buying-guide__card">
        <div class="buying-guide__image category-card__image" 
             style="background-image: url('/assets/img/volleyball-nets-bg.jpg')">
            <div class="category-card__content">
                <h3 class="category-card__title">Volleyball Nets Buying Guide</h3>
                <p class="category-card__subtitle">Find the perfect net for your court</p>
                <div class="category-card__button" style="cursor: pointer;">
                    Explore Guide
                    <svg>...</svg>
                </div>
            </div>
        </div>
    </div>
{{else}}{{#contains ../category.url "complete-systems"}}
    {{!-- Alternative content for different category --}}
{{/contains}}{{/contains}}
```

### Conditional Logic Patterns
```handlebars
{{!-- Multi-level category detection --}}
{{#contains category.url "volleyball-nets"}}
    {{!-- Volleyball nets specific content --}}
{{else}}{{#contains category.url "volleyball-poles"}}
    {{!-- Volleyball poles specific content --}}
{{else}}{{#contains category.url "complete-systems"}}
    {{!-- Complete systems specific content --}}
{{else}}
    {{!-- Fallback content --}}
{{/contains}}{{/contains}}{{/contains}}
```

### Data Injection Pattern
```handlebars
{{!-- At template top --}}
{{inject "categoryId" category.id}}
{{inject "categoryProductsPerPage" theme_settings.categorypage_products_per_page}}
```

---

## ⚛️ Component Development

### Reusable Component Checklist
- [ ] Component is category-aware (uses Handlebars conditionals)
- [ ] Styles are modular and don't conflict with other components
- [ ] Responsive design is mobile-first
- [ ] Accessibility attributes are included (aria-label, etc.)
- [ ] Hover states and animations are consistent
- [ ] Component works with and without JavaScript

### Component Integration
```handlebars
{{!-- In main template --}}
{{#contains category.url "volleyball-nets"}}
<section class="buying-guide-section">
    <div class="container">
        {{> components/custom/buying-guide}}
    </div>
</section>
{{/contains}}
```

---

## 🎯 Interactive Elements

### Button/CTA Standards
```scss
// Enabled state
.category-card__button {
    background: #059669;
    color: white;
    border: 2px solid #059669;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: #047857;
        transform: translateX(4px);
        
        svg {
            transform: translate(2px, -2px);
        }
    }
}

// Disabled state
.category-card__button:not([style*="cursor: pointer"]) {
    background: #e2e8f0;
    color: #64748b;
    cursor: not-allowed;
    
    &:hover {
        transform: none;
    }
}
```

### Non-Interactive Decorative Elements
```scss
// For decorative elements (like scroll arrows)
.category-hero__scroll-btn {
    cursor: default; /* Not pointer - decorative only */
    // Remove onclick handlers from HTML
}
```

---

## 📱 Responsive Design

### Breakpoint Strategy
```scss
// Mobile-first approach
.component {
    // Base mobile styles
    
    @media (max-width: 480px) {
        // Small mobile adjustments
    }
    
    @media (max-width: 768px) {
        // Tablet adjustments
    }
    
    @media (min-width: 769px) {
        // Desktop styles
    }
}
```

### Aspect Ratio Patterns
```scss
.buying-guide__card {
    aspect-ratio: 21/9;     // Wide for desktop
    
    @media (max-width: 768px) {
        aspect-ratio: 16/9;  // Less wide on tablet
    }
    
    @media (max-width: 480px) {
        aspect-ratio: 4/3;   // More square on mobile
    }
}
```

---

## 🧪 Development & Testing

### Stencil Configuration
```json
// config.stencil.json
{
  "customLayouts": {
    "category": {
      "category-top-level.html": "/volleyball-nets/"
    }
  }
}
```

### Local Development Commands
```bash
# Start development server
npm run start

# Build for production  
npm run build

# Kill stuck processes
lsof -ti:3000 | xargs kill -9
```

### Testing Checklist
- [ ] Test on multiple category URLs
- [ ] Verify responsive behavior at all breakpoints
- [ ] Check hover states and animations
- [ ] Validate accessibility (screen readers, keyboard navigation)
- [ ] Test with and without JavaScript enabled
- [ ] Verify cross-browser compatibility

---

## 📄 Content Management

### Category-Specific Content Pattern
```handlebars
{{!-- Content controlled in template, not external JSON --}}
{{#contains category.url "volleyball-nets"}}
    <h1>Professional Volleyball Nets for <strong>Every Level of Play</strong></h1>
    <div class="subtitle">Whether you're outfitting a high school gym...</div>
{{/contains}}
```

### FAQ Data Pattern
```javascript
// Inline JavaScript with structured data
const volleyballNetsFaqs = [
    {
        question: "What's the difference between indoor and outdoor volleyball nets?",
        answer: "Indoor nets are designed for gym use with specific tension requirements..."
    }
];
```

---

## 🔧 Maintenance Guidelines

### Code Quality Standards
- No `!important` declarations (use specificity instead)
- Consistent indentation (4 spaces)
- Meaningful variable and class names
- Comments for complex logic
- Regular cleanup of unused styles

### Version Control
- Commit frequently with descriptive messages
- Keep component changes isolated
- Test thoroughly before merging
- Document breaking changes

### Performance Considerations
- Minimize CSS specificity when possible
- Use efficient selectors
- Optimize images and backgrounds
- Consider lazy loading for non-critical components

---

## 🎨 Design System

### Color Palette
```scss
// Primary colors
$primary-green: #059669;
$primary-green-dark: #047857;

// Neutral colors
$text-dark: #1e293b;
$text-medium: #475569;
$text-light: #64748b;
$background-light: #e2e8f0;

// State colors
$disabled-bg: #e2e8f0;
$disabled-text: #64748b;
```

### Typography
```scss
// Font stacks
font-family: 'Open Sans', Arial, Helvetica, sans-serif;

// Font weights
font-weight: 500; // Regular
font-weight: 800; // Bold headings
```

### Spacing Scale
```scss
margin: 1rem 0;      // Small spacing
margin: 2rem 0;      // Medium spacing  
margin: 3rem 0;      // Large spacing
padding: 1.25rem;    // Component padding
```

---

## 🔄 DRY Principles & Style Unification

### Philosophy: Reuse Over Recreate
**Goal:** Unify styles by leveraging existing theme classes instead of creating multiple classes for nearly identical styling.

### Style Inheritance Strategy
```scss
// ✅ DO: Reuse existing component classes
.buying-guide__card {
    // Use existing category-card as base, add only differences
    @extend .category-card; // Or use existing class directly in HTML
    
    // Only add unique properties
    aspect-ratio: 21/9;
    max-height: 470px;
}

// ❌ DON'T: Recreate similar styles
.buying-guide__card {
    position: relative;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); // Already exists in category-card
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); // Duplicate
    // ... recreating everything
}
```

### HTML Class Reuse Pattern
```handlebars
{{!-- ✅ DO: Leverage existing theme classes --}}
<div class="buying-guide__card category-card"> {{!-- Use both classes --}}
    <div class="buying-guide__image category-card__image">
        <div class="category-card__content"> {{!-- Reuse existing content structure --}}
            <h3 class="category-card__title">Buying Guide Title</h3>
            <p class="category-card__subtitle">Buying Guide Subtitle</p>
            <div class="category-card__button">Explore Guide</div>
        </div>
    </div>
</div>

{{!-- ❌ DON'T: Create entirely new class structures --}}
<div class="buying-guide__card">
    <div class="buying-guide__content">
        <h3 class="buying-guide__title">...</h3>
        <p class="buying-guide__subtitle">...</p>
        <div class="buying-guide__button">...</div>
    </div>
</div>
```

### Identify Reusable Patterns
Before creating new styles, check if these existing patterns can be reused:

#### **Card Components**
```scss
// Base card styles likely already exist:
.category-card          // Card container
.category-card__image   // Image/background container  
.category-card__content // Content positioning
.category-card__title   // Heading styles
.category-card__subtitle // Subtitle styles
.category-card__button  // CTA button styles
```

#### **Layout Containers**
```scss
// Standard layout patterns:
.container              // Max-width content wrapper
.section                // Section spacing
.grid                   // Grid layouts
.flex                   // Flexbox utilities
```

#### **Typography Scale**
```scss
// Use existing heading classes:
.h1, .h2, .h3          // Heading hierarchy
.text-large, .text-small // Text size utilities
.text-center, .text-left // Alignment utilities
```

### Component Composition Strategy
```handlebars
{{!-- Build components by combining existing classes --}}
<section class="buying-guide-section"> {{!-- Only section-specific wrapper --}}
    <div class="container"> {{!-- Existing layout class --}}
        <div class="category-card buying-guide__card"> {{!-- Existing + specific --}}
            <div class="category-card__image buying-guide__image">
                <div class="category-card__content">
                    {{!-- All content uses existing category-card classes --}}
                </div>
            </div>
        </div>
    </div>
</section>
```

### Override Only When Necessary
```scss
// Only override specific properties that need to differ
.buying-guide__card.category-card {
    // Only the differences from standard category-card
    aspect-ratio: 21/9;
    max-height: 470px;
    
    .category-card__content {
        // Only positioning changes for this specific use case
        position: relative;
        margin-left: 2rem;
    }
    
    .category-card__title {
        // Only color change for light background
        color: #1e293b;
        text-shadow: none;
    }
}
```

### Style Audit Process
Before creating new styles:

1. **Search existing SCSS** for similar patterns
   ```bash
   grep -r "border-radius: 16px" assets/scss/
   grep -r "box-shadow:" assets/scss/
   grep -r "transition:" assets/scss/
   ```

2. **Check for existing button styles**
   ```bash
   grep -r "button" assets/scss/
   grep -r "\.btn" assets/scss/
   ```

3. **Look for layout patterns**
   ```bash
   grep -r "container" assets/scss/
   grep -r "grid" assets/scss/
   ```

### Consolidation Opportunities
Regularly review for styles that can be unified:

```scss
// ❌ Multiple similar button styles
.category-card__button { /* green button styles */ }
.buying-guide__button { /* nearly identical green button */ }
.hero__cta { /* another similar button */ }

// ✅ Unified button system
.btn-primary { /* base primary button */ }
.btn-secondary { /* base secondary button */ }

// Then use modifiers only for true differences
.btn-primary--large { font-size: 1.2rem; }
.btn-primary--small { font-size: 0.9rem; }
```

### Benefits of This Approach
- **Smaller CSS bundle** - Less duplicate code
- **Consistent design** - Unified look and feel
- **Easier maintenance** - Change base class, affects all instances
- **Faster development** - Less custom styling needed
- **Better responsive design** - Existing classes often have responsive variants

### Implementation Checklist
- [ ] Search existing styles before creating new ones
- [ ] Reuse HTML class structures when possible
- [ ] Only add component-specific classes for truly unique styling
- [ ] Regularly audit and consolidate similar styles
- [ ] Document which base classes are being extended
- [ ] Test that changes to base classes don't break other components

---
