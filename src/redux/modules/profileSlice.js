import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../api";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

export const __editPassword = createAsyncThunk(
	"profile/editPassword",
	async (payload, thunkAPI) => {
		try {
			await axios.put(
				`${serverUrl}/profile/edit/${payload.id}/password`,
				payload,
			);
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 팔로우
export const __followThunk = createAsyncThunk(
	"profile/follow",
	async (payload, thunkAPI) => {
		try {
			const response = await axios.post(
				`${serverUrl}/api/members/profile/${payload}/follow`,
				{
					withCredentials: true,
				},
				{
					headers: {
						Authorization: accessToken,
						"Refresh-Token": refreshToken,
						"Content-Type": "multipart/form-data",
					},
				},
			);
			return thunkAPI.fulfillWithValue(response.data.data);
		} catch (error) {
			return console.log(error);
		}
	},
);

const updateProfile = payload => {
	console.log(payload);
	const frm = new FormData();
	frm.append("nickname", payload.nickname);
	frm.append("profileImage", payload.profileImage);
	frm.append("currentPassword", null);
	frm.append("password", null);
	frm.append("tagList", []);
	axios
		.put(
			`${serverUrl}/api/members/profile/edit`,
			frm,

			{
				headers: {
					Authorization: accessToken,
					"Refresh-Token": refreshToken,
					"Content-Type": "multipart/form-data",
				},
			},
			{
				withCredentials: true,
			},
		)
		.then(function a(response) {
			alert("수정되었습니다.");
			window.history.back();
		})
		.catch(function (error) {
			alert("알수없는 오류가 발생했습니다. 관리자에게 문의하세요.");
			console.log(error);
		});
};

// 유저 단일 조회
export const __getUser = createAsyncThunk(
	"user/getUsers",
	async (payload, thunkAPI) => {
		console.log(payload);
		try {
			const profile = await axios.get(
				`${serverUrl}/api/members/profile/${payload}`,
				{
					headers: { Authorization: accessToken },
				},
			);
			return thunkAPI.fulfillWithValue(profile.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 유저 전체 조회
export const __getUsers = createAsyncThunk(
	"user/getUsers",
	async (payload, thunkAPI) => {
		console.log(payload);
		try {
			const profile = await axios.get(
				`${serverUrl}/api/members/profile/${payload}/following`,
				{
					headers: { Authorization: accessToken },
				},
			);
			return thunkAPI.fulfillWithValue(profile.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

const initialState = {
	follow: false,
	profile: [],
	isLoading: false,
	error: "",
};

const profileSliece = createSlice({
	name: "profile",
	initialState,
	reducers: {
		updatePro: (state, action) => {
			updateProfile(action.payload);
		},
	},
	extraReducers: {
		[__getUser.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__getUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.profile = action.payload;
		},
		[__getUser.rejected]: (state, action) => {
			state.isLoading = false;
			state.checkMailResult = action.payload;
			state.isError = true;
		},
		[__followThunk.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__followThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.profile.followOrNot = !state.profile.followOrNot;
			state.profile.countFollower =
				state.profile.followOrNot === false
					? state.profile.countFollower - 1
					: state.profile.countFollower + 1;
		},
		[__followThunk.rejected]: (state, action) => {
			state.isLoading = false;
			state.checkMailResult = action.payload;
			state.isError = true;
		},
	},
});

export const { updatePro } = profileSliece.actions;
export default profileSliece.reducer;
