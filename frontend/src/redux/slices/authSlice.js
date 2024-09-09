import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Initial state

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    isPopUpOpen: false,
    popupType: null, // 'logout' or 'delete'
};


// Create slice 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("isLoggedIn", "true");
            console.log("everything is done.");
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            localStorage.clear();
            toast.success("Logged out Successfully.");
           
        },
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setProfileImage(state, action) {
            state.user.ImageURL = action.payload;
        },
        togglePopUp(state) {
            state.isPopUpOpen = !state.isPopUpOpen;
        },
        setPopupType(state, action) {
            state.popupType = action.payload;
        },
        deleteAccount(state, action) {
            // Implement delete account logic here
            action?.payload?.navigate("/");
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            localStorage.clear();
            toast.success("Account deleted successfully.");


        },
    },
});

// Export actions
export const { login, logout, setProfileImage, setUser, setToken, togglePopUp, setPopupType, deleteAccount } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
