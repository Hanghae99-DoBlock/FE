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
					onClick={() => navigate(`/todolist`)}
				>
					<Flex wd="15px" ht="15px" bi="url(/images/todo.svg)" />
					<Text variant="navText">투두</Text>
				</Flex>
				<Flex
					wd="70px"
					ht="100%"
					gap="8px"
					dir="column"
					cursor="pointer"
					onClick={() => navigate(`/feed/recommended`)}
				>
					<Box variant="navIconBox" type="speechBubble" />
					<Text variant="navText">피드</Text>
				</Flex>
				<Flex
					wd="70px"
					ht="100%"
					cursor="pointer"
					gap="8px"
					dir="column"
					onClick={() => navigate("/search")}
				>
					<Box variant="navIconBox" type="magnifyingglass" />
					<Text variant="navText">검색</Text>
				</Flex>
				<Flex wd="70px" ht="100%" gap="8px" dir="column" cursor="pointer">
					<Flex
						wd="70px"
						ht="100%"
						gap="8px"
						dir="column"
						cursor="pointer"
						onClick={() => navigate(`/profile/${memberId}`)}
					>
						<Box variant="navIconBox" type="myProfile" />
						<Text
							variant="navText"
							onClick={() => navigate(`/profile/${memberId}`)}
						>
							프로필
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Nav>
	);
};

export default NavBelow;
