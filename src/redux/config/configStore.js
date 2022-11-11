import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../modules/modal/modalSlice";

const store = configureStore({
	reducer: { modalSlice },
});

export default store;
