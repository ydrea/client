import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './rtk/gallerySlice';
import authReducer from './rtk/authSlice';

//
export const store = configureStore({
  reducer: {
    galery: galleryReducer,
    auth: authReducer,
  },
});
