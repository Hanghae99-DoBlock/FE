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

export const getCommentsApi = async payload => {
	const response = await instance.get(`/api/feed/${payload}/comment`);
	return response.data;
};
export const addCommentsApi = async payload => {
	const response = await instance.post(`/api/feed/${payload.id}/comment`, {
		commentContent: payload.content,
	});
	return response.data;
};
export const removeCommentsApi = async payload => {
	const response = await instance.delete(
		`/api/feed/${payload.feedId}/comment?comment-id=${payload.commentId}`,
	);
	return response.data;
};
export const editCommentsApi = async payload => {
	const response = await instance.put(
		`/api/feed/${payload.feedId}/comment?comment-id=${payload.commentId}`,
		{
			commentContent: payload.content,
		},
	);
	return response.data;
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

// 투두 삭제
export const deleteTodoApi = async payload => {
	await instance.delete(`/api/todolist/${payload}/remove`);
};
