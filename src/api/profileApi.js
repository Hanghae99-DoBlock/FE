import { instance } from "./instance";

export const updateProfileTagsApi = payload => {
	const frm = new FormData();
	frm.append("tagList", payload);
	instance.patch(`/api/profile/edit`, frm);
};

export const resetProfileTagsApi = payload => {
	const frm = new FormData();
	frm.append("tagList", []);
	instance.patch(`/api/profile/edit`, frm);
};
