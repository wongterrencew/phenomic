"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhenomicContext = function (_Component) {
  _inherits(PhenomicContext, _Component);

  function PhenomicContext() {
    _classCallCheck(this, PhenomicContext);

    return _possibleConstructorReturn(this, (PhenomicContext.__proto__ || Object.getPrototypeOf(PhenomicContext)).apply(this, arguments));
  }

  _createClass(PhenomicContext, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        collection: this.props.collection,
        metadata: this.props.metadata
      };
    }
  }, {
    key: "render",
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return PhenomicContext;
}(_react.Component);

PhenomicContext.propTypes = {
  collection: _react.PropTypes.array,
  metadata: _react.PropTypes.object,
  children: _react.PropTypes.node
};
PhenomicContext.childContextTypes = {
  collection: _react.PropTypes.array,
  metadata: _react.PropTypes.object
};
PhenomicContext.propTypes = {
  collection: require("react").PropTypes.any.isRequired,
  metadata: require("react").PropTypes.object.isRequired,
  children: require("react").PropTypes.any
};
exports.default = PhenomicContext;