import {AxiosInit} from '../../axios';

const parkereAxios = AxiosInit();

export const getAllCarpark = () => {
  return parkereAxios.get('/carpark/getAllCarpark');
};

export const getCarpark = () => {
  return parkereAxios.get('/carpark/getCarpark');
};

export const handleChangeText = (e, setFilter) => {
  setFilter(e);
};

export const filterCarpark = (carparks, filterNo, filterAddr) => {
  return carparks.filter(
    carpark =>
      carpark.park_address.toLowerCase().includes(filterAddr.toLowerCase()) &&
      carpark.park_number.toLowerCase().includes(filterNo.toLowerCase()),
  );
};
