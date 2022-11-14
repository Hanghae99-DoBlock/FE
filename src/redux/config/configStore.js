import { configureStore } from "@reduxjs/toolkit";
import join from "../modules/join/joinSlice";
import modalSlice from "../modules/modal/modalSlice";
const store = configureStore({
	reducer: {
		join,
		modalSlice,
	},
});

export default store;
