<% if (modules) { -%>
import React, { Component } from 'react';

export class Hello extends Component {
<% } else { -%>
class Hello extends React.Component {
<% } -%>
  render() {
    return (
      <h1>{'Hello world!'}</h1>
    );
  }
}
