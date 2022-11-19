import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import join from "../modules/joinSlice";
import todoListSlice from "../modules/todoListSlice";
import profileSlice from "../modules/profileSlice";

const store = configureStore({
	reducer: {
		join,
		todoListSlice,
		profileSlice,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;
