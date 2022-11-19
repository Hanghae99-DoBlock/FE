import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	checkedList: [],
	tagList: [],
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
				state.tagList.push(action.payload.value);
			} else {
				state.tagList = state.tagList.filter(tag => {
					return action.payload.value !== tag;
				});
			}
		},
		deleteTag: (state, action) => {
			state.tagList = state.tagList.filter((tag, index) => {
				return action.payload.value !== tag;
			});
		},
	},
});
export const { choiceTodo, deleteTodo, resetTodo, addTag, deleteTag } =
	feedSlice.actions;
export default feedSlice.reducer;
