import axios from 'axios';
const endpoint = 'http://110.238.104.188:4000';

export const AxiosInit = () => {
  try {
    return axios.create({
      baseURL: endpoint,
    });
  } catch (err) {
    console.error(err);
  }
};
