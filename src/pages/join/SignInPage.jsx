import styled from "styled-components";
import Button from "../../common/button/Button";
import Flex from "../../common/flex/Flex";
import { StInput } from "../../common/input/Input";
import { useState } from "react";
import useInput from "../../common/hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __signIn } from "../../redux/modules/joinSlice";
import Svg from "../../common/svg/Svg";

const SignInPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [passwordType, setPasswordType] = useState({
		type: "password",
		visible: false,
	});
	const email = useInput("");
	const password = useInput("");

	//password type 변경하는 함수
	const passwordTypeHandler = e => {
		setPasswordType(() => {
			if (!passwordType.visible) {
				return { type: "text", visible: true };
			}
			return { type: "password", visible: false };
		});
	};

	const loginHandler = () => {
		dispatch(__signIn({ email: email.value, password: password.value }));
		navigate("/");
	};

	return (
		<>
			<Flex dir="column" mw="375px" mxw="375px" mh="667px" mg="0 auto">
				<Flex dir="row" ht="58px" jc="center" pd="8px 0" ai="center">
					<Flex fs="18" ai="center" jc="center">
						로그인
					</Flex>
				</Flex>
				<Flex ht="98px" jc="center" ai="center" mg="0 0 9px 0">
					<Flex wd="125px" ht="60px" bg="#C2C2C2" mg="6px 0 0 0">
						LOGO
					</Flex>
				</Flex>
				<Flex ht="102px" dir="column" ai="center" pd="0 20px 20px" gap="6px">
					<Flex wd="335px" ht="26px" fw="600" fs="14" lh="26" jc="flex-start">
						이메일
					</Flex>
					<StEmail>
						<StInput
							value={email.value}
							onChange={email.onChange}
							type="text"
							variant="join"
							placeholder="이메일을 입력하세요"
						/>
						<Flex wd="24px" ht="24px" mg="0 13px 0 0">
							{email.value.trim() === "" ? null : (
								<Svg variant="InputReset" onClick={email.onReset} />
							)}
						</Flex>
					</StEmail>
				</Flex>
				<Flex
					wd="100%"
					ht="100%"
					dir="column"
					ai="center"
					pd="0 20px 20px"
					gap="6px"
					position="relative"
				>
					<Flex wd="335px" ht="26px" fw="600" fs="14" lh="26" jc="flex-start">
						비밀번호
					</Flex>
					<StPassword>
						<StInput
							type={passwordType.type}
							value={password.value}
							onChange={password.onChange}
							variant="join"
							placeholder="비밀번호를 입력하세요"
						/>
						<Flex wd="24px" ht="24px" mg="0 13px 0 0">
							{passwordType.visible === false ? (
								<Svg variant="noShow" onClick={passwordTypeHandler} />
							) : (
								<Svg variant="show" onClick={passwordTypeHandler} />
							)}
						</Flex>
					</StPassword>
				</Flex>
				<Flex gap="16px" jc="center" ai="center" dir="column">
					<Flex jc="center" ai="center">
						<Button onClick={loginHandler} variant="join">
							로그인하기
						</Button>
					</Flex>
					<Flex jc="center" ai="center">
						<Button
							onClick={() => navigate("/signup")}
							variant="join"
							style={{ backgroundColor: "white", color: "#7474FF" }}
						>
							회원가입하기
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default SignInPage;

const StEmail = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #f4f4f4;
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
	background-color: #f4f4f4;
	align-items: center;
	border-radius: 10px;
	justify-content: space-between;

	:focus-within {
		outline: 1px solid #7474ff;
	}
`;
