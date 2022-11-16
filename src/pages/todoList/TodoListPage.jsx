import { Box, Flex } from "../../common";
import {
	TodoListCalendar,
	ListingTodos,
	TodoListHeader,
} from "../../components";

const TodoListPage = () => {
	return (
		<Flex dir="column" ht="100%">
			<TodoListCalendar />
		</Flex>
	);
};

export default TodoListPage;
