import feed from "../modules/feed/feedSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import join from "../modules/join/joinSlice";
import todoListSlice from "../modules/todoList/todoListSlice";
import profileSlice from "../modules/profileSlice";

const store = configureStore({
	reducer: {
		join,
		todoListSlice,
		feed,
		profileSlice,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;
