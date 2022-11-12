import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Svg, Text } from "../../common";
import { TodoItem } from "../../components";
import { __getTodoList } from "../../redux/modules/todoList/todoSlice";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";

const ListingTodos = () => {
	const todoList = useSelector(state => state.todoSlice.todoList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(__getTodoList());
	}, []);

	const openAddTodoModalHandler = () => {
		dispatch(updateIsAddTodoModalOpen());
	};

	return (
		<Flex
			fd="column"
			gap="10px"
			pad="0 16px 26px"
			height="100%"
			bgColor="#F9F9F9"
		>
			{todoList ? (
				// 투두가 있을 때
				todoList.map(todoItem => (
					<TodoItem key={todoItem.id} todoItem={todoItem.todo}></TodoItem>
				))
			) : (
				// 투두가 없을 때
				<Flex fd="column" gap="21.5px">
					<Svg variant="todoEmpty" />
					<Text variant="greyBig">플랜이 없어요! 추가해주세요</Text>
				</Flex>
			)}

			{/* 투두 추가 모달 오픈 버튼 */}
			<Flex width="100%" jc="flex-end">
				<Svg onClick={openAddTodoModalHandler} variant="addTodo" />
			</Flex>
		</Flex>
	);
};

export default ListingTodos;
