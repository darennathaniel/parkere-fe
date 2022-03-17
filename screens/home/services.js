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

export const alertRain = (
  dispatch,
  setFilteredCarparks,
  forecastAlert,
  currLocation,
) => {
  getWeather(currLocation.coords.latitude, currLocation.coords.longitude)
    .then(res => {
      const weather = {
        rain: ['Rain', 'Showers'],
        cloudy: ['Cloudy', 'Hazy', 'Windy', 'Mist'],
      };
      if (weather.rain.filter(e => res.forecast.includes(e)).length > 0) {
        forecastAlert(
          'It is raining! Let us find a sheltered carpark.',
          dispatch,
          setFilteredCarparks,
        );
      } else if (
        weather.cloudy.filter(e => res.forecast.includes(e)).length > 0
      ) {
        forecastAlert(
          'It is about to rain, Do you want to find a sheltered carpark?',
          dispatch,
          setFilteredCarparks,
        );
      }
    })
    .catch(err => console.log(err));
};
