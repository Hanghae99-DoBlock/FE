import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addTodoApi,
	updateTodoApi,
	getTodoListApi,
	checkTodoApi,
	swithTodoApi,
} from "../../../api/todoListApi";

// 투두 업로드 Thunk
export const __addTodo = createAsyncThunk(
	"todo/addTodo",
	async (payload, thunkAPI) => {
		try {
			const response = await addTodoApi(payload);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 투두 수정 Thunk
export const __updateTodo = createAsyncThunk(
	"todo/updateTodo",
	async (payload, thunkAPI) => {
		try {
			await updateTodoApi(payload);
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 투두리스트 조회 Thunk
export const __getTodoList = createAsyncThunk(
	"todo/getTodoList",
	async (payload, thunkAPI) => {
		try {
			const response = await getTodoListApi(payload);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 투두 체크 Thunk
export const __checkTodo = createAsyncThunk(
	"todo/checkTodo",
	async (todoItem, thunkAPI) => {
		try {
			await checkTodoApi(todoItem.todoId);
			return thunkAPI.fulfillWithValue(todoItem);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 드래그 앤 드롭 Thunk
export const __switchTodo = createAsyncThunk(
	"todo/switchTodo",
	async (payload, thunkAPI) => {
		try {
			await swithTodoApi(payload);
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
