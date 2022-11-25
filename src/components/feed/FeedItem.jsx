import { Box, Flex, Svg, Text } from "../../common";
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
			<Flex ht="100%" dir="column" jc="space-between">
				{/* 상단 */}
				<Flex dir="column" ai="center" gap="15px">
					<Text variant="whiteTiny">{todoList[0]}</Text>
					<Text variant="whiteBig">{feedTitle}</Text>
					<Flex dir="row" jc="center" wd="100%" gap="6px">
						{tagList.map(tagItem => (
							<Text key={tagList.indexOf(tagItem)} variant="whiteMedium">
								# {tagItem}
							</Text>
						))}
					</Flex>
				</Flex>

				{/* 하단 */}
				<Flex dir="row" jc="space-between" wd="100%">
					<Flex gap="10px">
						{/* 리액션 */}
						<Flex gap="3px">
							<Box variant="feedPageIcon" type="reaction" />
							<Text variant="whiteSmall">{countReaction}</Text>
						</Flex>

						{/* 댓글 */}
						<Flex gap="3px">
							<Box variant="feedPageIcon" type="speechBubble" />
							<Text variant="whiteSmall">{countComment}</Text>
						</Flex>
					</Flex>

					{/* 프로필, 닉네임 */}
					<Flex gap="4px">
						<Box variant="profilePicSmall" profileImageUrl={profileImageUrl} />
						<Text variant="whiteMicro">{nickname}</Text>
					</Flex>
				</Flex>
			</Flex>
		</FeedItemUi>
	);
};

export default FeedItem;
