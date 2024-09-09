// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from "./slices/themeSLice"
import postReducer from "./slices/postSlice"
import blogReducer from "./slices/blog"

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    posts: postReducer, 
    blog :blogReducer
  },
});

export default store;
