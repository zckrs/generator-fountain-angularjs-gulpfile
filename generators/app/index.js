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

    console.log(args);
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
    key: 'initializing',
    value: function initializing() {
      // Pre set the default props from the information we have at this point
      this.props = {
        cssPreprocessor: this.options.cssPreprocessor,
        jsPreprocessor: this.options.jsPreprocessor,
        htmlPreprocessor: this.options.htmlPreprocessor
      };
    }
  }, {
    key: 'writing',
    value: function writing() {
      this.config.set('props', this.props);
    }
  }, {
    key: 'default',
    value: function _default() {
      this.composeWith('fountain-angularjs-gulpfile:gulp', {
        options: {
          cssPreprocessor: this.props.cssPreprocessor,
          jsPreprocessor: this.props.jsPreprocessor,
          htmlPreprocessor: this.props.authorName
        }
      }, {
        local: require.resolve('../gulp')
      });
    }
  }, {
    key: 'installing',
    value: function installing() {
      this.npmInstall();
    }
  }, {
    key: 'prompting',
    get: function get() {

      return {

        askFor: function askFor() {

          var done = this.async();

          var prompts = [{
            when: !this.props.cssPreprocessor,
            type: 'list',
            name: 'cssPreprocessor',
            message: 'Which CSS preprocessor do you want?',
            choices: [{
              name: 'SASS',
              value: 'sass'
            }]
          }, {
            when: !this.props.jsPreprocessor,
            type: 'list',
            name: 'jsPreprocessor',
            message: 'Which JS preprocessor do you want?',
            choices: [{
              name: 'HTML',
              value: 'html'
            }]
          }, {
            when: !this.props.htmlPreprocessor,
            type: 'list',
            name: 'htmlPreprocessor',
            message: 'Which HTML template engine would you want?',
            choices: [{
              name: 'JS',
              value: 'js'
            }]
          }];

          this.prompt(prompts, (function (props) {
            Object.assign(this.props, props);

            done();
          }).bind(this));
        }
      };
    }
  }]);

  return GeneratorFoutainAngularJSGulpfile;
})(_yeomanGenerator.Base);

exports['default'] = GeneratorFoutainAngularJSGulpfile;
module.exports = exports['default'];