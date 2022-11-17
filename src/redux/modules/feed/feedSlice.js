import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { FeedPage } from "../../../pages";

const initialState = {
	checkedList: [],
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
	},
});
export const { choiceTodo, deleteTodo } = feedSlice.actions;
export default feedSlice.reducer;
