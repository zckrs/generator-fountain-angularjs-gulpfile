'use strict';

var extend = require('deep-extend');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

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
  },

  initializing: function () {
    // Pre set the default props from the information we have at this point
    this.props = {
      cssPreprocessor: this.options.cssPreprocessor,
      jsPreprocessor: this.options.jsPreprocessor,
      htmlPreprocessor: this.options.htmlPreprocessor
    };
  },

  prompting: {
    askFor: function () {
      var done = this.async();

      var prompts = [{
        when: !this.props.cssPreprocessor,
        type: 'list',
        name: 'cssPreprocessor',
        message: 'Which CSS preprocessor do you want?',
        choices: [
          {
            name: 'SASS',
            value: 'sass'
          }
        ]
      }, {
        when: !this.props.jsPreprocessor,
        type: 'list',
        name: 'jsPreprocessor',
        message: 'Which JS preprocessor do you want?',
        choices: [
          {
            name: 'HTML',
            value: 'html'
          }
        ]
      }, {
        when: !this.props.htmlPreprocessor,
        type: 'list',
        name: 'htmlPreprocessor',
        message: 'Which HTML template engine would you want?',
        choices: [
          {
            name: 'JS',
            value: 'js'
          }
        ]
      }];

      this.prompt(prompts, function (props) {
        this.props = extend(this.props, props);

        done();
      }.bind(this));
    }
  },

  writing: function () {
    this.config.set('props', this.props);
  },

  default: function () {
    this.composeWith('fountain-gulpfile:gulp', {
      options: {
        cssPreprocessor: this.props.cssPreprocessor,
        jsPreprocessor: this.props.jsPreprocessor,
        htmlPreprocessor: this.props.authorName
      }
    }, {
      local: require.resolve('../gulp')
    });
  },

  installing: function () {
    this.npmInstall();
  }
});
