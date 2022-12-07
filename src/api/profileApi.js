import { instance } from "./instance";

export const updateProfileTagsApi = async payload => {
	const frm = new FormData();
	frm.append("tagList", payload);
	const response = await instance.patch(`/api/members/profile/edit`, frm);
	return response.status;
};

export const resetProfileTagsApi = async payload => {
	const frm = new FormData();
	frm.append("tagList", []);
	const response = await instance.patch(`/api/members/profile/edit`, frm);
	return response.status;
};
