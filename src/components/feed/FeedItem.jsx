import { Box, Flex, Svg, Text } from "../../common";
import { FeedItemUi } from "../../components";

const FeedItem = ({ feedItem }) => {
	const {
		feedTitle,
		nickname,
		profileImageUrl,
		commentResponseDtoList,
		reactionResponseDtoList,
		tagList,
		todoList,
		feedColor,
	} = feedItem;
	return (
		<FeedItemUi feedColor={feedColor}>
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
							<Svg variant="reaction" />
							<Text variant="whiteSmall">
								{reactionResponseDtoList?.length || 0}
							</Text>
						</Flex>

						{/* 댓글 */}
						<Flex gap="3px">
							<Svg variant="comment" />
							<Text variant="whiteSmall">
								{commentResponseDtoList?.length || 0}
							</Text>
						</Flex>
					</Flex>

					{/* 프로필, 닉네임 */}
					<Flex gap="4px">
						{profileImageUrl ? (
							<Box
								variant="profilePicSmall"
								profileImageUrl={profileImageUrl}
							/>
						) : (
							<Box variant="profilePicDefaultSmall" />
						)}
						<Text variant="whiteMicro">{nickname}</Text>
					</Flex>
				</Flex>
			</Flex>
		</FeedItemUi>
	);
};

export default FeedItem;
