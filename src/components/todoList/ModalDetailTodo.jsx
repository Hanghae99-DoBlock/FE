import { useSelector } from "react-redux";
import { Box, Button, Flex, Form, Label, Svg, Text } from "../../common";

const ModalDetailTodo = ({ setIsDetailTodoModalOpen }) => {
	const todoItem = useSelector(state => state.todoListSlice.todoItem);
	// 모달 닫기 핸들러
	const closeDetailModalHandler = () => {
		setIsDetailTodoModalOpen(false);
	};

	return (
		// 오버레이
		<Flex
			bg="rgba(0, 0, 0, 0.5)"
			position="relative"
			wd="100%"
			ht="100%"
			zIndex="2"
		>
			{/* 모달 */}
			<Box variant="modalBox">
				{/* 닫기 버튼 */}
				<Flex jc="flex-end">
					<Svg onClick={closeDetailModalHandler} variant="close"></Svg>
				</Flex>

				{/* 폼 */}
				<Form variant="todoForm">
					{/* 할 일 라벨 + 인풋*/}
					<Flex dir="column" ai="flex-start">
						<Label variant="grey">할 일</Label>
						<Box variant="todoContent">
							<Text variant="medium">{todoItem.todoContent}</Text>
						</Box>
						<Flex gap="17px" dir="column" ai="flex-start" mg="12px 0 0 0">
							<Flex gap="18.5px">
								{/* 메모 아이콘*/}
								<Box variant="memoIconBox">
									<Svg variant="memo" />
								</Box>

								{/* 메모 */}
								<Flex
									ht="50px"
									mg="2px 0 0 0"
									overflowX="hidden"
									overflowY="auto"
									ai="flex-start"
								>
									{todoItem.todoMemo ? (
										<Text variant="small">{todoItem.todoMemo}</Text>
									) : (
										<Text variant="grey">작성한 메모가 없습니다</Text>
									)}
								</Flex>
							</Flex>
						</Flex>
					</Flex>

					{/* 버튼 */}
					<Button variant="addTodo">수정하기</Button>
				</Form>
			</Box>
		</Flex>
	);
};

export default ModalDetailTodo;
