import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Flex, Hr, Input, Svg, Text } from "../../common";
import {
	addCommentsApi,
	getCommentsApi,
	editCommentsApi,
	removeCommentsApi,
} from "../../api/todoListApi";
import FeedCommentDetail from "./FeedCommentDetail";
import ReactionModal from "./ReactionModal";

const FeedComment = props => {
	const { id } = useParams();

	const feedId = useSelector(state => state.feed.feedItem.feedId);

	useEffect(() => {
		getComments();
	}, []);

	const [modal, setModal] = useState(false);
	const [content, setContent] = useState();
	const [commentList, setCommentList] = useState([]);

	const onChangeHandler = e => {
		setContent(e.target.value);
	};

	const getComments = useCallback(async () => {
		const response = await getCommentsApi(id);
		setCommentList(response);
	}, [id]);

	const onCreateComment = async e => {
		e.preventDefault();
		const response = await addCommentsApi({ content, id });
		setCommentList([...commentList, response]);
		console.log(response);
		setContent("");
	};

	const onEditComments = async (commentId, newContent) => {
		const response = await editCommentsApi({
			feedId,
			commentId,
			content: newContent,
		});
		setCommentList(
			commentList.map(it =>
				it.commentId === commentId ? { ...it, commentContent: newContent } : it,
			),
		);
	};

	const onRemoveComment = async commentId => {
		// if (!window.confirm("삭제하시겠습니까?")) return false;
		const newCommentList = commentList.filter(it => it.commentId !== commentId);
		const response = await removeCommentsApi({
			feedId,
			commentId,
		});
		setCommentList(newCommentList);
		setContent("");
	};

	const reaction = useSelector(
		state => state.feed.feedItem.currentReactionType,
	);
	console.log(reaction);

	return (
		<>
			<Flex wd="335px" fw="600" fs="14px" jc="flex-end" mg="0 auto 10px auto">
				<Flex>{reaction?.reactionType}</Flex>
				리액션
			</Flex>
			<Hr variant="feedHr" />
			<Flex dir="column" jc="center">
				<Flex wd="335px" jc="space-between">
					{modal === true ? <ReactionModal /> : null}
					<Flex
						fw="600"
						fs="14px"
						color="#666666"
						jc="flex-start"
						mg="10px 0"
						onClick={() => {
							setModal(!modal);
						}}
					>
						<Svg variant="smile"></Svg>
						<Text variant="comment">리액션하기</Text>
					</Flex>
					<Flex>💬 댓글 {commentList?.length}</Flex>
				</Flex>
				<Hr variant="feedHr" />
				{commentList &&
					commentList.map(content => (
						<FeedCommentDetail
							key={content.commentId}
							content={content}
							onEditComments={onEditComments}
							onRemoveComment={onRemoveComment}
						/>
					))}
			</Flex>
			<Flex wd="335px" mg="10px">
				<form onSubmit={onCreateComment}>
					<Flex>
						<Input
							variant="feedInput"
							type="text"
							name="comments"
							placeholder="댓글을 입력하세요"
							onChange={onChangeHandler}
						/>
						<Svg variant="paperAirplane" onClick={onCreateComment}></Svg>
					</Flex>
				</form>
				<Flex mg="190px 0 0 0"></Flex>
			</Flex>
		</>
	);
};

export default FeedComment;
