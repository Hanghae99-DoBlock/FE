import { Flex, Svg, Text } from "../../common";
import { TodoItem } from "../../components";

const ListingTodos = props => {
	const { year, month, date, todoList } = props;

	return (
		<Flex dir="column" gap="10px" pd="0 16px 26px" bg="#F9F9F9">
			{todoList[0] ? (
				// 투두가 있을 때
				todoList.map(todoItem => (
					<TodoItem
						key={todoItem.todoId}
						todoContent={todoItem.todoContent}
						todoId={todoItem.todoId}
						completed={todoItem.completed}
						todoMemo={todoItem.todoMemo}
					></TodoItem>
				))
			) : (
				// 투두가 없을 때
				<Flex dir="column" gap="21.5px">
					<Svg variant="todoEmpty" />
					<Text variant="greyBig">플랜이 없어요! 추가해주세요</Text>
				</Flex>
			)}
		</Flex>
	);
};

export default ListingTodos;
