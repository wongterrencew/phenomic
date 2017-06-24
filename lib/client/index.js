"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserHistory = undefined;
exports.default = phenomic;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require("react-router");

var _createBrowserHistory = require("history/lib/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _useScroll = require("react-router-scroll/lib/useScroll");

var _useScroll2 = _interopRequireDefault(_useScroll);

var _reactRedux = require("react-redux");

var _ContextProvider = require("../components/ContextProvider");

var _ContextProvider2 = _interopRequireDefault(_ContextProvider);

var _shouldUpdateScroll = require("./should-update-scroll.js");

var _shouldUpdateScroll2 = _interopRequireDefault(_shouldUpdateScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App
var browserHistory = exports.browserHistory = typeof window !== "undefined" // just for node testing
? (0, _reactRouter.useRouterHistory)(_createBrowserHistory2.default)({
  // basename don't like having a trailing slash
  // https://github.com/reactjs/react-router/issues/3184
  basename: process.env.PHENOMIC_USER_PATHNAME.replace(/\/$/, "")
}) : null;

function phenomic(_ref) {
  var metadata = _ref.metadata,
      routes = _ref.routes,
      store = _ref.store;

  var collection = typeof window !== "undefined" ? window.__COLLECTION__ : [];

  _reactDom2.default.render(_react2.default.createElement(
    _ContextProvider2.default,
    {
      collection: collection,
      metadata: metadata
    },
    _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(_reactRouter.Router, {
        history: browserHistory,
        routes: routes,
        render: (0, _reactRouter.applyRouterMiddleware)((0, _useScroll2.default)(_shouldUpdateScroll2.default))
      })
    )
  ), document.getElementById("phenomic"));
}