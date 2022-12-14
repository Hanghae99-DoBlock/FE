import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../api";
import {
	__resetProfileTags,
	__updateProfileTags,
} from "./middleware/profileThunk";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

// 비밀번호 변경
export const __editPassword = createAsyncThunk(
	"profile/editPassword",
	async (payload, thunkAPI) => {
		try {
			const response = await axios.patch(
				`${serverUrl}/api/profile/edit/password`,
				{
					currentPassword: payload.currentPassword,
					newPassword: payload.newPassword,
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
			alert("수정 완료");
			window.history.back();
			return thunkAPI.fulfillWithValue(response);
		} catch (error) {
			alert("수정 실패");
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 팔로우 버튼
export const __followThunk = createAsyncThunk(
	"profile/follow",
	async (payload, thunkAPI) => {
		try {
			await axios.post(
				`${serverUrl}/api/profile/${payload}/follow`,
				{
					withCredentials: true,
				},
				{
					headers: {
						Authorization: accessToken,
						"Refresh-Token": refreshToken,
					},
				},
			);
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 프로필 수정
const updateProfile = payload => {
	const accessToken = localStorage.getItem("accessToken");
	const frm = new FormData();
	if (payload.nickname === "") {
	} else {
		frm.append("nickname", payload.nickname);
	}
	if (payload.profileImage === null) {
	} else {
		frm.append("profileImage", payload.profileImage);
	}
	axios
		.patch(
			`${serverUrl}/api/profile/edit`,
			frm,

			{
				headers: {
					Authorization: accessToken,
					"Content-Type": "multipart/form-data",
				},
			},
			{
				withCredentials: true,
			},
		)
		.then(function a(response) {
			alert("수정되었습니다.");
			window.history.back();
		})
		.catch(function (error) {
			alert("알수없는 오류가 발생했습니다. 관리자에게 문의하세요.");
		});
};

// 유저 단일 조회
export const __getUser = createAsyncThunk(
	"user/getUsers",
	async (payload, thunkAPI) => {
		try {
			const response = await axios.get(
				`${serverUrl}/api/profile/${payload}`,
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

// 팔로잉 리스트 전체 조회
export const __getFollowing = createAsyncThunk(
	// 이름 잘 정해줘야 함 안 그러면 뒤바껴서 들어간다!!
	"user/getFollowing",
	async (payload, thunkAPI) => {
		try {
			const profile = await axios.get(
				`${serverUrl}/api/profile/${payload}/following`,
				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
			);
			return thunkAPI.fulfillWithValue(profile.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 팔로워 리스트 전체 조회
export const __getFollower = createAsyncThunk(
	"user/getFollower",
	async (payload, thunkAPI) => {
		try {
			const profile = await axios.get(
				`${serverUrl}/api/profile/${payload}/follower`,
				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
			);
			return thunkAPI.fulfillWithValue(profile.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 뱃지 리스트 조회
export const __getBadgeList = createAsyncThunk(
	"user/getBadgeList",
	async (payload, thunkAPI) => {
		try {
			const badgeList = await axios.get(
				`${serverUrl}/api/profile/${payload}/badgelist`,
				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
			);
			return thunkAPI.fulfillWithValue(badgeList.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 뱃지 상세
export const __getBadgeType = createAsyncThunk(
	"user/getBadgeType",
	async (payload, thunkAPI) => {
		try {
			const badges = await axios.get(
				`${serverUrl}/api/profile/${payload.id}/badges?badgetype=${payload.badgeItem}`,
				{
					headers: { Authorization: accessToken },
				},
				{
					withCredentials: true,
				},
			);
			return thunkAPI.fulfillWithValue(badges.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

// 대표 뱃지 설정
export const __editBadges = createAsyncThunk(
	"user/editBadges",
	async (payload, thunkAPI) => {
		try {
			await axios.patch(
				`${serverUrl}/api/profile/edit/badges`,
				{
					badgeType: payload,
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
			alert("수정 완료");
			window.history.back();
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			alert("수정 실패");
			return thunkAPI.rejectWithValue(error);
		}
	},
);

const initialState = {
	following: false,
	follower: false,
	followerList: [],
	followingList: [],
	profile: {},
	badgeList: [],
	representativeBadge: {},
	isLoading: null,
	error: "",
	errMsg: null,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		updatePro: (state, action) => {
			updateProfile(action.payload);
		},
		updateIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		resetErrMsg: (state, action) => {
			state.errMsg = null;
		},
	},
	extraReducers: {
		[__updateProfileTags.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__updateProfileTags.fulfilled]: (state, action) => {
			state.isLoading = "완료";
		},
		[__updateProfileTags.rejected]: (state, action) => {
			state.isLoading = false;
			state.errMsg = action.payload.data.message;
		},
		[__resetProfileTags.fulfilled]: (state, action) => {
			state.profile.tagList = [];
		},
		[__resetProfileTags.rejected]: (state, action) => {
			state.errMsg = action.payload.data.message;
		},
		[__getUser.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__getUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.profile = action.payload;
		},
		[__getUser.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
		[__getFollowing.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__getFollowing.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.followingList = action.payload;
		},
		[__getFollowing.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
		[__getFollower.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__getFollower.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.followerList = action.payload;
		},
		[__getFollower.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
		[__followThunk.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__followThunk.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.followingList = state.followingList.map(followMember => {
				return action.payload === followMember.memberId
					? { ...followMember, followOrNot: !followMember.followOrNot }
					: followMember;
			});
			state.followerList = state.followerList.map(followMember => {
				return action.payload === followMember.memberId
					? { ...followMember, followOrNot: !followMember.followOrNot }
					: followMember;
			});
			state.profile.followOrNot = !state.profile.followOrNot;
			state.profile.countFollower =
				state.profile.followOrNot === false
					? state.profile.countFollower - 1
					: state.profile.countFollower + 1;
		},
		[__followThunk.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
		[__getBadgeList.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__getBadgeList.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.profile = action.payload;
		},
		[__getBadgeList.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
		[__editBadges.pending]: (state, action) => {
			state.isLoading = true;
		},
		[__editBadges.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.representativeBadge = action.payload;
		},
		[__editBadges.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
		},
	},
});

export const { updatePro, updateIsLoading, resetErrMsg } = profileSlice.actions;
export default profileSlice.reducer;
