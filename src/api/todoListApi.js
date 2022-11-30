import { instance } from "./instance";

// 투두 업로드
export const addTodoApi = async payload => {
	const response = await instance.post(`/api/todolist`, payload);
	return response.data;
};

// 투두 수정
export const updateTodoApi = async payload => {
	const { todoId, year, month, day, todoContent, todoMemo } = payload;
	const updatedTodoItem = { year, month, day, todoContent, todoMemo };
	await instance.patch(`/api/todolist/${todoId}/edit`, updatedTodoItem);
};

// 투두리스트 조회
export const getTodoListApi = async payload => {
	try {
		const { year, month, day } = payload;
		const response = await instance.get(
			`/api/todolist?year=${year}&month=${month}&day=${day}`,
		);
		return response.data;
	} catch (error) {
		return null;
	}
};

// 투두 체크
export const checkTodoApi = async payload => {
	await instance.patch(`/api/todolist/${payload}/completed`);
};

// 투두 드래그 앤 드롭
export const swithTodoApi = async payload => {
	const request = {
		year: payload.year,
		month: payload.month,
		day: payload.day,
		todoIdList: payload.todoIdList,
	};
	await instance.put(`/api/todolist/switch`, request);
};
