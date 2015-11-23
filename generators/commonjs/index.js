'use strict';

var mergeJson = require('../../src/merge-json');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: {
    package: function () {
      mergeJson.call(this, 'package.json', {
        devDependencies: {
          'webpack-stream': '^2.1.1',
          'eslint-loader': '^1.1.1',
          'babel-loader': '^6.2.0',
          'babel-preset-react': '^6.1.18'
        }
      });
    },

    src: function () {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks')
      );
    }
  }
});
