import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../api";

const accessToken = localStorage.getItem("accessToken");

const charToUnicode = function (str) {
	if (!str) return false; // Escaping if not exist
	var unicode = "";
	for (var i = 0, l = str.length; i < l; i++) {
		unicode += "\\" + str[i].charCodeAt(0).toString(16);
	}
	return unicode;
};

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
	frm.append("profileImage", payload.profileImage);
	frm.append("tagList", []);
	axios
		.patch(
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
			window.location.replace(`/profile/${payload.id}`);
		})
		.catch(function (error) {
			alert("알수없는 오류가 발생했습니다. 관리자에게 문의하세요.");
			console.log(error);
		});
};

export const __getUsers = createAsyncThunk(
	"user/getUsers",
	async (payload, thunkAPI) => {
		console.log(payload);
		try {
			const products = await axios.get(
				`${serverUrl}/api/members/profile/${payload}`,
				{
					headers: { Authorization: accessToken },
				},
			);
			return thunkAPI.fulfillWithValue(products.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

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
		[__getUsers.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__getUsers.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.profile = action.payload;
		},
		[__getUsers.rejected]: (state, action) => {
			state.isLoading = false;
			state.checkMailResult = action.payload;
			state.isError = true;
		},
	},
});

export const { updatePro } = profileSliece.actions;
export default profileSliece.reducer;
