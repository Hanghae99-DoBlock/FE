import { useState } from "react";
import { useDispatch } from "react-redux";
import { Flex, Svg, Text } from "../../common";
import { ModalDetailTodo } from "../../components";
import { __checkTodo } from "../../redux/modules/todoListSlice";

const TodoItem = ({ todoItem }) => {
	const { todoContent, completed } = todoItem;
	const dispatch = useDispatch();

	// 디테일 모달 상태 관리
	const [isDetailTodoModalOpen, setIsDetailTodoModalOpen] = useState(false);

	// 디테일 모달 오픈 핸들러
	const openDetailModalHandler = () => {
		setIsDetailTodoModalOpen(true);
	};

	// 투두 완료 여부 체크 핸들러
	const checkTodoHandler = () => {
		dispatch(__checkTodo(todoItem));
	};

	return (
		<>
			{/* 투두 박스 */}
			<Flex wd="100%" ht="51px" radius="10px" bg="#FFFFFF" pd="13.5px 15px">
				{/* 체크박스 */}
				{completed ? (
					<Svg onClick={checkTodoHandler} variant="todoCompleted" />
				) : (
					<Svg onClick={checkTodoHandler} variant="checkBox" />
				)}

				{/* 투두 컨텐트 */}
				<Flex
					onClick={openDetailModalHandler}
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

			{/* 모달 */}
			{isDetailTodoModalOpen ? (
				<ModalDetailTodo
					todoItem={todoItem}
					setIsDetailTodoModalOpen={setIsDetailTodoModalOpen}
				/>
			) : null}
		</>
	);
};

export default TodoItem;
