import { configureStore } from "@reduxjs/toolkit";
import join from "../modules/join/joinSlice";
import modalSlice from "../modules/modal/modalSlice";
import todoListSlice from "../modules/todoList/todoListSlice";
import feed from "../modules/feed/feedSlice";

const store = configureStore({
	reducer: {
		join,
		modalSlice,
		todoListSlice,
		feed,
	},
});

export default store;
