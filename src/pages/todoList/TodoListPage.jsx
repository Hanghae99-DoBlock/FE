import { useDispatch } from "react-redux";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";
import { Box, Flex, Svg } from "../../common";
import {
	TodoListCalendar,
	ListingTodos,
	TodoListHeader,
} from "../../components";

const TodoListPage = () => {
	const dispatch = useDispatch();

	const openAddTodoModalHandler = () => {
		dispatch(updateIsAddTodoModalOpen());
	};

	return (
		<Flex dir="column">
			<TodoListCalendar />
			<Box variant="todoListArea">
				{/* 투두 리스트 헤더 */}
				<TodoListHeader />
				{/* 투두 리스트 */}
				<ListingTodos />
				{/* 투두 추가 모달 오픈 버튼 */}
				<Svg onClick={openAddTodoModalHandler} variant="addTodo" />
			</Box>
		</Flex>
	);
};

export default TodoListPage;
