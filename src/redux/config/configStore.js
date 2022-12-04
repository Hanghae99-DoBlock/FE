import feed from "../modules/feed/feedSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import join from "../modules/join/joinSlice";
import todoListSlice from "../modules/todoList/todoListSlice";
import profileSlice from "../modules/profileSlice";
import toastSlice from "../modules/toastSlice";

const store = configureStore({
	reducer: {
		join,
		todoListSlice,
		feed,
		profileSlice,
		toastSlice,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;
