import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListingTodos } from ".";
import { Flex, Svg, Text } from "../../common";
import { __getTodoList } from "../../redux/modules/todoList/todoListSlice";

const TodoListHeader = props => {
	const { year, month, date, day } = props;

	const dispatch = useDispatch();

	const todoList = useSelector(state => state.todoListSlice.todoList);

	useEffect(() => {
		dispatch(__getTodoList(props));
	}, []);

	return (
		<>
			<Flex ht="70px" jc="space-between" pd="23px 20px">
				<Flex gap="15px">
					{/* 날짜 */}
					<Text variant="big">
						{date}.{day}
					</Text>
					{/* 할 일 개수 */}
					<Text variant="grey">할 일 {todoList.length}개</Text>
				</Flex>

				{/* 휴지통 */}
				<Svg variant="trashCan" />
			</Flex>
			<ListingTodos year={year} month={month} date={date} todoList={todoList} />
		</>
	);
};

export default TodoListHeader;
