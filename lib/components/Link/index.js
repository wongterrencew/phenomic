"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var origin = function origin(location) {
  return location.origin ||

  // IE does not correctly handle origin, maybe Edge does...
  location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
};

function Link(props, _ref) {
  var router = _ref.router;

  var to = props.to,
      otherProps = _objectWithoutProperties(props, ["to"]);

  var simpleLink = _react2.default.createElement("a", _extends({}, otherProps, {
    href: to,
    className: props.className
  }));

  // static rendering
  if (typeof document === "undefined") {
    return simpleLink;
  }

  var toLink = document.createElement("a");
  toLink.href = to;

  if (
  // parent absolute url with the same domain
  // should not be Link
  to.indexOf("://") > -1 && to.indexOf(process.env.PHENOMIC_USER_URL) === -1) {
    return simpleLink;
  }

  if (origin(toLink) === origin(window.location)
  // we might want to restrict Link to path including the pathname
  // but this will require to preprend pathname to all Links from the
  // collection, which sucks.
  // If people wants to use Link for a same domain, but in the parent path,
  // you will need to includes the entire url, / won't work at it will use
  // the react-router basename defined by Phenomic.
  // &&
  // toLink.pathname.includes(process.env.PHENOMIC_USER_PATHNAME)
  // toLink.pathname.indexOf(process.env.PHENOMIC_USER_PATHNAME) > -1
  ) {
      return _react2.default.createElement(_reactRouter.Link, _extends({}, otherProps, {
        to: to,
        className: (0, _classnames2.default)(props.className, _defineProperty({}, props.activeClassName, router && (router.isActive({ pathname: props.to }) || router.isActive({ pathname: props.to + "index.html" })) && props.activeClassName))
      }));
    }

  return simpleLink;
}

Link.propTypes = {
  children: _react.PropTypes.node,
  to: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  activeClassName: _react.PropTypes.string
};

Link.contextTypes = {
  router: _react.PropTypes.object.isRequired
};

Link.displayName = "Link";

exports.default = Link;