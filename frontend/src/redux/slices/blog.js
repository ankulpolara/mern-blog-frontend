// src/features/posts/postSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    selectedCategory: "All",
    prevSelectedCategory: "",
    page: 1,
    totalPage: 1,
    query: "",
    

};

// Create slice
const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        // Reducer to set posts
        categoryChangeHandler(state, action) {
            // console.log(action.payload);
            state.prevSelectedCategory = state.selectedCategory
            state.selectedCategory = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload
        },
        setTotalPage(state, action) {
            state.totalPage = action.payload
        },
        setQuery(state, action) {
            state.query = action.payload
        }


    }
});

// Export actions
export const { categoryChangeHandler, setPage, setTotalPage, setQuery } = blogSlice.actions;

// Export reducer
export default blogSlice.reducer;
