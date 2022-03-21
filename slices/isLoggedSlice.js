import {createSlice} from '@reduxjs/toolkit';

import jwt_decode from 'jwt-decode';

export const isLoggedSlice = createSlice({
  name: 'isLogged',
  initialState: {
    value: false,
    name: '',
    email: '',
    favorite: [],
    location: {
      lat: 0,
      lng: 0,
    },
  },
  reducers: {
    setLogin: (state = initialState, action) => {
      const token = action.payload.token;
      const decoded_token = jwt_decode(token);
      return {
        ...state,
        ...decoded_token,
        value: action.payload.value,
        favorite: action.payload.favorite,
      };
    },
    setLogout: (state = initialState, action) => {
      return {...action.payload, location: {...state.location}};
    },
    setFavorite: (state = initialState, action) => {
      return {...state, favorite: [...action.payload.favorite], ...state};
    },
    setLocation: (state = initialState, action) => {
      return {...state, ...action.payload};
    },
  },
});

export const {setLogin, setLogout, setFavorite, setLocation} =
  isLoggedSlice.actions;

export default isLoggedSlice.reducer;
