import styled from "styled-components";
import Button from "../../common/button/Button";
import Flex from "../../common/flex/Flex";
import { StInput } from "../../common/input/Input";
import { useEffect, useState } from "react";
import useInput from "../../common/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
	resetCheckEmail,
	resetCheckNickname,
	__checkEmail,
	__checkNick,
	__signUp,
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

	const checkNickname = useSelector(state => state?.join?.checkNickResult);
	const checkEmail = useSelector(state => state?.join?.checkMailResult);
	const toast = useSelector(state => state.toastSlice.isToastExist);
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
	const regPassNonLength =
		/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-z0-9A-Z!@#$%^&*]/;

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
			navigate(-1);
		}
	};

	const checkNicknameHandler = () => {
		if (regNick.test(nickname.value) && nickname.value.trim() !== "") {
			dispatch(__checkNick({ nickname: nickname.value }));
		}
	};

	const checkEmailHandler = () => {
		if (!regEmail.test(email.value) && email.value.trim() !== "") {
			dispatch(updateIsToastExist("올바른 이메일 형식을 입력해주세요."));
		} else if (regEmail.test(email.value) && email.value.trim() !== "") {
			dispatch(__checkEmail({ email: email.value }));
		}
	};

	const checkPasswordHandler = () => {
		if (regPass.test(password.value)) {
		}
	};
	useEffect(() => {
		if (
			checkNickname !== 200 &&
			checkNickname !== "" &&
			nickname.value.trim() !== ""
		) {
			dispatch(updateIsToastExist("이미 사용중인 닉네임입니다."));
		}
		dispatch(resetCheckNickname());
	}, [checkNickname]);
	useEffect(() => {
		if (checkEmail !== 200 && checkEmail !== "" && email.value.trim() !== "") {
			dispatch(updateIsToastExist("이미 사용중인 이메일입니다."));
		}
		dispatch(resetCheckEmail());
	}, [checkEmail]);
	return (
		<Flex dir="column" jc="flex-start" wd="100%" ht="100vh">
			{/* 헤더 */}
			<Flex
				wd="100%"
				dir="row"
				ht="61px"
				jc="space-between"
				bb="1px solid #EFEFEF"
			>
				<Flex ht="100%" mg="0 0 0 18px">
					<Svg variant="chevron" onClick={() => navigate("/")} />
				</Flex>
				<Flex fs="18" fw="bold">
					회원가입
				</Flex>
				<Flex wd="40px" />
			</Flex>

			{/* 컨텐트 */}
			<Flex gap="26px" wd="100%" dir="column" pd="25px 20px">
				{/* 닉네임 */}
				<Flex wd="100%" dir="column" gap="8px">
					<Flex mg="0 0 10px 0" wd="100%" fw="600" fs="14" jc="flex-start">
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
							<Flex
								wd="24px"
								ht="24px"
								mg="0 13px 0 0"
								onClick={nickname.onReset}
							>
								{nickname.value.trim() === "" ? null : (
									<Svg variant="InputReset" />
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
					<Flex dir="column" wd="100%" ai="flex-start" gap="5px">
						{nickname.value.length === 0 ? (
							<>
								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="joinCheck" />
									</Flex>
									<Flex color="#A2A2A2" fs="10">
										2-6자의 영어 대소문자 또는 숫자 또는 한글만 가능해요
									</Flex>
								</Flex>

								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="joinCheck" />
									</Flex>
									<Flex color="#A2A2A2" fs="10">
										한글 초성 및 모음은 사용할 수 없어요
									</Flex>
								</Flex>
							</>
						) : regNick.test(nickname.value) && nickname.value.length > 0 ? (
							<>
								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regOk" />
									</Flex>
									<Flex color="#06C270" fs="10">
										2-6자의 영어 대소문자 또는 숫자 또는 한글만 가능해요
									</Flex>
								</Flex>

								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regOk" />
									</Flex>
									<Flex color="#06C270" fs="10">
										한글 초성 및 모음은 사용할 수 없어요
									</Flex>
								</Flex>
							</>
						) : (
							<>
								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regNon" />
									</Flex>
									<Flex color="#FF3B3B" fs="10">
										2-6자의 영어 대소문자 또는 숫자 또는 한글만 가능해요
									</Flex>
								</Flex>

								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regNon" />
									</Flex>
									<Flex color="#FF3B3B" fs="10">
										한글 초성 및 모음은 사용할 수 없어요
									</Flex>
								</Flex>
							</>
						)}
					</Flex>
				</Flex>

				{/* 이메일 */}
				<Flex wd="100%" dir="column" gap="6px">
					<Flex mg="0 0 10px 0" wd="100%" fw="600" fs="14" jc="flex-start">
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
							<Flex wd="24px" ht="24px" mg="0 13px 0 0" onClick={email.onReset}>
								{email.value.trim() === "" ? null : (
									<Svg variant="InputReset" />
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
				</Flex>

				{/* 비밀번호 */}
				<Flex wd="100%" dir="column" gap="6px">
					<Flex mg="0 0 10px 0" wd="100%" fw="600" fs="14" jc="flex-start">
						비밀번호
					</Flex>

					<StPassword>
						<StInput
							onBlur={checkPasswordHandler}
							type={passwordType.type}
							value={password.value}
							onChange={password.onChange}
							variant="join"
							placeholder="비밀번호를 입력하세요"
						/>
						<Flex
							wd="24px"
							ht="24px"
							mg="0 13px 0 0"
							onClick={passwordTypeHandler}
						>
							{passwordType.visible === false && password.value.length === 0 ? (
								<Svg variant="noShow" onClick={passwordTypeHandler} />
							) : passwordType.visible === false &&
							  password.value.length > 0 ? (
								<Svg variant="noShowBlack" onClick={passwordTypeHandler} />
							) : passwordType.visible === true &&
							  password.value.length === 0 ? (
								<Svg variant="show" onClick={passwordTypeHandler} />
							) : passwordType.visible === true && password.value.length > 0 ? (
								<Svg variant="showBlack" onClick={passwordTypeHandler} />
							) : (
								<Svg variant="noshow" onClick={passwordTypeHandler} />
							)}
						</Flex>
					</StPassword>

					<Flex dir="column" wd="100%" ai="flex-start" gap="5px">
						{password.value.length === 0 ? (
							<>
								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="joinCheck" />
									</Flex>
									<Flex color="#A2A2A2" fs="10">
										영문 대소문자, 숫자, 특수문자 !@#$%^&*를 적어도 하나씩 포함
									</Flex>
								</Flex>

								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="joinCheck" />
									</Flex>
									<Flex color="#A2A2A2" fs="10">
										최소 8자, 최대 20자 구성
									</Flex>
								</Flex>
							</>
						) : !regPassNonLength.test(password.value) &&
						  !(7 < password.value.length && password.value.length <= 20) ? (
							<>
								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regNon" />
									</Flex>
									<Flex color="#FF3B3B" fs="10">
										영문 대소문자, 숫자, 특수문자 !@#$%^&*를 적어도 하나씩 포함
									</Flex>
								</Flex>

								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regNon" />
									</Flex>
									<Flex color="#FF3B3B" fs="10">
										최소 8자, 최대 20자 구성
									</Flex>
								</Flex>
							</>
						) : regPassNonLength.test(password.value) &&
						  !(7 < password.value.length && password.value.length <= 20) ? (
							<>
								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regOk" />
									</Flex>
									<Flex color="#06C270" fs="10">
										영문 대소문자, 숫자, 특수문자 !@#$%^&*를 적어도 하나씩 포함
									</Flex>
								</Flex>

								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regNon" />
									</Flex>
									<Flex color="#FF3B3B" fs="10">
										최소 8자, 최대 20자 구성
									</Flex>
								</Flex>
							</>
						) : !regPassNonLength.test(password.value) &&
						  7 < password.value.length &&
						  password.value.length <= 20 ? (
							<>
								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regNon" />
									</Flex>
									<Flex color="#FF3B3B" fs="10">
										영문 대소문자, 숫자, 특수문자 !@#$%^&*를 적어도 하나씩 포함
									</Flex>
								</Flex>

								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regOk" />
									</Flex>
									<Flex color="#06C270" fs="10">
										최소 8자, 최대 20자 구성
									</Flex>
								</Flex>
							</>
						) : (
							<>
								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regOk" />
									</Flex>
									<Flex color="#06C270" fs="10">
										영문 대소문자, 숫자, 특수문자 !@#$%^&*를 적어도 하나씩 포함
									</Flex>
								</Flex>

								<Flex dir="row" gap="5px">
									<Flex>
										<Svg variant="regOk" />
									</Flex>
									<Flex color="#06C270" fs="10">
										최소 8자, 최대 20자 구성
									</Flex>
								</Flex>
							</>
						)}
					</Flex>
				</Flex>

				{/* 비밀번호 확인 */}
				<Flex wd="100%" dir="column" gap="6px">
					<Flex mg="0 0 10px 0" wd="100%" fw="600" fs="14" jc="flex-start">
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
							<Flex
								wd="24px"
								ht="24px"
								mg="0 13px 0 0"
								onClick={checkPasswordTypeHandler}
							>
								{checkPasswordType.visible === false &&
								checkPass.value.length === 0 ? (
									<Svg variant="noShow" onClick={checkPasswordTypeHandler} />
								) : checkPasswordType.visible === false &&
								  checkPass.value.length > 0 ? (
									<Svg
										variant="noShowBlack"
										onClick={checkPasswordTypeHandler}
									/>
								) : checkPasswordType.visible === true &&
								  checkPass.value.length === 0 ? (
									<Svg variant="show" onClick={checkPasswordTypeHandler} />
								) : checkPasswordType.visible === true &&
								  checkPass.value.length > 0 ? (
									<Svg variant="showBlack" onClick={checkPasswordTypeHandler} />
								) : (
									<Svg variant="noshow" onClick={checkPasswordTypeHandler} />
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
							<Flex
								wd="24px"
								ht="24px"
								mg="0 13px 0 0"
								onClick={checkPasswordTypeHandler}
							/>
						</StRePasswordBlue>
					)}
					{checkPass.value.trim() !== "" &&
					password.value !== checkPass.value ? (
						<Flex wd="100%" fs="12" jc="flex-start">
							<StSvg>
								<Svg variant="alert" />
							</StSvg>
							<StInfo>비밀번호를 다시 확인해주세요</StInfo>
						</Flex>
					) : null}
				</Flex>
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

const StEmailBlue = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
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
	width: 100%;
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
	width: 100%;
	background-color: #f4f4f4;
	align-items: center;
	border-radius: 10px;
	outline: 1px solid #7474ff;
	justify-content: space-between;
`;

const StRePassword = styled.div`
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

const StRePasswordBlue = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
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
