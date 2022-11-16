import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { FeedPage } from "../../../pages";

const initialState = {
	isChecked: false,
	checkedList: [],
};

export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {
		choiceTodo: (state, action) => {
			state.isChecked = !state.isChecked;
			if (action.payload.isChecked) {
				state?.checkedList.push(action.payload.value);
			} else {
				state.checkedList = state?.checkedList.filter(list => {
					return action.payload.value !== list;
				});
			}
		},
	},
});
export const { choiceTodo } = feedSlice.actions;
export default feedSlice.reducer;
