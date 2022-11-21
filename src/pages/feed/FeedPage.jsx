import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Text } from "../../common";
import { FeedItem } from "../../components";
import { __getFollowingFeeds } from "../../redux/modules/feedSlice";

const FeedPage = () => {
	const dispatch = useDispatch();
	const feedList = useSelector(state => state.feedSlice.feedList);

	useEffect(() => {
		dispatch(__getFollowingFeeds());
	}, []);

	return (
		<Flex dir="column" wd="100%">
			{/* 상단 탭 메뉴 */}
			<Flex wd="100%" ht="41px" position="sticky" top="0">
				<Box variant="tabMenu">
					<Text variant="tabMenu">팔로잉</Text>
				</Box>
				<Box variant="selectedTabMenu">
					<Text variant="selectedTabMenu">추천 피드</Text>
				</Box>
			</Flex>

			{/* 피드 리스트 */}
			<Flex
				wd="100%"
				ht="100vh"
				pd="32px 20px"
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
