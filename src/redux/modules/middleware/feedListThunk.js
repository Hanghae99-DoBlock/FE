import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getFollowingFeedsApi,
	getRecommendedFeedsApi,
	deleteFeedApi,
	getMyFeedsApi,
} from "../../../api/feedListApi";

// 팔로잉 피드 조회 Thunk
export const __getFollowingFeeds = createAsyncThunk(
	"feed/getFollowingFeeds",
	async (payload, thunkAPI) => {
		try {
			const { followingFeedPageNum } = thunkAPI.getState().feed;
			const response = await getFollowingFeedsApi(followingFeedPageNum);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 추천 피드 조회 Thunk
export const __getRecommendedFeeds = createAsyncThunk(
	"feed/getRecommendedFeeds",
	async (payload, thunkAPI) => {
		try {
			const { recommendedFeedPageNum } = thunkAPI.getState().feed;
			const response = await getRecommendedFeedsApi(recommendedFeedPageNum);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 내 피드 조회 Thunk
export const __getMyFeeds = createAsyncThunk(
	"feed/getMyFeeds",
	async (payload, thunkAPI) => {
		try {
			const { myFeedPageNum } = thunkAPI.getState().feed;
			const request = { memberId: payload, page: myFeedPageNum };
			const response = await getMyFeedsApi(request);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 피드 삭제 Thunk
export const __deleteFeed = createAsyncThunk(
	"feed/deleteFeed",
	(payload, thunkAPI) => {
		deleteFeedApi(payload);
		return thunkAPI.fulfillWithValue(payload);
	},
);
