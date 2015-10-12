import 'babel/polyfill';
import { Base } from 'yeoman-generator';

export default class GeneratorFoutainAngularJSGulpfile extends Base {

  constructor(...args) {
    super(...args);

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
  }

  initializing() {
    // Pre set the default props from the information we have at this point
    this.props = {
      cssPreprocessor: this.options.cssPreprocessor,
      jsPreprocessor: this.options.jsPreprocessor,
      htmlPreprocessor: this.options.htmlPreprocessor
    };
  }

  get prompting() {

    return {

      askFor() {

        let done = this.async();

        let prompts = [{
          when: !this.props.cssPreprocessor,
          type: 'list',
          name: 'cssPreprocessor',
          message: 'Which CSS preprocessor do you want?',
          choices: [
            {
              name: 'SASS',
              value: 'sass'
            }
          ]
        }, {
          when: !this.props.jsPreprocessor,
          type: 'list',
          name: 'jsPreprocessor',
          message: 'Which JS preprocessor do you want?',
          choices: [
            {
              name: 'HTML',
              value: 'html'
            }
          ]
        }, {
          when: !this.props.htmlPreprocessor,
          type: 'list',
          name: 'htmlPreprocessor',
          message: 'Which HTML template engine would you want?',
          choices: [
            {
              name: 'JS',
              value: 'js'
            }
          ]
        }];

        this.prompt(prompts, function (props) {
          Object.assign(this.props, props);

          done();
        }.bind(this));
      }
    };
  }

  writing() {
    this.config.set('props', this.props);
  }

  default() {
    this.composeWith('fountain-angularjs-gulpfile:gulp', {
      options: {
        cssPreprocessor: this.props.cssPreprocessor,
        jsPreprocessor: this.props.jsPreprocessor,
        htmlPreprocessor: this.props.authorName
      }
    }, {
      local: require.resolve('../gulp')
    });
  }

  installing() {
    this.npmInstall();
  }
}
