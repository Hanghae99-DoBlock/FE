import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import join from "../modules/joinSlice";
import modalSlice from "../modules/modal/modalSlice";
import todoListSlice from "../modules/todoList/todoListSlice";
import profileSlice from "../modules/profileSlice";

const store = configureStore({
	reducer: {
		join,
		modalSlice,
		todoListSlice,
		profileSlice,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;
