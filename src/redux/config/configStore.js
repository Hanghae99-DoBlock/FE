import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;
