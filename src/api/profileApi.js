import { instance } from "./instance";

export const updateProfileTagsApi = payload => {
	const frm = new FormData();
	frm.append("tagList", payload);
	instance.patch(`/api/members/profile/edit`, frm);
};