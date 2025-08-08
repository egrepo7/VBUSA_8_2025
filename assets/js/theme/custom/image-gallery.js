import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

export default class ImageGallery {
    constructor($gallery, context) {
        this.context = context;
        this.videoFirstPos = this.context.itsConfig.pdp_video_thumbnails_pos;
        this.$mainImage = $gallery.find('[data-image-gallery-main]');
        this.$mainImageNested = $gallery.find('[data-main-image]');
        this.$selectableImages = $gallery.find('[data-image-gallery-item]');
        this.$selectableVideos = $gallery.find('[data-image-gallery-video]');
        this.currentImage = {};

        this.buildPhotoSwipeCollection();
    }

    init() {
        this.bindEvents();
        this.setInitialActiveThumb();
    }

    setInitialActiveThumb() {
        // Set the first image thumbnail as active if none are currently active
        if (this.$selectableImages.filter('.is-active').length === 0) {
            const $firstThumb = this.$selectableImages.first();
            if ($firstThumb.length) {
                $firstThumb.addClass('is-active');
                
                // Set up the currentImage object to match the first thumbnail
                const type = $firstThumb.attr('data-type') || 'image';
                this.currentImage = {
                    mainImageUrl: $firstThumb.attr(`data-${type}-gallery-new-image-url`),
                    zoomImageUrl: $firstThumb.attr(`data-${type}-gallery-zoom-image-url`),
                    mainImageSrcset: $firstThumb.attr(`data-${type}-gallery-new-image-srcset`),
                    $selectedThumb: $firstThumb,
                    mainImageAlt: $firstThumb.find('img').attr('alt'),
                };
            }
        }
    }

    setMainImage(imgObj) {
        this.currentImage = { ...imgObj };

        this.setActiveThumb();
        this.swapMainImage();
    }

    setAlternateImage(imgObj) {
        if (!this.savedImage) {
            this.savedImage = {
                mainImageUrl: this.$mainImageNested.attr('src'),
                zoomImageUrl: this.$mainImage.attr('data-zoom-image'),
                mainImageSrcset: this.$mainImageNested.attr('srcset'),
                $selectedThumb: this.currentImage.$selectedThumb,
            };
        }
        this.setMainImage(imgObj);
    }

    restoreImage() {
        if (this.savedImage) {
            this.setMainImage(this.savedImage);
            delete this.savedImage;
        }
    }

    selectNewImage(e) {
        e.preventDefault();
        const $target = $(e.currentTarget);
        const type = $target.attr('data-type');
        const imgObj = {
            mainImageUrl: $target.attr(`data-${type}-gallery-new-image-url`),
            zoomImageUrl: $target.attr(`data-${type}-gallery-zoom-image-url`),
            mainImageSrcset: $target.attr(`data-${type}-gallery-new-image-srcset`),
            $selectedThumb: $target,
            mainImageAlt: $target.find('img').attr('alt'),
        };
        this.setMainImage(imgObj);
    }

    setActiveThumb() {
        this.$selectableImages.removeClass('is-active');
        this.$selectableVideos.removeClass('is-active');
        if (this.currentImage.$selectedThumb) {
            this.currentImage.$selectedThumb.addClass('is-active');
        }
    }

    swapMainImage() {
        if (this.$mainImageNested.length === 0) {
            // Try alternative selectors
            const $altMainImage1 = $('.productView-image img').first();
            const $altMainImage3 = $('[data-main-image]'); // Global search
            
            if ($altMainImage1.length > 0) {
                this.$mainImageNested = $altMainImage1;
            } else if ($altMainImage3.length > 0) {
                this.$mainImageNested = $altMainImage3;
            } else {
                return;
            }
        }

        if (!this.currentImage.mainImageUrl) {
            return;
        }

        this.$mainImageNested.attr({
            src: this.currentImage.mainImageUrl,
            srcset: this.currentImage.mainImageSrcset,
            alt: this.currentImage.mainImageAlt,
            title: this.currentImage.mainImageAlt,
        });

        this.$mainImage.find('a').attr({
            'data-index': this.currentImage.$selectedThumb.data('index'),
            'data-type': this.currentImage.$selectedThumb.attr('data-type'),
        });
    }

    // custom image gallery
    openPhotoSwipe(itemIndex) {
        const pswpElement = document.querySelectorAll('.pswp')[0];
        const options = {
            index: itemIndex || 0,
            bgOpacity: 0.8,
        };

        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, this.photoswipeItems, options);

        gallery.init();

        // If a video is playing, this will stop it when the pswp modal closes
        gallery.listen('close', () => {
            $('.pswp-video iframe').each((idx, el) => {
                $(el).attr('src', $(el).attr('src'));
            });
        });

        // If a video is playing, this will stop it when the modal changes views
        gallery.listen('afterChange', () => {
            const currentItemIndex = gallery.getCurrentIndex();
            $('.pswp-video iframe').each((idx, el) => {
                if (idx !== currentItemIndex) {
                    $(el).attr('src', $(el).attr('src'));
                }
            });
        });
    }

    handleClickImage(e) {
        e.preventDefault();
        const $target = $(e.currentTarget);
        
        // Check if this is a main image click
        const isMainImageClick = $target.closest('[data-image-gallery-main]').length > 0 || 
                                 $target.closest('.image-main').length > 0 ||
                                 $target.is('a') && $target.closest('[data-image-gallery-main]').length > 0;
        
        if (isMainImageClick) {
            // Find the currently active thumbnail to get the correct index
            const $activeThumb = this.$selectableImages.filter('.is-active').first();
            
            if ($activeThumb.length) {
                // Use the active thumbnail's index
                const isImage = $activeThumb.attr('data-type') === 'image';
                const hasVideos = this.$selectableVideos.length;
                const itemIndex = Number($activeThumb.attr('data-index'));
                const newIndex = isImage && (this.videoFirstPos && hasVideos)
                    ? itemIndex + this.$selectableVideos.length - this.videoFirstPos
                    : itemIndex;
                
                this.openPhotoSwipe(newIndex);
            } else {
                // Fallback: if no active thumb, start at index 0
                this.openPhotoSwipe(0);
            }
        } else {
            // This is a thumbnail click
            const isImage = $target.attr('data-type') === 'image';
            const hasVideos = this.$selectableVideos.length;
            const itemIndex = Number($target.attr('data-index'));
            const newIndex = isImage && (this.videoFirstPos && hasVideos)
                ? itemIndex + this.$selectableVideos.length - this.videoFirstPos
                : itemIndex;

            this.openPhotoSwipe(newIndex);
        }
    }

    buildPhotoSwipeCollection() {
        const videoCount = this.$selectableVideos.length;
        const imageCount = this.$selectableImages.length;

        // If no thumbnails exist, then we need to fill 1 for the main image
        const emptyArrayCount = imageCount + videoCount === 0 ? 1 : imageCount + videoCount;

        this.photoswipeItems = Array(emptyArrayCount).fill(null);

        if (videoCount && this.videoFirstPos) {
            this.$selectableVideos.each((index, el) => {
                const videoIframe = $(el).attr('data-pswp-content');
                const videoImageSrc = $(el).attr('data-video-gallery-zoom-image-url');
                if (videoImageSrc && videoImageSrc !== 'undefined') {
                    this.updatePhotoswipeItemsArray(index, videoImageSrc, videoIframe);
                }
            });
        }

        if (imageCount) {
            this.$selectableImages.each((index, el) => {
                const newIndex = videoCount && this.videoFirstPos
                    ? index + videoCount
                    : index;
                const imageSrc = $(el).attr('data-image-gallery-zoom-image-url');
                if (imageSrc && imageSrc !== 'undefined') {
                    this.updatePhotoswipeItemsArray(newIndex, imageSrc);
                }
            });
        } else {
            // Only fires if there is no video thumbnails or image thumbnails (single thumbnails are turned off by default on all store items)
            const imageSrc = this.$mainImage.attr('data-zoom-image');
            if (imageSrc && imageSrc !== 'undefined') {
                this.updatePhotoswipeItemsArray(0, imageSrc);
            }
        }

        if (videoCount && !this.videoFirstPos) {
            this.$selectableVideos.each((index, el) => {
                const newIndex = imageCount
                    ? index + imageCount
                    : index;
                const videoIframe = $(el).attr('data-pswp-content');
                const videoImageSrc = $(el).attr('data-video-gallery-zoom-image-url');
                if (videoImageSrc && videoImageSrc !== 'undefined') {
                    this.updatePhotoswipeItemsArray(newIndex, videoImageSrc, videoIframe);
                }
            });
        }
    }

    updatePhotoswipeItemsArray(index, src, videoHTML = '') {
        // Safety check: don't process if src is undefined, null, or empty
        if (!src || src === 'undefined' || src.trim() === '') {
            console.warn('ImageGallery: Skipping undefined or empty image src for index', index);
            return;
        }

        const image = new Image();
        image.src = src;
        image.onload = (event) => {
            const data = videoHTML.length
                ? {
                    html: videoHTML,
                }
                : {
                    src: event.target.src,
                    w: event.target.width,
                    h: event.target.height,
                };

            this.photoswipeItems.splice(index, 1, data);
        };
        
        // Add error handling for failed image loads
        image.onerror = () => {
            console.error('ImageGallery: Failed to load image:', src);
        };
    }

    bindEvents() {
        // Check if we're in a split layout - if so, don't bind thumbnail click events
        const $productView = this.$selectableImages.closest('.productView');
        const isSplitLayout = $productView.hasClass('split-layout');
        
        // Only bind hover events if NOT in split layout
        if (!isSplitLayout) {
            this.$selectableImages.on('mouseenter', this.selectNewImage.bind(this));
            this.$selectableVideos.on('mouseenter', this.selectNewImage.bind(this)); // change main image on thumbnail hover
        }

        // Only bind click handlers if NOT in split layout (split layout handles its own clicks)
        if (!isSplitLayout) {
            // Add click handlers to change main image on click
            this.$selectableImages.on('click', (e) => {
                // Prevent immediate PhotoSwipe opening
                e.preventDefault();
                // Change the main image first
                this.selectNewImage(e);
            });
            
            this.$selectableVideos.on('click', (e) => {
                // Prevent immediate PhotoSwipe opening
                e.preventDefault();
                // Change the main image first
                this.selectNewImage(e);
            });

            // PhotoSwipe opens on double-click or main image click
            this.$selectableImages.on('dblclick', this.handleClickImage.bind(this));
            this.$selectableVideos.on('dblclick', this.handleClickImage.bind(this));
        }
        
        this.$mainImage.find('.image-main').on('click', this.handleClickImage.bind(this)); // makes clicking off in mobile work to hide
        this.$mainImage.find('a').on('click', this.handleClickImage.bind(this)); // open photoswipe on main image click
    }
}
