import React from 'react';
import Search from '../screens/search';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import store from '../fakeStore';

test('should output ACB', () => {
  const response = render(
    <Provider store={store}>
      <Search />
    </Provider>,
  );
  const park_number = 'ACB';
  const search_park_number = response.getByTestId('search_park_number');
  fireEvent.changeText(search_park_number, park_number);
  expect(response.getByTestId('carpark_text').props.children).toContain(
    park_number,
  );
});
