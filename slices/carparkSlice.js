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
    setFilteredCarparks: (state = initialState, action) => {
      const filtered = state.data.filter(
        e => e.building_type !== 'SURFACE CAR PARK',
      );
      return {data: filtered};
    },
  },
});

export const {setCarparks, setFilteredCarparks} = carparksSlice.actions;

export default carparksSlice.reducer;
