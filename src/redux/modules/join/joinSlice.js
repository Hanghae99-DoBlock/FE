import {
	createAsyncThunk,
	createSlice,
	isRejected,
	TaskAbortError,
} from "@reduxjs/toolkit";
import axios from "axios";
import uuid from "react-uuid";
import { serverUrl } from "../../api";

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

			window.location.replace("/todoList");
			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
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
			return thunkAPI.rejectWithValue(e.response.status);
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
			return thunkAPI.rejectWithValue(e.response.status);
		}
	},
);

export const __kakaoLogin = createAsyncThunk(
	"KAKAO_LOGIN",
	async (payload, thunkAPI) => {
		try {
			const code = new URL(window.location.href).searchParams.get("code");
			const data = await axios.get(
				`${serverUrl}/api/members/login/kakao?code=${code}`,
			);
			const accessToken = data.headers.authorization;
			const refreshToken = data.headers.refreshtoken;
      
			window.localStorage.setItem("accessToken", accessToken);
			window.localStorage.setItem("refreshToken", refreshToken);
			window.alert("로그인 성공");
			window.location.replace("/todolist");

			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			window.alert("이미 가입된 이메일입니다");
			window.location.replace("/");
			return thunkAPI.rejectWithValue(e.response.status);
		}
	},
);

export const __naverLogin = createAsyncThunk(
	"KAKAO_LOGIN",
	async (payload, thunkAPI) => {
		try {
			const code = new URL(window.location.href).searchParams.get("code");
			const state = uuid();

			const data = await axios.get(
				`${serverUrl}/api/members/login/naver?code=${code}&state=${state}`,
			);
			const accessToken = data.headers.authorization;
			const refreshToken = data.headers.refreshtoken;

			window.localStorage.setItem("accessToken", accessToken);
			window.localStorage.setItem("refreshToken", refreshToken);
			window.alert("로그인 성공");
			window.location.replace("/todolist");

			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			window.alert("이미 가입된 이메일입니다");
			window.location.replace("/");
			return thunkAPI.rejectWithValue(e.response.status);
		}
	},
);

export const __googleLogin = createAsyncThunk(
	"KAKAO_LOGIN",
	async (payload, thunkAPI) => {
		try {
			const code = new URL(window.location.href).searchParams.get("code");
			const data = await axios.get(
				`${serverUrl}/api/members/login/google?code=${code}`,
			);
			const accessToken = data.headers.authorization;
			const refreshToken = data.headers.refreshtoken;

			window.localStorage.setItem("accessToken", accessToken);
			window.localStorage.setItem("refreshToken", refreshToken);
			window.alert("로그인 성공");
			window.location.replace("/todolist");

			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			window.alert("이미 가입된 이메일입니다");
			window.location.replace("/");
			return thunkAPI.rejectWithValue(e.response.status);
		}
	},
);

const initialState = {
	isLoading: false,
	isError: false,
	checkMailResult: "",
	checkNickResult: "",
	loginResult: "",
};

const joinSliece = createSlice({
	name: "join",
	initialState,
	reducers: {
		resetCheckNickname: (state, action) => {
			state.checkNickResult = "";
		},
		resetCheckEmail: (state, action) => {
			state.checkMailResult = "";
		},
	},
	extraReducers: {
		[__checkEmail.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__checkEmail.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.checkMailResult = action.payload.status;
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
			state.checkNickResult = action.payload.status;
		},
		[__checkNick.rejected]: (state, action) => {
			state.isLoading = false;
			state.checkNickResult = action.payload;
			state.isError = true;
		},
		[__signIn.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__signIn.fulfilled]: (state, action) => {
			state.loginResult = action.payload;
		},
		[__signIn.rejected]: (state, action) => {
			state.loginResult = action.payload;
		},
	},
});

export const { resetCheckNickname, resetCheckEmail } = joinSliece.actions;
export default joinSliece.reducer;
