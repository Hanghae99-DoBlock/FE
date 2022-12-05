import { useNavigate } from "react-router-dom";
import { Flex } from "../../common";

const FeedItemUi = ({ feedId, children, feedColor }) => {
	const navigate = useNavigate();
	const onClickHandler = () => {
		navigate(`/feed/${feedId}`);
	};

	return (
		<Flex dir="column" wd="100%" cursor="pointer" onClick={onClickHandler}>
			<Flex
				dir="column"
				wd="100%"
				ht="100%"
				jc="flex-start"
				ai="flex-start"
				pd="25px 22px 16px 22px"
				gap="6px"
			>
				{children}
			</Flex>
			<Flex wd="100%" ai="flex-end">
				<Flex wd="100%" ht="2px" bg={feedColor} />
				<Flex wd="16px" ht="9px" radius="2px 2px 0px 0px" bg={feedColor} />
				<Flex wd="34px" ht="2px" bg={feedColor} />
			</Flex>
		</Flex>
	);
};

export default FeedItemUi;
