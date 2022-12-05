import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Box, Text, Svg } from "../../common";
import { FeedComment, ModalConfirmDelete, NavBelow } from "../../components";
import {
	updateFeedItem,
	updateSearchKeyword,
	__getFeedItem,
} from "../../redux/modules/feed/feedSlice";
import { __followThunk } from "../../redux/modules/profileSlice";

const DetailFeedPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const feedItem = useSelector(state => state.feed.feedItem);

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

	useEffect(() => {
		dispatch(__getFeedItem(id));
	}, []);

	const onClickFollowHandler = () => {
		dispatch(__followThunk(memberId));
		dispatch(updateFeedItem());
	};

	// 토큰 디코드
	const token = localStorage.getItem("accessToken");
	const decodedToken = jwtDecode(token);

	// 팔로우 버튼 영역에 보여줄 컴포넌트
	const followBtnUi = {
		following: <Svg variant="followCancel" onClick={onClickFollowHandler} />,
		notFollowing: <Svg variant="follow" onClick={onClickFollowHandler} />,
	};

	// 팔로우 버튼 상태에 따라 변수 재할당
	let followBtnStatus;
	if (followOrNot) {
		followBtnStatus = "following";
	} else {
		followBtnStatus = "notFollowing";
	}

	const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
		useState(false);

	const openConfirmDeleteModalHandler = () => {
		setIsConfirmDeleteModalOpen(true);
	};

	const tagSearchHandler = tagItem => {
		dispatch(updateSearchKeyword(tagItem));
		navigate(`/search`);
	};

	const [imgPage, setImgPage] = useState(0);

	const showNextImgHandler = () => {
		setImgPage(prev => prev + 1);
	};

	const showPrevImgHandler = () => {
		setImgPage(prev => prev - 1);
	};

	return (
		<>
			{isConfirmDeleteModalOpen ? (
				<Flex wd="100%" ht="100%" ai="flex-start" position="absolute">
					<Flex wd="100%" ht="100vh" position="relative">
						<Flex wd="100%" ht="100%" zIndex="2">
							<ModalConfirmDelete
								feedId={feedId}
								setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
							/>
						</Flex>
					</Flex>
				</Flex>
			) : null}
			<Flex dir="column" wd="100%">
				<Flex wd="100%" dir="column">
					{/* 헤더 */}
					<Flex wd="100%" ht="60px" jc="space-between" pd="18px">
						<Svg variant="chevron" onClick={() => navigate(-1)} />

						{decodedToken.memberId === memberId ? (
							<Flex ht="100%" gap="7px">
								<Flex cursor="pointer" ht="100%" wd="35px">
									<Text variant="grey">수정</Text>
								</Flex>
								<Flex
									onClick={openConfirmDeleteModalHandler}
									cursor="pointer"
									ht="100%"
									wd="35px"
								>
									<Text variant="red">삭제</Text>
								</Flex>
							</Flex>
						) : null}
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
									{feedItem.badgeName ? (
										<Flex
											ht="20px"
											bg="#FFF4ED"
											pd="4px 8px"
											jc="center"
											radius="5px"
										>
											<Text variant="orange">{feedItem.badgeName}</Text>
										</Flex>
									) : null}
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
								{decodedToken.memberId === memberId
									? null
									: followBtnUi[followBtnStatus]}
							</Flex>
						</Flex>
					</Flex>

					{/* 제목 */}
					<Flex wd="100%" pd="8px 29px 16px" jc="flex-start">
						<Text variant="title1">{feedTitle}</Text>
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
					{feedImagesUrlList ? (
						<Box variant="feedImg" feedImgUrl={feedImagesUrlList[imgPage]}>
							<Flex wd="100%" ht="100%" jc="space-between">
								{imgPage === 0 ? (
									<div />
								) : (
									<Flex
										onClick={showPrevImgHandler}
										cursor="pointer"
										jc="flex-start"
										wd="30%"
										ht="100%"
									>
										<Box variant="imgPaginationIconBox" type="Prev" />
									</Flex>
								)}
								{imgPage === feedImagesUrlList.length - 1 ||
								feedImagesUrlList.length === 1 ? null : (
									<Flex
										onClick={showNextImgHandler}
										cursor="pointer"
										jc="flex-end"
										wd="30%"
										ht="100%"
									>
										<Box variant="imgPaginationIconBox" type="Nxt" />
									</Flex>
								)}
							</Flex>
						</Box>
					) : null}

					{/* 태그 영역 */}
					<Flex wrap="wrap" gap="8px" wd="100%" jc="flex-start" pd="24px 18px">
						{tagList?.map((tagItem, index) => (
							<Flex
								onClick={() => tagSearchHandler(tagItem)}
								cursor="pointer"
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
