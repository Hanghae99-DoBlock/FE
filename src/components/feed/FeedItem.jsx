import { Box, Flex, Image, Svg, Text } from "../../common";

const FeedItem = ({ feedItem }) => {
	const {
		feedContent,
		nickname,
		profileImageUrl,
		commentResponseDtoList,
		reactionResponseDtoList,
		tagList,
		todoList,
	} = feedItem;
	return (
		<Box variant="blueFeedItem">
			{/* 상단 */}
			<Flex dir="column" ai="center" gap="15px" mg="0 0 10px 0">
				<Text variant="whiteTiny">{todoList[0]}</Text>
				<Text variant="whiteBig">{feedContent}</Text>
				{tagList.map(tagItem => (
					<Text variant="whiteMedium"># {tagItem}</Text>
				))}
			</Flex>

			{/* 하단 */}
			<Flex dir="row" jc="space-between" wd="100%">
				<Flex gap="10px">
					{/* 리액션 */}
					<Flex gap="3px">
						<Svg variant="reaction" />
						<Text variant="whiteSmall">{reactionResponseDtoList.length}</Text>
					</Flex>

					{/* 댓글 */}
					<Flex gap="3px">
						<Svg variant="comment" />
						<Text variant="whiteSmall">{commentResponseDtoList.length}</Text>
					</Flex>
				</Flex>

				{/* 프로필, 닉네임 */}
				<Flex gap="4px">
					<Box variant="profilePicSmall" profileImageUrl={profileImageUrl} />
					<Text variant="whiteMicro">{nickname}</Text>
				</Flex>
			</Flex>
		</Box>
	);
};

export default FeedItem;
