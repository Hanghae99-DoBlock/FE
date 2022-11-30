import { createSlice } from "@reduxjs/toolkit";
import {
	__addTodo,
	__getTodoList,
	__checkTodo,
	__updateTodo,
	__switchTodo,
	__deleteTodo,
} from "../middleware/todoListThunk";

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
			})

			// 투두 수정 성공
			.addCase(__updateTodo.fulfilled, (state, action) => {
				state.todoList = state.todoList.map(todoItem => {
					return todoItem.todoId === action.payload.todoId
						? action.payload
						: todoItem;
				});
			})

			// 투두 드래그 앤 드롭 성공
			.addCase(__switchTodo.fulfilled, (state, action) => {
				state.todoList = action.payload.todoList;
			})

			// 투두 삭제 성공
			.addCase(__deleteTodo.fulfilled, (state, action) => {
				state.todoList = state.todoList.filter(
					todoItem => todoItem.todoId !== action.payload,
				);
			});
	},
});

export const { updateSelectedDate, getTodoItem } = todoListSlice.actions;
export default todoListSlice.reducer;
