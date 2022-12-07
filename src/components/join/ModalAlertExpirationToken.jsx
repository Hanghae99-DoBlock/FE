import { useNavigate } from "react-router-dom";
import { Flex, Svg, Text } from "../../common";
import { grey600 } from "../../common";

const ModalAlertExpirationToken = ({ setIsAlertExpirationTokenModalOpen }) => {
	const navigate = useNavigate();

	const closeModalHandler = () => {
		setIsAlertExpirationTokenModalOpen(false);
		navigate(`/`);
	};

	return (
		<Flex wd="100%" ht="100%" ai="flex-start" position="absolute">
			<Flex wd="100%" ht="100vh" position="relative">
				<Flex wd="100%" ht="100%" zIndex="2">
					<Flex bg="rgba(0, 0, 0, 0.5)" wd="100%" ht="100%" zIndex="1">
						<Flex
							jc="flex-start"
							dir="column"
							bg="white"
							wd="280px"
							ht="290px"
							radius="10px"
							pd="20px 17px"
						>
							<Flex wd="100%" jc="flex-end" cursor="pointer">
								<Svg onClick={closeModalHandler} variant="close"></Svg>
							</Flex>
							<Flex ht="100%" dir="column">
								<Flex
									wd="72px"
									ht="60px"
									mg="0 0 30px 0"
									bi="url(/images/warning.svg)"
								/>
								<Flex dir="column" gap="10px" mg="0 0 20px 0">
									<Text variant="title3">로그인이 만료되었습니다.</Text>
									<Text variant="body2Medium" color={grey600}>
										다시 로그인해주세요.
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ModalAlertExpirationToken;
