import { useDispatch } from "react-redux";
import { Flex, Svg, Text } from "../../common";
import { __checkTodo } from "../../redux/modules/middleware/todoListThunk.js";
import { getTodoItem } from "../../redux/modules/todoList/todoListSlice";
import { Draggable } from "react-beautiful-dnd";

const TodoItem = ({ index, todoItem, setIsDetailTodoModalOpen }) => {
	const { todoContent, completed } = todoItem;
	const dispatch = useDispatch();

	// 디테일 모달 오픈 핸들러
	const openDetailModalHandler = () => {
		dispatch(getTodoItem(todoItem));
		setIsDetailTodoModalOpen(true);
	};

	// 투두 완료 여부 체크 핸들러
	const checkTodoHandler = () => {
		dispatch(__checkTodo(todoItem));
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
						ht="51px"
						radius="10px"
						bg="#FFFFFF"
						pd="13.5px 15px"
						mg="0 0 10px 0"
					>
						{/* 체크박스 */}
						{completed ? (
							<Svg onClick={checkTodoHandler} variant="todoCompleted" />
						) : (
							<Svg onClick={checkTodoHandler} variant="checkBox" />
						)}

						{/* 투두 컨텐트 */}
						<Flex
							onClick={openDetailModalHandler}
							cursor="pointer"
							jc="flex-start"
							wd="100%"
							mg="0 0 0 13px"
							pd="3px 0 0 0"
						>
							<Text variant="normal">{todoContent}</Text>
						</Flex>

						{/* 햄버거 */}
						<Svg variant="hamburger" />
					</Flex>
				</div>
			)}
		</Draggable>
	);
};

export default TodoItem;
