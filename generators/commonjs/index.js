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
          'webpack-stream': '^2.1.1',
          'eslint-loader': '^1.1.1',
          'babel-loader': '^6.2.0',
          'babel-preset-react': '^6.1.18'
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
