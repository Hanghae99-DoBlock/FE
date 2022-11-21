import { useDispatch } from "react-redux";
import { Flex, Svg, Text } from "../../common";
import { updateIsDetailTodoModalOpen } from "../../redux/modules/modal/modalSlice";
import { __checkTodo } from "../../redux/modules/todoList/todoListSlice";

const TodoItem = props => {
	const { todoContent, todoId, completed, todoMemo } = props;
	const dispatch = useDispatch();

	const onClickTodoItemHandler = () => {
		dispatch(updateIsDetailTodoModalOpen(todoContent));
	};

	const checkTodoHandler = () => {
		dispatch(__checkTodo(props));
	};

	return (
		<>
			{/* 투두 박스 */}
			<Flex wd="100%" ht="51px" radius="10px" bg="#FFFFFF" pd="12px 10px">
				{/* icons: 햄버거, 체크박스 */}
				<Flex gap="7px">
					{/* 햄버거 */}
					<Svg variant="hamburger" />
					{/* 체크박스 */}
					{completed ? (
						<Svg onClick={checkTodoHandler} variant="todoCompleted" />
					) : (
						<Svg onClick={checkTodoHandler} variant="checkBox" />
					)}
				</Flex>

				{/* 투두 컨텐트 */}
				<Flex
					onClick={onClickTodoItemHandler}
					jc="flex-start"
					wd="100%"
					mg="0 0 0 16px"
				>
					<Text variant="normal">{todoContent}</Text>
				</Flex>
			</Flex>
		</>
	);
};

export default TodoItem;
