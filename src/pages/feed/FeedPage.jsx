import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Svg, Text } from "../../common";
import { FeedItem, NavBelow } from "../../components";
import { __getRecommendedFeeds } from "../../redux/modules/feed/feedSlice";
import { __getFollowingFeeds } from "../../redux/modules/middleware/feedListThunk";

const FeedPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const target = useRef(null);
	const { feedList } = useSelector(state => state.feed);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				dispatch(__getFollowingFeeds());
			}
		});
		observer.observe(target.current);
		return () => {
			observer.disconnect(observer);
		};
	}, []);

	// 상단 탭 메뉴 ui 상태 관리
	const [followingFeedListMenuUiType, setFollowingFeedListMenuUiType] =
		useState("selectedTabMenu");
	const [recommendedFeedListMenuUiType, setRecommendedFeedListMenuUiType] =
		useState("tabMenu");

	// 피드 리스트 종류 변경 핸들러
	const changeFeedListTypeHandler = feedListType => {
		if (feedListType === "followingFeedList") {
			dispatch(__getFollowingFeeds());
			setFollowingFeedListMenuUiType("selectedTabMenu");
			setRecommendedFeedListMenuUiType("tabMenu");
		} else {
			dispatch(__getRecommendedFeeds());
			setRecommendedFeedListMenuUiType("selectedTabMenu");
			setFollowingFeedListMenuUiType("tabMenu");
		}
	};

	return (
		<>
			{/* 피드 작성 버튼 */}
			<Flex wd="100%" position="relative">
				<Flex wd="100%" position="absolute" jc="flex-end">
					<Flex position="fixed" bottom="80px" zIndex="1" mg="0 5px 0 0">
						<Svg onClick={() => navigate(`/addFeed`)} variant="addTodo" />
					</Flex>
				</Flex>
			</Flex>

			<Flex dir="column" wd="100%">
				{/* 상단 탭 메뉴 */}
				<Flex wd="100%" mxw="430px" ht="41px" position="fixed" top="0">
					<Box
						onClick={() => changeFeedListTypeHandler("followingFeedList")}
						variant={followingFeedListMenuUiType}
					>
						<Text variant={followingFeedListMenuUiType}>팔로잉</Text>
					</Box>
					<Box
						onClick={() => changeFeedListTypeHandler("recommendedFeeds")}
						variant={recommendedFeedListMenuUiType}
					>
						<Text variant={recommendedFeedListMenuUiType}>추천 피드</Text>
					</Box>
				</Flex>

				{/* 피드 리스트 */}
				<Box variant="feedScrollArea">
					{feedList.map(feedItem => (
						<FeedItem key={feedItem.feedId} feedItem={feedItem} />
					))}
					<div ref={target} />
				</Box>
			</Flex>
			<NavBelow />
		</>
	);
};

export default FeedPage;
