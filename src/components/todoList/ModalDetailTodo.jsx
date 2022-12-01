import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateTodoApi } from "../../api/todoListApi";
import {
	Box,
	Button,
	Flex,
	Form,
	Input,
	Label,
	Svg,
	Text,
	TextArea,
} from "../../common";

const ModalDetailTodo = ({
	todoList,
	setTodoList,
	setIsDetailTodoModalOpen,
}) => {
	// state 구독
	const todoItem = useSelector(state => state.todoListSlice.todoItem);
	const selectedDate = useSelector(state => state.todoListSlice.selectedDate);

	// 수정 상태 관리
	const [isEdit, setIsEdit] = useState(false);
	const [todo, setTodo] = useState({});

	// 모달 닫기 핸들러
	const closeDetailModalHandler = () => {
		setIsDetailTodoModalOpen(false);
	};

	// 수정 상태로 변경하는 핸들러
	const editHandler = e => {
		e.preventDefault();
		setIsEdit(true);
	};

	// onChange 핸들러
	const onChangeHandler = e => {
		const { name, value } = e.target;
		setTodo({
			...selectedDate,
			todoId: todoItem.todoId,
			...todo,
			[name]: value,
		});
	};

	// 수정한 투두 업로드 핸들러
	const uploadHandler = e => {
		e.preventDefault();
		updateTodoApi(todo);
		const updatedTodoList = todoList.map(todoItem => {
			return todoItem.todoId === todo.todoId ? todo : todoItem;
		});
		setTodoList(updatedTodoList);
		setIsDetailTodoModalOpen(false);
	};

	// 수정 시를 대비하여 todo 초깃값 설정
	useEffect(() => {
		setTodo({
			...selectedDate,
			todoId: todoItem.todoId,
			todoContent: todoItem.todoContent,
			todoMemo: todoItem.todoMemo || "",
			completed: todoItem.completed,
		});
	}, []);

	// 상태에 따라 메모 영역에 보여줄 컴포넌트
	const memoUi = {
		memoEdit: (
			<TextArea
				onChange={onChangeHandler}
				value={todo.todoMemo || ""}
				name="todoMemo"
				variant="memo"
				placeholder="메모"
				maxLength="100"
			/>
		),
		memoExist: (
			<Box variant="memocrollArea">
				<Text variant="small">{todoItem.todoMemo}</Text>
			</Box>
		),
		memoNotExist: <Text variant="grey">작성한 메모가 없습니다</Text>,
	};

	// 상태에 따라 변수 재할당
	let memoStatus;
	let onClickHandlerStatus;
	if (isEdit) {
		memoStatus = "memoEdit";
		onClickHandlerStatus = uploadHandler;
	} else if (todoItem.todoMemo) {
		memoStatus = "memoExist";
		onClickHandlerStatus = editHandler;
	} else {
		memoStatus = "memoNotExist";
		onClickHandlerStatus = editHandler;
	}

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
						{isEdit ? (
							<Input
								autoFocus
								onChange={onChangeHandler}
								value={todo.todoContent}
								variant="todoInput"
								name="todoContent"
							/>
						) : (
							<Box variant="todoContent">
								<Text variant="medium">{todoItem.todoContent}</Text>
							</Box>
						)}
						<Flex gap="10px" jc="flex-start" mg="14px 0 0 0" wd="100%">
							{/* 메모 아이콘*/}
							<Box variant="memoIconBox">
								<Svg variant="memo" />
							</Box>

							{/* 메모 */}
							{memoUi[memoStatus]}
						</Flex>
					</Flex>

					{/* 버튼 */}
					<Flex dir="row" gap="9px">
						<Button onClick={onClickHandlerStatus} variant="modTodo">
							<Flex wd="100%" dir="row" gap="5px">
								<Svg variant="write" />
								{isEdit ? "수정완료" : "수정하기"}
							</Flex>
						</Button>
						<Button variant="shareTodo">
							<Svg variant="share" />
						</Button>
					</Flex>
				</Form>
			</Box>
		</Flex>
	);
};

export default ModalDetailTodo;
