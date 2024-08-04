import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      // console.log("Updated action.payload.user: ", action.payload.user);
      state.currentUser = action.payload.user;
    },
    loginSuccess: (state, action) => {
      // console.log("loginSuccess action.payload.user:", action.payload.user);
      state.currentUser = action.payload.user;
      localStorage.setItem("foodlicous-app-token", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("foodlicous-app-token");
    },
  },
});

export const {updateUser, loginSuccess, logout} = userSlice.actions;

export default userSlice.reducer;
