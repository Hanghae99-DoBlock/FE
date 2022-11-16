import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Box, Button, Flex, Form, Input, Label, Svg } from "../../common";
import { updateIsAddTodoModalOpen } from "../../redux/modules/modal/modalSlice";
import "./style/AddFeedStyle.css";

const AddFeedModal = ({ setOpenModal }) => {
	const [isChecked, setIsChecked] = useState(false);

	const closeModalHandler = () => {
		setOpenModal(false);
	};

	const changeCheckedHandler = e => {
		setIsChecked(!isChecked);
		console.log(e.target.checked);
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
					<Flex
						wd="248px"
						ht="157px"
						jc="flex-start"
						ai="flex-start"
						dir="column"
						overflow="auto"
						gap="15px"
					>
						<Flex
							wd="231px"
							ht="29px"
							jc="flex-start"
							ai="flex-start"
							gap="8px"
							fs="14"
							bb="1px solid #F2F2F5"
						>
							<label className="checkbox-wrap">
								{!isChecked ? (
									<Svg variant="nonCheck" />
								) : (
									<Svg variant="check" />
								)}

								<StCheckBox
									onClick={changeCheckedHandler}
									type="checkbox"
									name="todo"
								/>
							</label>
							<Flex jc="flex-start" ai="flex-start" fs="14" lh="22">
								나르을 위해서
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Box>
		</Flex>
	);
};

export default AddFeedModal;

export const StCheckBox = styled.input`
	border: 1px solid red;
`;
