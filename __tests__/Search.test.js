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
  const scrollview = response.getByTestId('scroll_view');
  const data = scrollview.props.children[1].props.children[0].key;
  expect(data).toBe(park_number);
});

test('modal', () => {
  const response = render(
    <Provider store={store}>
      <Search />
    </Provider>,
  );
  const scrollview = response.getByTestId('scroll_view');
  const data = scrollview.props.children[1].props.children;
  const button = response.getByTestId('open_button');
  fireEvent.press(button);
  expect(response.getByTestId('modal'));
});
