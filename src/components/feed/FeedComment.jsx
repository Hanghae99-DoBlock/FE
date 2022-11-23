import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FirstHeading, Flex, Hr, Image, Input, Svg } from "../../common";
import { __addComment } from "../../redux/modules/commentSlice";

const FeedComment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const comments = useSelector(state => state.commentSlice.commentContent);
	console.log(comments);

	useEffect(() => {
		dispatch();
	}, []);

	//Comments 추가
	const [content, setContent] = useState("");

	const onChangeHandler = e => {
		setContent(e.target.value);
	};

	const addCommentHandler = e => {
		e.preventDetault();
		dispatch(__addComment(content, id));
	};

	return (
		<>
			<Flex
				wd="335px"
				fw="600"
				fs="14px"
				color="#666666"
				jc="flex-end"
				mg="0 auto 10px auto"
			>
				❤ 👍 리액션 3
			</Flex>
			<Hr variant="feedHr" />
			<Flex dir="column" jc="center">
				<Flex wd="335px" jc="space-between">
					<Flex fw="600" fs="14px" color="#666666" jc="flex-start" mg="10px 0">
						<Svg variant="smile"></Svg>{" "}
						<FirstHeading mg="0 0 0 5px">리액션하기</FirstHeading>
					</Flex>
					<Flex>💬 댓글 3</Flex>
				</Flex>
				<Hr variant="feedHr" />
				<Flex wd="335px" mg="10px 0" jc="flex-start">
					<Flex>
						<Image
							variant="commentImage"
							// src={.profileImage}
							alt=""
							style={{ marginTop: "4px", backgroundColor: "blue" }}
							onClick={() => {
								// anotherMemberPage(.memberId);
							}}
						/>
					</Flex>
					<Flex
						fw="600"
						fs="13"
						onClick={() => {
							// anotherMemberPage(.memberId);
						}}
					>
						닉네임
						<Flex color="#A2A2A2" fs="13" mg="0 0 0 5px">
							2022.11.21
						</Flex>
					</Flex>
				</Flex>
				<Flex wd="335px" fw="300" fs="14" lh="20">
					모바일에서는 최대 3줄까지 노출이 됩니다. 더 많아질 경우 더보기를
					붙입니다. 모바일에서는 최대 3줄까지 노출이 됩니다. 더 많아질 경우
					더보기를 붙입니다 이렇게붙여주세요 ...더보기
				</Flex>
			</Flex>
			<Flex mg="100px 0 0 0"></Flex>
			<Hr variant="feedHr" />
			<Flex wd="335px" mg="10px">
				<Input
					variant="feedInput"
					type="text"
					placeholder="댓글을 입력하세요"
					onChange={onChangeHandler}
				/>
				<Svg variant="paperAirplane" onClick={addCommentHandler}></Svg>
			</Flex>
		</>
	);
};

export default FeedComment;
