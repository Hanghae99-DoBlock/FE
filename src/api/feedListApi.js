import { instance } from "./instance";

// 팔로잉 피드 리스트 조회
export const getFollowingFeedsApi = async lastFollowingFeedId => {
	if (lastFollowingFeedId === null) {
		const response = await instance.get(`/api/feed/following`);
		return response.data;
	} else {
		const response = await instance.get(
			`/api/feed/following?id=${lastFollowingFeedId}`,
		);
		return response.data;
	}
};

// 추천 피드 리스트 조회
export const getRecommendedFeedsApi = async lastRecommendedFeedId => {
	if (lastRecommendedFeedId === null) {
		const response = await instance.get(`/api/feed/recommended`);
		return response.data;
	} else {
		const response = await instance.get(
			`/api/feed/recommended?id=${lastRecommendedFeedId}`,
		);
		return response.data;
	}
};

// 내 피드 리스트 조회
export const getMyFeedsApi = async ({ memberId, lastMyFeedId }) => {
	if (lastMyFeedId === null) {
		const response = await instance.get(`/api/profile/${memberId}/feed`);
		return response.data;
	}
	const response = await instance.get(
		`/api/profile/${memberId}/feed?id=${lastMyFeedId}`,
	);
	return response.data;
};

// 피드 삭제
export const deleteFeedApi = async payload => {
	const response = await instance.delete(`/api/feed/${payload}`);
	return response;
};
