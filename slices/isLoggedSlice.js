import {createSlice} from '@reduxjs/toolkit';

export const isLoggedSlice = createSlice({
  name: 'isLogged',
  initialState: {
    value: false,
  },
  reducers: {
    setIsLogged: (state, action) => {
      state.value = action.payload.value;
    },
  },
});

export const {setIsLogged} = isLoggedSlice.actions;

export default isLoggedSlice.reducer;
