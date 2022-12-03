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
