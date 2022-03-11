import {AxiosInit} from '../../axios';
import {getToken} from '../common/authorization';

const parkereAxios = AxiosInit();

export const getReviews = carpark_id => {
  return parkereAxios.get('/review/getReviewByCarpark', {
    params: {
      carpark_id: carpark_id,
    },
  });
};

export const handleShow = async (setShow, setError) => {
  const token = await getToken();
  if (token) {
    setShow(true);
  } else {
    setError(true);
  }
};
