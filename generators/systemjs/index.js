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
      handleJson.updateJson.call(this, 'package.json', function (packageJson) {
        packageJson.jspm = {
          dependencies: packageJson.dependencies
        };
        _.forEach(packageJson.jspm.dependencies, function (version, name) {
          packageJson.jspm.dependencies[name] = 'npm:' + name + '@' + version;
        });
        delete packageJson.dependencies;
        return packageJson;
      });

      handleJson.mergeJson.call(this, 'package.json', {
        devDependencies: {
          jspm: '0.16.15',
          'gulp-babel': '6.1.0',
          'babel-plugin-transform-es2015-modules-systemjs': '6.1.18'
        }
      });
    },

    gulp: function () {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks')
      );
    },

    config: function () {
      this.fs.copyTpl(
        this.templatePath('config.js'),
        this.destinationPath('config.js')
      );
    },

    indexHtml: function () {
      handleJson.replaceInFile.call(this, 'src/index.html', /<\/html>/, {
        framework: this.props.framework
      });
    },

    installing: function () {
      this.runInstall('jspm');
    }
  }
});
