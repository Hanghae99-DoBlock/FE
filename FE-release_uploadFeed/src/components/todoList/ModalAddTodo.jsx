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
import { __addTodo } from "../../redux/modules/middleware/todoListThunk.js";

const ModalAddTodo = ({ setIsAddTodoModalOpen }) => {
	const dispatch = useDispatch();

	// 투두 상태 관리
	const [todo, setTodo] = useState({});

	// 선택된 날짜 구독
	const selectedDate = useSelector(state => state.todoListSlice.selectedDate);

	// onChange 핸들러
	const onChangeHandler = e => {
		const { name, value } = e.target;
		setTodo({ ...selectedDate, ...todo, [name]: value });
	};

	// 투두 업로드 핸들러
	const uploadHandler = e => {
		e.preventDefault();
		dispatch(__addTodo(todo));
		setTodo({});
		setIsAddTodoModalOpen(false);
	};

	// 모달 닫기 핸들러
	const closeAddTodoModalHandler = () => {
		setIsAddTodoModalOpen(false);
		setTodo({});
	};

	return (
		// 오버레이
		<Flex bg="rgba(0, 0, 0, 0.5)" wd="100%" ht="100%" zIndex="1">
			{/* 모달 */}
			<Box variant="modalBox">
				{/* 닫기 버튼 */}
				<Flex jc="flex-end">
					<Svg onClick={closeAddTodoModalHandler} variant="close"></Svg>
				</Flex>

				{/* 폼 */}
				<Form variant="todoForm" onSubmit={uploadHandler}>
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

						<Flex gap="10px" ai="flex-start" mg="14px 0 0 0" wd="100%">
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
							/>
						</Flex>
					</Flex>

					{/* 추가 버튼 */}
					<Button variant="addTodo">추가하기</Button>
				</Form>
			</Box>
		</Flex>
	);
};

export default ModalAddTodo;
