import { useState } from "react";
import { Flex, Text } from "../../common";

const Modal = () => {
	return (
		<Flex
			position="absolute"
			bottom="478px"
			wd="184px"
			ht="40px"
			bg="#fff"
			border="1px solid #EFEFEF"
			bs="0px 2px 6px rgba(0, 0, 0, 0.05)"
			radius="10px"
			pd="8px 16px"
		>
			<Text variant="feedReaction">👍</Text>
			<Text variant="feedReaction">❤</Text>
			<Text variant="feedReaction">😊</Text>
			<Text variant="feedReaction">🎉</Text>
			<Text variant="feedReaction">🔥</Text>
		</Flex>
	);
};

export default Modal;
