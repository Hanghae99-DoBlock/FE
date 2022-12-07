import { instance } from "./instance";

// 팔로잉 피드 리스트 조회
export const getFollowingFeedsApi = async payload => {
	const response = await instance.get(`/api/feed/following?page=${payload}`);
	return response.data;
};

// 추천 피드 리스트 조회
export const getRecommendedFeedsApi = async payload => {
	const response = await instance.get(`/api/feed/recommended?page=${payload}`);
	return response.data;
};

// 내 피드 리스트 조회
export const getMyFeedsApi = async payload => {
	const response = await instance.get(
		`/api/profile/${payload.memberId}/feed?page=${payload.page}`,
	);
	return response.data;
};

// 피드 삭제
export const deleteFeedApi = payload => {
	instance.delete(`/api/feed/${payload}`);
};
