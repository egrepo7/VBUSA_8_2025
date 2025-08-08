# Client Cards Grid Layout Guide

## Quick Switch Between 3-Card and 4-Card Layouts

### Location
File: `assets/scss/components/custom/_clients-partners.scss`  
Lines: ~107-117

### Current Options Available

#### Option 1: 4-Card Layout (More Compact)
```scss
@media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 18px; // Slightly smaller gap for 4 cards
}
```

**Benefits:**
- More cards visible per row
- Less scrolling required
- Efficient use of space
- Good for sites with many clients

**Drawbacks:**
- Cards appear smaller
- Less individual prominence
- May feel cramped on some screens

#### Option 2: 3-Card Layout (More Spacious)
```scss
@media (min-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px; // Larger gap for better spacing with fewer cards
}
```

**Benefits:**
- Larger, more prominent cards
- Better readability
- More premium/luxurious feel
- Better for showcasing key clients

**Drawbacks:**
- More scrolling required
- Less efficient use of horizontal space

### How to Switch

1. Open `assets/scss/components/custom/_clients-partners.scss`
2. Find the grid layout section (~line 107)
3. **To activate 4-card layout:**
   - Uncomment Option 1 (remove //)
   - Comment out Option 2 (add //)
4. **To activate 3-card layout:**
   - Comment out Option 1 (add //)
   - Uncomment Option 2 (remove //)
5. Run `npm run build` to apply changes

### Responsive Behavior (Both Layouts)
- **Desktop (1400px+):** 3 or 4 cards per row (depending on choice)
- **Large tablets (1200px):** 2 cards per row
- **Small tablets/Mobile (768px):** 1 card per row

### After Switching
Remember to run the build command:
```bash
npm run build
```

### Current Status
**Currently Active:** 3-Card Layout (as of last build)

---

*This guide was created to help you easily switch between grid layouts without having to remember the specific code changes.*
