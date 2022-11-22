import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Svg, Text } from "../../common";
import { TodoItem } from "../../components";
import { __getTodoList } from "../../redux/modules/middleware/todoListThunk.js";

const TodoList = ({ setIsDetailTodoModalOpen }) => {
	const dispatch = useDispatch();

	// state 구독
	const selectedDate = useSelector(state => state.todoListSlice.selectedDate);
	const todoList = useSelector(state => state.todoListSlice.todoList);

	useEffect(() => {
		// 날짜를 받아온 후에 get 요청
		if (selectedDate.year) dispatch(__getTodoList(selectedDate));
	}, [dispatch, selectedDate]);

	return (
		<Box variant="todoListArea">
			{/* 헤더 */}
			<Flex
				ht="70px"
				jc="space-between"
				pd="23px 20px"
				position="sticky"
				top="388px"
			>
				<Flex gap="15px">
					{/* 날짜 */}
					<Text variant="big">
						{selectedDate.month}.{selectedDate.day}
					</Text>
					{/* 할 일 개수 */}
					<Text variant="grey">할 일 {todoList?.length || 0}개</Text>
				</Flex>
				{/* 휴지통 */}
				<Svg variant="trashCan" />
			</Flex>

			{/* 리스트 */}
			<Flex wd="100%" ht="100%" position="relative">
				<Flex
					dir="column"
					jc="center"
					pd="0 16px"
					position="absolute"
					wd="100%"
					ht="100%"
				>
					{todoList[0] ? (
						// 투두가 있을 때
						<Box variant="todoListScrollArea">
							{todoList.map(todoItem => (
								<TodoItem
									todoItem={todoItem}
									key={todoItem.todoId}
									setIsDetailTodoModalOpen={setIsDetailTodoModalOpen}
								/>
							))}
						</Box>
					) : (
						// 투두가 없을 때
						<Flex ht="100%" dir="column" gap="21.5px">
							<Svg variant="todoEmpty" />
							<Text variant="greyBig">플랜이 없어요! 추가해주세요</Text>
						</Flex>
					)}
					<Flex wd="100%" ht="198px" />
				</Flex>
			</Flex>
		</Box>
	);
};

export default TodoList;