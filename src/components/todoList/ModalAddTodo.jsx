import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, Form, Input, Label, Svg } from "../../common";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";
import { __addTodo } from "../../redux/modules/todoList/todoSlice";

const ModalAddTodo = () => {
	const [todo, setTodo] = useState({});
	const dispatch = useDispatch();
	const isAddTodoModalOpen = useSelector(
		state => state.modalSlice.isAddTodoModalOpen,
	);

	const onChangeHandler = e => {
		setTodo({ todo: e.target.value });
	};

	const uploadHandler = e => {
		e.preventDefault();
		dispatch(__addTodo(todo));
		setTodo("");
		dispatch(updateIsAddTodoModalOpen());
	};

	if (!isAddTodoModalOpen) return null;

	return (
		// 오버레이
		<Flex
			bgColor="rgba(0, 0, 0, 0.6)"
			position="fixed"
			maxWidth="320px"
			minWidth="430px"
			height="100%"
			zIndex="1"
		>
			{/* 모달 */}
			<Box variant="modalBox">
				{/* 닫기 버튼 */}
				<Flex jc="flex-end">
					<Svg variant="close"></Svg>
				</Flex>
				{/* 폼 */}
				<Form variant="todoForm" onSubmit={uploadHandler}>
					{/* 할 일 +  옵션 인풋들 */}
					<div>
						{/* 할 일 라벨 + 인풋 */}
						<Flex fd="column" ai="flex-start">
							<Label variant="grey">할 일</Label>
							<Input
								type="text"
								onChange={onChangeHandler}
								value={todo.todo || ""}
								variant="todoInput"
							/>
						</Flex>

						{/* 옵션 인풋들 */}
						<Flex gap="17px" fd="column" ai="flex-start" margin="12px 0 0 0">
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
					<Button variant="addTodo">추가하기</Button>
				</Form>
			</Box>
		</Flex>
	);
};

export default ModalAddTodo;
