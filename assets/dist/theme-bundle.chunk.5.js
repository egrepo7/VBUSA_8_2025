(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/blog.js":
/*!*********************************!*\
  !*** ./assets/js/theme/blog.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Blog; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var Blog = /*#__PURE__*/function (_PageManager) {
  function Blog() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(Blog, _PageManager);
  var _proto = Blog.prototype;
  _proto.onReady = function onReady() {
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.fetchRecentPosts();
  };
  _proto.fetchRecentPosts = function fetchRecentPosts() {
    var $sidebarRecent = $('#blog-sidebar-recent');
    if (!$sidebarRecent.length) return;
    var requestOptions = {
      config: {
        blog: {
          recent_posts: {
            limit: 5
          }
        }
      },
      template: 'custom/blog/blog-recent-post-items'
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage('/', requestOptions, function (err, res) {
      $sidebarRecent.html(res);
    });
  };
  return Blog;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYmxvZy5qcyJdLCJuYW1lcyI6WyJCbG9nIiwiX1BhZ2VNYW5hZ2VyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJmZXRjaFJlY2VudFBvc3RzIiwiJHNpZGViYXJSZWNlbnQiLCIkIiwibGVuZ3RoIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJibG9nIiwicmVjZW50X3Bvc3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInV0aWxzIiwiYXBpIiwiZ2V0UGFnZSIsImVyciIsInJlcyIsImh0bWwiLCJQYWdlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFDTTtBQUNPO0FBQUEsSUFFakNBLElBQUksMEJBQUFDLFlBQUE7RUFBQSxTQUFBRCxLQUFBO0lBQUEsT0FBQUMsWUFBQSxDQUFBQyxLQUFBLE9BQUFDLFNBQUE7RUFBQTtFQUFBQyxjQUFBLENBQUFKLElBQUEsRUFBQUMsWUFBQTtFQUFBLElBQUFJLE1BQUEsR0FBQUwsSUFBQSxDQUFBTSxTQUFBO0VBQUFELE1BQUEsQ0FDckJFLE9BQU8sR0FBUCxTQUFBQSxPQUFPQSxDQUFBLEVBQUc7SUFDTkMsbUVBQWtCLENBQUMsQ0FBQztJQUVwQixJQUFJLENBQUNDLGdCQUFnQixDQUFDLENBQUM7RUFDM0IsQ0FBQztFQUFBSixNQUFBLENBRURJLGdCQUFnQixHQUFoQixTQUFBQSxnQkFBZ0JBLENBQUEsRUFBRztJQUNmLElBQU1DLGNBQWMsR0FBR0MsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO0lBRWhELElBQUksQ0FBQ0QsY0FBYyxDQUFDRSxNQUFNLEVBQUU7SUFFNUIsSUFBTUMsY0FBYyxHQUFHO01BQ25CQyxNQUFNLEVBQUU7UUFDSkMsSUFBSSxFQUFFO1VBQ0ZDLFlBQVksRUFBRTtZQUNWQyxLQUFLLEVBQUU7VUFDWDtRQUNKO01BQ0osQ0FBQztNQUNEQyxRQUFRLEVBQUU7SUFDZCxDQUFDO0lBRURDLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDLEdBQUcsRUFBRVIsY0FBYyxFQUFFLFVBQUNTLEdBQUcsRUFBRUMsR0FBRyxFQUFLO01BQ2pEYixjQUFjLENBQUNjLElBQUksQ0FBQ0QsR0FBRyxDQUFDO0lBQzVCLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUFBdkIsSUFBQTtBQUFBLEVBMUI2QnlCLHFEQUFXIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay41LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvZyBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICB0aGlzLmZldGNoUmVjZW50UG9zdHMoKTtcbiAgICB9XG5cbiAgICBmZXRjaFJlY2VudFBvc3RzKCkge1xuICAgICAgICBjb25zdCAkc2lkZWJhclJlY2VudCA9ICQoJyNibG9nLXNpZGViYXItcmVjZW50Jyk7XG5cbiAgICAgICAgaWYgKCEkc2lkZWJhclJlY2VudC5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGJsb2c6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50X3Bvc3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY3VzdG9tL2Jsb2cvYmxvZy1yZWNlbnQtcG9zdC1pdGVtcycsXG4gICAgICAgIH07XG5cbiAgICAgICAgdXRpbHMuYXBpLmdldFBhZ2UoJy8nLCByZXF1ZXN0T3B0aW9ucywgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAkc2lkZWJhclJlY2VudC5odG1sKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=