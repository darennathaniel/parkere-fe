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

export const openMapDirection = (latitude, longitude, label) => {
  // const url = Platform.select({
  //   ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
  //   android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
  // });
  // Linking.openURL(url);
  Linking.openURL(
    Platform.OS === 'ios'
      ? `googleMaps://app?saddr=${latitude}+${longitude}&daddr=${latitude}+${longitude}`
      : `google.navigation:q=${latitude}+${longitude}`,
  );
};
