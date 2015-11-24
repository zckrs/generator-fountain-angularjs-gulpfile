'use strict';

var handleJson = require('../../src/handle-json');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('dependencyManagement', {
      type: String,
      required: true
    });

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
      dependencyManagement: this.options.dependencyManagement,
      cssPreprocessor: this.options.cssPreprocessor,
      jsPreprocessor: this.options.jsPreprocessor,
      htmlPreprocessor: this.options.htmlPreprocessor
    };
  },

  writing: {
    package: function () {
      handleJson.mergeJson.call(this, 'package.json', {
        dependencies: {
          angular2: '^2.0.0-alpha.46'
        }
      });
    },

    src: function () {
      this.fs.copyTpl(
        this.templatePath('src'),
        this.destinationPath('src')
      );
    }
  },

  compose: function () {
    this.composeWith('fountain-gulpfile:gulp', {
      options: {
        dependencyManagement: this.props.dependencyManagement,
        cssPreprocessor: this.props.cssPreprocessor,
        jsPreprocessor: this.props.jsPreprocessor,
        htmlPreprocessor: this.props.authorName
      }
    }, {
      local: require.resolve('../gulp')
    });
  }
});
