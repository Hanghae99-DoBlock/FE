import styled from "styled-components";
import Button from "../../common/button/Button";
import Flex from "../../common/flex/Flex";
import { StInput } from "../../common/input/Input";
import { useEffect, useState } from "react";
import useInput from "../../common/hooks/useInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __signIn } from "../../redux/modules/join/joinSlice";
import jwtDecode from "jwt-decode";
import Svg from "../../common/svg/Svg";
import Splash from "./Splash";
import Lottie from "lottie-react";
import Block from "../../common/gif/building-blocks.json";
const SignInPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = localStorage.getItem("accessToken");
	const [isSplash, setIsSplash] = useState(true);
	const kakaoUrl =
		"https://kauth.kakao.com/oauth/authorize?client_id=e321d7ec74f7b0df738961b15a46117d&redirect_uri=http://www.do-block.click/api/members/login/kakao&response_type=code";

	const naverUrl =
		"https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=uc4jdieiAPEjFxNtS9AO&redirect_uri=http://www.do-block.click/api/members/login/naver";
	const googleUrl =
		"https://accounts.google.com/o/oauth2/v2/auth?client_id=721623942038-v920amc1bplpqs63t65gah1dqauppkcl.apps.googleusercontent.com&redirect_uri=http://www.do-block.click/api/members/login/google&response_type=code&scope=email profile";
	useEffect(() => {
		if (token) {
			navigate("/todolist", { replace: true });
		}
		let timer = setTimeout(() => {
			setIsSplash(false);
		}, 2000);
	}, []);

	return (
		<>
			{isSplash === true ? (
				<Splash />
			) : (
				<Flex wd="100%">
					<Flex
						dir="column"
						wd="100%"
						ht="100vh"
						mg="0 auto"
						bg="#FFFAF8"
						gap="37px"
						jc="flex-start"
					>
						<Flex dir="column" wd="100%" ht="100%" fs="22" jc="center" lh="33">
							<Flex dir="row" ht="186px" mwd="375px" mg="118px 0 0 0">
								<Lottie animationData={Block} />
							</Flex>
							<Flex fw="bold">투두를 달성하고</Flex>

							<Flex fw="bold">블록을 쌓아보세요!</Flex>
						</Flex>
						<Flex dir="column" gap="10px">
							<a href={kakaoUrl}>
								<Flex>
									<Svg variant="kakao" />
								</Flex>
							</a>
							{/* <a href={naverUrl}>
								<Flex>
									<Svg variant="naver" />
								</Flex>
							</a> */}
							<a href={googleUrl}>
								<Flex>
									<Svg variant="google" />
								</Flex>
							</a>
						</Flex>
						<Flex
							dir="row"
							wd="239px"
							ht="19px"
							jc="space-between"
							mg="0 0 82px 0"
						>
							<Flex
								fs="14"
								fw="600"
								color="#A2A2A2"
								br="1px solid #E5E5E5"
								wd="113px"
								jc="flex-start"
								cursor="pointer"
								onClick={() => navigate("/emailSignIn")}
							>
								이메일로 로그인
							</Flex>
							<Flex
								fs="14"
								fw="600"
								color="#A2A2A2"
								onClick={() => navigate("/signup")}
								cursor="pointer"
							>
								이메일로 회원가입
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			)}
		</>
	);
};

export default SignInPage;

const StEmail = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #ffffff;
	align-items: center;
	justify-content: space-between;
	border-radius: 10px;

	:focus-within {
		outline: 1px solid #7474ff;
	}
`;

const StPassword = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #ffffff;
	align-items: center;
	border-radius: 10px;
	justify-content: space-between;

	:focus-within {
		outline: 1px solid #7474ff;
	}
`;
