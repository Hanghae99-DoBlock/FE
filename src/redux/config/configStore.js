import { configureStore } from "@reduxjs/toolkit";
import join from "../modules/joinSlice";
import modalSlice from "../modules/modal/modalSlice";
import todoListSlice from "../modules/todoList/todoListSlice";

const store = configureStore({
	reducer: {
		join,
		modalSlice,
		todoListSlice,
	},
});

export default store;
