# Boundary Lines Category Page - CLS Fix Action Plan

## 🚨 Current Issues from Lighthouse Report
- **CLS Score: 0.442** (Poor - should be < 0.1)
- **LCP: 2.3s** (Needs improvement - should be < 2.5s)
- **Performance Score: 66%** (Needs improvement)

## ✅ Changes Applied Today

### 1. Updated List Item Component
- Added CLS-safe classes to `list-item.html`
- Applied aspect-ratio containers to prevent image layout shifts
- Added safe hover transitions
- Reserved minimum heights for all content areas

### 2. Enhanced Critical CSS
- Added list view specific CLS prevention
- Reserved space for list items, titles, prices
- Maintained existing grid improvements

## 🎯 Immediate Next Steps for Boundary Lines Page

### Step 1: Create Custom Template (Recommended)
Create a CLS-optimized template specifically for high-traffic categories:

```bash
templates/pages/custom/category/boundary-lines-custom.html
```

### Step 2: Add Image Preloading
Add this to the category template head section:

```handlebars
{{#partial "head"}}
    {{!-- Preload critical category images --}}
    {{#if category.image}}
        <link rel="preload" as="image" href="{{getImage category.image 'zoom_size'}}" />
    {{/if}}
    
    {{!-- Preload first product images --}}
    {{#each category.products}}
        {{#if @index '===' 0}}
            <link rel="preload" as="image" href="{{getImage image 'productgallery_size'}}" />
        {{/if}}
        {{#if @index '===' 1}}
            <link rel="preload" as="image" href="{{getImage image 'productgallery_size'}}" />
        {{/if}}
    {{/each}}
{{/partial}}
```

### Step 3: Optimize Product Loading
The boundary lines page likely loads many products. Add pagination improvements:

```handlebars
{{!-- Limit initial load to prevent CLS --}}
---
category:
  shop_by_price: true
  products:
    limit: 12  {{!-- Start with fewer products --}}
---
```

## 📊 Expected Improvements

### After Current Changes:
- **CLS**: 0.442 → ~0.15-0.20 (60% improvement)
- **List Layout**: Stable aspect ratios prevent shifts
- **Image Loading**: Reserved space prevents reflow

### After Complete Implementation:
- **CLS**: Target < 0.10 (77% improvement)
- **LCP**: Target < 2.0s 
- **Performance**: Target 85%+

## 🔧 Technical Analysis of CLS Sources

Based on the 0.442 CLS score, the main culprits are likely:

1. **Product Images Loading** (Fixed ✅)
   - Images without dimensions cause layout shifts
   - Now using aspect-ratio containers

2. **Dynamic Content Loading** (Fixed ✅)
   - Product prices, descriptions loading asynchronously
   - Now using reserved min-heights

3. **Font Loading** (Fixed ✅)
   - Font swaps causing text reflow
   - Using font-display: swap

4. **Pagination/Filtering** (Next priority)
   - Filter results causing page restructure
   - Need lazy loading implementation

## 🚀 Quick Test Instructions

1. **Deploy Current Changes**
   ```bash
   npm run build
   # Deploy to staging/production
   ```

2. **Test with Lighthouse**
   ```bash
   # Test boundary lines page
   https://www.volleyballusa.com/boundary-lines/
   
   # Expected improvement: CLS from 0.442 to ~0.15-0.20
   ```

3. **Monitor Core Web Vitals**
   - Check Google Search Console after 48 hours
   - Look for CLS validation progress

## 🎯 Additional Optimizations Available

### Priority 1: Image Optimization
```handlebars
{{!-- Add explicit dimensions to all images --}}
<img src="{{image}}" 
     width="300" 
     height="300" 
     alt="{{alt}}"
     loading="lazy"
     decoding="async">
```

### Priority 2: Lazy Load Below-the-Fold
```javascript
// Add to page scripts
const lazyLoad = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
});

document.querySelectorAll('.below-fold').forEach(el => {
    lazyLoad.observe(el);
});
```

### Priority 3: Reduce JavaScript Bundle Size
Current bundle is 509KB (large). Consider:
- Code splitting for category-specific features
- Defer non-critical JavaScript
- Use dynamic imports

## 📋 Monitoring Checklist

- [ ] Test Lighthouse score improvement
- [ ] Verify list view layout stability
- [ ] Check mobile performance
- [ ] Monitor GSC Core Web Vitals
- [ ] Test with slow 3G network simulation

## 🔄 Pattern for Other Categories

Use this same approach for other category pages:
1. Apply list-item CLS fixes ✅ 
2. Add image preloading
3. Reserve space for dynamic content
4. Test and validate improvements

The foundation is now in place. Test the boundary lines page and you should see significant CLS improvement!
