import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Svg, Text } from "../../common";
import { TodoItem } from "../../components";
// import { __getTodoList } from "../../redux/modules/todoList/todoSlice";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";

const ListingTodos = () => {
	const todoList = false;
	// const todoList = useSelector(state => state.todoSlice.todoList);
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(__getTodoList());
	}, []);

	const openAddTodoModalHandler = () => {
		dispatch(updateIsAddTodoModalOpen());
	};

	return (
		<Flex dir="column" gap="10px" pd="0 16px 26px" ht="100%" bg="#F9F9F9">
			{todoList ? (
				// 투두가 있을 때
				todoList.map(todoItem => (
					<TodoItem key={todoItem.id} todoItem={todoItem.todo}></TodoItem>
				))
			) : (
				// 투두가 없을 때
				<Flex dir="column" gap="21.5px">
					<Svg variant="todoEmpty" />
					<Text variant="greyBig">플랜이 없어요! 추가해주세요</Text>
				</Flex>
			)}

			{/* 투두 추가 모달 오픈 버튼 */}
			<Flex wd="100%" jc="flex-end">
				<Svg onClick={openAddTodoModalHandler} variant="addTodo" />
			</Flex>
		</Flex>
	);
};

export default ListingTodos;