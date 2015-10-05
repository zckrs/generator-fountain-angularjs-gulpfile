'use strict';
var extend = require('deep-extend');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('cssPreprocessor', {
      type: String,
      required: true,
      defaults: 'sass'
    });

    this.option('jsPreprocessor', {
      type: String,
      required: true,
      defaults: 'js'
    });

    this.option('htmlPreprocessor', {
      type: String,
      required: true,
      defaults: 'html'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      extend(pkg, {
        devDependencies: {
          gulp: 'gulpjs/gulp#4.0',
          'gulp-angular-filesort': '~1.1.1',
          'gulp-angular-templatecache': '~1.7.0',
          'gulp-autoprefixer': '~3.0.1',
          'gulp-eslint': '~1.0.0',
          'gulp-filter': '~3.0.1',
          'gulp-flatten': '~0.2.0',
          'gulp-hub': 'frankwallis/gulp-hub#registry-init',
          'gulp-inject': '~1.5.0',
          'gulp-load-plugins': '~1.0.0-rc.1',
          'gulp-minify-css': '~1.2.1',
          'gulp-minify-html': '~1.0.4',
          'gulp-ng-annotate': '~1.1.0',
          'gulp-protractor': '~1.0.0',
          'gulp-replace': '~0.5.4',
          'gulp-rev': '~6.0.1',
          'gulp-rev-replace': '~0.4.2',
          'gulp-sass': '~2.0.4',
          'gulp-sourcemaps': '~1.5.2',
          'gulp-uglify': '~1.4.1',
          'gulp-useref': '~1.3.0',
          'gulp-util': '~3.0.6'
        },
        scripts: {
          build: 'gulp',
          serve: 'gulp serve',
          test: 'gulp karma:single-run'
        }
      });

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );

      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks')
      );
    }
  }
});
