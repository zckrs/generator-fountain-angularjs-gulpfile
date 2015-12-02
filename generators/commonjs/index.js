'use strict';

var _ = require('lodash');
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
      var newPkg = {
        devDependencies: {
          webpack: '^1.12.9',
          'eslint-loader': '^1.1.1',
          'babel-loader': '^6.2.0',
          'babel-preset-react': '^6.1.18'
        }
      };

      if (this.props.framework === 'react') {
        _.merge(newPkg, {
          devDependencies: {
            'webpack-dev-middleware': '^1.4.0',
            'webpack-hot-middleware': '^2.6.0',
            'react-hot-loader': '^1.3.0'
          }
        });
      }

      handleJson.mergeJson.call(this, 'package.json', newPkg);
    },

    files: function () {
      this.fs.copyTpl(
        this.templatePath('conf'),
        this.destinationPath('conf'),
        { framework: this.props.framework }
      );

      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks'),
        { framework: this.props.framework }
      );
    },

    indexHtml: function () {
      handleJson.replaceInFile.call(this, 'src/index.html', /<\/html>/, {
        framework: this.props.framework
      });
    }
  }
});
