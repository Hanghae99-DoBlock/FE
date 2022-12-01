import { useEffect } from "react";
import styled from "styled-components";
import Flex from "../flex/Flex";
import Svg from "../svg/Svg";

const Toast = ({ setToast, text }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			setToast(false);
		}, 1500);
		return () => {
			clearTimeout(timer);
		};

		setToast(true);
	}, [setToast]);
	return (
		<Flex
			dir="row"
			ai="center"
			wd="335px"
			ht="40px"
			bg="#131313"
			oc="0.9"
			radius="30px"
			color="white"
			fs="14"
			gap="6px"
			mg="84px 0 0 0"
			position="absolute"
			left="50%"
			right="50%"
			bottom="535px"
			transform="translate(-50%,-10%)"
		>
			<Flex>
				<Svg variant="toast" />
			</Flex>
			<Flex>{text}</Flex>
		</Flex>
	);
};

export default Toast;
