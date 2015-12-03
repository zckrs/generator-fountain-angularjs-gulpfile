import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Hello } from './hello';

describe('index', function() {
  it('should work', function() {
    var hello = TestUtils.renderIntoDocument(<Hello/>);
    var h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.textContent).toEqual('Hello world!');
  });
});
