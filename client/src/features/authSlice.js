import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  logoutTimestamp: null, // Track when user logged out
}; 

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
        // Always allow explicit login - clear any logout timestamp
        localStorage.removeItem('logoutTimestamp');
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.logoutTimestamp = null;
    },
    userLoggedOut:(state) => {
        state.user = null;
        state.isAuthenticated = false;
        const logoutTime = Date.now();
        state.logoutTimestamp = logoutTime;
        // Store in localStorage to persist across refreshes
        localStorage.setItem('logoutTimestamp', logoutTime.toString());
    }
  },
});

export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;
