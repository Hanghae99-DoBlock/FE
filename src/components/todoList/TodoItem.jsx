import { useDispatch } from "react-redux";
import { Button, Flex, grey200, orange300, Svg, Text } from "../../common";
import { getTodoItem } from "../../redux/modules/todoList/todoListSlice";
import { Draggable } from "react-beautiful-dnd";
import { checkTodoApi, deleteTodoApi } from "../../api/todoListApi";

const TodoItem = ({
	index,
	todoItem,
	todoList,
	setTodoList,
	setIsDetailTodoModalOpen,
	isDelBtnExist,
}) => {
	const { todoContent, completed, todoId } = todoItem;
	const dispatch = useDispatch();

	// 디테일 모달 오픈 핸들러
	const openDetailModalHandler = e => {
		e.stopPropagation();
		dispatch(getTodoItem(todoItem));
		setIsDetailTodoModalOpen(true);
	};

	// 투두 완료 여부 체크 핸들러
	const checkTodoHandler = e => {
		e.stopPropagation();
		checkTodoApi(todoItem.todoId);
		const changedTodoList = todoList.map(todo => {
			return todo.todoId === todoItem.todoId
				? { ...todo, completed: !todo.completed }
				: todo;
		});
		setTodoList(changedTodoList);
	};

	const deleteTodoHandler = () => {
		deleteTodoApi(todoId);
		const changedTodoList = todoList.filter(
			todoItem => todoItem.todoId !== todoId,
		);
		setTodoList(changedTodoList);
	};

	return (
		<Draggable draggableId={todoContent} index={index}>
			{provided => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<Flex ht="51px" radius="10px" bg="#FFFFFF" mg="0 0 10px 0">
						<Flex onClick={e => e.stopPropagation()} ht="100%" pd="0 15px">
							{/* 체크박스 */}
							{completed ? (
								<Flex
									onClick={checkTodoHandler}
									cursor="pointer"
									wd="22px"
									ht="22px"
									radius="4px"
									bg={orange300}
								>
									<Flex wd="12px" ht="15px" bi="url(/images/checkWhite.svg)" />
								</Flex>
							) : (
								<Flex
									onClick={checkTodoHandler}
									cursor="pointer"
									wd="22px"
									ht="22px"
									radius="4px"
									bg={grey200}
								/>
							)}
						</Flex>

						{/* 투두 컨텐트 */}
						<Flex
							onClick={openDetailModalHandler}
							cursor="pointer"
							jc="flex-start"
							wd="100%"
							ht="100%"
							pd="13.5px 0 13.5px 0"
						>
							<Text variant="normal">{todoContent}</Text>
						</Flex>
						<Flex ht="100%">
							{isDelBtnExist ? (
								<Flex mg="0 10px">
									<Button onClick={deleteTodoHandler} variant="delTodo">
										삭제
									</Button>
								</Flex>
							) : (
								<Flex cursor="grab" wd="40px" ht="100%">
									<Flex
										wd="15px"
										ht="12px"
										bi="url(/images/hamburgerGrey.svg)"
									/>
								</Flex>
							)}
						</Flex>
					</Flex>
				</div>
			)}
		</Draggable>
	);
};

export default TodoItem;
