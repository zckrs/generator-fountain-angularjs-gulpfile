'use strict';

var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('framework', { type: String, required: true });
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

  prompting: {
    askFor: function () {
      var done = this.async();

      var prompts = [{
        when: !this.props.framework,
        type: 'list',
        name: 'framework',
        message: 'Which JavaScript framework do you want?',
        choices: [
          {
            name: 'React',
            value: 'react'
          },
          {
            name: 'Angular 1',
            value: 'angular1'
          },
          {
            name: 'Angular 2',
            value: 'angular2'
          }
        ]
      }, {
        when: !this.props.dependencyManagement,
        type: 'list',
        name: 'dependencyManagement',
        message: 'Which dependency management do you want?',
        choices: [
          {
            name: 'CommonJS & NPM',
            value: 'commonjs'
          },
          {
            name: 'SystemJS & JSPM',
            value: 'systemjs'
          }
        ]
      }, {
        when: !this.props.cssPreprocessor,
        type: 'list',
        name: 'cssPreprocessor',
        message: 'Which CSS preprocessor do you want?',
        choices: [
          {
            name: 'SASS',
            value: 'scss'
          },
          {
            name: 'CSS',
            value: 'css'
          }
        ]
      }, {
        when: !this.props.jsPreprocessor,
        type: 'list',
        name: 'jsPreprocessor',
        message: 'Which JS preprocessor do you want?',
        choices: [
          {
            name: 'JS',
            value: 'js'
          }
        ]
      }, {
        when: !this.props.htmlPreprocessor,
        type: 'list',
        name: 'htmlPreprocessor',
        message: 'Which HTML template engine would you want?',
        choices: [
          {
            name: 'HTML',
            value: 'html'
          }
        ]
      }];

      this.prompt(prompts, function (props) {
        this.props = _.merge(this.props, props);

        done();
      }.bind(this));
    }
  },

  writing: function () {
    this.config.set('props', this.props);
  },

  default: function () {
    this.composeWith('fountain-gulpfile:' + this.props.framework, {
      options: {
        dependencyManagement: this.props.dependencyManagement,
        cssPreprocessor: this.props.cssPreprocessor,
        jsPreprocessor: this.props.jsPreprocessor,
        htmlPreprocessor: this.props.authorName
      }
    }, {
      local: require.resolve('../' + this.props.framework)
    });
  },

  installing: function () {
    this.npmInstall();
  }
});
