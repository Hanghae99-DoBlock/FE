import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Flex, FloatingAddBtn } from "../../common";
import {
	TodoListCalendar,
	NavBelow,
	TodoList,
	ModalAddTodo,
	ModalDetailTodo,
} from "../../components";
import { DragDropContext } from "react-beautiful-dnd";
import { getTodoListApi, swithTodoApi } from "../../api/todoListApi";

const TodoListPage = () => {
	const selectedDate = useSelector(state => state.todoListSlice.selectedDate);

	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const requestGetTodoList = () => {
		getTodoListApi(selectedDate)
			.then(res => {
				setIsLoading(false);
				setTodoList(res);
			})
			.catch(err => setIsLoading(false));
	};

	useEffect(() => {
		if (selectedDate.year) {
			requestGetTodoList();
		}
	}, [selectedDate]);

	// 모달 상태 관리
	const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
	const [isDetailTodoModalOpen, setIsDetailTodoModalOpen] = useState(false);

	// 투두 추가 모달 오픈 핸들러
	const openAddTodoModalHandler = () => {
		setIsAddTodoModalOpen(true);
	};

	// 드래그가 끝났을 때 변경된 index에 아이템이 위치하도록 하기
	const onDragEndHandler = result => {
		// 올바르지 않은 위치에 드래그했을 경우 함수 종료
		if (!result.destination) return;
		// 기존 배열 복사
		const coppiedTodoList = Array.from(todoList);
		// 드래그한 아이템 뽑아오기
		const [reordredTodoItem] = coppiedTodoList.splice(result.source.index, 1);
		// 변경된 위치에 아이템 추가
		coppiedTodoList.splice(result.destination.index, 0, reordredTodoItem);
		const todoIdList = coppiedTodoList.map(todoItem => todoItem.todoId);
		// 배열 교체
		swithTodoApi({
			year: selectedDate.year,
			month: selectedDate.month,
			day: selectedDate.day,
			todoIdList: todoIdList,
			todoList: coppiedTodoList,
		});
		setTodoList(coppiedTodoList);
	};

	return (
		<>
			{/* 투두 추가 모달 */}
			{isAddTodoModalOpen ? (
				<Flex wd="100%" ht="100%" ai="flex-start" position="absolute">
					<Flex wd="100%" ht="100vh" position="relative">
						<Flex wd="100%" ht="100%" zIndex="2">
							<ModalAddTodo
								todoList={todoList}
								setTodoList={setTodoList}
								setIsAddTodoModalOpen={setIsAddTodoModalOpen}
							/>
						</Flex>
					</Flex>
				</Flex>
			) : null}

			{/* 디테일 모달 */}
			{isDetailTodoModalOpen ? (
				<Flex wd="100%" ht="100%" ai="flex-start" position="absolute">
					<Flex wd="100%" ht="100vh" position="relative">
						<Flex wd="100%" ht="100%" zIndex="2">
							<ModalDetailTodo
								todoList={todoList}
								setTodoList={setTodoList}
								setIsDetailTodoModalOpen={setIsDetailTodoModalOpen}
							/>
						</Flex>
					</Flex>
				</Flex>
			) : null}

			{/* 투두 추가 모달 오픈 버튼 */}
			<FloatingAddBtn onClick={openAddTodoModalHandler} />

			<Flex wd="100%" dir="column" jc="flex-start" ht="100vh">
				{/* 캘린더 */}
				<TodoListCalendar />

				{/* 투두리스트 */}
				<DragDropContext onDragEnd={onDragEndHandler}>
					<TodoList
						isLoading={isLoading}
						todoList={todoList}
						setTodoList={setTodoList}
						setIsDetailTodoModalOpen={setIsDetailTodoModalOpen}
					/>
				</DragDropContext>

				{/* 네비게이션 바 */}
				<NavBelow />
			</Flex>
		</>
	);
};

export default TodoListPage;
