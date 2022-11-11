import { Flex, Svg, Text } from "../../common";

const TodoListHeader = () => {
	return (
		<Flex height="70px" jc="space-between" pd="23px 20px">
			<Flex gap="15px">
				{/* 날짜 */}
				<Text variant="big">8.화</Text>
				{/* 할 일 개수 */}
				<Text variant="grey">할 일 5개</Text>
			</Flex>

			{/* 휴지통 */}
			<Svg variant="trashCan" />
		</Flex>
	);
};

export default TodoListHeader;
