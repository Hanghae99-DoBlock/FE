<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import join from "../modules/join/joinSlice";
import modalSlice from "../modules/modal/modalSlice";
import todoListSlice from "../modules/todoList/todoListSlice";
import feed from "../modules/feed/feedSlice";
=======
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import join from "../modules/joinSlice";
import modalSlice from "../modules/modal/modalSlice";
import todoListSlice from "../modules/todoList/todoListSlice";
import profileSlice from "../modules/profileSlice";
>>>>>>> d9b7bc5989a2551f0c5704c47b05a3995ccb68bf

const store = configureStore({
	reducer: {
		join,
		modalSlice,
		todoListSlice,
<<<<<<< HEAD
		feed,
=======
		profileSlice,
>>>>>>> d9b7bc5989a2551f0c5704c47b05a3995ccb68bf
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;
