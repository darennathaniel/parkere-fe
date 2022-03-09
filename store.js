import {configureStore} from '@reduxjs/toolkit';

import isLoggedReducer from './slices/isLoggedSlice';
import carparksReducer from './slices/carparkSlice';

export default configureStore({
  reducer: {
    isLogged: isLoggedReducer,
    carparks: carparksReducer,
  },
});
