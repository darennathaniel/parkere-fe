import {AxiosInit} from '../../axios';

const parkereAxios = AxiosInit();

export const getAllCarpark = location => {
  return parkereAxios.get('/carpark/getAllCarpark', {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
  });
};

export const getCarpark = () => {
  return parkereAxios.get('/carpark/getCarpark');
};

export const handleChangeText = (e, setFilter) => {
  setFilter(e);
};

export const filterCarpark = (
  carparks,
  filterNo,
  filterAddr,
  filterFree,
  filterNight,
  filterBasement,
  filterShort,
  filterDistance,
) => {
  if (filterDistance) {
    const newArray = [...carparks].sort((a, b) => a.distance - b.distance);
    return newArray.filter(
      carpark =>
        carpark.park_address.toLowerCase().includes(filterAddr.toLowerCase()) &&
        carpark.park_number.toLowerCase().includes(filterNo.toLowerCase()) &&
        (filterNight === null || !filterNight
          ? carpark.night_parking.includes('YES') ||
            carpark.night_parking.includes('NO')
          : carpark.night_parking.includes(filterNight ? 'YES' : 'NO')) &&
        (filterFree === null || !filterFree
          ? /[a-z]/i.test(carpark.free_parking)
          : filterFree
          ? !carpark.free_parking.includes('NO')
          : carpark.free_parking.includes('NO')) &&
        (filterBasement === null || !filterBasement
          ? carpark.carpark_basement.includes('Y') ||
            carpark.carpark_basement.includes('N')
          : carpark.carpark_basement.includes(filterBasement ? 'Y' : 'N')) &&
        (filterShort === null || !filterShort
          ? /[a-z]/i.test(carpark.short_term)
          : filterShort
          ? !carpark.short_term.includes('NO')
          : carpark.short_term.includes('NO')),
    );
  } else {
    return carparks.filter(
      carpark =>
        carpark.park_address.toLowerCase().includes(filterAddr.toLowerCase()) &&
        carpark.park_number.toLowerCase().includes(filterNo.toLowerCase()) &&
        (filterNight === null || !filterNight
          ? carpark.night_parking.includes('YES') ||
            carpark.night_parking.includes('NO')
          : carpark.night_parking.includes(filterNight ? 'YES' : 'NO')) &&
        (filterFree === null || !filterFree
          ? /[a-z]/i.test(carpark.free_parking)
          : filterFree
          ? !carpark.free_parking.includes('NO')
          : carpark.free_parking.includes('NO')) &&
        (filterBasement === null || !filterBasement
          ? carpark.carpark_basement.includes('Y') ||
            carpark.carpark_basement.includes('N')
          : carpark.carpark_basement.includes(filterBasement ? 'Y' : 'N')) &&
        (filterShort === null || !filterShort
          ? /[a-z]/i.test(carpark.short_term)
          : filterShort
          ? !carpark.short_term.includes('NO')
          : carpark.short_term.includes('NO')),
    );
  }
};
