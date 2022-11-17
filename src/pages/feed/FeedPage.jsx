import { Box, Flex, Text } from "../../common";
import { FeedItem } from "../../components";

const FeedPage = () => {
	return (
		<Flex dir="column">
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
			<Flex wd="100%" ht="100vh" pd="32px 20px" dir="column" jc="flex-start">
				<FeedItem />
				<FeedItem />
			</Flex>
		</Flex>
	);
};

export default FeedPage;
