import { Box, Flex, grey600, Svg, Text } from "../../common";
import { FeedItemUi } from "../../components";

const FeedItem = ({ feedItem }) => {
	const {
		feedId,
		feedTitle,
		nickname,
		profileImageUrl,
		tagList,
		todoList,
		feedColor,
		countReaction,
		countComment,
	} = feedItem;

	return (
		<FeedItemUi feedId={feedId} feedColor={feedColor}>
			{/* 타이틀 */}
			<Text variant="title1">{feedTitle}</Text>

			{/* 태그 */}
			<Flex gap="8px">
				{tagList?.map(tagItem => (
					<Text key={tagList.indexOf(tagItem)} variant="body3" color={grey600}>
						#{tagItem}
					</Text>
				))}
			</Flex>

			{/* 투두리스트 */}
			<Flex wd="100%" radius="5px" bg="#F8F8F8" mg="8px 0 0 0">
				<Flex wd="100%" pd="18px 20px" dir="column" gap="8px">
					{todoList?.map((todoItem, index) => (
						<Flex key={index} jc="flex-start" wd="100%" dir="row" gap="8px">
							<Svg variant="feedCheck"></Svg>
							<Text variant="body2Medium">{todoItem}</Text>
						</Flex>
					))}
				</Flex>
			</Flex>

			<Flex dir="row" jc="space-between" wd="100%" mg="16px 0 0 0">
				{/* 프로필 */}
				<Flex gap="8px">
					<Box variant="profilePicSmall" profileImageUrl={profileImageUrl} />
					<Text variant="body2Medium">{nickname}</Text>
				</Flex>

				{/* 리액션 */}
				<Flex gap="10px">
					<Flex gap="4px">
						<Box variant="feedPageIcon" type="reaction" />
						<Flex mg="0 0 3px 0">
							<Text variant="body2Medium">{countReaction}</Text>
						</Flex>
					</Flex>

					{/* 댓글 */}
					<Flex gap="4px">
						<Box variant="feedPageIcon" type="speechBubble" />
						<Flex mg="0 0 3px 0">
							<Text variant="body2Medium">{countComment}</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</FeedItemUi>
	);
};

export default FeedItem;
