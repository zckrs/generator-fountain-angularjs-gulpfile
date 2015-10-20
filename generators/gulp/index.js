'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('babel/polyfill');

var _yeomanGenerator = require('yeoman-generator');

var GeneratorFoutainAngularJSGulpfile = (function (_Base) {
  _inherits(GeneratorFoutainAngularJSGulpfile, _Base);

  function GeneratorFoutainAngularJSGulpfile() {
    _classCallCheck(this, GeneratorFoutainAngularJSGulpfile);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(GeneratorFoutainAngularJSGulpfile.prototype), 'constructor', this).apply(this, args);

    this.option('cssPreprocessor', {
      type: String,
      required: true
    });

    this.option('jsPreprocessor', {
      type: String,
      required: true
    });

    this.option('htmlPreprocessor', {
      type: String,
      required: true
    });
  }

  _createClass(GeneratorFoutainAngularJSGulpfile, [{
    key: 'writing',
    get: function get() {

      return {

        pkg: function pkg() {
          var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

          Object.assign(pkg, {
            devDependencies: {
              'babel-core': '~5.8.25',
              'browser-sync': '~2.9.8',
              gulp: 'gulpjs/gulp#4.0',
              'gulp-angular-filesort': '~1.1.1',
              'gulp-angular-templatecache': '~1.7.0',
              'gulp-autoprefixer': '~3.0.1',
              'gulp-eslint': '~1.0.0',
              'gulp-filter': '~3.0.1',
              'gulp-flatten': '~0.2.0',
              'gulp-hub': 'frankwallis/gulp-hub#registry-init',
              'gulp-inject': '~1.5.0',
              'gulp-load-plugins': '~1.0.0-rc.1',
              'gulp-minify-css': '~1.2.1',
              'gulp-minify-html': '~1.0.4',
              'gulp-ng-annotate': '~1.1.0',
              'gulp-protractor': '~1.0.0',
              'gulp-replace': '~0.5.4',
              'gulp-rev': '~6.0.1',
              'gulp-rev-replace': '~0.4.2',
              'gulp-sass': '~2.0.4',
              'gulp-sourcemaps': '~1.5.2',
              'gulp-uglify': '~1.4.1',
              'gulp-useref': '~1.3.0',
              'gulp-util': '~3.0.6',
              karma: '~0.13.9',
              'karma-angular-filesort': '~1.0.0',
              'karma-coverage': '~0.5.2',
              'karma-jasmine': '~0.3.6',
              'karma-ng-html2js-preprocessor': '~0.1.2',
              'karma-phantomjs-launcher': '~0.2.1',
              'main-bower-files': '~2.9.0',
              'uglify-save-license': '~0.4.1',
              wiredep: '~2.2.2'
            },
            scripts: {
              build: 'gulp',
              serve: 'gulp serve',
              test: 'gulp karma:single-run'
            }
          });

          this.fs.writeJSON(this.destinationPath('package.json'), pkg);
        },

        gulpfile: function gulpfile() {
          this.fs.copyTpl(this.templatePath('gulpfile.babel.js'), this.destinationPath('gulpfile.babel.js'));

          this.fs.copyTpl(this.templatePath('gulp_tasks'), this.destinationPath('gulp_tasks'));
        }
      };
    }
  }]);

  return GeneratorFoutainAngularJSGulpfile;
})(_yeomanGenerator.Base);

exports['default'] = GeneratorFoutainAngularJSGulpfile;
module.exports = exports['default'];