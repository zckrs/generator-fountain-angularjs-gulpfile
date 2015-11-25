'use strict';

var handleJson = require('../../src/file-utils');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('dependencyManagement', { type: String, required: true });
    this.option('cssPreprocessor', { type: String, required: true });
    this.option('jsPreprocessor', { type: String, required: true });
    this.option('htmlPreprocessor', { type: String, required: true });
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
          react: '0.14.3',
          'react-dom': '0.14.3'
        },
        devDependencies: {
          'babel-preset-react': '6.1.18',
          'eslint-plugin-react': '3.10.0'
        }
      });
    },

    src: function () {
      this.fs.copyTpl(
        this.templatePath('src'),
        this.destinationPath('src')
      );

      handleJson.mergeJson.call(this, '.babelrc', {
        presets: ['react']
      });

      handleJson.mergeJson.call(this, '.eslintrc', {
        plugins: ['react'],
        ecmaFeatures: { jsx: true },
        rules: { 'react/jsx-uses-react': 1 }
      });
    }
  },

  compose: function () {
    this.composeWith('fountain-gulpfile:gulp', {
      options: {
        framework: 'react',
        dependencyManagement: this.options.dependencyManagement,
        cssPreprocessor: this.props.cssPreprocessor,
        jsPreprocessor: this.props.jsPreprocessor,
        htmlPreprocessor: this.props.authorName
      }
    }, {
      local: require.resolve('../gulp')
    });
  }
});
