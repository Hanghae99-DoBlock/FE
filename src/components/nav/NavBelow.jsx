import { Flex, Nav, Text } from "../../common";
const NavBelow = () => {
	return (
		<Nav>
			<Flex wd="100%" jc="space-between" pd="19px 60px">
				<Flex dir="column">
					<Text variant="grey">아이콘</Text>
					<Text variant="grey">캘린더</Text>
				</Flex>
				<Flex dir="column">
					<Text variant="grey">아이콘</Text>
					<Text variant="grey">피드</Text>
				</Flex>
				<Flex dir="column">
					<Text variant="grey">아이콘</Text>
					<Text variant="grey">검색</Text>
				</Flex>
				<Flex dir="column">
					<Text variant="grey">아이콘</Text>
					<Text variant="grey">프로필</Text>
				</Flex>
			</Flex>
		</Nav>
	);
};

export default NavBelow;
