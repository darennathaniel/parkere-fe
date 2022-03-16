import {Alert} from 'react-native';

export const forecastAlert = (message, dispatch, setFilteredCarparks) => {
  Alert.alert('Weather Forecast', message, [
    {
      text: 'Cancel',
      onPress: () => {},
    },
    {
      text: 'OK',
      onPress: () => {
        dispatch(setFilteredCarparks());
      },
    },
  ]);
};
