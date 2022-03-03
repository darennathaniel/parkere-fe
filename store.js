import {configureStore} from '@reduxjs/toolkit';

import isLoggedReducer from './slices/isLoggedSlice';

export default configureStore({
  reducer: {
    isLogged: isLoggedReducer,
  },
});
