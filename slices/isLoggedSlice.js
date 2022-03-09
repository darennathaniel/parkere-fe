import {createSlice} from '@reduxjs/toolkit';

export const isLoggedSlice = createSlice({
  name: 'isLogged',
  initialState: {
    value: false,
    name: '',
  },
  reducers: {
    setIsLogged: (state, action) => {
      return {...action.payload};
    },
  },
});

export const {setIsLogged} = isLoggedSlice.actions;

export default isLoggedSlice.reducer;
