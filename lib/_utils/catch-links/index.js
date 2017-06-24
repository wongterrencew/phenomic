"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (elements, cb) {
  var eventCallback = catchLinks(cb);
  elements.map(function (el) {
    return el.addEventListener("click", eventCallback);
  });

  return function () {
    elements.map(function (el) {
      return el.removeEventListener("click", eventCallback);
    });
  };
};

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var catchLinks = function catchLinks(cb) {
  return function (ev) {
    if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented) {
      return;
    }

    var anchor = null;
    for (var n = ev.target; n.parentNode; n = n.parentNode) {
      if (n.nodeName === "A") {
        anchor = n;
        break;
      }
    }
    if (!anchor) {
      return;
    }
    var href = anchor.getAttribute("href");

    // Don't intercerpt anchor
    if (!href || href.startsWith("#")) {
      return;
    }

    var u = _url2.default.parse(href);

    if (u.host && u.host !== window.location.host) {
      return;
    }

    var finalUrl = _url2.default.resolve(window.location.pathname, u.path || "") + (u.hash || "");

    if (!cb(finalUrl)) {
      return;
    }

    ev.preventDefault();
  };
};