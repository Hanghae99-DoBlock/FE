import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Box, Button, Flex, Form, Input, Label, Svg } from "../../common";
import React from "react";
import { ChoiceTodo } from "../../components/feed";
import { __getSuccessTodo } from "../../redux/modules/feed/feedSlice";

const ChoiceTodoModal = ({ setOpenModal }) => {
	const dispatch = useDispatch();
	const successTodolist = useSelector(state => state.feed.successTodo);
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth();
	const day = today.getDate();
	/*목록 가져오기*/
	useEffect(() => {
		dispatch(__getSuccessTodo({ year: year, month: month + 1, date: day }));
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
				<Flex dir="column" ai="none" jc="none" gap="7px" overflowX="hidden">
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
					<Flex
						dir="column"
						overflowY="auto"
						overflowX="hidden"
						gap="15px"
						wd="250px"
						ht="157px"
						jc="flex-start"
					>
						{/*등록된 투두리스트 목록을 체크박스에서 체크할 수 있게 불러옴*/}
						{successTodolist?.map(todo => {
							return <ChoiceTodo todo={todo} key={todo.todoId} />;
						})}
					</Flex>
					<Flex>
						<Button onClick={closeModalHandler} variant="addBoastTodo">
							선택 완료
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Flex>
	);
};

export default ChoiceTodoModal;

export const StCheckBox = styled.input`
	border: 1px solid red;
	display: none;
`;
