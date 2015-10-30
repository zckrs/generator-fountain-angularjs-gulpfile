'use strict';

var extend = require('deep-extend');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('cssPreprocessor', {
      type: String,
      required: true
    });

    this.option('jsPreprocessor', {
      type: String,
      required: true
    });

    this.option('htmlPreprocessor', {
      type: String,
      required: true
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      var newPkg = {
        devDependencies: {
          'babel-core': '^5.8.29',
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
          'gulp-inject': '^3.0.0',
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
          'main-bower-files': '^2.9.0',
          'uglify-save-license': '^0.4.1',
          wiredep: '^2.2.2'
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

      if (this.options.cssPreprocessor === 'less') {
        newPkg.devDependencies['gulp-less'] = '^3.0.3';
      }

      extend(pkg, newPkg);

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
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
          cssPreprocessor: this.options.cssPreprocessor
        }
      );
    }
  }
});
