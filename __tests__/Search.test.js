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
  const container = response.getByTestId('scroll_view');
  const data = container.props.children[1].props.children[0].key;
  expect(data).toBe(park_number);
});

test('modal', () => {
  const response = render(
    <Provider store={store}>
      <Search />
    </Provider>,
  );
  const button = response.getByTestId('open_button');
  fireEvent.press(button);
  expect(response.getByTestId('modal'));
  const checkbox = response.getByTestId('checkbox_night_parking');
  let checked = checkbox.props.accessibilityState.checked;
  expect(checked).toBeFalsy();
  fireEvent(checkbox, 'onValueChange', true);
  checked = checkbox.props.accessibilityState.checked;
  expect(checked).toBeTruthy();
  const apply = response.getByTestId('apply');
  fireEvent.press(apply);
  expect(response.queryByTestId('modal')).toBeNull();
  const container = response.getByTestId('scroll_view');
  const data = container.props.children[1].props.children;
  data.forEach(e => expect(e.props.item.night_parking).toBe('YES'));
});
