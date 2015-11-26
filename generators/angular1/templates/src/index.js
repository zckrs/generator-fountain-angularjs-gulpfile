<% if (modules) { -%>
import angular from 'angular';

<% } -%>
angular
  .module('app', [])
  .directive('helloApp', () => {
    return {
      template: '<h1>Hello World!</h1>'
    }
  });
