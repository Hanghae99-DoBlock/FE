import { orange300, Flex } from "../../common";

const FloatingAddBtn = ({ onClick }) => {
	return (
		<Flex wd="100%" position="relative">
			<Flex wd="100%" position="absolute" jc="flex-end">
				<Flex position="fixed" bottom="80px" zIndex="1" mg="0 23px 32px 0">
					<button onClick={onClick}>
						<Flex
							cursor="pointer"
							wd="50px"
							ht="50px"
							radius="50%"
							bs="2px 2px 10px rgba(0, 0, 0, 0.1)"
							bg={orange300}
						>
							<Flex wd="20px" ht="20px" bi="url(/images/plusWhite.svg)" />
						</Flex>
					</button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default FloatingAddBtn;
