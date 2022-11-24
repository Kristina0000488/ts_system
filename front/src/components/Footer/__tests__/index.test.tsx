import React    from 'react';
import renderer from 'react-test-renderer';

import Footer   from '../';


it('renders correctly', () => {
  const tree = renderer
    .create(<Footer content={[ { text: 'Hello world' } ]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
