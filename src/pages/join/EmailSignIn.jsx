import styled from "styled-components";
import Button from "../../common/button/Button";
import Flex from "../../common/flex/Flex";
import { StInput } from "../../common/input/Input";
import { useEffect, useState } from "react";
import useInput from "../../common/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
	__checkEmail,
	__checkNick,
	__signUp,
	__signIn,
} from "../../redux/modules/join/joinSlice";
import { useNavigate } from "react-router-dom";
import Svg from "../../common/svg/Svg";
import { updateIsToastExist } from "../../redux/modules/toastSlice";

const SignUpPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [passwordType, setPasswordType] = useState({
		type: "password",
		visible: false,
	});

	const email = useInput("");
	const password = useInput("");
	const token = localStorage.getItem("accessToken");

	const loginResult = useSelector(state => state.join.loginResult);

	useEffect(() => {
		if (token) {
			navigate("/todolist", { replace: true });
		}
	}, [token]);

	useEffect(() => {
		if (loginResult?.status === 200 || loginResult === "") {
			return;
		} else if (loginResult === 400) {
			dispatch(updateIsToastExist("아이디, 비밀번호를 다시 입력해주세요."));
		}
	}, [loginResult]);

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
		if (loginResult?.status === 200 || loginResult === "") {
			return;
		} else if (loginResult === 400) {
			return dispatch(
				updateIsToastExist("아이디, 비밀번호를 다시 입력해주세요."),
			);
		} else {
			return dispatch(
				updateIsToastExist("아이디, 비밀번호를 다시 입력해주세요."),
			);
		}
	};

	const enterLoginHandler = e => {
		if (e.keyCode === 13) {
			dispatch(__signIn({ email: email.value, password: password.value }));
			if (loginResult?.status === 200 || loginResult === "") {
				return;
			} else if (loginResult === 400) {
				return dispatch(
					updateIsToastExist("아이디, 비밀번호를 다시 입력해주세요."),
				);
			} else {
				return dispatch(
					updateIsToastExist("아이디, 비밀번호를 다시 입력해주세요."),
				);
			}
		}
	};

	return (
		<>
			<Flex dir="column" wd="100%" ht="100vh" jc="flex-start">
				{/* 헤더 */}

				<Flex
					dir="row"
					ht="61px"
					jc="space-between"
					wd="100%"
					bb="1px solid #EFEFEF"
				>
					<Flex ht="100%" jc="flex-start" pd="0 0 0 21px">
						<Svg variant="chevron" onClick={() => navigate(-1)} />
					</Flex>
					<Flex fs="18" fw="bold" wd="135px">
						이메일로 로그인
					</Flex>
					<Flex wd="21px" />
				</Flex>

				<Flex gap="25px" pd="25px 20px" wd="100%" dir="column">
					{/* 이메일 */}
					<Flex wd="100%" dir="column" gap="10px">
						<Flex wd="100%" fw="600" fs="14" jc="flex-start">
							이메일
						</Flex>

						<Stnickname>
							<StInput
								value={email.value}
								onChange={email.onChange}
								type="text"
								variant="join"
								placeholder="이메일을 입력하세요"
								onKeyDown={enterLoginHandler}
							/>
							<Flex wd="24px" ht="24px" mg="0 13px 0 0" onClick={email.onReset}>
								{email.value.trim() === "" ? null : (
									<Svg variant="InputReset" />
								)}
							</Flex>
						</Stnickname>
					</Flex>

					{/* 비밀번호 */}
					<Flex wd="100%" dir="column" gap="10px">
						<Flex wd="100%" fw="600" fs="14" jc="flex-start">
							비밀번호
						</Flex>

						<StPassword>
							<StInput
								type={passwordType.type}
								value={password.value}
								onChange={password.onChange}
								variant="join"
								placeholder="비밀번호를 입력하세요"
								onKeyDown={enterLoginHandler}
							/>
							<Flex
								wd="24px"
								ht="24px"
								mg="0 13px 0 0"
								onClick={passwordTypeHandler}
							>
								{passwordType.visible === false &&
								password.value.length === 0 ? (
									<Svg variant="noShow" onClick={passwordTypeHandler} />
								) : passwordType.visible === false &&
								  password.value.length > 0 ? (
									<Svg variant="noShowBlack" onClick={passwordTypeHandler} />
								) : passwordType.visible === true &&
								  password.value.length === 0 ? (
									<Svg variant="show" onClick={passwordTypeHandler} />
								) : passwordType.visible === true &&
								  password.value.length > 0 ? (
									<Svg variant="showBlack" onClick={passwordTypeHandler} />
								) : (
									<Svg variant="noshow" onClick={passwordTypeHandler} />
								)}
							</Flex>
						</StPassword>
					</Flex>

					{/* 버튼 */}
					<Button
						variant="join"
						onClick={() => {
							loginHandler();
						}}
					>
						로그인하기
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default SignUpPage;

const StSvg = styled.div`
	display: flex;
	align-items: center;
	width: 22px;
	height: 22px;
`;

export const StEmail = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #ffffff;
	align-items: center;
	border-radius: 10px;
	justify-content: space-between;
	border: 1px solid #e5e5e5;

	:focus-within {
		outline: 1px solid #666666;
	}
`;

const StEmailBlue = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #f4f4f4;
	align-items: center;
	border-radius: 10px;
	outline: 1px solid #7474ff;
	justify-content: space-between;
`;

export const StPassword = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	background-color: #ffffff;
	align-items: center;
	border-radius: 10px;
	justify-content: space-between;
	border: 1px solid #e5e5e5;
	:focus-within {
		outline: 1px solid #666666;
	}
`;

const StPasswordBlue = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #f4f4f4;
	align-items: center;
	border-radius: 10px;
	outline: 1px solid #7474ff;
	justify-content: space-between;
`;

const Stnickname = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	background-color: #ffffff;
	align-items: center;
	border-radius: 10px;
	justify-content: space-between;
	border: 1px solid #e5e5e5;

	:focus-within {
		outline: 1px solid #666666;
	}
`;

const StnicknameBlue = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #f4f4f4;
	align-items: center;
	border-radius: 10px;
	outline: 1px solid #7474ff;
	justify-content: space-between;
`;

const StRePassword = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #ffffff;
	align-items: center;
	border-radius: 10px;
	justify-content: space-between;
	border: 1px solid #e5e5e5;

	:focus-within {
		outline: 1px solid #666666;
	}
`;

const StRePasswordBlue = styled.div`
	display: flex;
	flex-direction: row;
	width: 335px;
	background-color: #f4f4f4;
	align-items: center;
	border-radius: 10px;
	outline: 1px solid #7474ff;
	justify-content: space-between;
`;

const StInfo = styled.div`
	color: #7474ff;
	display: flex;
	justify-content: flex-start;
	width: 300px;
`;
