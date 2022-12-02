import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../../api";
import axios from "axios";

import {
	__getFollowingFeeds,
	__getRecommendedFeeds,
	__deleteFeed,
} from "../middleware/feedListThunk";

const accessToken = localStorage.getItem("accessToken");

export const __getSuccessTodo = createAsyncThunk(
	"SUCCESS_TODO",
	async (payload, thunkAPI) => {
		try {
			const { year, month, date } = payload;
			const intYear = parseInt(year);
			const intMonth = parseInt(month);
			const intDay = parseInt(date);
			const { data } = await axios.get(
				`${serverUrl}/api/feed?year=${intYear}&month=${intMonth}&day=${intDay}`,

				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
			);
			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.code);
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

export const __uploadFeed = createAsyncThunk(
	"UPLOAD_FEED",
	async (payload, thunkAPI) => {
		try {
			const {
				feedTitle,
				todoIdList,
				feedContent,
				feedImageList,
				tagList,
				feedColor,
			} = payload;

			const frm = new FormData();
			frm.append("todoIdList", todoIdList);
			frm.append("feedTitle", feedTitle);
			frm.append("feedContent", feedContent);
			for (let i = 0; i < feedImageList.length; i++) {
				frm.append("feedImageList", feedImageList[i]);
			}

			frm.append("feedColor", feedColor);
			frm.append("tagList", tagList);
			const { data } = await axios.post(
				`${serverUrl}/api/feed`,
				frm,

				{
					headers: { Authorization: accessToken },
					"Content-Type": "multipart/form-data",
				},
				{
					withCredentials: true,
				},
			);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.code);
		}
	},
);

export const __SearchTagAndMember = createAsyncThunk(
	"SEARCH",
	async (payload, thunkAPI) => {
		try {
			const { keyword, category } = payload;
			const { data } = await axios.get(
				`${serverUrl}/api/search?keyword=${keyword}&category=${category}`,
				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
				payload,
			);
			return thunkAPI.fulfillWithValue({ data: data, category: category });
		} catch (e) {
			return thunkAPI.rejectWithValue(e.code);
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
					},
				},
				{
					withCredentials: true,
				},
			);
			window.location.replace(`/feed/${payload.feedId}`);
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
		try {
			await axios.delete(
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
			window.location.replace(`/feed/${payload.feedId}`);
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			alert("삭제 실패");
			return thunkAPI.rejectWithValue(error);
		}
	},
);

const initialState = {
	followingFeedList: [],
	recommendedFeedList: [],
	checkedList: [],
	tagList: [],
	photoList: [],
	formPhotoList: [],
	successTodo: [],
	feedItem: {},
	isLoading: "",
	searchTag: "",
	searchMember: "",
	commentList: [],
	followingFeedPageNum: 0,
	recommendedFeedPageNum: 0,
	isNextFollowingFeedPageExist: true,
	isNextRecommendedFeedPageExist: true,
};

export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {
		choiceTodo: (state, action) => {
			if (action.payload.isChecked && state.checkedList.length < 3) {
				state.checkedList.push(action.payload);
			} else if (action.payload.isChecked === false) {
				state.checkedList = state.checkedList.filter(list => {
					return action.payload.todoContent !== list.todoContent;
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
		addPhoto: (state, action) => {
			if (state.photoList.length < 4) state.photoList.push(action.payload);
		},
		deletePhoto: (state, action) => {
			state.photoList = state.photoList.filter((photo, index) => {
				return photo.id !== action.payload.id;
			});
		},
		addFormPhoto: (state, action) => {
			state.formPhotoList.push(action.payload);
		},
		updateFeedItem: (state, action) => {
			state.feedItem = {
				...state.feedItem,
				followOrNot: !state.feedItem.followOrNot,
			};
		},
		updateIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			//피드 업로드

			.addCase(__uploadFeed.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(__uploadFeed.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			//피드 업로드 실패
			.addCase(__uploadFeed.rejected, (state, action) => {})
			//완료된 피드 목록 불러오기
			.addCase(__getSuccessTodo.fulfilled, (state, action) => {
				state.successTodo = action.payload;
			})
			// 피드 삭제
			.addCase(__deleteFeed.fulfilled, (state, action) => {
				state.followingFeedList = state.followingFeedList.filter(
					feedItem => feedItem.feedId !== action.payload,
				);
				state.isLoading = false;
			})
			// 팔로잉 피드 조회 성공
			.addCase(__getFollowingFeeds.fulfilled, (state, action) => {
				state.followingFeedList.push(...action.payload);
				state.followingFeedPageNum += 1;
				if (action.payload.length < 5) {
					state.isNextFollowingFeedPageExist = false;
				}
			})
			// 추천 피드 조회 성공
			.addCase(__getRecommendedFeeds.fulfilled, (state, action) => {
				state.recommendedFeedList.push(...action.payload);
				state.recommendedFeedPageNum += 1;
				if (action.payload.length < 5) {
					state.isNextRecommendedFeedPageExist = false;
				}
			})
			// 피드 단건 조회 성공
			.addCase(__getFeedItem.fulfilled, (state, action) => {
				state.feedItem = action.payload;
			})
			.addCase(__SearchTagAndMember.fulfilled, (state, action) => {
				{
					action.payload.category === "feed"
						? (state.searchTag = action.payload.data)
						: (state.searchMember = action.payload.data);
				}
			})
			.addCase(__addComment.fulfilled, (state, action) => {
				state.feedItem.commentResponseDtoList = action.payload;
				state.feedItem.countComment = action.payload;
				state.commentList?.push(action.payload);
			})
			.addCase(__deleteComment.fulfilled, (state, action) => {
				state.commentList = state.commentList?.filter(item => {
					return item !== action.payload;
				});
			});
	},
});
export const {
	choiceTodo,
	deleteTodo,
	resetTodo,
	addTag,
	deleteTag,
	addPhoto,
	deletePhoto,
	addFormPhoto,
	updateFeedItem,
	updateIsLoading,
} = feedSlice.actions;
export default feedSlice.reducer;
