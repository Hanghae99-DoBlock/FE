import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Box, Button, Flex, Form, Input, Label, Svg } from "../../common";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";
import { __getTodoList } from "../../redux/modules/todoList/todoListSlice";
import FeedPage from "./ChoiceTodo";
import "./style/AddFeedStyle.css";
import React from "react";

const ChoiceTodoModal = ({ setOpenModal }) => {
	const dispatch = useDispatch();

	const todolist = useSelector(state => state?.todoListSlice?.todoList);

	const [checkTodo, setCheckTodo] = useState([]);
	/*목록 가져오기*/
	useEffect(() => {
		dispatch(__getTodoList());
	}, []);

	const closeModalHandler = () => {
		setOpenModal(false);
	};

	return (
		<Flex
			bg="rgba(0, 0, 0, 0.6)"
			position="fixed"
			mxw="320px"
			mw="430px"
			ht="100%"
			zIndex="1"
			dir="column"
		>
			{/* 모달 */}
			<Box variant="feedModal">
				<Flex dir="column" ai="none" jc="none" gap="7px">
					<Flex jc="flex-end">
						{/* 닫기 버튼 */}
						<Svg variant="close" onClick={closeModalHandler}></Svg>
					</Flex>
					<Flex jc="flex-start" fs="20" fw="600" pd="5px 0">
						투두 선택
					</Flex>
					<Flex fs="15" jc="flex-start" pd="5px 0">
						자랑하고 싶은 투두를 선택해주세요!
					</Flex>
					<Flex jc="flex-start" fs="13" color="#979797" mg="0 0 24px 0">
						최대 3개 선택 가능합니다
					</Flex>
					{todolist?.map(todo => {
						return <FeedPage todo={todo} />;
					})}
				</Flex>
			</Box>
		</Flex>
	);
};

export default React.memo(ChoiceTodoModal);

export const StCheckBox = styled.input`
	border: 1px solid red;
`;
