import { Box, Flex } from "../../common";
import {
	TodoListCalendar,
	ListingTodos,
	TodoListHeader,
} from "../../components";

const TodoListPage = () => {
	return (
		<Flex fd="column" height="100%">
			<TodoListCalendar />
			<Box variant="todoListArea">
				{/* 투두 리스트 헤더 */}
				<TodoListHeader />
				{/* 투두 리스트 */}
				<ListingTodos />
			</Box>
		</Flex>
	);
};

export default TodoListPage;
