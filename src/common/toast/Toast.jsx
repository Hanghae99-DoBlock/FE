import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIsToastExist } from "../../redux/modules/toastSlice";
import { Flex, Svg } from "../../common";

const Toast = () => {
	const dispatch = useDispatch();
	const { toastContent } = useSelector(state => state.toastSlice);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(updateIsToastExist(""));
		}, 1500);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<Flex wd="100%" ht="100%" ai="flex-start" position="absolute">
			<Flex wd="100%" ht="100vh" position="relative">
				<Flex wd="100%" ht="100%" zIndex="2" ai="flex-end">
					<Flex
						color="white"
						wd="335px"
						ht="40px"
						bg="#131313"
						oc="0.9"
						radius="30px"
						gap="6px"
						mg="0 0 79px 0"
					>
						<Flex>
							<Svg variant="toast" />
						</Flex>
						<Flex>{toastContent}</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Toast;
