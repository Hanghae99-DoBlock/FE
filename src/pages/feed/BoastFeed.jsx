import React from "react";
import { useDispatch } from "react-redux";
import { Flex, Svg, Box } from "../../common";
import { deleteTodo } from "../../redux/modules/feed/feedSlice";

const BoastFeed = ({ todo }) => {
	const dispatch = useDispatch();

	const deleteTodoHandler = () => {
		dispatch(deleteTodo(todo));
		console.log("클릭");
	};

	return (
		<Box variant="feedTodo">
			<Flex jc="space-between" wd="335px">
				<Flex>{todo}</Flex>
			</Flex>
		</Box>
	);
};

export default BoastFeed;
