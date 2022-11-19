import { useDispatch } from "react-redux";
import { Box, Flex, Svg } from "../../common";
import {
	TodoListCalendar,
	ListingTodos,
	TodoListHeader,
	NavBelow,
} from "../../components";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";

const TodoListPage = () => {
	const dispatch = useDispatch();

	const openAddTodoModalHandler = () => {
		dispatch(updateIsAddTodoModalOpen());
	};

	return (
		<>
			<Flex dir="column" ht="100%">
				<TodoListCalendar />
			</Flex>
			<NavBelow />
		</>
	);
};

export default TodoListPage;
