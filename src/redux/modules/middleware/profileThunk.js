import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	resetProfileTagsApi,
	updateProfileTagsApi,
} from "../../../api/profileApi";

// 관심사 태그 업데이트 Thunk
export const __updateProfileTags = createAsyncThunk(
	"profile/updateProfileTags",
	async (payload, thunkAPI) => {
		try {
			const response = await updateProfileTagsApi(payload);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
// 관심사 태그 리셋 Thunk
export const __resetProfileTags = createAsyncThunk(
	"profile/resetProfileTags",
	async (payload, thunkAPI) => {
		try {
			const response = await resetProfileTagsApi();
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
