import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	todoItem: {},
	selectedDate: {},
};

export const todoListSlice = createSlice({
	name: "todoList",
	initialState,
	reducers: {
		// 날짜 선택
		updateSelectedDate: (state, action) => {
			state.selectedDate = action.payload;
		},
		// 투두 단건 조회
		getTodoItem: (state, action) => {
			state.todoItem = action.payload;
		},
	},
	extraReducers: {},
});

export const { updateSelectedDate, getTodoItem } = todoListSlice.actions;
export default todoListSlice.reducer;
