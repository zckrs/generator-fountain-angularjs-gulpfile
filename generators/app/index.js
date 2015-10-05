'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('cssPreprocessor', {
      type: String,
      required: true,
      defaults: 'sass'
    });

    this.option('jsPreprocessor', {
      type: String,
      required: true,
      defaults: 'js'
    });

    this.option('htmlPreprocessor', {
      type: String,
      required: true,
      defaults: 'html'
    });
  },

  initializing: function () {
    // Pre set the default props from the information we have at this point
    this.props = {
      cssPreprocessor: Boolean(this.options.cssPreprocessor),
      jsPreprocessor: Boolean(this.options.jsPreprocessor),
      htmlPreprocessor: Boolean(this.options.htmlPreprocessor)
    };

  },

  prompting: {
    askFor: function () {

    }
  },

  writing: function () {
    // Re-read the content at this point because a composed generator might modify it.

    // Let's extend package.json so we're not overwriting user previous fields
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
