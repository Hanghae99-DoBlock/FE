import { configureStore } from "@reduxjs/toolkit";
import join from "../modules/joinSlice"
import modalSlice from "../modules/modal/modalSlice";
const store = configureStore({
  reducer: {
    join,
    modalSlice

  },
});

export default store;
