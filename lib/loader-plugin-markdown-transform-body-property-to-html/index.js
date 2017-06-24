"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _remark = require("remark");

var _remark2 = _interopRequireDefault(_remark);

var _remarkSlug = require("remark-slug");

var _remarkSlug2 = _interopRequireDefault(_remarkSlug);

var _remarkAutolinkHeadings = require("remark-autolink-headings");

var _remarkAutolinkHeadings2 = _interopRequireDefault(_remarkAutolinkHeadings);

var _remarkHighlight = require("remark-highlight.js");

var _remarkHighlight2 = _interopRequireDefault(_remarkHighlight);

var _remarkToc = require("remark-toc");

var _remarkToc2 = _interopRequireDefault(_remarkToc);

var _remarkHtml = require("remark-html");

var _remarkHtml2 = _interopRequireDefault(_remarkHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mdify(text) {
  return (0, _remark2.default)()
  // https://github.com/wooorm/remark-slug
  .use(_remarkSlug2.default)

  // https://github.com/ben-eb/remark-autolink-headings
  .use(_remarkAutolinkHeadings2.default, {
    content: {
      type: "text",
      value: "#"
    },
    linkProperties: {
      className: "phenomic-HeadingAnchor"
    }
  })

  // https://github.com/wooorm/remark-html
  .use(_remarkHtml2.default, { entities: "escape" })

  // https://github.com/ben-eb/remark-highlight.js
  .use(_remarkHighlight2.default)

  // https://github.com/wooorm/remark-toc
  .use(_remarkToc2.default)

  // render
  .process(text, {
    commonmark: true
  }).toString();
}

exports.default = function (_ref) {
  var result = _ref.result;

  return _extends({}, result, {
    body: mdify(result.body)
  });
};