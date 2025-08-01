import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import ITSCategory from './custom/its-category';
import ToggleCategoryListingView from './custom/toggle-category-listing-view';

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);

        /**
         * IntuitSolutions - Custom Category
         */
        this.ITSCategory = new ITSCategory(context);
        this.toggleCategoryListingView = new ToggleCategoryListingView(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {
        this.arrangeFocusOnSortBy();

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        this.ariaNotifyNoProducts();

        // Fix: Only call initMobileDropdowns if it exists
        if (this.facetedSearch && typeof this.facetedSearch.initMobileDropdowns === 'function') {
            this.facetedSearch.initMobileDropdowns();
        }
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: this.toggleCategoryListingView.getRequestTemplateType('category'),
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };


        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);

            /**
             * IntuitSolutions - Category Update
             */
            this.ITSCategory.afterFacetUpdate();
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });

        $('body').on('productViewModeChanged', () => {
            const NewOpts = {
                config: {
                    category: {
                        shop_by_price: true,
                        products: {
                            limit: productsPerPage,
                        },
                    },
                },
                template: {
                    productListing: this.toggleCategoryListingView.getRequestTemplateType('category'),
                    sidebar: 'category/sidebar',
                },
                showMore: 'category/show-more',
            };

            this.facetedSearch.updateRequestOptions(NewOpts);
        });
    }
}
