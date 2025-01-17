import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials(state, action) {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
    },

    logout(state, action) {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
  },
});

export default authSlice;
