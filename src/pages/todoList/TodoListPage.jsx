import { useState } from "react";
import { Flex, Svg } from "../../common";
import {
	TodoListCalendar,
	NavBelow,
	TodoList,
	ModalAddTodo,
} from "../../components";

const TodoListPage = () => {
	// 투두 추가 모달 상태 관리
	const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

	// 투두 추가 모달 오픈 핸들러
	const openAddTodoModalHandler = () => {
		setIsAddTodoModalOpen(true);
	};

	return (
		<>
			<Flex dir="column" ht="100vh" bg="#F9F9F9">
				{/* 캘린더 */}
				<TodoListCalendar />

				{/* 투두리스트 */}
				<TodoList />

				{/* 투두 추가 모달 오픈 버튼 */}
				<Flex wd="100%" position="sticky" bottom="70px" jc="flex-end" pd="10px">
					<Svg onClick={openAddTodoModalHandler} variant="addTodo" />
					{/* <Svg onClick={openAddTodoModalHandler} variant="addTodo" /> */}
				</Flex>
			</Flex>

			{/* 네비게이션 바 */}
			<NavBelow />

			{/* 모달 */}
			{isAddTodoModalOpen ? (
				<ModalAddTodo setIsAddTodoModalOpen={setIsAddTodoModalOpen} />
			) : null}
		</>
	);
};

export default TodoListPage;
