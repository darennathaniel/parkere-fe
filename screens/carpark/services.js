import {AxiosInit} from '../../axios';
import {getToken} from '../common/authorization';
import {Linking} from 'react-native';
import axios from 'axios';

const parkereAxios = AxiosInit();

export const getReviews = carpark_id => {
  return parkereAxios.get('/review/getReviewByCarpark', {
    params: {
      carpark_id: carpark_id,
    },
  });
};

export const getAvailability = () => {
  return axios.get('https://api.data.gov.sg/v1/transport/carpark-availability');
};

export const handleShow = async (setShow, setError) => {
  const token = await getToken();
  if (token) {
    setShow(true);
  } else {
    setError(true);
  }
};

export const openMapDirection = (latitude, longitude) => {
  const url = Platform.select({
    ios: `comgooglemaps://?center=${latitude},${longitude}&q=${latitude},${longitude}&zoom=14&views=traffic"`,
    android: `geo://?q=${latitude},${longitude}`,
  });
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url = `https://www.google.de/maps/@${latitude},${longitude}`;
        return Linking.openURL(browser_url);
      }
    })
    .catch(() => {
      if (Platform.OS === 'ios') {
        Linking.openURL(`maps://?q=${latitude},${longitude}`);
      }
    });
};
