import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../api";

export const __signUp = createAsyncThunk(
	"SIGN_UP",
	async (payload, thunkAPI) => {
		try {
			const { data } = await axios.post(
				`${serverUrl}/api/members/signup`,
				payload,
			);
			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.code);
		}
	},
);

export const __signIn = createAsyncThunk(
	"SIGN_IN",
	async (payload, thunkAPI) => {
		try {
			const data = await axios.post(`${serverUrl}/api/members/login`, payload);
			const accessToken = data.headers.authorization;
			const refreshToken = data.headers.refreshtoken;

			window.localStorage.setItem("accessToken", accessToken);
			window.localStorage.setItem("refreshToken", refreshToken);

			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.code);
		}
	},
);

export const __checkEmail = createAsyncThunk(
	"CHECK_EMAIL",
	async (payload, thunkAPI) => {
		try {
			const data = await axios.post(
				`${serverUrl}/api/members/checkmail`,
				payload,
			);
			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.code);
		}
	},
);

export const __checkNick = createAsyncThunk(
	"CHECK_NICKNAME",
	async (payload, thunkAPI) => {
		try {
			const data = await axios.post(
				`${serverUrl}/api/members/checkname`,
				payload,
			);
			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.code);
		}
	},
);

const initialState = {
	isLoading: false,
	isError: false,
	checkMailResult: "",
	checkNickResult: "",
};

const joinSliece = createSlice({
	name: "join",
	initialState,
	reducers: {},
	extraReducers: {
		[__checkEmail.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__checkEmail.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.checkMailResult = action.payload;
		},
		[__checkEmail.rejected]: (state, action) => {
			state.isLoading = false;
			state.checkMailResult = action.payload;
			state.isError = true;
		},
		[__checkNick.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__checkNick.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.checkNickResult = action.payload;
		},
		[__checkNick.rejected]: (state, action) => {
			state.isLoading = false;
			state.checkNickResult = action.payload;
			state.isError = true;
		},
	},
});

export const {} = joinSliece.actions;
export default joinSliece.reducer;
