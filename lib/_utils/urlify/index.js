"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileExtensionRE = undefined;
exports.default = urlify;

var _pathToUri = require("../path-to-uri");

var _pathToUri2 = _interopRequireDefault(_pathToUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileExtensionRE = exports.fileExtensionRE = /\.html?$/;
function urlify(string) {
  var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var hasExtension = string.match(fileExtensionRE);

  var url = string;

  // replace windows backslash by slash
  // before playing more with the url
  url = url.replace(/\\/g, "/");

  url = url
  // something-else.md => something-else
  // something-else.markdown => something-else
  .replace(/\.(md|markdown|txt|tex|textile|t2t|asciidoc|asc|adoc)$/, "")

  // something/index.md => something
  // something/index.markdown => something
  .replace(/\bindex$/, "");

  // if url is not and html file, we will tweak it a little bit depending on the
  // length wanted (full url or folder url)
  if (!hasExtension) {
    if (full) {
      // url without extension => folder => index.html
      url = (0, _pathToUri2.default)(url, "index.html");
    } else {
      // url without extension => folder
      if (url.length && !url.endsWith("/")) {
        url += "/";
      }
    }
  }
  // else, url with a file extension, don't touch

  // no relative url
  url = url.replace(/^\.\//, "");

  return url;
}