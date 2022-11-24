import { Box, Flex, Nav, Text } from "../../common";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NavBelow = () => {
	const navigate = useNavigate();

	const token = localStorage.getItem("accessToken");
	const memberId = jwtDecode(token).memberId;

	return (
		<Nav>
			<Flex wd="100%" jc="space-between" pd="0 40px">
				<Flex
					wd="70px"
					ht="100%"
					gap="8px"
					dir="column"
					cursor="pointer"
					onClick={() => navigate(`/`)}
				>
					<Box variant="navIconBox" type="calendar" />
					<Text variant="navText">캘린더</Text>
				</Flex>
				<Flex
					wd="70px"
					ht="100%"
					gap="8px"
					dir="column"
					cursor="pointer"
					onClick={() => navigate(`/feed`)}
				>
					<Box variant="navIconBox" type="speechBubble" />
					<Text variant="navText">피드</Text>
				</Flex>
				<Flex wd="70px" ht="100%" cursor="pointer" gap="8px" dir="column">
					<Box variant="navIconBox" type="magnifyingGlass" />
					<Text variant="navText">검색</Text>
				</Flex>
				<Flex
					wd="70px"
					ht="100%"
					gap="8px"
					dir="column"
					cursor="pointer"
					onClick={() => navigate(`/profile/${memberId}`)}
				>
					<Box variant="navIconBox" type="myProfile" />
					<Text variant="navText">프로필</Text>
				</Flex>
			</Flex>
		</Nav>
	);
};

export default NavBelow;