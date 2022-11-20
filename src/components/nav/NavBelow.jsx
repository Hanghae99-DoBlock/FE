import { Flex, Nav, Text } from "../../common";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NavBelow = () => {
	const navigate = useNavigate();

	const token = localStorage.getItem("accessToken");
	const memberId = jwtDecode(token).memberId;

	return (
		<Nav>
			<Flex wd="100%" jc="space-between" pd="19px 30px">
				<Flex
					wd="70px"
					ht="60px"
					dir="column"
					cursor="pointer"
					onClick={() => navigate(`/`)}
				>
					<Text variant="grey">캘린더</Text>
				</Flex>
				<Flex
					wd="70px"
					ht="60px"
					dir="column"
					cursor="pointer"
					onClick={() => navigate(`/feed`)}
				>
					<Text variant="grey">피드</Text>
				</Flex>
				<Flex wd="70px" ht="60px" dir="column" cursor="pointer">
					<Text variant="grey">검색</Text>
				</Flex>
				<Flex
					wd="70px"
					ht="60px"
					dir="column"
					cursor="pointer"
					onClick={() => navigate(`/profile/${memberId}`)}
				>
					<Text variant="grey">프로필</Text>
				</Flex>
			</Flex>
		</Nav>
	);
};

export default NavBelow;
