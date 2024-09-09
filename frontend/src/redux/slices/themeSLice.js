// src/features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
            // toast.success(`Switch To ${state.isDarkMode ? "Dark" : "Light"} Mode`)
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
