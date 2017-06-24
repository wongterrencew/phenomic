"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BodyContainer = function (_Component) {
  _inherits(BodyContainer, _Component);

  function BodyContainer() {
    _classCallCheck(this, BodyContainer);

    return _possibleConstructorReturn(this, (BodyContainer.__proto__ || Object.getPrototypeOf(BodyContainer)).apply(this, arguments));
  }

  _createClass(BodyContainer, [{
    key: "render",
    value: function render() {
      var props = this.props;

      var children = props.children,
          otherProps = _objectWithoutProperties(props, ["children"]);

      var child = void 0;
      if (typeof children === "string") {
        child = children;
      } else {
        try {
          child = _react2.default.Children.only(children);
        } catch (e) {
          console.log("phenomic: BodyContainer: multiple childs");
        }
      }

      if (child) {
        return _react2.default.createElement("div", _extends({
          className: "phenomic-BodyContainer",
          dangerouslySetInnerHTML: { __html: child }
        }, otherProps));
      }

      return _react2.default.createElement(
        "div",
        otherProps,
        _react2.default.Children.map(children, function (child, i) {
          if (typeof child === "string") {
            return _react2.default.createElement("div", {
              key: i,
              className: "phenomic-BodyContainer",
              dangerouslySetInnerHTML: { __html: child }
            });
          }
          return child;
        })
      );
    }
  }]);

  return BodyContainer;
}(_react.Component);

BodyContainer.propTypes = {
  children: require("react").PropTypes.any.isRequired
};
exports.default = BodyContainer;