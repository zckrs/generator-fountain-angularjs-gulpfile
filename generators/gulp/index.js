'use strict';

var handleJson = require('../../src/file-utils');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('framework', { type: String, required: false });
    this.option('dependencyManagement', { type: String, required: true });
    this.option('cssPreprocessor', { type: String, required: true });
    this.option('jsPreprocessor', { type: String, required: true });
    this.option('htmlPreprocessor', { type: String, required: true });
  },

  initializing: function () {
    // Pre set the default props from the information we have at this point
    this.props = {
      framework: this.options.framework,
      dependencyManagement: this.options.dependencyManagement,
      cssPreprocessor: this.options.cssPreprocessor,
      jsPreprocessor: this.options.jsPreprocessor,
      htmlPreprocessor: this.options.htmlPreprocessor
    };
  },

  writing: {
    package: function () {
      var newPkg = {
        devDependencies: {
          'babel-core': '^6.2.0',
          'babel-preset-es2015': '^6.1.18',
          'browser-sync': '^2.9.11',
          del: '^2.0.2',
          gulp: 'gulpjs/gulp#4.0',
          'gulp-angular-filesort': '^1.1.1',
          'gulp-angular-templatecache': '^1.8.0',
          'gulp-autoprefixer': '^3.1.0',
          'gulp-eslint': '^1.0.0',
          'gulp-filter': '^3.0.1',
          'gulp-flatten': '^0.2.0',
          'gulp-hub': 'frankwallis/gulp-hub#registry-init',
          'gulp-load-plugins': '^1.0.0',
          'gulp-minify-css': '^1.2.1',
          'gulp-minify-html': '^1.0.4',
          'gulp-ng-annotate': '^1.1.0',
          'gulp-protractor': '^1.0.0',
          'gulp-replace': '^0.5.4',
          'gulp-rev': '^6.0.1',
          'gulp-rev-replace': '^0.4.2',
          'gulp-sourcemaps': '^1.6.0',
          'gulp-uglify': '^1.4.2',
          'gulp-useref': '^1.3.0',
          'gulp-util': '^3.0.7',
          karma: '^0.13.14',
          'karma-angular-filesort': '^1.0.0',
          'karma-coverage': '^0.5.3',
          'karma-jasmine': '^0.3.6',
          'karma-ng-html2js-preprocessor': '^0.2.0',
          'karma-phantomjs-launcher': '^0.2.1',
          'uglify-save-license': '^0.4.1'
        },
        scripts: {
          build: 'gulp',
          serve: 'gulp serve',
          test: 'gulp karma:single-run'
        }
      };

      if (this.options.cssPreprocessor === 'scss') {
        newPkg.devDependencies['gulp-sass'] = '^2.0.4';
      }

      handleJson.mergeJson.call(this, 'package.json', newPkg);
    },

    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        {
          cssPreprocessor: this.options.cssPreprocessor
        }
      );

      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks'),
        {
          dependencyManagement: this.options.dependencyManagement,
          cssPreprocessor: this.options.cssPreprocessor
        }
      );

      handleJson.mergeJson.call(this, '.babelrc', {
        presets: ['es2015']
      });

      handleJson.mergeJson.call(this, '.eslintrc', {
        extends: 'eslint:recommended',
        env: { es6: true, browser: true, jasmine: true },
        ecmaFeatures: { modules: true },
        globals: { module: true, inject: true }
      });
    }
  },

  compose: function () {
    this.composeWith('fountain-gulpfile:' + this.props.dependencyManagement, {
      options: {
        framework: this.props.framework
      }
    }, {
      local: require.resolve('../' + this.props.dependencyManagement)
    });
  }
});
