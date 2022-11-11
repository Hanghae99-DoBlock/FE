import { configureStore } from "@reduxjs/toolkit";
import join from "../modules/joinSlice"

const store = configureStore({
  reducer: {
    join

  },
});

export default store;
