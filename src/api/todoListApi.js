import { instance } from "./instance";

// 투두 업로드
export const addTodoApi = async payload => {
	const response = await instance.post(`/api/todolist`, payload);
	return response.data;
};

// 투두리스트 조회
export const getTodoListApi = async payload => {
	const { year, month, day } = payload;
	const response = await instance.get(
		`/api/todolist?year=${year}&month=${month}&day=${day}`,
	);
	return response.data;
};

// 투두 체크
export const checkTodoApi = async payload => {
	await instance.patch(`/api/todolist/${payload}/completed`);
};
