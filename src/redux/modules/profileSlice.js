import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../api";

export const __checkPassWord = createAsyncThunk(
	"profile/checkPassword",
	async (payload, thunkAPI) => {
		try {
			console.log(payload);
			await axios.patch(
				// `${serverUrl}/api/members/profile/edit/password`,
				`${serverUrl}/api/members/profile/edit/password`,
				payload,
			);
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
const updateProfile = payload => {
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	console.log(payload);
	const frm = new FormData();
	frm.append("nickname", payload.nickname);
	frm.append("file", payload.file);
	axios
		.patch(`http://localhost:3001/profile/1`, frm, {
			headers: {
				Authorization: accessToken,
				"Refresh-Token": refreshToken,
				"Content-Type": "multipart/form-data",
				// "Content-Type": "application/json",
			},
		})
		.then(function a(response) {
			alert("수정되었습니다.");
			window.location.replace("/profile/1");
		})
		.catch(function (error) {
			alert("알수없는 오류가 발생했습니다. 관리자에게 문의하세요.");
			console.log(error);
		});
};

const initialState = {
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
		[__checkPassWord.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__checkPassWord.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.checkMailResult = action.payload;
		},
		[__checkPassWord.rejected]: (state, action) => {
			state.isLoading = false;
			state.checkMailResult = action.payload;
			state.isError = true;
		},
	},
});

export const { updatePro } = profileSliece.actions;
export default profileSliece.reducer;
