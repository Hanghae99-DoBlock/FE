import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FirstHeading, Flex, SecondHeading, Svg } from "../../common";
import { FeedComment } from "../../components";
import { __getFeedItem } from "../../redux/modules/feed/feedSlice";

const DetailFeedPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const feedItem = useSelector(state => state.feed.feedItem);

	const {
		feedId,
		feedTitle,
		feedContent,
		todoList,
		feedImagesUrlList,
		tagList,
		postedAt,
		memberId,
		nickname,
		profileImageUrl,
		followOrNot,
		commentResponseDtoList,
		countComment,
		countReaction,
		currentReactionType,
		reactionResponseDtoList,
	} = feedItem;

	useEffect(() => {
		dispatch(__getFeedItem(id));
	}, []);

	return (
		<>
			<Flex
				dir="column"
				mw="375px"
				mxw="375px"
				mh="667px"
				mg="0 auto"
				overflow="auto"
			>
				<Flex wd="375px" mg="auto" dir="column">
					<Flex wd="335px" jc="space-between" mg=" 0 0 10px 0">
						<Svg variant="chevron" onClick={() => navigate(-1)} />
						<Flex>
							<FirstHeading color="#A2A2A2" mg="0 10px 0 0" fs="16" fw="600">
								수정
							</FirstHeading>
							<FirstHeading color="#FD3049" fs="16" fw="600">
								삭제
							</FirstHeading>
						</Flex>
					</Flex>
					<Flex wd="335px" jc="space-between" mg="0 0 20px 0">
						<Flex wd="335px" jc="flex-start">
							<Flex>
								<Box
									variant="profilePicNormal"
									profileImageUrl={profileImageUrl}
								/>
							</Flex>
							<Flex dir="column" ai="flex-start">
								<Flex ai="flex-start" mg="0 0 5px 0">
									<Flex
										fw="600"
										fs="13"
										onClick={() => {
											// anotherMemberPage(.memberId);
										}}
									>
										{nickname}
										<Flex
											bc="#FFF4ED"
											color="#FF8737"
											fs="10"
											radius="5px"
											pd="4px 8px;"
										>
											뱃지입니다
										</Flex>
									</Flex>
								</Flex>
								<Flex>
									<SecondHeading fw="600" fs="12px" color="#A2A2A2">
										{dayjs(postedAt).format(`YYYY.MM.DD HH:mm`)}
									</SecondHeading>
								</Flex>
							</Flex>
						</Flex>
						<Flex>
							<Flex>
								<Svg variant="follow" onClick={() => {}}></Svg>
							</Flex>
						</Flex>
					</Flex>
					<Flex
						wd="335px"
						fw="600"
						fs="22"
						color="#131313"
						mg="0 0 30px 0"
						lh="30"
						jc="flex-start"
					>
						{feedTitle}
					</Flex>
					<Flex
						dir="column"
						ai="flex-start"
						wd="335px"
						ht="133px"
						bc="#F8F8F8"
						radius="5px"
						pd="20px"
						mg="0 0 20px 0"
					>
						<Flex mg="5px" dir="column">
							{todoList?.map((todoItem, index) => (
								<Flex key={index} dir="row">
									<Svg variant="feedCheck"></Svg>
									<FirstHeading fw="300" fs="14px" color="#131313">
										{todoItem}
									</FirstHeading>
								</Flex>
							))}
						</Flex>
					</Flex>
					<Flex
						wd="335px"
						lh="25"
						fw="300"
						fs="14px"
						color="#131313"
						mg="0 0 20px 0"
						jc="flex-start"
					>
						{feedContent}
					</Flex>
					{feedImagesUrlList?.map((feedImg, index) => (
						<Box variant="feedImg" feedImgUrl={feedImg} />
					))}
					<Flex wd="335px" dir="column">
						<Flex wd="335px" jc="flex-start" mg="0 0 10px 0">
							{tagList?.map((tagItem, index) => (
								<Flex
									key={index}
									wd="95px"
									ht="29px"
									bg="#fff"
									border="1px solid #E5E5E5"
									radius="24px"
									mg="0 5px"
								>
									<FirstHeading fw="300" fs="13px" color="#131313">
										# {tagItem}
									</FirstHeading>
								</Flex>
							))}
						</Flex>
					</Flex>
				</Flex>
				<FeedComment
					commentResponseDtoList={commentResponseDtoList}
					countComment={countComment}
					countReaction={countReaction}
					currentReactionType={currentReactionType}
					reactionResponseDtoList={reactionResponseDtoList}
				/>
			</Flex>
		</>
	);
};

export default DetailFeedPage;
