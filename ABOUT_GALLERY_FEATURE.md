# About Page Photo Gallery Feature

## Overview
Added PhotoSwipe-powered photo enlargement functionality to the About Us page, allowing users to click on any image to view it in a full-screen lightbox gallery.

## Files Added/Modified

### New Files
- `/assets/js/theme/custom/about-gallery.js` - About page photo gallery functionality
- `/assets/scss/components/custom/_about-gallery.scss` - Gallery styles and hover effects

### Modified Files
- `/templates/pages/custom/page/about-us-custom.html` - Added PhotoSwipe component and wrapper div
- `/assets/js/app.js` - Added AboutUsGallery import and initialization
- `/assets/scss/components/_components.scss` - Added about-gallery SCSS import

## Features

### Photo Enlargement
- Click any image on the about page to open it in full-screen PhotoSwipe gallery
- Images supported: all photos in trusted, designed, mission, and services sections
- Navigation between images using arrow keys or on-screen controls
- Zoom functionality with mouse wheel or pinch gestures
- Image captions display using the alt text

### Visual Enhancements
- Hover effects on images with subtle scale and shadow
- Zoom icon overlay appears on hover (always visible on mobile)
- Smooth transitions and animations
- Responsive design that works on all devices

### Accessibility
- Keyboard navigation support (arrow keys, escape key)
- Focus management for screen readers
- Reduced motion support for users with accessibility preferences
- High contrast mode support

### Mobile Optimization
- Touch-friendly zoom icons always visible on mobile
- Optimized touch gestures for navigation
- Proper viewport handling for mobile browsers

## Usage
The photo gallery automatically initializes when the about page loads if images are present. No additional setup required.

## Browser Support
- Modern browsers supporting ES6+
- PhotoSwipe library handles cross-browser compatibility
- Graceful degradation for older browsers (images remain clickable but may open in new tab)

## Performance
- Lazy initialization - only loads when about page images are detected
- PhotoSwipe library is already included in product pages, so no additional HTTP requests
- CSS is optimized with proper containment and hardware acceleration hints
