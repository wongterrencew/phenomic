"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (url, options) {
  var Html = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Html2.default;
  var baseUrl = options.baseUrl,
      assetsFiles = options.assetsFiles,
      routes = options.routes,
      collection = options.collection,
      metadata = options.metadata,
      store = options.store;


  var render = _server2.default[!options.clientScripts ? "renderToStaticMarkup" : "renderToString"];

  return new Promise(function (resolve, reject) {
    try {
      (0, _reactRouter.match)({
        routes: routes,
        location: url,
        basename: baseUrl.pathname
      }, function (error, redirectLocation, renderProps) {
        if (error) {
          return reject(error);
        } else if (redirectLocation) {
          // TODO add a redirect page à la "jekyll redirect plugin"
          throw new Error("phenomic (static) doesn't handle redirection yet");
        } else if (!renderProps) {
          throw new Error("phenomic (static) doesn't handle page not found yet. " + "You are not supposed so see this message because this code is " + "not supposed to be executed the way thing are, so this can " + "be a react-router issue. Check out opened issue to find a " + "workaround: https://github.com/MoOx/phenomic/issues");
        }

        var collectionMin = (0, _minify2.default)(collection);

        /* eslint-disable react/no-multi-comp */

        var sheet = new _styledComponents.ServerStyleSheet();
        var renderBody = function renderBody() {
          return render(_react2.default.createElement(
            _styledComponents.StyleSheetManager,
            { sheet: sheet.instance },
            _react2.default.createElement(
              _ContextProvider2.default,
              {
                collection: collectionMin,
                metadata: metadata
              },
              _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(_reactRouter.RouterContext, renderProps)
              )
            )
          ));
        };

        var renderScript = function renderScript() {
          if (options.clientScripts) {
            var initialState = _extends({}, store.getState(), {
              // only keep current page as others are not necessary
              pages: _defineProperty({}, url, store.getState().pages[url])
            });
            var script = "window.__COLLECTION__ = " + (0, _serialize2.default)(collectionMin) + ";" + ("window.__INITIAL_STATE__ = " + (0, _serialize2.default)(initialState));

            return _react2.default.createElement("script", { dangerouslySetInnerHTML: { __html: script } });
          }

          return null;
        };

        // write htmlString as html files
        return resolve(
        // render html document as simple html
        "<!doctype html>" + _server2.default.renderToStaticMarkup(_react2.default.createElement(Html, _extends({}, assetsFiles && {
          css: assetsFiles.css ? assetsFiles.css.map(function (fileName) {
            return (0, _pathToUri2.default)(baseUrl.pathname, fileName);
          }) : [],
          js: options.clientScripts && assetsFiles.js ? assetsFiles.js.map(function (fileName) {
            return (0, _pathToUri2.default)(baseUrl.pathname, fileName);
          }) : []
        }, {
          renderBody: renderBody,
          renderScript: renderScript,
          sheet: sheet
        }))));
      });
    } catch (err) {
      reject(err);
    }
  });
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _Html = require("../components/Html");

var _Html2 = _interopRequireDefault(_Html);

var _pathToUri = require("../_utils/path-to-uri");

var _pathToUri2 = _interopRequireDefault(_pathToUri);

var _ContextProvider = require("../components/ContextProvider");

var _ContextProvider2 = _interopRequireDefault(_ContextProvider);

var _serialize = require("../_utils/serialize");

var _serialize2 = _interopRequireDefault(_serialize);

var _minify = require("../loader/minify");

var _minify2 = _interopRequireDefault(_minify);

var _styledComponents = require("styled-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }