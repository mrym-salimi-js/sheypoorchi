import { configureStore } from '@reduxjs/toolkit';
import newAdReducer from './newAdSlice';

export const store = configureStore({
  reducer: {
    newAd: newAdReducer, // Register the reducer
  },
});

export default store;
