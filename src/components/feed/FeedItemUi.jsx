import { useNavigate } from "react-router-dom";
import { Box, Flex } from "../../common";

const FeedItemUi = ({ feedId, children, feedColor }) => {
	const navigate = useNavigate();
	const onClickHandler = () => {
		navigate(`/feed/${feedId}`);
	};

	return (
		<Flex
			dir="column"
			wd="100%"
			ht="193px"
			cursor="pointer"
			onClick={onClickHandler}
		>
			<Flex jc="center" gap="62px">
				<Box feedColor={feedColor} variant="feedItemHead" />
				<Box feedColor={feedColor} variant="feedItemHead" />
			</Flex>
			<Box feedColor={feedColor} variant="feedItemBody">
				{children}
			</Box>
		</Flex>
	);
};

export default FeedItemUi;
