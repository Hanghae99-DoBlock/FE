import { Flex } from "../../common";
import { FeedItem } from "../../components";

const FeedPage = () => {
	return (
		<Flex
			wd="100%"
			ht="100vh"
			pd="20px"
			dir="column"
			gap="10px"
			jc="flex-start"
		>
			<FeedItem />
			<FeedItem />
		</Flex>
	);
};

export default FeedPage;
