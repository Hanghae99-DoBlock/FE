import { configureStore } from "@reduxjs/toolkit";
import join from "../modules/joinSlice";
import modalSlice from "../modules/modal/modalSlice";
import profileSlice from "../modules/profileSlice";
import todoListSlice from "../modules/todoList/todoListSlice";

const store = configureStore({
	reducer: {
		join,
		modalSlice,
		profileSlice,
		todoListSlice,
	},
});

export default store;
