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
		const { name, value } = e.target;
		setTodo({ ...todo, year: 2022, month: 11, day: 14, [name]: value });
	};

	const uploadHandler = e => {
		e.preventDefault();
		dispatch(__addTodo(todo));

		setTodo("");
		dispatch(updateIsAddTodoModalOpen());
		setTodo({});
	};

	const closeAddTodoModalHandler = () => {
		dispatch(updateIsAddTodoModalOpen());
		setTodo({});
	};

	if (!isAddTodoModalOpen) return null;

	return (
		// 오버레이
		<Flex
			bg="rgba(0, 0, 0, 0.6)"
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
						<Svg onClick={closeAddTodoModalHandler} variant="close"></Svg>
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
									name="todoContent"
								/>
							</Flex>

							<Flex gap="18.5px" ai="flex-start" mg="14px 0 0 0">
								{/* 메모 아이콘 */}
								<Box variant="memoIconBox">
									<Svg variant="memo" />
								</Box>

								{/* 메모 인풋 */}
								<TextArea
									onChange={onChangeHandler}
									value={todo.todoMemo || ""}
									name="todoMemo"
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
		</Flex>
	);
};

export default ModalAddTodo;
