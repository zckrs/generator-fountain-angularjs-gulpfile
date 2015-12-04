/* globals require */
<% if (framework === 'angular1') { -%>
require('angular-mocks');

<% } -%>
const context = require.context('./app', true, /\.spec$/);
context.keys().forEach(context);
