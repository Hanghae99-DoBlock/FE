import feed from "../modules/feed/feedSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import join from "../modules/join/joinSlice";
import todoListSlice from "../modules/todoList/todoListSlice";
import profileSlice from "../modules/profileSlice";
import commentSlice from "../modules/commentSlice";

const store = configureStore({
	reducer: {
		join,
		todoListSlice,
		feed,
		profileSlice,
		commentSlice,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;
