import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Box, Text, Svg } from "../../common";
import { FeedComment, NavBelow } from "../../components";
import { __getFeedItem } from "../../redux/modules/feed/feedSlice";
import { __followThunk } from "../../redux/modules/profileSlice";

const DetailFeedPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const feedItem = useSelector(state => state.feed.feedItem);
	const commentList = useSelector(state => state.commentSlice.commentList);

	const {
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
		feedId,
	} = feedItem;

	const [isfollowing, setIsFollowing] = useState(followOrNot);

	useEffect(() => {
		dispatch(__getFeedItem(id));
		setIsFollowing(followOrNot);
	}, []);

	const onClickFollowHandler = () => {
		dispatch(__followThunk(memberId));
		setIsFollowing(!isfollowing);
	};

	return (
		<>
			<Flex dir="column" wd="100%">
				<Flex wd="100%" dir="column">
					{/* 헤더 */}
					<Flex wd="100%" ht="60px" jc="space-between" pd="18px">
						<Svg variant="chevron" onClick={() => navigate(-1)} />
						<Flex gap="14px">
							<Text variant="grey">수정</Text>
							<Text variant="red">삭제</Text>
						</Flex>
					</Flex>

					{/* 프로필 영역 */}
					<Flex wd="100%" ht="66px" jc="space-between" pd="14px 20px">
						<Flex jc="flex-start" gap="10px">
							{/* 프로필 사진 */}
							<Flex
								onClick={() => navigate(`/profile/${memberId}`)}
								cursor="pointer"
							>
								<Box
									variant="profilePicNormal"
									profileImageUrl={profileImageUrl}
								/>
							</Flex>
							<Flex
								ht="100%"
								dir="column"
								ai="flex-start"
								jc="space-between"
								gap="3px"
							>
								{/* 닉네임, 뱃지 */}
								<Flex ht="100%" ai="center" gap="4px">
									<Flex
										onClick={() => navigate(`/profile/${memberId}`)}
										cursor="pointer"
									>
										<Text variant="selectedTabMenu">{nickname}</Text>
									</Flex>
									<Flex
										wd="60px"
										ht="20px"
										bg="#FFF4ED"
										jc="center"
										radius="5px"
									>
										<Text variant="orange">뱃지</Text>
									</Flex>
								</Flex>

								{/* 게시글 생성 날짜 */}
								<Flex>
									<Text variant="grey">
										{dayjs(postedAt).format(`YYYY.MM.DD HH:mm`)}
									</Text>
								</Flex>
							</Flex>
						</Flex>
						<Flex>
							{/* 팔로우 버튼 */}
							<Flex>
								{isfollowing ? (
									<Svg variant="followCancel" onClick={onClickFollowHandler} />
								) : (
									<Svg variant="follow" onClick={onClickFollowHandler} />
								)}
							</Flex>
						</Flex>
					</Flex>

					{/* 제목 */}
					<Flex wd="100%" pd="8px 29px 16px" jc="flex-start">
						<Text variant="title">{feedTitle}</Text>
					</Flex>

					{/* 투두리스트 영역 */}
					<Flex wd="100%" radius="5px" pd="8px 18px">
						<Flex wd="100%" pd="20px" dir="column" bg="#F8F8F8">
							{todoList?.map((todoItem, index) => (
								<Flex
									key={index}
									jc="flex-start"
									wd="100%"
									dir="row"
									gap="10px"
								>
									<Svg variant="feedCheck"></Svg>
									<Text variant="tabMenu">{todoItem}</Text>
								</Flex>
							))}
						</Flex>
					</Flex>

					{/* 본문 */}
					<Flex wd="100%" jc="flex-start" pd="16px 20px 32px">
						<Text variant="tabMenu">{feedContent}</Text>
					</Flex>

					{/* 사진 영역*/}
					<Flex wd="100%" bg="#f8f8f8" dir="column">
						{feedImagesUrlList?.map((feedImg, index) => (
							<Box key={index} variant="feedImg" feedImgUrl={feedImg} />
						))}
					</Flex>

					{/* 태그 영역 */}
					<Flex wrap="wrap" gap="8px" wd="100%" jc="flex-start" pd="24px 18px">
						{tagList?.map((tagItem, index) => (
							<Flex
								key={index}
								ht="29px"
								border="1px solid #E5E5E5"
								radius="24px"
								pd="0 14px"
								ai="center"
							>
								<Text variant="tabMenu"># {tagItem}</Text>
							</Flex>
						))}
					</Flex>
				</Flex>
				<FeedComment
					commentResponseDtoList={commentResponseDtoList}
					countComment={countComment}
					countReaction={countReaction}
					currentReactionType={currentReactionType}
					reactionResponseDtoList={reactionResponseDtoList}
					feedId={feedId}
				/>
			</Flex>
			<NavBelow />
		</>
	);
};

export default DetailFeedPage;
