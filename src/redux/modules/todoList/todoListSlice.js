import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../../api";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const initialState = {
	todoList: [],
};

// 투두 업로드 Thunk
export const __addTodo = createAsyncThunk(
	"todo/addTodo",
	async (payload, thunkAPI) => {
		try {
			await axios.post(`${serverUrl}/api/todolist`, payload, {
				headers: { Authorization: accessToken },
			});
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
			const response = await axios.get(
				`${serverUrl}/api/todolist?year=2022&month=11&day=14`,
				{
					headers: { Authorization: accessToken },
				},
			);
			return thunkAPI.fulfillWithValue(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 투두리스트 슬라이스
export const todoListSlice = createSlice({
	name: "todoList",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// 투두 업로드 성공
			.addCase(__addTodo.fulfilled, (state, action) => {
				state.todoList.push(action.payload);
			})

			// 투두리스트 조회 성공
			.addCase(__getTodoList.fulfilled, (state, action) => {
				console.log("action.payload", action.payload);
				state.todoList = action.payload;
			});
	},
});

export const {} = todoListSlice.actions;
export default todoListSlice.reducer;
