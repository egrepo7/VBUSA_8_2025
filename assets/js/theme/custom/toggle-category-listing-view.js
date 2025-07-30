import { api } from '@bigcommerce/stencil-utils';
import urlUtils from '../common/utils/url-utils';

export default class ToggleCategoryListingView {
    constructor(context) {
        this.context = context;
        this.defaultViewType = this.context.defaultViewType;
        this.oppositeViewType = this.defaultViewType !== 'grid' ? 'grid' : 'list';
        this.productsPerPage = this.context.categoryProductsPerPage;
        this.loadingOverlay = $('.loadingOverlay.loadingOverlay--product-listing');

        $('body').on('facetedSearchRefresh', () => {
            this.addToggleEvents();
        });

        this.init();
        this.fullWidthTemplate();
    }

    getProductDescriptions() {
        if ($('.listItem').length) {
            console.log('IntuitSolutions -- Category Product Descriptions');

            const $products = $('.listItem').toArray();
            
            const $productIDs = $products.map(item => {
                return Number($(item).attr('data-entity-id'));
            });
            
            const $graphQLToken = $('body').data('graphql');
            fetch('/graphql', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$graphQLToken}`
                },
                body: JSON.stringify({
                    query: `query {
                        site {
                            products(entityIds: [${$productIDs}], first: ${this.context.categoryProductsPerPage}) {
                                edges {
                                    node {
                                        entityId
                                        name
                                        description
                                    }
                                }
                            }
                        }
                    }`,
                }),
            })
            .then(res => res.json())
            .then(request => {
                const gqlProducts = request.data.site.products.edges;
                console.log(gqlProducts);

                $products.forEach((product, i) => {
                    gqlProducts.forEach(item => {
                        if ($(product).data('entityId') === item.node.entityId) {
                            $(product).find('.listItem__description').html(item.node.description);
                        }
                    })
                });
            });
        }
    }

    getStoredViewType() {
        return sessionStorage.getItem('category-view-type') || null;
    }

    getRequestTemplateType(type) {
        const pageType = this.getStoredViewType();
        return !pageType ? `${type}/product-listing` : `custom/category-${pageType}-view`;
    }

    storeViewType(type) {
        sessionStorage.setItem('category-view-type', type);
    }

    addStyleClass() {
        if ($('.listItem').length) {
            $('body').addClass('list-view');
        } else {
            $('body').removeClass('list-view');
        }
    }

    getCategoryPage(pageType) {
        const config = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: this.productsPerPage,
                    },
                },
            },
            template: `custom/category-${pageType}-view`,
        };

        this.loadingOverlay.show();

        api.getPage(urlUtils.getUrl(), config, (err, content) => {
            if (err) {
                throw new Error(err);
            }

            $('#product-listing-container').html(content);

            this.loadingOverlay.hide();

            this.storeViewType(pageType);

            this.addToggleEvents();

            $('body').triggerHandler('productViewModeChanged');

            this.fullWidthTemplate();
        });
    }

    addToggleEvents() {
        $('.js-category__toggle-view').on('click', (e) => {
            const type = $(e.currentTarget).data('view-type');

            if ($(e.currentTarget).hasClass('active-category-view')) return;

            this.getCategoryPage(type, this.addToggleEvents);
        });
    }

    fullWidthTemplate() {
        if ($('.list-full-width').length) {
            this.getProductDescriptions();
            this.addStyleClass();

            // aGFja3kgc29sdXRpb24=
            $(window).on('load', () => {
                $('.list-img-container').toArray().forEach(img => {
                    if ($(img).height() > 620) {
                        $(img).addClass('adjust-list-img-height');
                    }
                })
            });
        }
    }

    init() {
        const storedViewType = this.getStoredViewType();

        if (storedViewType === this.defaultViewType || !storedViewType) {
            return this.addToggleEvents();
        }

        this.getCategoryPage(this.oppositeViewType);
    }
}
