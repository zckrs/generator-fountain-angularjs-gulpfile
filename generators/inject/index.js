'use strict';

var handleJson = require('../../src/file-utils');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: {
    package: function () {
      handleJson.mergeJson.call(this, 'package.json', {
        devDependencies: {
          'gulp-inject': '^3.0.0',
          'main-bower-files': '^2.9.0',
          wiredep: '^2.2.2'
        }
      });
    },

    src: function () {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks')
      );

      this.fs.copyTpl(
        this.templatePath('.babelrc'),
        this.destinationPath('.babelrc')
      );
    }
  }
});
