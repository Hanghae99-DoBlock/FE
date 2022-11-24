import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FirstHeading, Flex, Form, Hr, Image, Input, Svg } from "../../common";
import {
	__addComment,
	__deleteComment,
	__editComment,
} from "../../redux/modules/commentSlice";

const FeedComment = props => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const comments = props?.commentResponseDtoList;
	const feedId = props?.feedId;

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
			<Flex wd="335px" fw="600" fs="14px" jc="flex-end" mg="0 auto 10px auto">
				<FirstHeading color="red" mg="0 5px 0 0">
					❤
				</FirstHeading>{" "}
				👍 리액션 3
			</Flex>
			<Hr variant="feedHr" />
			<Flex dir="column" jc="center">
				<Flex wd="335px" jc="space-between">
					<Flex fw="600" fs="14px" color="#666666" jc="flex-start" mg="10px 0">
						<Svg variant="smile"></Svg>{" "}
						<FirstHeading mg="0 0 0 5px">리액션하기</FirstHeading>
					</Flex>
					<Flex>💬 댓글 {comments?.length}</Flex>
				</Flex>
				<Hr variant="feedHr" />
				{comments &&
					comments.map(content => (
						<>
							<Flex
								wd="335px"
								mg="10px 0"
								jc="flex-start"
								key={content.memberId}
							>
								<Flex wd="335px" jc="space-between">
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
									<Flex>
										<Flex>
											<Svg variant="editComment" onClick={editComment}></Svg>
											<Svg
												variant="trashCanComment"
												onClick={() => {
													deleteComment(content.commentId);
												}}
											></Svg>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
							<Flex wd="335px" fw="300" fs="14" lh="20" jc="flex-start">
								{content.commentContent}
							</Flex>
						</>
					))}
			</Flex>
			<Flex wd="335px" mg="10px">
				<Form variant="feedCommentForm" onSubmit={addCommentHandler}>
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
				</Form>
				<Flex mg="190px 0 0 0"></Flex>
			</Flex>
		</>
	);
};

export default FeedComment;
