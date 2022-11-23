import React from "react";
import { useDispatch } from "react-redux";
import { Flex, Svg, Box } from "../../common";
import { deleteTodo } from "../../redux/modules/feed/feedSlice";

const BoastFeed = ({ todo }) => {
	return (
		<Box variant="feedTodo">
			<Flex jc="space-between" wd="335px">
				<Flex>{todo.todoContent}</Flex>
			</Flex>
		</Box>
	);
};

export default BoastFeed;
