import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, Form, Label, Svg, Text } from "../../common";
import { updateIsDetailTodoModalOpen } from "../../redux/modules/modal/modalSlice";

const ModalDetailTodo = () => {
	const dispatch = useDispatch();

	const isDetailTodoModalOpen = useSelector(
		state => state.modalSlice.isDetailTodoModalOpen,
	);

	const todoItem = useSelector(state => state.modalSlice.todoItem);

	const closeDetailModalHandler = () => {
		dispatch(updateIsDetailTodoModalOpen());
	};

	if (!isDetailTodoModalOpen) return null;

	return (
		// 오버레이
		<Flex
			bg="rgba(0, 0, 0, 0.5)"
			position="absolute"
			wd="100%"
			ht="100%"
			zIndex="1"
		>
			{/* 모달 */}
			<Flex ht="100vh" wd="100%" ai="flex-start">
				<Box variant="modalBox">
					{/* 닫기 버튼 */}
					<Flex jc="flex-end">
						<Svg onClick={closeDetailModalHandler} variant="close"></Svg>
					</Flex>
					{/* 폼 */}
					<Form variant="todoForm">
						<div>
							{/* 할 일 */}
							<Flex dir="column" ai="flex-start">
								<Label variant="grey">할 일</Label>
								<Box variant="todoContent">
									<Text variant="medium">{todoItem.todoContent}</Text>
								</Box>
							</Flex>
							<Flex gap="17px" dir="column" ai="flex-start" mg="12px 0 0 0">
								{/* 메모 */}
								<Flex gap="18.5px">
									<Svg variant="memo" />
									<Text variant="small">{todoItem.todoMemo}</Text>
								</Flex>
							</Flex>
						</div>
						{/* 버튼 */}
						<Button variant="addTodo">수정하기</Button>
					</Form>
				</Box>
			</Flex>
		</Flex>
	);
};

export default ModalDetailTodo;
