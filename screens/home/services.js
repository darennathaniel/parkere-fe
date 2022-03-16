import {AxiosInit} from '../../axios';

const parkereAxios = AxiosInit();

export const getWeather = async (latitude, longitude) => {
  const response = await parkereAxios('/forecast/');
  const filtered = response.data.data.filter(
    e =>
      Math.abs(e.latitude - latitude) < 0.05 &&
      Math.abs(e.longitude - longitude) < 0.05,
  );
  return filtered[0];
};
