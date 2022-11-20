import { createSlice } from "@reduxjs/toolkit";
import {
	__addTodo,
	__getTodoList,
	__checkTodo,
} from "./middleware/todoListThunk";

const initialState = {
	todoList: [],
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
	extraReducers: builder => {
		builder
			// 투두 업로드 성공
			.addCase(__addTodo.fulfilled, (state, action) => {
				state.todoList.push(action.payload);
			})

			// 투두리스트 조회 성공
			.addCase(__getTodoList.fulfilled, (state, action) => {
				state.todoList = action.payload;
			})
			// 투두리스트 조회 실패
			.addCase(__getTodoList.rejected, (state, action) => {
				state.todoList = [];
			})

			// 투두 체크 성공
			.addCase(__checkTodo.fulfilled, (state, action) => {
				state.todoList = state.todoList.map(todoItem => {
					return todoItem.todoId === action.payload.todoId
						? { ...todoItem, completed: !todoItem.completed }
						: todoItem;
				});
			});
	},
});

export const { updateSelectedDate, getTodoItem } = todoListSlice.actions;
export default todoListSlice.reducer;
