'use strict';

var _ = require('lodash');
var handleJson = require('../../src/file-utils');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('framework', { type: String, required: false });
    this.option('dependencyManagement', { type: String, required: false });
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
          karma: '^0.13.14',
          'karma-coverage': '^0.5.3',
          'karma-jasmine': '^0.3.6',
          'karma-junit-reporter': '^0.3.8',
          'karma-phantomjs-launcher': '^0.2.1',
          phantomjs: '^1.9.19'
        },
        scripts: {
          test: 'gulp karma:single-run'
        }
      };

      if (this.props.framework === 'angular1') {
        _.merge(newPkg, {
          devDependencies: {
            'gulp-ng-annotate': '^1.1.0',
            'karma-angular-filesort': '^1.0.0',
            'karma-ng-html2js-preprocessor': '^0.2.0'
          }
        });
      }

      if (this.props.dependencyManagement === 'commonjs') {
        _.merge(newPkg, {
          devDependencies: {
            'karma-webpack': '^1.7.0'
          }
        });
      }

      handleJson.mergeJson.call(this, 'package.json', newPkg);
    },

    gulp: function () {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks')
      );
    },

    conf: function () {
      var options = {
        singleRun: true,
        framework: this.props.framework,
        dependencyManagement: this.props.dependencyManagement
      };

      this.fs.copyTpl(
        this.templatePath('conf/karma.conf.js'),
        this.destinationPath('conf/karma.conf.js'),
        options
      );

      if (this.props.dependencyManagement === 'commonjs') {
        this.fs.copyTpl(
          this.templatePath('conf/webpack-test.conf.js'),
          this.destinationPath('conf/webpack-test.conf.js'),
          options
        );
      }

      options.singleRun = false;

      this.fs.copyTpl(
        this.templatePath('conf/karma.conf.js'),
        this.destinationPath('conf/karma-auto.conf.js'),
        options
      );
    }
  }
});