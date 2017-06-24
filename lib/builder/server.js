"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// module.exports is used
// eslint-disable-next-line import/default


var _path = require("path");

var _child_process = require("child_process");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require("webpack-dev-middleware");

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require("webpack-hot-middleware");

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _connectHistoryApiFallback = require("connect-history-api-fallback");

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _portfinder = require("portfinder");

var _portfinder2 = _interopRequireDefault(_portfinder);

var _opn = require("opn");

var _opn2 = _interopRequireDefault(_opn);

var _log = require("../_utils/log");

var _log2 = _interopRequireDefault(_log);

var _plugin = require("../loader/plugin.js");

var _plugin2 = _interopRequireDefault(_plugin);

var _minify = require("../loader/minify");

var _minify2 = _interopRequireDefault(_minify);

var _serialize = require("../_utils/serialize");

var _serialize2 = _interopRequireDefault(_serialize);

var _pathToUri = require("../_utils/path-to-uri");

var _pathToUri2 = _interopRequireDefault(_pathToUri);

var _logFormatter = require("./webpack/log-formatter.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var devServerNoScript = "Phenomic development server requires JavaScript.\nIf you want to check our your website works without JavaScript, you need to\nbuild the static version and server the result.\nYou can do this by doing: <code>npm run build -- --serve</code>\n";

exports.default = function (config) {
  var webpackConfig = config.webpackConfigBrowser;


  if (!config.baseUrl) {
    throw new Error("You must provide a 'baseUrl' object that contains the following keys:" + "'href', 'port', 'hostname'. See https://nodejs.org/api/url.html");
  }

  var server = (0, _express2.default)();

  if (config.static && config.server) {
    server.use(config.baseUrl.pathname, _express2.default.static((0, _path.join)(config.cwd, config.destination)));
  } else {
    var devEntries = [require.resolve("webpack-hot-middleware/client")];

    var devConfig = _extends({}, webpackConfig, {
      entry: _extends({}, Object.keys(webpackConfig.entry).reduce(function (acc, key) {
        return _extends({}, acc, _defineProperty({}, key, [].concat(devEntries, _toConsumableArray(Array.isArray(webpackConfig.entry[key]) ? webpackConfig.entry[key] : [webpackConfig.entry[key]]))));
      }, {})),
      plugins: [].concat(_toConsumableArray(webpackConfig.plugins || []), [

      // for hot-middleware
      new _webpack2.default.optimize.OccurrenceOrderPlugin(), new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin()])

      // webpack dev + hot middlewares
    });var webpackCompiler = (0, _webpack2.default)(devConfig);

    server.use((0, _webpackDevMiddleware2.default)(webpackCompiler, _extends({
      publicPath: webpackConfig.output.publicPath,
      // skip compilation logs if !verbose
      noInfo: !config.verbose,
      quiet: !config.verbose
    }, devConfig.devServer)));
    server.use((0, _webpackHotMiddleware2.default)(webpackCompiler, {
      // skip hot middleware logs if !verbose
      log: config.verbose ? undefined : function () {}
    }));

    var entries = [];
    webpackCompiler.plugin("done", function (stats) {
      entries = [];
      var namedChunks = stats.compilation.namedChunks;
      Object.keys(namedChunks).forEach(function (chunkName) {
        entries = [].concat(_toConsumableArray(entries), _toConsumableArray(namedChunks[chunkName].files.filter(function (file) {
          return !file.endsWith(".hot-update.js");
        })));
      });
    });

    // if !verbose, use our custom minimal output
    if (!config.verbose) {
      (0, _logFormatter.handleInvalid)(); // start "Updating"
      webpackCompiler.plugin("invalid", _logFormatter.handleInvalid);
      webpackCompiler.plugin("done", _logFormatter.handleDone);
    }

    // user static assets
    if (config.assets) {
      server.use(config.baseUrl.pathname + config.assets.route, _express2.default.static(config.assets.path));
    }

    // routing for the part we want (starting to the baseUrl pathname)
    var router = (0, _express.Router)();
    server.use(config.baseUrl.pathname, router);

    // fallback to index for unknow pages?
    router.use((0, _connectHistoryApiFallback2.default)({
      // https://github.com/MoOx/phenomic/issues/808
      disableDotRule: true
    }));

    // webpack static ressources
    router.get("*", _express2.default.static(webpackConfig.output.path));

    // hardcoded entry point
    router.get("/index.html", function (req, res) {
      var collectionMin = (0, _minify2.default)(_plugin2.default.collection);
      res.setHeader("Content-Type", "text/html");
      /* eslint-disable max-len */
      res.end("<!doctype html>\n  <html>\n  <head><meta charset=\"utf8\" /></head>\n  <body>\n    <div id=\"phenomic\">\n      <div\n        id=\"phenomic-DevLoader\"\n        style=\"color: red; font: caption; font-size: 2rem; padding: 40vh 10vw; text-align: center;\"\n      >\n        <script>\n        window.onerror = function(e) {\n          var devLoader = document.querySelector(\"#phenomic-DevLoader\")\n          if (devLoader) { devLoader.innerHTML = e.toString() }\n          // only need to use this code once\n          window.onerror = null\n        }\n        </script>\n        <noscript>" + devServerNoScript + "</noscript>\n      </div>\n    </div>\n    <script>\n    window.__COLLECTION__ = " + (0, _serialize2.default)(collectionMin) + ";\n    </script>\n    " + entries.map(function (fileName) {
        return "<script src=\"" + (0, _pathToUri2.default)(config.baseUrl.pathname, fileName) + "\"></script>";
      }) + "\n  </body>\n  </html>"
      /* eslint-enable max-len */
      );
    });
  }

  // THAT'S IT
  var devHost = config.devHost,
      devPort = config.devPort;


  _portfinder2.default.basePort = devPort;

  _portfinder2.default.getPort(function (err, port) {
    if (err) {
      throw err;
    }

    if (port !== devPort) {
      (0, _log2.default)("Port " + devPort + " is not available. Using port " + port + " instead.");
    }

    server.listen(port, devHost, function (err) {
      if (err) {
        throw err;
      }
      var href = "http://" + devHost + ":" + port + config.baseUrl.pathname;
      (0, _log2.default)("Development server listening on " + href);

      if (config.open) {
        var openUrl = href.replace(devHost, "localhost");
        if (process.platform === "darwin") {
          try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
            (0, _child_process.execSync)("ps cax | grep \"Google Chrome\"");
            (0, _child_process.execSync)("osascript openChrome.applescript " + openUrl, { cwd: __dirname, stdio: "ignore" });
            return true;
          } catch (err) {
            // Ignore errors.
          }
        }
        // Fallback to opn
        // (It will always open new tab)
        (0, _opn2.default)(openUrl);
      }
    });
  });
};