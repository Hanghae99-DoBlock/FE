import { Box, Flex, Image, Svg, Text } from "../../common";

const FeedItem = () => {
	return (
		<Box variant="blueFeedItem">
			{/* 상단 */}
			<Flex dir="column" ai="center" gap="15px" mg="0 0 10px 0">
				<Text variant="whiteTiny">6시 기상하기</Text>
				<Text variant="whiteBig">미라클 모닝 성공</Text>
				<Text variant="whiteMedium"># 미라클모닝 # 내가해냄 # 6시기상</Text>
			</Flex>

			{/* 하단 */}
			<Flex dir="row" jc="space-between" wd="100%">
				<Flex gap="10px">
					{/* 리액션 */}
					<Flex gap="3px">
						<Svg variant="reaction" />
						<Text variant="whiteSmall">3</Text>
					</Flex>

					{/* 댓글 */}
					<Flex gap="3px">
						<Svg variant="comment" />
						<Text variant="whiteSmall">2</Text>
					</Flex>
				</Flex>

				{/* 프로필, 닉네임 */}
				<Flex gap="4px">
					<Image variant="profilePicSmall" />
					<Text variant="whiteMicro">어쩌구</Text>
				</Flex>
			</Flex>
		</Box>
	);
};

export default FeedItem;
