import { useDispatch } from "react-redux";
import { Flex, Svg, Text } from "../../common";
import { updateIsDetailTodoModalOpen } from "../../redux/modules/modal/modalSlice";

const TodoItem = ({ todoItem }) => {
	const dispatch = useDispatch();

	const onClickTodoItemHandler = () => {
		dispatch(updateIsDetailTodoModalOpen(todoItem));
	};

	return (
		<>
			{/* 투두 박스 */}
			<Flex
				onClick={onClickTodoItemHandler}
				width="100%"
				height="51px"
				radius="10px"
				bgColor="#FFFFFF"
				pad="12px 10px"
			>
				{/* icons: 햄버거, 체크박스 */}
				<Flex gap="7px">
					{/* 햄버거 */}
					<Svg variant="hamburger" />
					{/* 체크박스 */}
					<Svg variant="checkBox" />
				</Flex>

				{/* 투두 컨텐트 */}
				<Flex jc="flex-start" width="100%" margin="0 0 0 16px">
					<Text variant="normal">{todoItem}</Text>
				</Flex>
			</Flex>
		</>
	);
};

export default TodoItem;
