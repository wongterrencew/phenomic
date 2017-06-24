"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactHelmet = require("react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _styledComponents = require("styled-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Html = function Html(props) {

  // Glamor integration
  // https://github.com/threepointone/glamor/blob/master/docs/server.md
  var glamorRenderStatic = void 0;
  try {
    // $FlowFixMe just ignore glamor as we don't have it as a dep
    glamorRenderStatic = require("glamor/server").renderStatic;
  } catch (e) {}
  // skip glamor if not working


  // Aprodite
  // https://github.com/Khan/aphrodite#server-side-rendering
  var aproditeRenderStatic = void 0;
  try {
    // $FlowFixMe just ignore aprodite as we don't have it as a dep
    aproditeRenderStatic = require("aphrodite").StyleSheetServer.renderStatic;
  } catch (e) {}
  // skip aprodite if not working


  // render body
  var body = void 0;
  if (glamorRenderStatic) {
    var glamorResult = glamorRenderStatic(function () {
      return props.renderBody();
    });

    (0, _server.renderToString)(_react2.default.createElement(_reactHelmet2.default, {
      style: [{ "cssText": glamorResult.css }],
      script: [{ "innerHTML": "window._glamor = " + JSON.stringify(glamorResult.ids) }]
    }));
    body = glamorResult.html;
  } else if (aproditeRenderStatic) {
    var aproditeResult = aproditeRenderStatic(function () {
      return props.renderBody();
    });

    (0, _server.renderToString)(_react2.default.createElement(_reactHelmet2.default, {
      style: [{
        "cssText": aproditeResult.css.content,
        "data-aphrodite": undefined
      }],
      script: [{ "innerHTML": "window._aphrodite = " + JSON.stringify(aproditeResult.css.renderedClassNames) + ";" }]
    }));
    body = aproditeResult.html;
  }

  body = body || props.renderBody();
  var styledComponentsStyles = props.sheet.getStyleElement();

  // rewind html metas
  var head = _reactHelmet2.default.rewind();

  // <!doctype html> is automatically prepended
  return _react2.default.createElement(
    "html",
    _extends({
      lang: "en"
    }, head.htmlAttributes.toComponent()),
    _react2.default.createElement(
      "head",
      null,
      head.base.toComponent(),
      head.title.toComponent(),
      _react2.default.createElement("meta", { charSet: "utf-8" }),
      _react2.default.createElement("meta", { httpEquiv: "X-UA-Compatible", content: "IE=edge" }),
      _react2.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      head.meta.toComponent(),
      head.style.toComponent(),
      head.link.toComponent(),
      props.css.map(function (file, i) {
        return _react2.default.createElement("link", { key: "phenomic.css." + i, rel: "stylesheet", href: file });
      }),
      styledComponentsStyles,
      head.script.toComponent()
    ),
    _react2.default.createElement(
      "body",
      null,
      _react2.default.createElement("div", { id: "phenomic", dangerouslySetInnerHTML: { __html: body } }),
      props.renderScript(),
      props.js.map(function (file, i) {
        return _react2.default.createElement("script", { key: "phenomic.js." + i, src: file });
      })
    )
  );
};

Html.propTypes = {
  css: require("react").PropTypes.arrayOf(require("react").PropTypes.string).isRequired,
  js: require("react").PropTypes.arrayOf(require("react").PropTypes.string).isRequired,
  renderBody: require("react").PropTypes.func.isRequired,
  renderScript: require("react").PropTypes.func.isRequired,
  sheet: require("react").PropTypes.any.isRequired
};
exports.default = Html;