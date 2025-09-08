# Quick Action Plan: Fix 414 CLS URLs

## ✅ COMPLETED TODAY
1. **Critical Infrastructure Setup**
   - Added inline CLS prevention CSS to `base.html`
   - Updated product cards with aspect-ratio containers
   - Updated category template with image preloading
   - Updated product grid with CLS-safe transitions
   - Build verified - no errors

## 🎯 IMMEDIATE NEXT STEPS (This Week)

### Step 1: Test Current Changes
```bash
# Test with Chrome DevTools Lighthouse
1. Open category page: https://www.volleyballusa.com/volleyball-nets/
2. Run Lighthouse audit (Desktop & Mobile)
3. Check CLS score - should be < 0.15 (down from 0.32)
```

### Step 2: Apply to High-Traffic Templates
Based on your URL list, update these critical templates:

```bash
# Priority 1: Category Pages
templates/pages/custom/category/court-construction.html
templates/pages/custom/category/indoor-equipment.html
templates/pages/custom/category/outdoor-equipment.html

# Priority 2: Product Pages  
templates/pages/product.html

# Priority 3: Home Page
templates/pages/home.html
```

### Step 3: Quick Component Fixes
Update these shared components that appear across multiple pages:

```bash
# Hero/Banner components
templates/components/custom/hero-*.html

# Featured products
templates/components/products/featured.html

# Carousels
templates/components/common/carousel.html
```

## 📋 Template Update Pattern

For each template, apply this pattern:

### 1. Add to head section:
```handlebars
{{#partial "head"}}
    {{!-- Preload critical images --}}
    {{#if category.image}}
        <link rel="preload" as="image" href="{{getImage category.image 'zoom_size'}}" />
    {{/if}}
    {{#if product.main_image}}
        <link rel="preload" as="image" href="{{getImage product.main_image 'zoom_size'}}" />
    {{/if}}
{{/partial}}
```

### 2. Add CLS classes to containers:
```handlebars
<!-- Before -->
<div class="content">

<!-- After -->
<div class="content cls-dynamic-content cls-safe-transition">
```

### 3. Add aspect ratios to images:
```handlebars
<!-- Before -->
<img src="{{image}}" alt="...">

<!-- After -->
<div class="cls-aspect-ratio cls-aspect-ratio--square">
    <img src="{{image}}" alt="..." style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
</div>
```

## 🔍 Monitoring Strategy

### Google Search Console
1. **Core Web Vitals Report**: Check weekly for validation progress
2. **URL Groups**: Monitor the "CLS issue: more than 0.25" group size
3. **Target**: Reduce from 414 URLs to < 50 URLs within 28 days

### Expected Timeline
- **Week 1**: 60-70% improvement (core infrastructure ✅ done)
- **Week 2**: 80-85% improvement (component updates)  
- **Week 3**: 90%+ improvement (page-specific fixes)
- **Week 4**: GSC validation begins showing "Good" status

## 🚀 Quick Wins Available Now

1. **Deploy Current Changes**: The foundation is in place
2. **Test Volleyball Nets Page**: Should show immediate CLS improvement
3. **Monitor GSC**: Start tracking validation progress
4. **Apply Same Pattern**: Use volleyball-nets-custom.html as template for other categories

## 📞 Support Available

If you need help with:
- Applying these changes to specific templates
- Testing and validation
- Advanced optimizations
- Custom component updates

The comprehensive strategy document (`CLS_FIX_COMPREHENSIVE_STRATEGY.md`) contains detailed instructions for each phase.

---

**Next Action**: Test the volleyball nets page with Lighthouse to confirm CLS improvement, then apply the same pattern to other high-traffic pages.
