import styled from "styled-components";
import Button from "../../common/button/Button";
import Flex from "../../common/flex/Flex";
import { StInput } from "../../common/input/Input";
import { useState } from "react";
import useInput from "../../common/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
	__checkEmail,
	__checkNick,
	__signUp,
} from "../../redux/modules/join/joinSlice";
import { useNavigate } from "react-router-dom";
import Svg from "../../common/svg/Svg";

const SignUpPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [passwordType, setPasswordType] = useState({
		type: "password",
		visible: false,
	});
	const [checkPasswordType, setCheckPasswordType] = useState({
		type: "password",
		visible: false,
	});
	const email = useInput("");
	const password = useInput("");
	const nickname = useInput("");
	const checkPass = useInput("");

	const [isBlue, setIsBlue] = useState(false);
	const [isMailDuple, setIsMailDuple] = useState(false);

	const checkNickname = useSelector(
		state => state?.join?.checkNickResult.status,
	);
	const checkEmail = useSelector(state => state?.join?.checkMailResult.status);
	//이메일 정규식
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	//닉네임 정규식
	// 1. 2-6자, 영어 대소문자 또는 숫자 또는 한글로 구성
	// 2. 특이사항 : 한글 초성 및 모음은 허가하지 않는다.
	const regNick = /^(?=.*[a-z0-9A-Z가-힣])[a-z0-9A-Z가-힣]{2,6}$/;
	//비밀번호 정규식
	// 1. 영문 대소문자, 숫자, 특수문자 !@#$%^&* 를 적어도 하나씩 포함해야됨
	// 2. 8-20자
	const regPass =
		/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-z0-9A-Z!@#$%^&*]{8,20}$/;

	//password type 변경하는 함수
	const passwordTypeHandler = e => {
		setPasswordType(() => {
			if (!passwordType.visible) {
				return { type: "text", visible: true };
			}
			return { type: "password", visible: false };
		});
	};

	const checkPasswordTypeHandler = e => {
		setCheckPasswordType(() => {
			if (!checkPasswordType.visible) {
				return { type: "text", visible: true };
			}
			return { type: "password", visible: false };
		});
	};

	const changePlaceholder = () => {
		if (
			email.value.trim() === "" &&
			password.value.trim() === "" &&
			nickname.value.trim() === "" &&
			checkPass.value.trim() === ""
		) {
			setIsBlue(true);
		} else if (
			email.value.trim() !== "" ||
			password.value.trim() !== "" ||
			nickname.value.trim() !== "" ||
			checkPass.value.trim() !== ""
		) {
			setIsBlue(false);
		}
	};
	const joinHandler = () => {
		if (
			regEmail.test(email.value) &&
			regNick.test(nickname.value) &&
			regPass.test(password.value) &&
			password.value === checkPass.value
		) {
			dispatch(
				__signUp({
					email: email.value,
					nickname: nickname.value,
					password: password.value,
				}),
			);
			navigate("/signin");
		}
	};

	const checkNicknameHandler = () => {
		if (regNick.test(nickname.value)) {
			dispatch(__checkNick({ nickname: nickname.value }));
		}
	};

	const checkEmailHandler = () => {
		if (regEmail.test(email.value)) {
			dispatch(__checkEmail({ email: email.value }));
		}
	};

	const checkPasswordHandler = () => {
		if (regPass.test(password.value)) {
		}
	};

	return (
		<>
			<Flex dir="column" mw="375px" mxw="375px" mh="667px" mg="0 auto">
				<Flex dir="row" ht="58px" jc="space-between" pd="8px 0" ai="center">
					<Flex wd="125px" ht="42px" jc="flex-start" mg="0 0 0 17px">
						<Svg variant="chevron" onClick={() => navigate("/signin")} />
					</Flex>
					<Flex fs="18">회원가입</Flex>
					<Flex wd="125px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
				</Flex>
				<Flex ht="124px" dir="column" pd="0 20px 20px" gap="6px">
					<Flex wd="335px" ht="26px" fw="600" fs="14" lh="26" jc="flex-start">
						닉네임
					</Flex>

					{isBlue === false ? (
						<Stnickname>
							<StInput
								onBlur={checkNicknameHandler}
								value={nickname.value}
								onChange={nickname.onChange}
								type="text"
								variant="join"
								placeholder="닉네임을 입력하세요"
							/>
							<Flex wd="24px" ht="24px" mg="0 13px 0 0">
								{nickname.value.trim() === "" ? null : (
									<Svg onClick={nickname.onReset} variant="InputReset" />
								)}
							</Flex>
						</Stnickname>
					) : (
						<StnicknameBlue>
							<StInput
								onBlur={checkNicknameHandler}
								value={nickname.value}
								onChange={nickname.onChange}
								type="text"
								variant="changeBlue"
								placeholder="닉네임을 입력하세요"
							/>
							<Flex wd="24px" ht="24px" mg="0 13px 0 0">
								{nickname.value.trim() === "" ? null : (
									<Svg variant="InputReset" onClick={nickname.onReset} />
								)}
							</Flex>
						</StnicknameBlue>
					)}
					<Flex dir="row" wd="335px" ht="26px">
						{nickname.value.trim() === "" ? (
							<Flex dir="row" wd="335px" ht="26px" fs="12" ai="center"></Flex>
						) : !regNick.test(nickname.value) ? (
							<Flex
								dir="row"
								wd="335px"
								ht="26px"
								fs="12"
								ai="center"
								jc="flex-start"
							>
								<StSvg>
									<Svg variant="alert" />
								</StSvg>
								<StInfo>
									닉네임은 2-6자, 영어 대소문자,숫자 또는 한글로 구성됩니다.
								</StInfo>
							</Flex>
						) : checkNickname !== 200 ? (
							<Flex
								dir="row"
								wd="335px"
								ht="26px"
								fs="12"
								ai="center"
								jc="flex-start"
							>
								<StSvg>
									<Svg variant="alert" />
								</StSvg>
								<StInfo>이미 사용중인 닉네임입니다.</StInfo>
							</Flex>
						) : (
							<Flex
								dir="row"
								wd="335px"
								ht="26px"
								fs="12"
								ai="center"
								jc="flex-start"
							>
								<StSvg>
									<Svg variant="alert" />
								</StSvg>
								<StInfo>사용가능한 닉네임입니다.</StInfo>
							</Flex>
						)}
					</Flex>
				</Flex>
				<Flex ht="124px" dir="column" ai="center" pd="0 20px 20px" gap="6px">
					<Flex wd="335px" ht="26px" fw="600" fs="14" lh="26" jc="flex-start">
						이메일
					</Flex>
					{isBlue === false ? (
						<StEmail>
							<StInput
								onBlur={checkEmailHandler}
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
					) : (
						<StEmailBlue>
							<StInput
								onBlur={checkEmailHandler}
								value={email.value}
								onChange={email.onChange}
								type="text"
								variant="changeBlue"
								placeholder="이메일을 입력하세요"
							/>
							<Flex wd="24px" ht="24px" mg="0 13px 0 0">
								{email.value.trim() === "" ? null : (
									<Svg onClick={email.onReset} variant="InputReset" />
								)}
							</Flex>
						</StEmailBlue>
					)}
					<Flex dir="row" wd="335px" ht="26px">
						{email.value.trim() === "" ? (
							<Flex dir="row" wd="335px" ht="26px" fs="12" ai="center"></Flex>
						) : !regEmail.test(email.value) ? (
							<Flex
								dir="row"
								wd="335px"
								ht="26px"
								fs="12"
								ai="center"
								jc="flex-start"
							>
								<StSvg>
									<Svg variant="alert" />
								</StSvg>
								<StInfo>올바른 이메일 형식을 입력해주세요.</StInfo>
							</Flex>
						) : checkEmail !== 200 ? (
							<Flex
								dir="row"
								wd="335px"
								ht="26px"
								fs="12"
								ai="center"
								jc="flex-start"
							>
								<StSvg>
									<Svg variant="alert" />
								</StSvg>
								<StInfo>이미 사용중인 이메일입니다</StInfo>
							</Flex>
						) : (
							<Flex
								dir="row"
								wd="335px"
								ht="26px"
								fs="12"
								ai="center"
								jc="flex-start"
							>
								<StSvg>
									<Svg variant="alert" />
								</StSvg>
								<StInfo>사용가능한 이메일입니다.</StInfo>
							</Flex>
						)}
					</Flex>
				</Flex>
				<Flex
					wd="100%"
					ht="124px"
					dir="column"
					ai="center"
					pd="0 20px 20px"
					gap="6px"
					position="relative"
				>
					<Flex wd="335px" ht="26px" fw="600" fs="14" lh="26" jc="flex-start">
						비밀번호
					</Flex>
					{isBlue === false ? (
						<StPassword>
							<StInput
								onBlur={checkPasswordHandler}
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
					) : (
						<StPasswordBlue>
							<StInput
								onBlur={checkPasswordHandler}
								type={passwordType.type}
								value={password.value}
								onChange={password.onChange}
								variant="changeBlue"
								placeholder="비밀번호를 입력하세요"
							/>
							<Flex wd="24px" ht="24px" mg="0 13px 0 0">
								{passwordType.visible === false ? (
									<Svg variant="noShow" onClick={passwordTypeHandler} />
								) : (
									<Svg variant="show" onClick={passwordTypeHandler} />
								)}
							</Flex>
						</StPasswordBlue>
					)}
					<Flex dir="row" wd="335px" ht="26px">
						{password.value.trim() === "" ? (
							<Flex dir="row" wd="335px" ht="26px" fs="12" ai="center"></Flex>
						) : !regPass.test(password.value) ? (
							<Flex
								dir="row"
								wd="335px"
								ht="26px"
								fs="12"
								ai="center"
								jc="flex-start"
							>
								<StSvg>
									<Svg variant="alert" />
								</StSvg>
								<StInfo>
									비밀번호는 8-20자, 영문 대소문자,숫자,특수문자 !@#$%^&*를
									적어도 하나이상 포함해야합니다
								</StInfo>
							</Flex>
						) : (
							<Flex
								dir="row"
								wd="335px"
								ht="26px"
								fs="12"
								ai="center"
								jc="flex-start"
							>
								<StSvg>
									<Svg variant="alert" />
								</StSvg>
								<StInfo>사용가능한 비밀번호 입니다</StInfo>
							</Flex>
						)}
					</Flex>
				</Flex>
				<Flex
					wd="100%"
					ht="124px"
					dir="column"
					ai="center"
					pd="0 20px 20px"
					gap="6px"
					position="relative"
				>
					<Flex wd="335px" ht="26px" fw="600" fs="14" lh="26" jc="flex-start">
						비밀번호 확인
					</Flex>
					{isBlue === false ? (
						<StRePassword>
							<StInput
								type={checkPasswordType.type}
								value={checkPass.value}
								onChange={checkPass.onChange}
								variant="join"
								placeholder="비밀번호를 한번 더 입력하세요"
							/>
							<Flex wd="24px" ht="24px" mg="0 13px 0 0">
								{checkPasswordType.visible === false ? (
									<Svg variant="noShow" onClick={checkPasswordTypeHandler} />
								) : (
									<Svg variant="show" onClick={checkPasswordTypeHandler} />
								)}
							</Flex>
						</StRePassword>
					) : (
						<StRePasswordBlue>
							<StInput
								type={checkPasswordType.type}
								value={checkPass.value}
								onChange={checkPass.onChange}
								variant="changeBlue"
								placeholder="비밀번호를 한번 더 입력하세요"
							/>
							<Flex wd="24px" ht="24px" mg="0 13px 0 0">
								{checkPasswordType.visible === false ? (
									<Svg variant="noShow" onClick={checkPasswordTypeHandler} />
								) : (
									<Svg variant="show" onClick={checkPasswordTypeHandler} />
								)}
							</Flex>
						</StRePasswordBlue>
					)}
					{checkPass.value.trim() !== "" &&
					password.value !== checkPass.value ? (
						<Flex
							dir="row"
							wd="335px"
							ht="26px"
							fs="12"
							ai="center"
							jc="flex-start"
						>
							<StSvg>
								<Svg variant="alert" />
							</StSvg>
							<StInfo>비밀번호를 다시 확인해주세요</StInfo>
						</Flex>
					) : (
						<Flex dir="row" wd="335px" ht="26px" fs="12" ai="center"></Flex>
					)}
				</Flex>
				<Flex gap="16px" jc="center" ai="center">
					<Flex jc="center" ai="center">
						<Button
							variant="join"
							onClick={() => {
								changePlaceholder();
								joinHandler();
							}}
						>
							가입하기
						</Button>
					</Flex>
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

const StEmail = styled.div`
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
	width: 335px;
	background-color: #f4f4f4;
	align-items: center;
	border-radius: 10px;
	justify-content: space-between;

	:focus-within {
		outline: 1px solid #7474ff;
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
	background-color: #f4f4f4;
	align-items: center;
	border-radius: 10px;
	justify-content: space-between;

	:focus-within {
		outline: 1px solid #7474ff;
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