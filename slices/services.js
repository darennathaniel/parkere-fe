import {AxiosInit} from '../axios';
import {getToken} from '../screens/common/authorization';

const parkereAxios = AxiosInit();

export const getFavorite = async () => {
  try {
    const token = await getToken();
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    const response = await parkereAxios.get('/fav/getFavoriteByUser', config);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const addFavorite = async carpark_id => {
  try {
    const token = await getToken();
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    const response = await parkereAxios.post(
      '/fav/setFavorite',
      {
        carpark_id: carpark_id,
      },
      config,
    );
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const delFavorite = async carpark_id => {
  try {
    const token = await getToken();
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    const response = await parkereAxios.post(
      '/fav/deleteFavorite',
      {
        carpark_id: carpark_id,
      },
      config,
    );
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
  }
};
