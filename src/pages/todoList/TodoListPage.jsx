import { Box, Flex } from "../../common";
import {
	TodoListCalendar,
	ListingTodos,
	TodoListHeader,
	NavBelow,
} from "../../components";

const TodoListPage = () => {
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
