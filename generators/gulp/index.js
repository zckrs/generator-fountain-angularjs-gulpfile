const _ = require('lodash');
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
          del: '^2.0.2',
          gulp: 'gulpjs/gulp#4.0',
          'gulp-autoprefixer': '^3.1.0',
          'gulp-filter': '^3.0.1',
          'gulp-flatten': '^0.2.0',
          'gulp-hub': 'frankwallis/gulp-hub#registry-init',
          'gulp-minify-css': '^1.2.1',
          'gulp-minify-html': '^1.0.4',
          'gulp-replace': '^0.5.4',
          'gulp-rev': '^6.0.1',
          'gulp-rev-replace': '^0.4.2',
          'gulp-sourcemaps': '^1.6.0',
          'gulp-uglify': '^1.4.2',
          'gulp-useref': '^3.0.3',
          'gulp-util': '^3.0.7',
          'uglify-save-license': '^0.4.1'
        },
        scripts: {
          build: 'gulp',
          serve: 'gulp serve'
        }
      };

      if (this.props.framework === 'angular1') {
        _.merge(newPkg, {
          devDependencies: {
            'gulp-angular-filesort': '^1.1.1',
            'gulp-angular-templatecache': '^1.8.0',
            'gulp-ng-annotate': '^1.1.0'
          }
        });
      }

      if (this.props.cssPreprocessor === 'scss') {
        _.merge(newPkg, {
          devDependencies: {
            'gulp-sass': '^2.0.4'
          }
        });
      }

      handleJson.mergeJson.call(this, 'package.json', newPkg);
    },

    files: function () {
      const options = {
        framework: this.options.framework,
        dependencyManagement: this.options.dependencyManagement,
        cssPreprocessor: this.options.cssPreprocessor
      };

      if (this.options.dependencyManagement === 'inject') {
        options.compileTask = `'inject'`;
      } else if (this.options.dependencyManagement === 'commonjs') {
        options.compileTask = `gulp.parallel('scripts:watch', 'styles')`;
      } else if (this.options.dependencyManagement === 'systemjs') {
        options.compileTask = `gulp.parallel('scripts', 'styles')`;
      }

      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        options
      );

      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks'),
        options
      );

      this.fs.copyTpl(
        this.templatePath('conf'),
        this.destinationPath('conf'),
        options
      );

      handleJson.mergeJson.call(this, '.babelrc', {
        presets: ['es2015']
      });
    }
  },

  compose: function () {
    const options = {
      framework: this.props.framework,
      dependencyManagement: this.props.dependencyManagement,
      cssPreprocessor: this.props.cssPreprocessor,
      jsPreprocessor: this.props.jsPreprocessor,
      htmlPreprocessor: this.props.htmlPreprocessor
    };

    this.composeWith(
      'fountain-gulpfile:browsersync',
      { options },
      { local: require.resolve('../browsersync') }
    );

    this.composeWith(
      'fountain-gulpfile:karma',
      { options },
      { local: require.resolve('../karma') }
    );

    this.composeWith(
      'fountain-gulpfile:' + this.props.dependencyManagement,
      { options },
      { local: require.resolve('../' + this.props.dependencyManagement) }
    );

    this.composeWith(
      'fountain-gulpfile:eslint',
      { options },
      { local: require.resolve('../eslint') }
    );
  }
});
