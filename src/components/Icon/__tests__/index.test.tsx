import React    from 'react';
import renderer from 'react-test-renderer';

import Icon   from '../';


it('renders correctly', () => {
  const tree = renderer
    .create(<Icon iconName='home' noPadding />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

