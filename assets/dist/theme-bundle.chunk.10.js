(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _custom_its_category__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom/its-category */ "./assets/js/theme/custom/its-category.js");
/* harmony import */ var _custom_toggle_category_listing_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom/toggle-category-listing-view */ "./assets/js/theme/custom/toggle-category-listing-view.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }







var Category = /*#__PURE__*/function (_CatalogPage) {
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);

    /**
     * IntuitSolutions - Custom Category
     */
    _this.ITSCategory = new _custom_its_category__WEBPACK_IMPORTED_MODULE_5__["default"](context);
    _this.toggleCategoryListingView = new _custom_toggle_category_listing_view__WEBPACK_IMPORTED_MODULE_6__["default"](context);
    return _this;
  }
  _inheritsLoose(Category, _CatalogPage);
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$('[data-shop-by-price]').length) return;
    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }
    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }
    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts();

    // Fix: Only call initMobileDropdowns if it exists
    if (this.facetedSearch && typeof this.facetedSearch.initMobileDropdowns === 'function') {
      this.facetedSearch.initMobileDropdowns();
    }
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this4 = this;
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: this.toggleCategoryListingView.getRequestTemplateType('category'),
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);

      /**
       * IntuitSolutions - Category Update
       */
      _this4.ITSCategory.afterFacetUpdate();
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
    $('body').on('productViewModeChanged', function () {
      var NewOpts = {
        config: {
          category: {
            shop_by_price: true,
            products: {
              limit: productsPerPage
            }
          }
        },
        template: {
          productListing: _this4.toggleCategoryListingView.getRequestTemplateType('category'),
          sidebar: 'category/sidebar'
        },
        showMore: 'category/show-more'
      };
      _this4.facetedSearch.updateRequestOptions(NewOpts);
    });
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }),

/***/ "./assets/js/theme/custom/its-category.js":
/*!************************************************!*\
  !*** ./assets/js/theme/custom/its-category.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ITSCategory; });
var ITSCategory = /*#__PURE__*/function () {
  function ITSCategory(context) {
    this.context = context;
  }
  var _proto = ITSCategory.prototype;
  _proto.afterFacetUpdate = function afterFacetUpdate() {};
  return ITSCategory;
}();


/***/ }),

/***/ "./assets/js/theme/custom/toggle-category-listing-view.js":
/*!****************************************************************!*\
  !*** ./assets/js/theme/custom/toggle-category-listing-view.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ToggleCategoryListingView; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");


var ToggleCategoryListingView = /*#__PURE__*/function () {
  function ToggleCategoryListingView(context) {
    var _this = this;
    this.context = context;
    this.defaultViewType = this.context.defaultViewType;
    this.oppositeViewType = this.defaultViewType !== 'grid' ? 'grid' : 'list';
    this.productsPerPage = this.context.categoryProductsPerPage;
    this.loadingOverlay = $('.loadingOverlay.loadingOverlay--product-listing');
    $('body').on('facetedSearchRefresh', function () {
      _this.addToggleEvents();
    });
    this.init();
    this.fullWidthTemplate();
  }
  var _proto = ToggleCategoryListingView.prototype;
  _proto.getProductDescriptions = function getProductDescriptions() {
    if ($('.listItem').length) {
      console.log('IntuitSolutions -- Category Product Descriptions');
      var $products = $('.listItem').toArray();
      var $productIDs = $products.map(function (item) {
        return Number($(item).attr('data-entity-id'));
      });
      var $graphQLToken = $('body').data('graphql');
      fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + $graphQLToken
        },
        body: JSON.stringify({
          query: "query {\n                        site {\n                            products(entityIds: [" + $productIDs + "], first: " + this.context.categoryProductsPerPage + ") {\n                                edges {\n                                    node {\n                                        entityId\n                                        name\n                                        description\n                                    }\n                                }\n                            }\n                        }\n                    }"
        })
      }).then(function (res) {
        return res.json();
      }).then(function (request) {
        var gqlProducts = request.data.site.products.edges;
        console.log(gqlProducts);
        $products.forEach(function (product, i) {
          gqlProducts.forEach(function (item) {
            if ($(product).data('entityId') === item.node.entityId) {
              $(product).find('.listItem__description').html(item.node.description);
            }
          });
        });
      });
    }
  };
  _proto.getStoredViewType = function getStoredViewType() {
    return sessionStorage.getItem('category-view-type') || null;
  };
  _proto.getRequestTemplateType = function getRequestTemplateType(type) {
    var pageType = this.getStoredViewType();
    return !pageType ? type + "/product-listing" : "custom/category-" + pageType + "-view";
  };
  _proto.storeViewType = function storeViewType(type) {
    sessionStorage.setItem('category-view-type', type);
  };
  _proto.addStyleClass = function addStyleClass() {
    if ($('.listItem').length) {
      $('body').addClass('list-view');
    } else {
      $('body').removeClass('list-view');
    }
  };
  _proto.getCategoryPage = function getCategoryPage(pageType) {
    var _this2 = this;
    var config = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: this.productsPerPage
          }
        }
      },
      template: "custom/category-" + pageType + "-view"
    };
    this.loadingOverlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["api"].getPage(_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].getUrl(), config, function (err, content) {
      if (err) {
        throw new Error(err);
      }
      $('#product-listing-container').html(content);
      _this2.loadingOverlay.hide();
      _this2.storeViewType(pageType);
      _this2.addToggleEvents();
      $('body').triggerHandler('productViewModeChanged');
      _this2.fullWidthTemplate();
    });
  };
  _proto.addToggleEvents = function addToggleEvents() {
    var _this3 = this;
    $('.js-category__toggle-view').on('click', function (e) {
      var type = $(e.currentTarget).data('view-type');
      if ($(e.currentTarget).hasClass('active-category-view')) return;
      _this3.getCategoryPage(type, _this3.addToggleEvents);
    });
  };
  _proto.fullWidthTemplate = function fullWidthTemplate() {
    if ($('.list-full-width').length) {
      this.getProductDescriptions();
      this.addStyleClass();

      // aGFja3kgc29sdXRpb24=
      $(window).on('load', function () {
        $('.list-img-container').toArray().forEach(function (img) {
          if ($(img).height() > 620) {
            $(img).addClass('adjust-list-img-height');
          }
        });
      });
    }
  };
  _proto.init = function init() {
    var storedViewType = this.getStoredViewType();
    if (storedViewType === this.defaultViewType || !storedViewType) {
      return this.addToggleEvents();
    }
    this.getCategoryPage(this.oppositeViewType);
  };
  return ToggleCategoryListingView;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9pdHMtY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiSVRTQ2F0ZWdvcnkiLCJ0b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IiwiVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsIl90aGlzMyIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiY29tcGFyZVByb2R1Y3RzIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwiZmFjZXRlZFNlYXJjaCIsImluaXRNb2JpbGVEcm9wZG93bnMiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJfdGhpczQiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJnZXRSZXF1ZXN0VGVtcGxhdGVUeXBlIiwic2lkZWJhciIsInNob3dNb3JlIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiYWZ0ZXJGYWNldFVwZGF0ZSIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiTmV3T3B0cyIsInVwZGF0ZVJlcXVlc3RPcHRpb25zIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsImFyZ3VtZW50cyIsIkpTT04iLCJwYXJzZSIsInVuZGVmaW5lZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJkZWZhdWx0Vmlld1R5cGUiLCJvcHBvc2l0ZVZpZXdUeXBlIiwibG9hZGluZ092ZXJsYXkiLCJhZGRUb2dnbGVFdmVudHMiLCJpbml0IiwiZnVsbFdpZHRoVGVtcGxhdGUiLCJnZXRQcm9kdWN0RGVzY3JpcHRpb25zIiwiY29uc29sZSIsImxvZyIsIiRwcm9kdWN0cyIsInRvQXJyYXkiLCIkcHJvZHVjdElEcyIsIml0ZW0iLCJOdW1iZXIiLCIkZ3JhcGhRTFRva2VuIiwiZGF0YSIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiYm9keSIsInN0cmluZ2lmeSIsInF1ZXJ5IiwidGhlbiIsInJlcyIsImpzb24iLCJyZXF1ZXN0IiwiZ3FsUHJvZHVjdHMiLCJzaXRlIiwiZWRnZXMiLCJmb3JFYWNoIiwicHJvZHVjdCIsIm5vZGUiLCJlbnRpdHlJZCIsImZpbmQiLCJkZXNjcmlwdGlvbiIsImdldFN0b3JlZFZpZXdUeXBlIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwidHlwZSIsInBhZ2VUeXBlIiwic3RvcmVWaWV3VHlwZSIsInNldEl0ZW0iLCJhZGRTdHlsZUNsYXNzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImdldENhdGVnb3J5UGFnZSIsInNob3ciLCJhcGkiLCJnZXRQYWdlIiwidXJsVXRpbHMiLCJnZXRVcmwiLCJlcnIiLCJFcnJvciIsImhpZGUiLCJ3aW5kb3ciLCJpbWciLCJoZWlnaHQiLCJzdG9yZWRWaWV3VHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUNtQztBQUN2QztBQUM4QjtBQUFBLElBRXpEQSxRQUFRLDBCQUFBQyxZQUFBO0VBQ3pCLFNBQUFELFNBQVlFLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDakJBLEtBQUEsR0FB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eEYsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUNDLE1BQU0sRUFBRTtNQUM5QixJQUFJLENBQUN3RixzQkFBc0IsQ0FBQyxDQUFDO01BQzdCLElBQUksQ0FBQ3FDLGFBQWEsQ0FBQyxDQUFDOztNQUVwQjtNQUNBOUgsQ0FBQyxDQUFDMEksTUFBTSxDQUFDLENBQUN0SSxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQU07UUFDdkJKLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDNkYsT0FBTyxDQUFDLENBQUMsQ0FBQ29CLE9BQU8sQ0FBQyxVQUFBMEIsR0FBRyxFQUFJO1VBQzlDLElBQUkzSSxDQUFDLENBQUMySSxHQUFHLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDdkI1SSxDQUFDLENBQUMySSxHQUFHLENBQUMsQ0FBQ1osUUFBUSxDQUFDLHdCQUF3QixDQUFDO1VBQzdDO1FBQ0osQ0FBQyxDQUFDO01BQ04sQ0FBQyxDQUFDO0lBQ047RUFDSixDQUFDO0VBQUF6SSxNQUFBLENBRURpRyxJQUFJLEdBQUosU0FBQUEsSUFBSUEsQ0FBQSxFQUFHO0lBQ0gsSUFBTXNELGNBQWMsR0FBRyxJQUFJLENBQUN0QixpQkFBaUIsQ0FBQyxDQUFDO0lBRS9DLElBQUlzQixjQUFjLEtBQUssSUFBSSxDQUFDMUQsZUFBZSxJQUFJLENBQUMwRCxjQUFjLEVBQUU7TUFDNUQsT0FBTyxJQUFJLENBQUN2RCxlQUFlLENBQUMsQ0FBQztJQUNqQztJQUVBLElBQUksQ0FBQzJDLGVBQWUsQ0FBQyxJQUFJLENBQUM3QyxnQkFBZ0IsQ0FBQztFQUMvQyxDQUFDO0VBQUEsT0FBQWhHLHlCQUFBO0FBQUEiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCBJVFNDYXRlZ29yeSBmcm9tICcuL2N1c3RvbS9pdHMtY2F0ZWdvcnknO1xuaW1wb3J0IFRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcgZnJvbSAnLi9jdXN0b20vdG9nZ2xlLWNhdGVnb3J5LWxpc3Rpbmctdmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludHVpdFNvbHV0aW9ucyAtIEN1c3RvbSBDYXRlZ29yeVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5JVFNDYXRlZ29yeSA9IG5ldyBJVFNDYXRlZ29yeShjb250ZXh0KTtcbiAgICAgICAgdGhpcy50b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3ID0gbmV3IFRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKHtcbiAgICAgICAgICAgIHJvbGU6IHJvbGVUeXBlLFxuICAgICAgICAgICAgJ2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuICAgICAgICBpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLCAnc3RhdHVzJywgJ2Fzc2VydGl2ZScpKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XG5cbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xuXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG5cbiAgICAgICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuXG4gICAgICAgIC8vIEZpeDogT25seSBjYWxsIGluaXRNb2JpbGVEcm9wZG93bnMgaWYgaXQgZXhpc3RzXG4gICAgICAgIGlmICh0aGlzLmZhY2V0ZWRTZWFyY2ggJiYgdHlwZW9mIHRoaXMuZmFjZXRlZFNlYXJjaC5pbml0TW9iaWxlRHJvcGRvd25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2guaW5pdE1vYmlsZURyb3Bkb3ducygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKTtcbiAgICAgICAgaWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6IHRoaXMudG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldy5nZXRSZXF1ZXN0VGVtcGxhdGVUeXBlKCdjYXRlZ29yeScpLFxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgICAgIH07XG5cblxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbnR1aXRTb2x1dGlvbnMgLSBDYXRlZ29yeSBVcGRhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5JVFNDYXRlZ29yeS5hZnRlckZhY2V0VXBkYXRlKCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdwcm9kdWN0Vmlld01vZGVDaGFuZ2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgTmV3T3B0cyA9IHtcbiAgICAgICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6IHRoaXMudG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldy5nZXRSZXF1ZXN0VGVtcGxhdGVUeXBlKCdjYXRlZ29yeScpLFxuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2gudXBkYXRlUmVxdWVzdE9wdGlvbnMoTmV3T3B0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElUU0NhdGVnb3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgYWZ0ZXJGYWNldFVwZGF0ZSgpIHtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuLi9jb21tb24vdXRpbHMvdXJsLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmRlZmF1bHRWaWV3VHlwZSA9IHRoaXMuY29udGV4dC5kZWZhdWx0Vmlld1R5cGU7XG4gICAgICAgIHRoaXMub3Bwb3NpdGVWaWV3VHlwZSA9IHRoaXMuZGVmYXVsdFZpZXdUeXBlICE9PSAnZ3JpZCcgPyAnZ3JpZCcgOiAnbGlzdCc7XG4gICAgICAgIHRoaXMucHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICB0aGlzLmxvYWRpbmdPdmVybGF5ID0gJCgnLmxvYWRpbmdPdmVybGF5LmxvYWRpbmdPdmVybGF5LS1wcm9kdWN0LWxpc3RpbmcnKTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2ZhY2V0ZWRTZWFyY2hSZWZyZXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb2dnbGVFdmVudHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuZnVsbFdpZHRoVGVtcGxhdGUoKTtcbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0RGVzY3JpcHRpb25zKCkge1xuICAgICAgICBpZiAoJCgnLmxpc3RJdGVtJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSW50dWl0U29sdXRpb25zIC0tIENhdGVnb3J5IFByb2R1Y3QgRGVzY3JpcHRpb25zJyk7XG5cbiAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0cyA9ICQoJy5saXN0SXRlbScpLnRvQXJyYXkoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RJRHMgPSAkcHJvZHVjdHMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoJChpdGVtKS5hdHRyKCdkYXRhLWVudGl0eS1pZCcpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCAkZ3JhcGhRTFRva2VuID0gJCgnYm9keScpLmRhdGEoJ2dyYXBocWwnKTtcbiAgICAgICAgICAgIGZldGNoKCcvZ3JhcGhxbCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAkeyRncmFwaFFMVG9rZW59YFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogYHF1ZXJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzKGVudGl0eUlkczogWyR7JHByb2R1Y3RJRHN9XSwgZmlyc3Q6ICR7dGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdxbFByb2R1Y3RzID0gcmVxdWVzdC5kYXRhLnNpdGUucHJvZHVjdHMuZWRnZXM7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ3FsUHJvZHVjdHMpO1xuXG4gICAgICAgICAgICAgICAgJHByb2R1Y3RzLmZvckVhY2goKHByb2R1Y3QsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZ3FsUHJvZHVjdHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHByb2R1Y3QpLmRhdGEoJ2VudGl0eUlkJykgPT09IGl0ZW0ubm9kZS5lbnRpdHlJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQocHJvZHVjdCkuZmluZCgnLmxpc3RJdGVtX19kZXNjcmlwdGlvbicpLmh0bWwoaXRlbS5ub2RlLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3RvcmVkVmlld1R5cGUoKSB7XG4gICAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yeS12aWV3LXR5cGUnKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldFJlcXVlc3RUZW1wbGF0ZVR5cGUodHlwZSkge1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IHRoaXMuZ2V0U3RvcmVkVmlld1R5cGUoKTtcbiAgICAgICAgcmV0dXJuICFwYWdlVHlwZSA/IGAke3R5cGV9L3Byb2R1Y3QtbGlzdGluZ2AgOiBgY3VzdG9tL2NhdGVnb3J5LSR7cGFnZVR5cGV9LXZpZXdgO1xuICAgIH1cblxuICAgIHN0b3JlVmlld1R5cGUodHlwZSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdjYXRlZ29yeS12aWV3LXR5cGUnLCB0eXBlKTtcbiAgICB9XG5cbiAgICBhZGRTdHlsZUNsYXNzKCkge1xuICAgICAgICBpZiAoJCgnLmxpc3RJdGVtJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2xpc3QtdmlldycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsaXN0LXZpZXcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENhdGVnb3J5UGFnZShwYWdlVHlwZSkge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMucHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBjdXN0b20vY2F0ZWdvcnktJHtwYWdlVHlwZX0tdmlld2AsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nT3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2UodXJsVXRpbHMuZ2V0VXJsKCksIGNvbmZpZywgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpLmh0bWwoY29udGVudCk7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JlVmlld1R5cGUocGFnZVR5cGUpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ3Byb2R1Y3RWaWV3TW9kZUNoYW5nZWQnKTtcblxuICAgICAgICAgICAgdGhpcy5mdWxsV2lkdGhUZW1wbGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRUb2dnbGVFdmVudHMoKSB7XG4gICAgICAgICQoJy5qcy1jYXRlZ29yeV9fdG9nZ2xlLXZpZXcnKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd2aWV3LXR5cGUnKTtcblxuICAgICAgICAgICAgaWYgKCQoZS5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnYWN0aXZlLWNhdGVnb3J5LXZpZXcnKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmdldENhdGVnb3J5UGFnZSh0eXBlLCB0aGlzLmFkZFRvZ2dsZUV2ZW50cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bGxXaWR0aFRlbXBsYXRlKCkge1xuICAgICAgICBpZiAoJCgnLmxpc3QtZnVsbC13aWR0aCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5nZXRQcm9kdWN0RGVzY3JpcHRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLmFkZFN0eWxlQ2xhc3MoKTtcblxuICAgICAgICAgICAgLy8gYUdGamEza2djMjlzZFhScGIyND1cbiAgICAgICAgICAgICQod2luZG93KS5vbignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcubGlzdC1pbWctY29udGFpbmVyJykudG9BcnJheSgpLmZvckVhY2goaW1nID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoaW1nKS5oZWlnaHQoKSA+IDYyMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChpbWcpLmFkZENsYXNzKCdhZGp1c3QtbGlzdC1pbWctaGVpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzdG9yZWRWaWV3VHlwZSA9IHRoaXMuZ2V0U3RvcmVkVmlld1R5cGUoKTtcblxuICAgICAgICBpZiAoc3RvcmVkVmlld1R5cGUgPT09IHRoaXMuZGVmYXVsdFZpZXdUeXBlIHx8ICFzdG9yZWRWaWV3VHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkVG9nZ2xlRXZlbnRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldENhdGVnb3J5UGFnZSh0aGlzLm9wcG9zaXRlVmlld1R5cGUpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=