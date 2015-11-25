'use strict';

var handleJson = require('../../src/file-utils');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('framework', { type: String, required: false });
  },

  initializing: function () {
    // Pre set the default props from the information we have at this point
    this.props = {
      framework: this.options.framework
    };
  },

  writing: {
    package: function () {
      handleJson.mergeJson.call(this, 'package.json', {
        devDependencies: {
          'webpack-stream': '^2.1.1',
          'eslint-loader': '^1.1.1',
          'babel-loader': '^6.2.0',
          'babel-preset-react': '^6.1.18'
        }
      });
    },

    gulp: function () {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks')
      );
    },

    indexHtml: function () {
      handleJson.replaceInFile.call(this, 'src/index.html', /<\/html>/, {
        framework: this.props.framework
      });
    }
  }
});
