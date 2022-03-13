import {AxiosInit} from '../axios';

const parkereAxios = AxiosInit();

export const getFavorite = token => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  return parkereAxios.get('/fav/getFavoriteByUser', config);
};
