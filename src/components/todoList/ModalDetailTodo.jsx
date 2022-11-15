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
			bg="rgba(0, 0, 0, 0.6)"
			position="fixed"
			mxw="320px"
			mw="430px"
			ht="100%"
			zIndex="1"
		>
			{/* 모달 */}
			<Box variant="modalBox">
				{/* 닫기 버튼 */}
				<Flex jc="flex-end">
					<Svg onClick={closeDetailModalHandler} variant="close"></Svg>
				</Flex>
				{/* 폼 */}
				<Form variant="todoForm">
					{/* 할 일 +  옵션 인풋들 */}
					<div>
						{/* 할 일 라벨 + 인풋 */}
						<Flex dir="column" ai="flex-start">
							<Label variant="grey">할 일</Label>
							<Box variant="todoContent">
								<Text variant="medium">{todoItem.todoContent}</Text>
							</Box>
						</Flex>

						{/* 옵션 인풋들 */}
						<Flex gap="17px" dir="column" ai="flex-start" mg="12px 0 0 0">
							{/* 메모 인풋 */}
							<Flex gap="18.5px">
								<Svg variant="memo" />

								{/* 메모 인풋은 하드코딩만 해두었습니다 */}
								<p
									style={{
										fontWeight: "500",
										fontSize: "13px",
										color: "#979797",
									}}
								>
									메모
								</p>
							</Flex>
						</Flex>
					</div>
					{/* 추가 버튼 */}
					<Button variant="addTodo">수정하기</Button>
				</Form>
			</Box>
		</Flex>
	);
};

export default ModalDetailTodo;
