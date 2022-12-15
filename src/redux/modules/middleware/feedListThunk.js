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
			const { lastFollowingFeedId } = thunkAPI.getState().feed;
			const response = await getFollowingFeedsApi(lastFollowingFeedId);
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
			const { lastRecommendedFeedId } = thunkAPI.getState().feed;
			const response = await getRecommendedFeedsApi(lastRecommendedFeedId);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 내 피드 조회 Thunk
export const __getMyFeeds = createAsyncThunk(
	"feed/getMyFeeds",
	async (memberId, thunkAPI) => {
		try {
			const { lastMyFeedId } = thunkAPI.getState().feed;
			const response = await getMyFeedsApi({ memberId, lastMyFeedId });
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 피드 삭제 Thunk
export const __deleteFeed = createAsyncThunk(
	"feed/deleteFeed",
	async (payload, thunkAPI) => {
		const response = await deleteFeedApi(payload);
		return thunkAPI.fulfillWithValue(payload);
	},
);
