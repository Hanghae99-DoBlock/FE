import { Svg, Flex } from "../../common";
import Lottie from "lottie-react";
import spinner from "../../common/gif/spinner.json";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __kakaoLogin } from "../../redux/modules/join/joinSlice";

const KakaoLogin = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(__kakaoLogin());
	}, []);

	return (
		<Flex wd="100%" ht="100vh">
			<Lottie animationData={spinner} />
		</Flex>
	);
};

export default KakaoLogin;
