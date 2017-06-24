"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @todo @ flow

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _rss = require("rss");

var _rss2 = _interopRequireDefault(_rss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _feedOptions$options = _extends({
    feedOptions: {}
  }, options),
      feedOptions = _feedOptions$options.feedOptions,
      destination = _feedOptions$options.destination,
      collection = _feedOptions$options.collection,
      xmlOptions = _feedOptions$options.xmlOptions;

  if (!feedOptions.site_url) {
    throw new Error("feed site_url must be configured");
  }

  if (feedOptions.feed_url == null) {
    feedOptions.feed_url = _url2.default.resolve(feedOptions.site_url, destination);
  }

  var feed = new _rss2.default(feedOptions);
  collection.forEach(function (item) {
    feed.item(_extends({}, item, {
      url: item.__url ? _url2.default.resolve(feedOptions.site_url, item.__url) : undefined

    }));
  });

  return feed.xml(xmlOptions);
};