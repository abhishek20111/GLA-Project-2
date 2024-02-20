import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSilce.js';

const store = configureStore({
  reducer: {
    userData: userReducer,
  },
});

export default store;
