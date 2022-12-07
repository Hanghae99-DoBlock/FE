import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Flex, Svg, Box } from "../../common";
import useInput from "../../common/hooks/useInput";
import Input, { StInput } from "../../common/input/Input";
import NavBelow from "../../components/nav/NavBelow";
import { __editPassword } from "../../redux/modules/profileSlice";

const PasswordChange = () => {
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
	const [currentPasswordType, setCurrentPasswordType] = useState({
		type: "password",
		visible: false,
	});

	const currentPassword = useInput("");
	const password = useInput("");
	const checkPass = useInput("");

	//profile useState
	const [profile, setProfile] = useState({
		currentPassword: "",
		newPassword: "",
	});

	const [currentPassWord, setCurrentPassWord] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState("");

	const [isBlue, setIsBlue] = useState(false);

	//비밀번호 정규식
	// 1. 영문 대소문자, 숫자, 특수문자 !@#$%^&* 를 적어도 하나씩 포함해야됨
	// 2. 8-20자
	const regPass =
		/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-z0-9A-Z!@#$%^&*]{8,20}$/;
	const regPassNonLength =
		/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-z0-9A-Z!@#$%^&*]/;

	const checkPasswordHandler = () => {
		if (regPass.test(password.value)) {
		}
	};

	const passwordChangeHandler = () => {
		dispatch(__editPassword(profile));
	};

	const postHandler = e => {
		setCurrentPassWord(e.target.value);
		setNewPassword(e.target.value);
		const { value, name } = e.target;
		setProfile({
			...profile,
			[name]: value,
		});
	};

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
	const currentPasswordTypeHandler = e => {
		setCurrentPasswordType(() => {
			if (!currentPasswordType.visible) {
				return { type: "text", visible: true };
			}
			return { type: "password", visible: false };
		});
	};

	return (
		<Flex dir="column" mw="375px" mxw="375px" mg="0 auto">
			<Flex wd="335px" jc="space-between" mg="20px 0">
				<Svg variant="chevron" onClick={() => navigate(-1)} />
				<Flex fs="18" fw="600">
					비밀번호 변경
				</Flex>
				{currentPassword.value !== "" &&
				password.value !== "" &&
				checkPass.value !== "" ? (
					<Flex
						fs="16"
						fw="600"
						color="#FF8737"
						onClick={passwordChangeHandler}
					>
						적용
					</Flex>
				) : (
					<Flex fs="16" fw="600" color="#D9D9D9">
						적용
					</Flex>
				)}
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
					현재 비밀번호
				</Flex>
				<StPassword>
					<StInput
						id="currentPassword"
						name="currentPassword"
						onBlur={checkPasswordHandler}
						type={currentPasswordType.type}
						value={currentPassword.value}
						onChange={e => {
							currentPassword.onChange(e);
							postHandler(e);
						}}
						variant="join"
						placeholder="현재 비밀번호를 입력하세요"
					/>
					<Flex
						wd="24px"
						ht="24px"
						mg="0 13px 0 0"
						onClick={currentPasswordTypeHandler}
					>
						{currentPasswordType.visible === false &&
						currentPassword.value.length === 0 ? (
							<Svg variant="noShow" onClick={currentPasswordTypeHandler} />
						) : currentPasswordType.visible === false &&
						  currentPassword.value.length > 0 ? (
							<Svg variant="noShowBlack" onClick={currentPasswordTypeHandler} />
						) : currentPasswordType.visible === true &&
						  currentPassword.value.length === 0 ? (
							<Svg variant="show" onClick={currentPasswordTypeHandler} />
						) : currentPasswordType.visible === true &&
						  currentPassword.value.length > 0 ? (
							<Svg variant="showBlack" onClick={currentPasswordTypeHandler} />
						) : (
							<Svg variant="noshow" onClick={currentPasswordTypeHandler} />
						)}
					</Flex>
				</StPassword>
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
					새 비밀번호
				</Flex>

				<StPassword>
					<StInput
						id="newPassword"
						name="newPassword"
						onBlur={checkPasswordHandler}
						type={passwordType.type}
						value={password.value}
						onChange={e => {
							password.onChange(e);
							postHandler(e);
						}}
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
						) : passwordType.visible === false && password.value.length > 0 ? (
							<Svg variant="noShowBlack" onClick={passwordTypeHandler} />
						) : passwordType.visible === true && password.value.length === 0 ? (
							<Svg variant="show" onClick={passwordTypeHandler} />
						) : passwordType.visible === true && password.value.length > 0 ? (
							<Svg variant="showBlack" onClick={passwordTypeHandler} />
						) : (
							<Svg variant="noshow" onClick={passwordTypeHandler} />
						)}
					</Flex>
				</StPassword>

				<Flex
					dir="column"
					wd="335px"
					ht="26px"
					ai="flex-start"
					gap="5px"
					mg="7px 0 0 0"
				>
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
					새 비밀번호 확인
				</Flex>
				{isBlue === false ? (
					<StRePassword>
						<StInput
							id="checkPassword"
							name="checkPassword"
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
								<Svg variant="noShowBlack" onClick={checkPasswordTypeHandler} />
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
						></Flex>
					</StRePasswordBlue>
				)}
				{checkPass.value.trim() !== "" && password.value !== checkPass.value ? (
					<Flex
						dir="row"
						wd="335px"
						ht="26px"
						fs="12"
						ai="center"
						jc="flex-start"
					>
						<Flex dir="row" gap="5px">
							<Flex>
								<Svg variant="regNon" />
							</Flex>
							<Flex color="#FF3B3B" fs="10">
								비밀번호와 비밀번호 확인이 일치하지 않습니다
							</Flex>
						</Flex>
					</Flex>
				) : (
					<Flex dir="row" wd="335px" ht="26px" fs="12" ai="center"></Flex>
				)}
			</Flex>
			<NavBelow />
		</Flex>
	);
};

export default PasswordChange;

const StSvg = styled.div`
	display: flex;
	align-items: center;
	width: 22px;
	height: 22px;
`;
const StInfo = styled.div`
	color: #7474ff;
	display: flex;
	justify-content: flex-start;
	width: 300px;
`;
export const StPassword = styled.div`
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
