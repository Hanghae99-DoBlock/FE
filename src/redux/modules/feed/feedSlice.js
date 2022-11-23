import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../api";

const accessToken = localStorage.getItem("accessToken");

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

// 피드 단건 조회 Thunk
export const __getFeedItem = createAsyncThunk(
	"feed/getFeedItem",
	async (payload, thunkAPI) => {
		try {
			const response = await axios.get(`${serverUrl}/api/feed/${payload}`, {
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

const initialState = {
	feedList: [],
	checkedList: [],
	tagList: [],
	feedItem: {},
};

export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {
		choiceTodo: (state, action) => {
			if (action.payload.isChecked && state.checkedList.length < 3) {
				state.checkedList.push(action.payload.value);
			} else {
				state.checkedList = state.checkedList.filter(list => {
					return action.payload.value !== list;
				});
			}
		},
		deleteTodo: (state, action) => {
			state.checkedList = state.checkedList.filter(list => {
				return action.payload !== list;
			});
		},
		resetTodo: (state, action) => {
			state.checkedList = [];
		},
		addTag: (state, action) => {
			if (state.tagList.length < 3) {
				state.tagList.push(action.payload);
			} else {
				state.tagList = state.tagList.filter(tag => {
					return action.payload.value !== tag;
				});
			}
		},
		deleteTag: (state, action) => {
			state.tagList = state.tagList.filter((tag, index) => {
				return action.payload.id !== tag.id;
			});
		},
	},
	extraReducers: builder => {
		builder
			// 팔로잉 피드 조회 성공
			.addCase(__getFollowingFeeds.fulfilled, (state, action) => {
				state.feedList = action.payload;
			})
			// 추천 피드 조회 성공
			.addCase(__getRecommendedFeeds.fulfilled, (state, action) => {
				state.feedList = action.payload;
			})
			// 피드 단건 조회 성공
			.addCase(__getFeedItem.fulfilled, (state, action) => {
				state.feedItem = action.payload;
			});
	},
});

export const { choiceTodo, deleteTodo, resetTodo, addTag, deleteTag } =
	feedSlice.actions;
export default feedSlice.reducer;
