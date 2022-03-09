import {createSlice} from '@reduxjs/toolkit';

export const carparksSlice = createSlice({
  name: 'carparks',
  initialState: {
    data: [],
  },
  reducers: {
    setCarparks: (state, action) => {
      return {...action.payload};
    },
  },
});

export const {setCarparks} = carparksSlice.actions;

export default carparksSlice.reducer;
