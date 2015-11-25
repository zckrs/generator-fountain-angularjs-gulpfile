import { bootstrap, Component } from 'angular2/angular2';

var AppComponent =
  Component({
    selector: 'hello-app',
    template: '<h1>Hello World!</h1>'
  })
  .Class({
    constructor: function () { }
  });

bootstrap(AppComponent);
