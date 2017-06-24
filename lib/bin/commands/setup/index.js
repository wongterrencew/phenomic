"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require("path");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _fsPromise = require("fs-promise");

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _globby = require("globby");

var _globby2 = _interopRequireDefault(_globby);

var _inquirer = require("inquirer");

var _package = require("../../../../package.json");

var _package2 = require("../../../../themes/phenomic-theme-base/package.json");

var _package3 = _interopRequireDefault(_package2);

var _log = require("../../../_utils/log");

var _questions = require("./questions");

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var themePath = (0, _path.join)(__dirname, "../../../../themes/phenomic-theme-base");

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(argv) {
    var cwd, testMode, answers, name, homepage, twitter, repository, phenomic, devDependencies, pkg, files;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cwd = process.cwd();
            testMode = argv.test;


            (0, _log.plainLog)("Note: All values can be adjusted later.");

            _context.prev = 3;

            if (!testMode) {
              _context.next = 8;
              break;
            }

            _context.t0 = _questions.defaultTestAnswers;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return (0, _inquirer.prompt)(_questions2.default);

          case 10:
            _context.t0 = _context.sent;

          case 11:
            answers = _context.t0;
            name = answers.name, homepage = answers.homepage, twitter = answers.twitter, repository = answers.repository, phenomic = _objectWithoutProperties(answers, ["name", "homepage", "twitter", "repository"]);
            devDependencies = _extends({}, _package3.default.devDependencies, !testMode && {
              phenomic: "^" + _package.version
            });
            pkg = _extends({}, _package3.default, {
              name: name,
              homepage: homepage,
              phenomic: phenomic,
              twitter: twitter,
              repository: repository,
              devDependencies: devDependencies
            });
            _context.next = 17;
            return _fsPromise2.default.writeJson((0, _path.join)(cwd, "package.json"), pkg);

          case 17:
            (0, _log.plainLog)("`package.json` generated");

            files = _globby2.default.sync(["*",
            // node_modules is excluded because can be present during tests
            // (but will never be in public package)
            "!node_modules",
            // already generated
            "!package.json",
            // we assume it's up to the user
            "!yarn.lock"], { dot: true, cwd: themePath });
            _context.next = 21;
            return Promise.all(files.map(function (file) {
              return _fsPromise2.default.copy((0, _path.join)(themePath, file), (0, _path.join)(cwd, file));
            }));

          case 21:
            (0, _log.plainLog)("Base theme installed");

            (0, _log.plainLog)("Project ready. Only one `npm install` and you are good to go!", "success");
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t1 = _context["catch"](3);

            console.error(_chalk2.default.red(_context.t1));
            process.exit(1);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 25]]);
  }));

  function setup(_x) {
    return _ref.apply(this, arguments);
  }

  return setup;
}();