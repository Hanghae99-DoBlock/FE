import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, grey200, orange300, Text } from "../../common";
import { getTodoItem } from "../../redux/modules/todoList/todoListSlice";
import { Draggable } from "react-beautiful-dnd";
import { checkTodoApi, deleteTodoApi } from "../../api/todoListApi";
import { updateIsToastExist } from "../../redux/modules/toastSlice";

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
	const [isFuture, setIsFuture] = useState(false);
	const selectedDate = useSelector(state => state.todoListSlice.selectedDate);
	const today = dayjs(dayjs().$d).format(`YYYY.MM.DD`);
	const todayYear = today.slice(0, 4);
	const todayMonth = today.slice(5, 7);
	const todayDay = today.slice(8, 10);

	useEffect(() => {
		if (todayYear - selectedDate.year < 0) {
			setIsFuture(true);
		} else if (todayMonth - selectedDate.month < 0) {
			setIsFuture(true);
		} else if (todayDay - selectedDate.day < 0) {
			setIsFuture(true);
		} else {
			setIsFuture(false);
		}
	}, [
		selectedDate.day,
		selectedDate.month,
		selectedDate.year,
		todayDay,
		todayMonth,
		todayYear,
	]);

	// 디테일 모달 오픈 핸들러
	const openDetailModalHandler = e => {
		e.stopPropagation();
		dispatch(getTodoItem(todoItem));
		setIsDetailTodoModalOpen(true);
	};

	// 투두 완료 여부 체크 핸들러
	const checkTodoHandler = e => {
		e.stopPropagation();
		if (isFuture) {
			dispatch(updateIsToastExist("투두를 미리 완료할 수는 없어요😭"));
		} else {
			checkTodoApi(todoItem.todoId);
			const changedTodoList = todoList.map(todo => {
				return todo.todoId === todoItem.todoId
					? { ...todo, completed: !todo.completed }
					: todo;
			});
			setTodoList(changedTodoList);
		}
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
					<Flex
						jc="space-between"
						wd="100%"
						ht="51px"
						radius="10px"
						bg="#FFFFFF"
						mg="0 0 10px 0"
					>
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
						<Box onClick={openDetailModalHandler} variant="textOverflow">
							<Text variant="normal">{todoContent}</Text>
						</Box>
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
