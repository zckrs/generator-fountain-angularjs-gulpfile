'use strict';

var extend = require('deep-extend');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      var newPkg = {
        devDependencies: {
          'gulp-inject': '^3.0.0',
          'main-bower-files': '^2.9.0',
          wiredep: '^2.2.2'
        }
      };

      extend(pkg, newPkg);

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
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
