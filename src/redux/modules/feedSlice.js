import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../api";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
axios.defaults.withCredentials = true;

const initialState = {
	feedList: [],
};

// 팔로잉 피드 조회 Thunk
export const __getFollowingFeeds = createAsyncThunk(
	"feed/getFollowingFeeds",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(`${serverUrl}/api/feed/following`, {
				headers: { Authorization: accessToken },
			});
			return thunkAPI.fulfillWithValue(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 추천 피드 조회 Thunk
export const __getRecommendedFeeds = createAsyncThunk(
	"feed/getRecommendedFeeds",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(`${serverUrl}/api/feed/recommended`, {
				headers: { Authorization: accessToken },
			});
			return thunkAPI.fulfillWithValue(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

// 피드 슬라이스
export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// 팔로잉 피드 조회 성공
			.addCase(__getFollowingFeeds.fulfilled, (state, action) => {
				state.feedList = action.payload;
			})
			// 추천 피드 조회 성공
			.addCase(__getRecommendedFeeds.fulfilled, (state, action) => {
				state.feedList = action.payload;
			});
	},
});

export const {} = feedSlice.actions;
export default feedSlice.reducer;
