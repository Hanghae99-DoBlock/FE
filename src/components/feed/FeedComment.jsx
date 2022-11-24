import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Hr, Image, Input, Svg, Text } from "../../common";
import {
	__addComment,
	__deleteComment,
	__editComment,
} from "../../redux/modules/feed/feedSlice";

const FeedComment = props => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const comments = props?.commentResponseDtoList;
	const feedId = props?.feedId;

	const comment = useSelector(state => state);

	//Comments 추가
	const [content, setContent] = useState("");

	const onChangeHandler = e => {
		setContent(e.target.value);
	};

	const addCommentHandler = e => {
		e.preventDefault();
		dispatch(__addComment({ content, id }));
		setContent("");
	};

	const [selected, setSelected] = useState(null);

	const [commentText, setCommentText] = useState("");

	const editComment = () => {
		if (commentText !== "") {
			dispatch(__editComment({ id: selected, text: commentText }));
		} else {
			return;
		}
		setCommentText("");
	};
	const deleteComment = commentId => {
		dispatch(
			__deleteComment({
				feedId,
				commentId,
			}),
		);
	};

	return (
		<>
			<Flex wd="430px" fw="600" fs="14px" jc="flex-end" mg="0 auto 10px auto">
				<Text variant="comment" color="red" mg="0 5px 0 0">
					❤
				</Text>
				👍 리액션 3
			</Flex>
			<Hr variant="feedHr" />
			<Flex dir="column" jc="center">
				<Flex wd="430px" jc="space-between">
					<Flex fw="600" fs="14px" color="#666666" jc="flex-start" mg="10px 0">
						<Svg variant="smile"></Svg>
						<Text variant="comment">리액션하기</Text>
					</Flex>
					<Flex>💬 댓글 {comments?.length}</Flex>
				</Flex>
				<Hr variant="feedHr" />
				{comments &&
					comments.map(content => (
						<Flex key={content.commentId} dir="column">
							<Flex wd="430px" mg="10px 0" jc="flex-start">
								<Flex wd="430px" jc="space-between">
									<Flex>
										<Flex>
											<Image
												variant="commentImage"
												src={content.profileImage}
												alt=""
												style={{ marginTop: "4px" }}
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
											{content.nickname}
											<Flex color="#A2A2A2" fs="13" mg="0 0 0 5px">
												{content.postedAt}
											</Flex>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
							<Flex wd="430px" fw="300" fs="14" lh="20" jc="flex-start">
								{content.commentContent}
							</Flex>
							<Flex wd="430px" jc="flex-start">
								<Flex mg="2px 0 0 0">
									<Text variant="comment">수정</Text>
									<Text
										variant="deleteComment"
										onClick={() => {
											deleteComment(content.commentId);
										}}
									>
										삭제
									</Text>
								</Flex>
							</Flex>
						</Flex>
					))}
			</Flex>
			<Flex wd="430px" mg="10px">
				<form onSubmit={addCommentHandler}>
					<Flex>
						<Input
							variant="feedInput"
							type="text"
							name="comments"
							placeholder="댓글을 입력하세요"
							onChange={onChangeHandler}
						/>
						<Svg variant="paperAirplane" onClick={addCommentHandler}></Svg>
					</Flex>
				</form>
				<Flex mg="190px 0 0 0"></Flex>
			</Flex>
		</>
	);
};

export default FeedComment;
