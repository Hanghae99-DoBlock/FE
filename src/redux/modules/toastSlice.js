import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isToastExist: false,
	toastContent: "",
};

export const toastSlice = createSlice({
	name: "toastSlice",
	initialState,
	reducers: {
		updateIsToastExist: (state, action) => {
			state.isToastExist = !state.isToastExist;
			state.toastContent = action.payload;
		},
	},
	extraReducers: {},
});

export const { updateIsToastExist } = toastSlice.actions;
export default toastSlice.reducer;
