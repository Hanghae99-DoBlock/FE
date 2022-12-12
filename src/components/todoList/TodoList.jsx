import Lottie from "lottie-react";
import spinner from "../../common/gif/spinner.json";
import { useSelector } from "react-redux";
import { Box, Flex, Svg, Text } from "../../common";
import { TodoItem } from "../../components";
import { Droppable } from "react-beautiful-dnd";
import { useState } from "react";

const TodoList = ({
	todoList,
	setTodoList,
	setIsDetailTodoModalOpen,
	isLoading,
}) => {
	const selectedDate = useSelector(state => state.todoListSlice.selectedDate);

	const [isDelBtnExist, setIsDelBtnExist] = useState(false);
	const showDelBtnHandler = () => {
		setIsDelBtnExist(!isDelBtnExist);
	};

	return (
		<Box variant="todoListArea">
			{/* 헤더 */}
			<Flex
				ht="70px"
				jc="space-between"
				pd="23px 20px"
				// position="sticky"
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
				{isDelBtnExist ? (
					<Flex
						onClick={showDelBtnHandler}
						cursor="pointer"
						wd="15px"
						ht="17px"
						bi="url(/images/trashCanRed.svg)"
					/>
				) : (
					<Flex
						onClick={showDelBtnHandler}
						cursor="pointer"
						wd="15px"
						ht="17px"
						bi="url(/images/trashCanGrey.svg)"
					/>
				)}
			</Flex>

			{/* 리스트 */}
			<Flex wd="100%" ht="85%" position="relative">
				<Flex
					dir="column"
					jc="center"
					pd="0 16px"
					position="absolute"
					wd="100%"
					ht="100%"
				>
					{isLoading ? (
						<Flex mg="0 0 50px 0" wd="100%" ht="100%">
							<Lottie animationData={spinner} />
						</Flex>
					) : !todoList || !todoList[0] ? (
						// 투두가 없을 때
						<Flex ht="100%" dir="column" gap="21.5px">
							<Svg variant="todoEmpty" />
							<Text variant="greyBig">플랜이 없어요! 추가해주세요</Text>
						</Flex>
					) : (
						// 투두가 있을 때
						<Droppable droppableId="todoList">
							{provided => (
								// <Box
								// 	variant="todoListScrollArea"
								// >
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "flex-start",
										width: "100%",
										height: "100%",
										background: "#f9f9f9",
										overflowX: "hidden",
										overflowY: "auto",
										scrollbarWidth: "none",
										"&::WebkitScrollbar": { display: "none" },
									}}
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{todoList.map((todoItem, index) => (
										<TodoItem
											index={index}
											todoItem={todoItem}
											todoList={todoList}
											setTodoList={setTodoList}
											key={todoItem.todoId}
											setIsDetailTodoModalOpen={setIsDetailTodoModalOpen}
											isDelBtnExist={isDelBtnExist}
										/>
									))}
									{provided.placeholder}
								</div>
								// </Box>
							)}
						</Droppable>
					)}
					<Flex wd="100%" ht="80px" />
				</Flex>
			</Flex>
		</Box>
	);
};

export default TodoList;
