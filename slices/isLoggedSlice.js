import {createSlice} from '@reduxjs/toolkit';

import jwt_decode from 'jwt-decode';

import {getFavorite} from './services';

export const isLoggedSlice = createSlice({
  name: 'isLogged',
  initialState: {
    value: false,
    name: '',
    email: '',
    favorites: [],
  },
  reducers: {
    setLogin: (state = initialState, action) => {
      const token = action.payload.token;
      let favorites = {favorite: []};
      getFavorite(token)
        .then(res => {
          favorites.favorite = res.data.data;
        })
        .catch(err => console.log(err));
      const decoded_token = jwt_decode(token);
      return {
        ...decoded_token,
        value: action.payload.value,
        ...favorites,
      };
    },
    setLogout: (state = initialState, action) => {
      return {...action.payload};
    },
  },
});

export const {setLogin, setLogout} = isLoggedSlice.actions;

export default isLoggedSlice.reducer;
