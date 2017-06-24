"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _urlify = require("../../_utils/urlify");

var _urlify2 = _interopRequireDefault(_urlify);

var _catchLinks = require("../../_utils/catch-links");

var _catchLinks2 = _interopRequireDefault(_catchLinks);

var _client = require("../../client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/sort-comp */


var logPrefix = "phenomic: PageContainer:";

// react-router does not return leading and trailing slashes
// so we need to normalize according to collection data
var splatToUrl = function splatToUrl(string) {
  var url = "/" + (0, _urlify2.default)(string);
  return url === "//" ? "/" : url;
};

function find(collection, pageUrl) {
  return collection.find(function (item) {
    return item.__url === pageUrl || item.__url === pageUrl + "/" || item.__resourceUrl === pageUrl;
  });
}

function getBase(location) {
  return location.protocol + "//" + location.host + process.env.PHENOMIC_USER_PATHNAME;
}

function adjustCurrentUrl(location, item, props) {
  // adjust url (eg: missing trailing slash)
  var currentExactPageUrl = location.href.replace(getBase(location), "/");
  var itemURL = item.__url + location.search + location.hash;

  if (currentExactPageUrl !== itemURL) {
    props.logger.info(logPrefix + " replacing by '" + currentExactPageUrl + "' to '" + itemURL + "'");
    if (_client.browserHistory) {
      _client.browserHistory.replace(itemURL);
    }
  }
}

function getLayout(layout, props) {
  if (props.layouts && props.layouts[layout]) {
    return props.layouts[layout];
  }
}

var PageContainer = function (_Component) {
  _inherits(PageContainer, _Component);

  function PageContainer() {
    _classCallCheck(this, PageContainer);

    return _possibleConstructorReturn(this, (PageContainer.__proto__ || Object.getPrototypeOf(PageContainer)).apply(this, arguments));
  }

  _createClass(PageContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var props = this.props;

      if (!getLayout(props.defaultLayout, props)) {
        props.logger.error(logPrefix + " default layout \"" + props.defaultLayout + "\" not provided.");
      }
      this.preparePage(this.props, this.context);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.catchInternalLink();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.preparePage(nextProps, this.context);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.catchInternalLink();
    }
  }, {
    key: "catchInternalLink",
    value: function catchInternalLink() {
      var _this2 = this;

      var layoutDOMElement = (0, _reactDom.findDOMNode)(this);

      if (layoutDOMElement) {
        var bodyContainers = Array.prototype.slice.call(layoutDOMElement.querySelectorAll(".phenomic-BodyContainer"));
        if (!bodyContainers.length) {
          bodyContainers = [layoutDOMElement];
        }

        // as soon as we listened to something, we should carefully unlisten
        // because
        // - it can be listening in the layoutDOMElement (a parent)
        // - it can be listening in a <BodyContainer (a children)
        // if we don't do this cleanup, we might listen on a parent and a children
        // and if the parent contains other links to, let's say a parent part of
        // the website, <Link> might be catched (but they are not supposed to)
        if (this.cleanupInternalLinks) {
          this.cleanupInternalLinks();
        }
        this.cleanupInternalLinks = (0, _catchLinks2.default)(bodyContainers, function (href) {
          // do not catch links that are under the current base path
          if (href.indexOf(process.env.PHENOMIC_USER_PATHNAME) === -1) {
            // === if (!href.includes(process.env.PHENOMIC_USER_PATHNAME)) {
            return false;
          }

          // lookup in collection by adjusting the link with our stored links
          var pageUrl = href
          // remove pathname as collection links don't have pathname included
          .replace(process.env.PHENOMIC_USER_PATHNAME, "/");
          if (!find(_this2.context.collection, pageUrl
          // remove hash for the lookup as it's not necessary
          .replace(/#.*/, ""))) {
            return false;
          }
          if (_client.browserHistory) {
            _client.browserHistory.push(pageUrl);
          }
          return true;
        });
      }
    }
  }, {
    key: "preparePage",
    value: function preparePage(props, context) {
      var pageUrl = splatToUrl(props.params.splat);
      if (process.env.NODE_ENV !== "production") {
        props.logger.info(logPrefix + " '" + pageUrl + "' rendering...");
      }

      var item = find(context.collection, pageUrl);
      if (typeof window !== "undefined" && typeof window.location !== "undefined" && item) {
        adjustCurrentUrl(window.location, item, props);
      }

      var page = props.pages[pageUrl];
      if (!page) {
        if (item) {
          props.getPage(item.__url, item.__dataUrl);
        } else {
          props.logger.error(logPrefix + " " + pageUrl + " is a page not found.");
          props.setPageNotFound(pageUrl);
        }
      } else {
        if (page.error) {
          return;
        }

        var Layout = getLayout(page.type, props);
        if (page.type !== undefined && !Layout) {
          props.logger.error(logPrefix + " Unkown page type: \"" + page.type + "\"" + "component not available in \"layouts\" property." + ("Please check the \"layout\" or \"type\" of page \"" + page + "\" header."));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var collection = this.context.collection;


      var pageUrl = splatToUrl(props.params.splat);
      // page url from redux store
      var page = props.pages[pageUrl];
      var partialPageHead = collection.find(function (pageData) {
        return pageUrl === pageData.__url;
      }) || {};

      if (!page) {
        if (process.env.NODE_ENV !== "production") {
          props.logger.info(logPrefix + " '" + pageUrl + "' no data");
        }
        // return null
      }
      if (process.env.NODE_ENV !== "production") {
        props.logger.info(logPrefix + " '" + pageUrl + "'", page);
      }

      if ((typeof page === "undefined" ? "undefined" : _typeof(page)) !== "object" || page.toString() !== "[object Object]") {
        props.logger.info(logPrefix + " page " + pageUrl + " should be an object");
        return null;
      }
      var PageLoading = getLayout("PageLoading", props);
      var PageError = getLayout("PageError", props);
      var LayoutFallback = getLayout(props.defaultLayout, props);
      var Layout = getLayout(partialPageHead.type || partialPageHead.layout ||
      // page.type is head type||layout too
      page.type, props) || LayoutFallback;

      if (page.error) {
        if (!PageError) {
          return _react2.default.createElement(
            "div",
            { style: { "text-align": "center" } },
            _react2.default.createElement(
              "h1",
              null,
              page.error
            ),
            _react2.default.createElement(
              "p",
              null,
              page.errorText
            )
          );
        }
        return _react2.default.createElement(PageError, page);
      } else if (page.isLoading && PageLoading && Layout && !Layout.hasLoadingState) {
        return _react2.default.createElement(PageLoading, null);
      } else if (Layout) {
        return _react2.default.createElement(Layout
        // head will be overwritten by "page"
        // (since page contains a head when loaded)
        , _extends({ head: partialPageHead
        }, page));
      }

      if (process.env.NODE_ENV !== "production") {
        return _react2.default.createElement(
          "div",
          null,
          "No layout can be rendered. See console for more information."
        );
      }

      return null;
    }
  }]);

  return PageContainer;
}(_react.Component);

PageContainer.contextTypes = {
  collection: _react.PropTypes.arrayOf(_react.PropTypes.object),
  layouts: _react.PropTypes.object
};
PageContainer.defaultProps = {
  layouts: {},
  defaultLayout: "Page",
  logger: console
};
PageContainer.propTypes = {
  pages: require("react").PropTypes.object.isRequired,
  params: require("react").PropTypes.shape({
    splat: require("react").PropTypes.string.isRequired
  }).isRequired,
  layouts: require("react").PropTypes.object.isRequired,
  defaultLayout: require("react").PropTypes.string.isRequired,
  getPage: require("react").PropTypes.func.isRequired,
  setPageNotFound: require("react").PropTypes.func.isRequired,
  logger: require("react").PropTypes.object.isRequired
};
exports.default = PageContainer;