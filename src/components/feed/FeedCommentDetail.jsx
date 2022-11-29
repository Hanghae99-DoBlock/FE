import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Flex, Image, Input, Text } from "../../common";

const FeedCommentDetail = props => {
	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);

	// console.log(props);
	const [isEdit, setIsEdit] = useState(false);
	const toggleIsEdit = () => setIsEdit(!isEdit);
	const [localContent, setLocalContent] = useState(
		props.content.commentContent,
	);
	const handleQuitEdit = () => {
		setIsEdit(false);
		setLocalContent(props.content.commentContent);
	};
	const handleEdit = () => {
		props.onEditComments(props.content.commentId, localContent);
		toggleIsEdit();
	};
	const handleClickRemove = () => {
		// console.log(props.content.commentId);
		props.onRemoveComment(props.content.commentId);
	};

	return (
		<Flex key={props.content?.commentId} dir="column">
			<Flex wd="335px" mg="10px 0" jc="flex-start">
				<Flex wd="335px" jc="space-between">
					<Flex>
						<Flex>
							<Image
								variant="commentImage"
								src={props.content?.profileImage}
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
							{props.content?.nickname}
							<Flex color="#A2A2A2" fs="13" mg="0 0 0 5px">
								{dayjs(props.content?.postedAt).format(`YYYY.MM.DD HH:mm`)}
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Flex wd="335px" fw="300" fs="14" lh="20" jc="flex-start">
				{isEdit ? (
					<Input
						variant="feedCommentInput"
						value={localContent}
						onChange={e => setLocalContent(e.target.value)}
					/>
				) : (
					<>{localContent}</>
				)}
			</Flex>
			<Flex wd="335px" jc="flex-start">
				<Flex mg="2px 0 0 0">
					{decodeToken.memberId === props.content.memberId ? (
						isEdit ? (
							<>
								<Text variant="comment" onClick={handleEdit}>
									수정완료
								</Text>
								<Text variant="deleteComment" onClick={handleQuitEdit}>
									취소
								</Text>
							</>
						) : (
							<>
								<Text variant="comment" onClick={toggleIsEdit}>
									수정
								</Text>
								<Text variant="deleteComment" onClick={handleClickRemove}>
									삭제
								</Text>
							</>
						)
					) : null}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default FeedCommentDetail;
