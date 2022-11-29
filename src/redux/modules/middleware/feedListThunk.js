import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFollowingFeedsApi } from "../../../api/feedListApi";

// 팔로잉 피드 조회 Thunk
export const __getFollowingFeeds = createAsyncThunk(
	"feed/getFollowingFeeds",
	async (payload, thunkAPI) => {
		try {
			const { page } = thunkAPI.getState().feed;
			const response = await getFollowingFeedsApi(page);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
