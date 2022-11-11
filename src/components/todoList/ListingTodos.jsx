import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../../common";
import { TodoItem } from "../../components";
// import { __getTodoList } from "../../redux/modules/todoList/todoSlice";

const ListingTodos = () => {
	// const todoList = useSelector(state => state.todoSlice.todoList);
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(__getTodoList());
	}, []);

	return (
		<Flex gap="10px" dir="column" pd="0 16px 26px">
			{/* {todoList.map(todoItem => (
				<TodoItem key={todoItem.id} todoItem={todoItem.todo}></TodoItem>
			))} */}
		</Flex>
	);
};

export default ListingTodos;
