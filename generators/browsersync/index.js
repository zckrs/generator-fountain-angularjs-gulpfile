'use strict';

const _ = require('lodash');
const handleJson = require('../../src/file-utils');
const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('framework', { type: String, required: true });
    this.option('dependencyManagement', { type: String, required: true });
  },

  initializing: function () {
    // Pre set the default props from the information we have at this point
    this.props = {
      framework: this.options.framework,
      dependencyManagement: this.options.dependencyManagement
    };
  },

  writing: {
    package: function () {
      var newPkg = {
        devDependencies: {
          'browser-sync': '^2.9.11'
        }
      };

      if (this.props.dependencyManagement === 'commonjs' && this.props.framework === 'react') {
        _.merge(newPkg, {
          devDependencies: {
            'webpack-dev-middleware': '^1.4.0',
            'webpack-hot-middleware': '^2.6.0'
          }
        });
      }

      handleJson.mergeJson.call(this, 'package.json', newPkg);
    },

    gulp: function () {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks/browserSync.js'),
        this.destinationPath('gulp_tasks/browserSync.js')
      );
    },

    conf: function () {
      const options = {
        dist: false,
        dependencyManagement: this.props.dependencyManagement,
        webpackHotReload: this.props.framework === 'react' && this.props.dependencyManagement === 'commonjs'
      };

      this.fs.copyTpl(
        this.templatePath('conf/browsersync.conf.js'),
        this.destinationPath('conf/browsersync.conf.js'),
        options
      );

      options.dist = true;

      this.fs.copyTpl(
        this.templatePath('conf/browsersync.conf.js'),
        this.destinationPath('conf/browsersync-dist.conf.js'),
        options
      );
    }
  }
});
