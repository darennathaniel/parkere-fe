import axios from 'axios';
import {AxiosInit} from '../../axios';

const parkereAxios = AxiosInit();

export const handleLogin = data => {
  return parkereAxios.post('/user/login', data);
};
