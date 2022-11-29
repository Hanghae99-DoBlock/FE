import { instance } from "./instance";

// 피드 리스트 조회
export const getFollowingFeedsApi = async payload => {
	const response = await instance.get(`/api/feed/following?page=${payload}`);
	return response.data;
};
