import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Text } from "../../common";
import { FeedItem } from "../../components";
import {
	__getFollowingFeeds,
	__getRecommendedFeeds,
} from "../../redux/modules/feedSlice";

const FeedPage = () => {
	const dispatch = useDispatch();
	const feedList = useSelector(state => state.feedSlice.feedList);

	useEffect(() => {
		dispatch(__getFollowingFeeds());
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
			<Flex
				wd="100%"
				ht="100vh"
				pd="85px 20px"
				dir="column"
				jc="flex-start"
				gap="11px"
			>
				{feedList.map(feedItem => (
					<FeedItem key={feedItem.feedId} feedItem={feedItem} />
				))}
			</Flex>
		</Flex>
	);
};

export default FeedPage;
