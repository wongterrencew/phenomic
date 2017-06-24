"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _remark = require("remark");

var _remark2 = _interopRequireDefault(_remark);

var _stripMarkdown = require("strip-markdown");

var _stripMarkdown2 = _interopRequireDefault(_stripMarkdown);

var _prune = require("./prune");

var _prune2 = _interopRequireDefault(_prune);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOpts = {
  pruneLength: 140,
  pruneString: "…"
};

function description(text) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  opts = _extends({}, defaultOpts, opts);

  if (opts.pruneLength === 0) {
    console.warn("You defined 'description.pruneLength' of phenomic loader " + "with an zero value. This does not make sense, " + ("so the default value " + defaultOpts.pruneLength + " has been used."));

    opts.pruneLength = defaultOpts.pruneLength;
  }

  return (0, _prune2.default)((0, _remark2.default)().use(_stripMarkdown2.default).process(text).toString().replace(/\n+/g, " ") // Avoid useless new lines
  .trim(), opts.pruneLength, opts.pruneString);
}

exports.default = function (_ref) {
  var result = _ref.result,
      frontMatter = _ref.frontMatter,
      options = _ref.options;

  if (result.head && result.head.description) {
    return result;
  }
  return _extends({}, result, {
    head: _extends({}, result.head, {
      description: description(frontMatter.content, options)
    })
  });
};