import {createSlice} from '@reduxjs/toolkit';

import jwt_decode from 'jwt-decode';

export const isLoggedSlice = createSlice({
  name: 'isLogged',
  initialState: {
    value: false,
    name: '',
    email: '',
    favorite: [],
  },
  reducers: {
    setLogin: (state = initialState, action) => {
      const token = action.payload.token;
      const decoded_token = jwt_decode(token);
      return {
        ...decoded_token,
        value: action.payload.value,
        favorite: action.payload.favorite,
      };
    },
    setLogout: (state = initialState, action) => {
      return {...action.payload};
    },
    setFavorite: (state = initialState, action) => {
      return {...state, favorite: [...action.payload.favorite]};
    },
  },
});

export const {setLogin, setLogout, setFavorite} = isLoggedSlice.actions;

export default isLoggedSlice.reducer;
