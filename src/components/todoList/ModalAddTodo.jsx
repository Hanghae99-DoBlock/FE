import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Box,
	Button,
	Flex,
	Form,
	Input,
	Label,
	Svg,
	TextArea,
} from "../../common";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";
import { __addTodo } from "../../redux/modules/todoList/todoListSlice";

const ModalAddTodo = () => {
	const [todo, setTodo] = useState({});
	const dispatch = useDispatch();
	const isAddTodoModalOpen = useSelector(
		state => state.modalSlice.isAddTodoModalOpen,
	);

	const onChangeHandler = e => {
		// 날짜는 하드코딩만 해두었습니다
		setTodo({
			year: 2022,
			month: 11,
			day: 14,
			todoContent: e.target.value,
		});
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
					<Svg variant="close"></Svg>
				</Flex>
				{/* 폼 */}
				<Form variant="todoForm" onSubmit={uploadHandler}>
					<div>
						{/* 할 일 라벨 + 인풋 */}
						<Flex dir="column" ai="flex-start">
							<Label variant="grey">할 일</Label>
							<Input
								autoFocus
								type="text"
								onChange={onChangeHandler}
								value={todo.todoContent || ""}
								variant="todoInput"
							/>
						</Flex>

						<Flex gap="18.5px" ai="flex-start" mg="14px 0 0 0">
							{/* 메모 아이콘 */}
							<Box variant="memoIconBox">
								<Svg variant="memo" />
							</Box>

							{/* 메모 인풋 */}
							<TextArea
								variant="memo"
								placeholder="메모"
								maxLength="100"
								rows="5"
								cols="29"
							/>
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
