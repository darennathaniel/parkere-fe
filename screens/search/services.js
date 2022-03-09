import {AxiosInit} from '../../axios';

const parkereAxios = AxiosInit();

export const getAllCarpark = () => {
  return parkereAxios.get('/carpark/getAllCarpark');
};

export const getCarpark = () => {
  return parkereAxios.get('/carpark/getCarpark');
};
