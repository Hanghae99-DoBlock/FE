import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { serverUrl } from "../../api";
import axios from "axios";

import {
	__getFollowingFeeds,
	__getRecommendedFeeds,
	__deleteFeed,
	__getMyFeeds,
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
			const data = await axios.post(
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
			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e);
		}
	},
);

export const __updateFeed = createAsyncThunk(
	"UPDATE_FEED",
	async (payload, thunkAPI) => {
		try {
			const { feedTitle, feedContent, tagList, feedColor, id } = payload;
			const data = await axios.patch(
				`${serverUrl}/api/feed/${id}`,
				{ feedTitle, feedContent, feedColor, tagList },
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

export const __searchTagAndMember = createAsyncThunk(
	"SEARCH",
	async (payload, thunkAPI) => {
		try {
			const { keyword, category } = payload;
			const { tagSearchPageNum, memberSearchPageNum } =
				thunkAPI.getState().feed;

			let page;

			if (category === "feed") {
				page = tagSearchPageNum;
			} else {
				page = memberSearchPageNum;
			}

			const data = await axios.get(
				`${serverUrl}/api/search?keyword=${keyword}&category=${category}&page=${page}`,
				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
				payload,
			);
			return thunkAPI.fulfillWithValue({
				keyword: keyword,
				data: data.data,
				category: category,
				status: data.status,
			});
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	},
);

export const __infinitySearchTag = createAsyncThunk(
	"INFINITE_SCROLL_SEARCH_TAG",
	async (payload, thunkAPI) => {
		try {
			const { keyword, category } = payload;
			const { infiniteTagNumber } = thunkAPI.getState().feed;

			let page;

			page = infiniteTagNumber;

			const { data } = await axios.get(
				`${serverUrl}/api/search?keyword=${keyword}&category=${category}&page=${page}`,
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
			return thunkAPI.rejectWithValue(e.response.status);
		}
	},
);
export const __infinitySearchMember = createAsyncThunk(
	"INFINITE_SCROLL_SEARCH__MEMBER",
	async (payload, thunkAPI) => {
		try {
			const { keyword, category } = payload;
			const { infiniteTagNumber, infiniteMemberNumber } =
				thunkAPI.getState().feed;

			let page;

			page = infiniteMemberNumber;

			const { data } = await axios.get(
				`${serverUrl}/api/search?keyword=${keyword}&category=${category}&page=${page}`,
				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
				payload,
			);
			return thunkAPI.fulfillWithValue({
				data: data,
				category: category,
			});
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.status);
		}
	},
);

// 리액션 추가
export const __updateReactions = createAsyncThunk(
	"feed/updateReactions",
	async (payload, thunkAPI) => {
		try {
			await axios.post(
				`${serverUrl}/api/feed/${payload.feedId}/reaction`,
				{
					reactionType: payload.reactionType,
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
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 리액션 수정
export const __editReactions = createAsyncThunk(
	"feed/editReactions",
	async (payload, thunkAPI) => {
		try {
			await axios.patch(
				`${serverUrl}/api/feed/${payload.feedId}/reaction`,
				{
					reactionType: payload.reactionType,
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
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
// 리액션 삭제
export const __removeReactions = createAsyncThunk(
	"feed/removeReactions",
	async (payload, thunkAPI) => {
		try {
			await axios.delete(
				`${serverUrl}/api/feed/${payload.feedId}/reaction`,
				{
					headers: {
						Authorization: accessToken,
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
// 리액션 리스트
export const __getReactions = createAsyncThunk(
	"feed/getReactions",
	async (payload, thunkAPI) => {
		try {
			const response = await axios.get(
				`${serverUrl}/api/feed/${payload}/reaction-list`,
				{
					headers: {
						Authorization: accessToken,
					},
				},
				{
					withCredentials: true,
				},
			);
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

const initialState = {
	followingFeedList: [],
	recommendedFeedList: [],
	myFeedList: [],
	checkedList: [],
	tagList: [],
	photoList: [],
	formPhotoList: [],
	successTodo: [],
	feedItem: {},
	isLoading: "",
	searchTag: [],
	searchMember: [],
	commentList: [],
	followingFeedPageNum: 0,
	recommendedFeedPageNum: 0,
	myFeedPageNum: 0,
	isNextFollowingFeedPageExist: true,
	isNextRecommendedFeedPageExist: true,
	isNextmyFeedPageExist: true,
	searchKeyword: null,
	tagSearchPageNum: 0,
	memberSearchPageNum: 0,
	infiniteTagNumber: 0,
	infiniteMemberNumber: 1,
	isNextTagSearchExist: true,
	isNextMemberSearchExist: true,
	addedSearchTag: [],
	addedSearchMember: [],
	searchTagValue: "",
	searchMemberValue: "",
	isCompleted: "",
	searchResult: "",
	commentResult: "",
	uploadResult: "",
	uploadResultCode: "",
	reactionList: [],
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
		addEditTag: (state, action) => {
			if (state.tagList.length < 3) {
				state.tagList.push(action.payload);
			}
		},
		resetFeed: (state, action) => {
			state.checkedList = [];
			state.tagList = [];
			state.photoList = [];
		},
		deleteTag: (state, action) => {
			state.tagList = state.tagList.filter(tag => {
				return action.payload !== tag.id;
			});
		},
		addPhoto: (state, action) => {
			if (state.photoList.length < 4) state.photoList.push(action.payload);
		},
		deletePhoto: (state, action) => {
			state.photoList = state.photoList.filter((photo, index) => {
				return photo.id !== action.payload.id;
			});
			state.formPhotoList = state.formPhotoList.filter((photo, index) => {
				return photo.lastModified !== action.payload.lastModified;
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
		resetFollowingList: (state, action) => {
			state.followingFeedList = [];
			state.followingFeedPageNum = 0;
			state.isNextFollowingFeedPageExist = true;
		},
		resetMyFeed: (state, action) => {
			state.myFeedList = [];
			state.myFeedPageNum = 0;
			state.isNextmyFeedPageExist = true;
		},
		resetRecommendedFeed: (state, action) => {
			state.recommendedFeedList = [];
			state.recommendedFeedPageNum = 0;
			state.isNextRecommendedFeedPageExist = true;
		},
		changeStatus: (state, action) => {
			state.isCompleted = "";
		},
		changeFollwing: (state, action) => {
			state.searchMember.map(member => {
				return action.payload === member.memberId
					? (member.followOrNot = !member.followOrNot)
					: null;
			});
		},
		defaultEditFeed: (state, action) => {
			state.tagList = action.payload.tagList;
			state.checkedList = action.payload.todoList;
			state.photoList = action.payload.formPhotoList;
		},
		updateIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		updateSearchKeyword: (state, action) => {
			state.searchKeyword = action.payload;
		},
		resetFormPhotoList: (state, action) => {
			state.formPhotoList = [];
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
				state.isCompleted = action.payload.status;
				state.uploadResult = action.payload.status;
			})
			//피드 업로드 실패
			.addCase(__uploadFeed.rejected, (state, action) => {
				state.isLoading = false;
				state.uploadResult = action.payload.response.data.code;
				state.uploadResultCode = action.payload.response.status;
			})
			//완료된 피드 목록 불러오기
			.addCase(__updateFeed.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isCompleted = action.payload.status;
			})
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
			.addCase(__getFollowingFeeds.rejected, (state, action) => {
				state.isNextFollowingFeedPageExist = false;
			})
			// 추천 피드 조회 성공
			.addCase(__getRecommendedFeeds.fulfilled, (state, action) => {
				state.recommendedFeedList.push(...action.payload);
				state.recommendedFeedPageNum += 1;
				if (action.payload.length < 5) {
					state.isNextRecommendedFeedPageExist = false;
				}
			})
			.addCase(__getRecommendedFeeds.rejected, (state, action) => {
				state.isNextRecommendedFeedPageExist = false;
			})
			// 내 피드 조회 성공
			.addCase(__getMyFeeds.fulfilled, (state, action) => {
				state.myFeedList.push(...action.payload);
				state.myFeedPageNum += 1;
				if (action.payload.length < 5) {
					state.isNextmyFeedPageExist = false;
				}
			})
			.addCase(__getMyFeeds.rejected, (state, action) => {
				state.isNextmyFeedPageExist = false;
			})
			// 피드 단건 조회 성공
			.addCase(__getFeedItem.fulfilled, (state, action) => {
				state.feedItem = action.payload;
			})

			.addCase(__searchTagAndMember.fulfilled, (state, action) => {
				if (action.payload.category === "feed") {
					state.searchTag = action.payload.data;
					state.isNextTagSearchExist = true;
					state.isNextMemberSearchExist = false;
					state.searchTagValue = action.payload.keyword;
					state.infiniteTagNumber = 1;
					state.infiniteMemberNumber = 1;
					state.searchResult = action.payload.status;
				} else {
					state.searchMember = action.payload.data;
					state.searchTagValue = action.payload.keyword;
					state.isNextMemberSearchExist = true;
					state.isNextTagSearchExist = false;
					state.infiniteTagNumber = 0;
					state.infiniteMemberNumber = 1;
					state.searchResult = action.payload.status;
				}
			})
			.addCase(__searchTagAndMember.rejected, (state, action) => {
				state.searchResult = action.payload;
			})
			.addCase(__infinitySearchTag.fulfilled, (state, action) => {
				if (action.payload.category === "feed") {
					state.isNextMemberSearchExist = false;
					state.isNextTagSearchExist = true;
					state.addedSearchTag = action.payload.data;
					state.searchTag.push(...action.payload.data);
					state.infiniteTagNumber += 1;
				}
				if (state.addedSearchTag.length < 5) {
					state.isNextTagSearchExist = false;
				}
			})
			.addCase(__infinitySearchTag.rejected, (state, action) => {
				if (action.payload === 404) {
					state.isNextTagSearchExist = false;
				}
			})
			.addCase(__infinitySearchMember.fulfilled, (state, action) => {
				if (action.payload.category === "member") {
					state.isNextMemberSearchExist = true;
					state.isNextTagSearchExist = false;
					state.addedSearchMember = action.payload.data;
					state.searchMember.push(...action.payload.data);
					state.infiniteMemberNumber += 1;
				}
				if (state.addedSearchMember.length < 10) {
					state.isNextMemberSearchExist = false;
				}
			})
			.addCase(__infinitySearchMember.rejected, (state, action) => {
				if (action.payload === 404) {
					state.isNextMemberSearchExist = false;
				}
			})
			.addCase(__updateReactions.fulfilled, (state, action) => {
				state.feedItem.currentReactionType.push({
					reactionType: action.payload.reactionType,
				});
				state.feedItem.reactionResponseDtoList.push(action.payload);
			})
			.addCase(__removeReactions.fulfilled, (state, action) => {
				state.feedItem.currentReactionType = [
					...state.feedItem.currentReactionType.filter(
						data => data.memberId !== action.payload.memberId,
					),
				];
				state.isLoading = false;
			})
			.addCase(__editReactions.fulfilled, (state, action) => {
				state.feedItem.currentReactionType = [
					...state.feedItem.currentReactionType.map(data =>
						data.memberId !== action.payload.memberId
							? data
							: { ...data, reactionType: action.payload.reactionType },
					),
				];
			})
			.addCase(__getReactions.fulfilled, (state, action) => {
				state.reactionList = action.payload.data;
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
	updateSearchKeyword,
	resetFeed,
	resetMyFeed,
	resetRecommendedFeed,
	resetFollowingList,
	changeStatus,
	changeFollwing,
	defaultEditFeed,
	addEditTag,
	resetFormPhotoList,
} = feedSlice.actions;
export default feedSlice.reducer;
