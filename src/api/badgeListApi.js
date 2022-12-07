import { instance } from "./instance";

export const getBadgeListApi = async payload => {
	const response = await instance.get(
		`/api/profile/${payload.id}/badges?badgetype=${payload.badgeItem}`,
	);
	return response.data;
};
