import axios from 'axios';
const endpoint = 'http://localhost:4000';

export const AxiosInit = () => {
  try {
    return axios.create({
      baseURL: endpoint,
    });
  } catch (err) {
    console.error(err);
  }
};
