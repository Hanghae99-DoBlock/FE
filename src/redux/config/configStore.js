import { configureStore } from "@reduxjs/toolkit";
import join from "../modules/joinSlice";
import modalSlice from "../modules/modal/modalSlice";
import profileSlice from "../modules/profileSlice";
const store = configureStore({
	reducer: {
		join,
		modalSlice,
		profileSlice,
	},
});

export default store;
