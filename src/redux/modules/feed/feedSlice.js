import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../../api";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const __uploadFeed = createAsyncThunk(
	"UPLOAD_FEED",
	async (payload, thunkAPI) => {
		try {
			const {
				feedTitle,
				todoList,
				feedContent,
				feedImageList,
				tagList,
				feedColor,
			} = frm;
			const frm = new FormData();
			frm.append("todoList", todoList);
			frm.append("feedTitle", feedTitle);
			frm.append("feedContent", feedContent);
			frm.append("feedImageList", feedImageList);
			frm.append("feedColor", feedColor);
			frm.append("tagList", tagList);
			const { data } = await axios.post(
				`${serverUrl}/api/feed`,
				frm,
				{
					withCredentials: true,
				},
				{
					headers: { Authorization: accessToken },
				},
			);
			return thunkAPI.fulfillWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.code);
		}
	},
);

const initialState = {
	checkedList: [],
	tagList: [],
	photoList: [],
	feedList: [],
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
	},
	extraReducers: builder => {
		builder
			//피드 업로드
			.addCase(__uploadFeed.fulfilled, (state, action) => {
				state.feedList.push(action.payload);
			})
			//피드 업로드 실패
			.addCase(__uploadFeed.rejected, (state, action) => {
				state.feedList = [];
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
} = feedSlice.actions;
export default feedSlice.reducer;
