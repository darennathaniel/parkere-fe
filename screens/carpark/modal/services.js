import {AxiosInit} from '../../../axios';
import {getToken} from '../../common/authorization';

const parkereAxios = AxiosInit();

export const handleSubmit = async data => {
  const token = await getToken();
  const response = await parkereAxios.post('/review/postReview', data, {
    headers: {
      'auth-token': token,
    },
  });
  console.log(response.data.data);
  return response.data.data;
};
