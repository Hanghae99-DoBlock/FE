import { useDispatch } from "react-redux";
import { Box, Flex, Svg } from "../../common";
import {
	TodoListCalendar,
	ListingTodos,
	TodoListHeader,
} from "../../components";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";

const TodoListPage = () => {
	const dispatch = useDispatch();

	const openAddTodoModalHandler = () => {
		dispatch(updateIsAddTodoModalOpen());
	};

	return (
		<>
			<Flex dir="column" ht="100vh" bg="#F9F9F9">
				<TodoListCalendar />
				{/* 투두 추가 모달 오픈 버튼 */}
				<Flex wd="100%" position="sticky" bottom="70px" jc="flex-end" pd="10px">
					<Svg onClick={openAddTodoModalHandler} variant="addTodo" />
				</Flex>
			</Flex>
		</>
	);
};

export default TodoListPage;
