import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../../api";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
axios.defaults.withCredentials = true;

const initialState = {
	todoList: [],
	selectedDate: {},
};

// 투두 업로드 Thunk
export const __addTodo = createAsyncThunk(
	"todo/addTodo",
	async (payload, thunkAPI) => {
		try {
<<<<<<< HEAD
			await axios.post(
				`${serverUrl}/api/todolist`,
				payload,
				{
					headers: { Authorization: accessToken },
				},
				{
					/*서로 다른 도메인(크로스 도메인)에 요청을 보낼 때 요청에 credential 정보를 담아서 보낼 지를 결정하는 항목*/
					withCredentials: true,
				},
			);

			return thunkAPI.fulfillWithValue(payload);
=======
			const response = await axios.post(`${serverUrl}/api/todolist`, payload, {
				headers: { Authorization: accessToken },
			});
			return thunkAPI.fulfillWithValue(response.data);
>>>>>>> d9b7bc5989a2551f0c5704c47b05a3995ccb68bf
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
			const { year, month, date } = payload;
			const intYear = parseInt(year);
			const intMonth = parseInt(month);
			const intDay = parseInt(date);
			const response = await axios.get(
				`${serverUrl}/api/todolist?year=${intYear}&month=${intMonth}&day=${intDay}`,
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

// 투두 체크 Thunk
export const __checkTodo = createAsyncThunk(
	"todo/checkTodo",
	async (todoItem, thunkAPI) => {
		try {
			const response = await axios.patch(
				`${serverUrl}/api/todolist/${todoItem.todoId}/completed`,
				// 401 에러 해결
				{
					withCredentials: true,
				},
				{
					headers: { Authorization: accessToken },
				},
			);
			return thunkAPI.fulfillWithValue(todoItem);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 투두리스트 슬라이스
export const todoListSlice = createSlice({
	name: "todoList",
	initialState,
	reducers: {
		// 날짜 선택
		updateSelectedDate: (state, action) => {
			state.selectedDate = {
				year: parseInt(action.payload.year),
				month: parseInt(action.payload.month),
				day: parseInt(action.payload.date),
			};
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

export const { updateSelectedDate } = todoListSlice.actions;
export default todoListSlice.reducer;
