# View Toggle Filter Persistence - Implementation Guide

## Overview

This implementation ensures that when users switch between list and grid views on category pages with filter tabs, their active filter selection is preserved and automatically restored.

## Key Components

### 1. Toggle Category Listing View (`toggle-category-listing-view.js`)

**Location**: `/assets/js/theme/custom/toggle-category-listing-view.js`

**Key Features**:
- Handles AJAX loading of new content when switching views
- Stores view preference in `sessionStorage`
- Triggers events to notify other components of view changes
- Integrates with BigCommerce's Stencil Utils API

**Key Methods**:
- `getCategoryPage(pageType)` - Loads new content via AJAX
- `storeViewType(type)` - Persists view preference
- `addToggleEvents()` - Binds click handlers to view toggle buttons

**Enhanced Event Triggering**:
```javascript
// Triggers both standard and custom events for better coordination
$('body').triggerHandler('productViewModeChanged');
$('body').triggerHandler('categoryFilterTabsRefresh');
```

### 2. Category Filter Tabs Template

**Location**: `/templates/pages/custom/category/category-filter-tabs.html`

**Enhanced JavaScript Features**:

#### Filter State Management
```javascript
// Global state variables
let currentActiveFilter = null;
let tabFunctionality = null;

// Session storage for persistence
sessionStorage.setItem('activeSubcategoryFilter', currentActiveFilter);
```

#### Event Handler Separation
- `handleTabClick()` - Standard tab click handler
- `handleTabClickAlt()` - Alternate tab style click handler
- `handleViewModeChange()` - View toggle response handler
- `handleInitialLoad()` - Page initialization handler

#### Robust Event Cleanup
```javascript
// Prevents duplicate event listeners
tab.removeEventListener('click', handleTabClick);
tab.addEventListener('click', handleTabClick);
```

#### Enhanced MutationObserver
```javascript
// Watches for significant DOM changes
const observer = new MutationObserver(function(mutations) {
    let shouldRestore = false;
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if significant content was added
            for (let node of mutation.addedNodes) {
                if (node.nodeType === 1 && (node.classList.contains('category-toolbar') || node.querySelector('.product'))) {
                    shouldRestore = true;
                    break;
                }
            }
        }
    });
    
    if (shouldRestore) {
        // Restore filter state
        setTimeout(() => {
            initializeTabFunctionality();
            restoreFilterState();
        }, 100);
    }
});
```

## User Experience Flow

### Initial Page Load
1. User visits category page with filter tabs
2. First subcategory tab is active by default
3. Products are filtered to show only that subcategory
4. Filter state is stored in `sessionStorage`

### Filter Selection
1. User clicks a different filter tab
2. Active tab styling updates
3. Products are filtered dynamically
4. New filter state is stored in `sessionStorage`
5. Product count is updated

### View Toggle
1. User clicks list/grid toggle button
2. `ToggleCategoryListingView` handles AJAX request
3. New content loads into `#product-listing-container`
4. Multiple events are triggered:
   - `productViewModeChanged`
   - `categoryFilterTabsRefresh`
5. Category filter tabs JavaScript responds:
   - Re-initializes tab event listeners
   - Restores previous filter state from `sessionStorage`
   - Applies filter to new DOM elements
   - Updates tab styling to match previous selection

### Browse Products Button
1. User clicks "Browse Products" in hero section
2. `activateTestCustomNetsTab()` function executes:
   - Finds and activates the `test_custom_nets` tab
   - Stores this filter state
   - Applies the filter
   - Scrolls to product listing
3. Filter state persists through subsequent view toggles

## Technical Implementation Details

### Session Storage Schema
```javascript
// Stores the active filter's data-subcategory-id value
sessionStorage.setItem('activeSubcategoryFilter', 'test_custom_nets');

// Stores the current view type
sessionStorage.setItem('category-view-type', 'list');
```

### Event Coordination
The implementation uses multiple mechanisms to ensure reliability:

1. **Custom Events**: Triggered by view toggle for immediate response
2. **MutationObserver**: Watches for DOM changes as fallback
3. **DOM Ready Events**: Handles initial page state
4. **Session Storage**: Persists state across AJAX requests

### Timing Considerations
Different delays are used to accommodate various scenarios:
- **100ms**: Standard restoration after DOM changes
- **200ms**: Extended delay for view mode changes
- **50ms**: Quick restoration for minor updates

### Error Handling
```javascript
// Graceful handling when elements don't exist
const targetTab = document.querySelector(`[data-subcategory-id="${storedFilter}"]`);
if (targetTab) {
    // Restore state
} else {
    console.warn('Could not find tab for stored filter:', storedFilter);
}
```

## Browser Compatibility

- **Session Storage**: Supported in all modern browsers
- **MutationObserver**: IE11+ (polyfill available if needed)
- **Event Listeners**: Universal support
- **Arrow Functions**: ES6+ (transpiled if necessary)

## Performance Considerations

### Optimizations
1. **Event Delegation**: Minimizes memory usage
2. **Selective DOM Queries**: Only searches when necessary
3. **Debounced Restoration**: Prevents excessive filter applications
4. **Smart MutationObserver**: Only responds to significant changes

### Memory Management
- Event listeners are properly cleaned up and re-added
- Global variables are minimized
- Session storage is used instead of page-persistent storage

## Testing Checklist

### Manual Testing
- [ ] Filter selection persists when switching from list to grid view
- [ ] Filter selection persists when switching from grid to list view
- [ ] "Browse Products" button activates correct tab and scrolls
- [ ] Product count updates correctly after filtering
- [ ] No duplicate event listeners after multiple view toggles
- [ ] Works correctly on page refresh
- [ ] Works correctly when navigating back/forward

### Edge Cases
- [ ] No filter previously selected (defaults to first tab)
- [ ] Invalid filter in session storage (falls back gracefully)
- [ ] View toggle during ongoing AJAX request
- [ ] Multiple rapid view toggles
- [ ] Tab removal/addition via admin

## Future Enhancements

### Potential Improvements
1. **URL State Management**: Sync filter state with URL parameters
2. **Analytics Integration**: Track filter usage patterns
3. **Accessibility**: ARIA live regions for screen readers
4. **Progressive Enhancement**: Ensure functionality without JavaScript

### Scalability Considerations
- Filter state could be extended to include sort order
- Multiple filter dimensions could be supported
- State could be shared across related category pages

## Troubleshooting

### Common Issues
1. **Filter not restoring**: Check console for JavaScript errors
2. **Duplicate filtering**: Verify event listeners aren't duplicated
3. **Timing issues**: Adjust delay values in setTimeout calls
4. **Session storage conflicts**: Clear storage and test again

### Debug Console Commands
```javascript
// Check current filter state
console.log(sessionStorage.getItem('activeSubcategoryFilter'));

// Check view type
console.log(sessionStorage.getItem('category-view-type'));

// Manually trigger restoration
restoreFilterState();

// Check for active tabs
console.log(document.querySelectorAll('.subcategory-tab-alt.active'));
```

## Conclusion

This implementation provides a robust, user-friendly filter persistence system that maintains state across view toggles while being performant and accessible. The multi-layered approach ensures reliability across different scenarios and browser conditions.
