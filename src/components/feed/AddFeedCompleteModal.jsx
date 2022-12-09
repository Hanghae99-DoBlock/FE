import { Box, Button, Flex, Form, Input, Label, Svg } from "../../common";
import React from "react";

import { __getSuccessTodo } from "../../redux/modules/feed/feedSlice";
import { useNavigate } from "react-router-dom";

const AddFeedCompleteModal = ({ setCompletedModal }) => {
	const navigate = useNavigate();
	const closeModalHandler = () => {
		setCompletedModal(false);
		navigate("/feed/following");
	};
	return (
		<Flex
			bg="rgba(0, 0, 0, 0.5)"
			position="fixed"
			mxw="320px"
			mw="430px"
			ht="100%"
			zIndex="3"
			dir="column"
		>
			{/* 모달 */}
			<Box variant="addFeedComplete">
				<Flex dir="column" ai="none" jc="none" gap="7px" overflowX="hidden">
					<Flex jc="flex-end">
						{/* 닫기 버튼 */}
						<Svg variant="close" onClick={closeModalHandler}></Svg>
					</Flex>
					<Flex
						mg="15px 0 0 35px"
						wd="163px"
						ht="95px"
						bi="url(/images/addFeedCompleted.svg)"
					/>
					<Flex dir="column" gap="15px">
						<Flex mg="15px 0 0 0" fs="18" fw="600">
							블럭이 쌓였습니다!
						</Flex>
						<Flex
							fs="14"
							fw="400"
							color="#666666
"
						>
							피드를 확인해 보세요!
						</Flex>
					</Flex>
				</Flex>
			</Box>
		</Flex>
	);
};

export default AddFeedCompleteModal;
