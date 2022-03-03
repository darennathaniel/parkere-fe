import {AxiosInit} from '../../axios';

const parkereAxios = AxiosInit();

export const handleRegister = data => {
  return parkereAxios.post('/user/register', data);
};
