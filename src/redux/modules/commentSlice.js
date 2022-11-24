import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../api";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

// 코멘트 보기
export const __getComment = createAsyncThunk(
	"comment/getComment",
	async (payload, thunkAPI) => {
		try {
			const response = await axios.get(
				``,
				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
			);
			return thunkAPI.fulfillWithValue(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 코멘트 추가
export const __addComment = createAsyncThunk(
	"comment/addComment",
	async (payload, thunkAPI) => {
		try {
			await axios.post(
				`${serverUrl}/api/feed/${payload.id}/comment`,
				{
					commentContent: payload.content,
				},
				{
					headers: {
						Authorization: accessToken,
						"Refresh-Token": refreshToken,
					},
				},
				{
					withCredentials: true,
				},
			);
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 코멘트 수정
export const __editComment = createAsyncThunk(
	"comment/editComment",
	async (payload, thunkAPI) => {
		try {
			const response = await axios.put(
				`${serverUrl}/api/feed/${payload.feed_id}/comment?${payload.comment_id}=${payload.id}`,
				{
					headers: {
						Authorization: accessToken,
					},
				},
				{
					withCredentials: true,
				},
			);
			alert("수정 완료");
			window.history.back();
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			alert("수정 실패");
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 코멘트 삭제
export const __deleteComment = createAsyncThunk(
	"comment/deleteComment",
	async (payload, thunkAPI) => {
		console.log(payload);
		try {
			const response = await axios.delete(
				`${serverUrl}/api/feed/${payload.feedId}/comment?comment-id=${payload.commentId}`,
				{
					headers: {
						Authorization: accessToken,
					},
				},
				{
					withCredentials: true,
				},
			);
			alert("삭제 완료");
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			alert("삭제 실패");
			return thunkAPI.rejectWithValue(error);
		}
	},
);

const initialState = {
	commentList: [],
	isLoading: false,
	error: "",
};

const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {},
	extraReducers: {
		[__addComment.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__addComment.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.commentList?.push(action.payload);
		},
		[__addComment.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
		[__deleteComment.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__deleteComment.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.commentList = state.commentList?.filter(
				item => item.id !== action.payload,
			);
		},
		[__deleteComment.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
