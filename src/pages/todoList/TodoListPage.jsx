import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Svg } from "../../common";
import {
	TodoListCalendar,
	NavBelow,
	TodoList,
	ModalAddTodo,
	ModalDetailTodo,
} from "../../components";

const TodoListPage = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("accessToken");
	if (!token) {
		navigate("/signin");
		console.log("#############");
	}

	// 투두 추가 모달 상태 관리
	const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

	// 투두 추가 모달 오픈 핸들러
	const openAddTodoModalHandler = () => {
		setIsAddTodoModalOpen(true);
	};

	// 디테일 모달 상태 관리
	const [isDetailTodoModalOpen, setIsDetailTodoModalOpen] = useState(false);

	return (
		<>
			{/* 투두 추가 모달 */}
			{isAddTodoModalOpen ? (
				<Flex wd="100%" ht="100%" ai="flex-start" position="absolute">
					<Flex wd="100%" ht="100vh" position="relative">
						<Flex wd="100%" ht="100%" zIndex="2">
							<ModalAddTodo setIsAddTodoModalOpen={setIsAddTodoModalOpen} />
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
								setIsDetailTodoModalOpen={setIsDetailTodoModalOpen}
							/>
						</Flex>
					</Flex>
				</Flex>
			) : null}

			{/* 투두 추가 모달 오픈 버튼 */}
			<Flex wd="100%" position="relative">
				<Flex wd="100%" position="absolute" jc="flex-end">
					<Flex position="fixed" bottom="80px" zIndex="1" mg="0 5px 0 0">
						<Svg onClick={openAddTodoModalHandler} variant="addTodo" />
					</Flex>
				</Flex>
			</Flex>

			<Flex dir="column" jc="flex-start" ht="100vh">
				{/* 캘린더 */}
				<TodoListCalendar />

				{/* 투두리스트 */}
				<TodoList setIsDetailTodoModalOpen={setIsDetailTodoModalOpen} />
				{/* 네비게이션 바 */}
				<NavBelow />
			</Flex>
		</>
	);
};

export default TodoListPage;
