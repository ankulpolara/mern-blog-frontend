// src/features/posts/postSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  posts: [],
  status: 'idle', // could be 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

// Create slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Reducer to set posts
    setPosts(state, action) {
      state.posts = action.payload;
    },
    // Reducer to handle loading status
    setLoading(state) {
      state.status = 'loading';
    },
    // Reducer to handle success
    setSuccess(state) {
      state.status = 'succeeded';
    },
    // Reducer to handle errors
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

// Export actions
export const { setPosts, setLoading, setSuccess, setError } = postSlice.actions;

// Export reducer
export default postSlice.reducer;
