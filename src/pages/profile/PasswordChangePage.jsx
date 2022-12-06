import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flex, Svg, Box } from "../../common";
import useInput from "../../common/hooks/useInput";
import { StInput } from "../../common/input/Input";
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

	const [isBlue, setIsBlue] = useState(false);

	//비밀번호 정규식
	// 1. 영문 대소문자, 숫자, 특수문자 !@#$%^&* 를 적어도 하나씩 포함해야됨
	// 2. 8-20자
	const regPass =
		/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-z0-9A-Z!@#$%^&*]{8,20}$/;

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
		<Flex dir="column" jc="flex-start" wd="100%" ht="100vh">
			<Flex dir="row" ht="58px" jc="space-between" pd="8px 0" ai="center">
				<Flex wd="113px" ht="42px" jc="flex-start" mg="0 0 0 17px">
					<Svg variant="chevron" onClick={() => navigate(-1)} />
				</Flex>
				<Flex fs="18" fw="600">
					비밀번호 변경
				</Flex>
				<Flex wd="113px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
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
				{isBlue === false ? (
					<Box variant="stPassword">
						<StInput
							id="currentPassword"
							name="currentPassword"
							type={currentPasswordType.type}
							value={currentPassword.value}
							onChange={e => {
								currentPassword.onChange(e);
								postHandler(e);
							}}
							variant="join"
							placeholder="현재 비밀번호를 입력하세요"
						/>
						<Flex wd="24px" ht="24px" mg="0 13px 0 0">
							{currentPasswordType.visible === false ? (
								<Svg variant="noShow" onClick={currentPasswordTypeHandler} />
							) : (
								<Svg variant="show" onClick={currentPasswordTypeHandler} />
							)}
						</Flex>
					</Box>
				) : (
					<Box variant="stPasswordBlue">
						<StInput
							id="newPassword"
							name="newPassword"
							onBlur={checkPasswordHandler}
							type={currentPasswordType.type}
							value={currentPassword.value}
							onChange={currentPassword.onChange}
							variant="changeBlue"
							placeholder="현재 비밀번호를 입력하세요"
						/>
						<Flex wd="24px" ht="24px" mg="0 13px 0 0">
							{currentPasswordType.visible === false ? (
								<Svg variant="noShow" onClick={currentPasswordTypeHandler} />
							) : (
								<Svg variant="show" onClick={currentPasswordTypeHandler} />
							)}
						</Flex>
					</Box>
				)}
				<Flex dir="row" wd="335px" ht="26px">
					{currentPassword.value.trim() === "" ? (
						<Flex dir="row" wd="335px" ht="26px" fs="12" ai="center"></Flex>
					) : !regPass.test(currentPassword.value) ? (
						<Flex
							dir="row"
							wd="335px"
							ht="26px"
							fs="12"
							ai="center"
							jc="flex-start"
						>
							<Box variant="stSvg">
								<Svg variant="alert" />
							</Box>
							<Box variant="stInfo">
								비밀번호는 8-20자, 영문 대소문자,숫자,특수문자 !@#$%^&*를 적어도
								하나이상 포함해야합니다
							</Box>
						</Flex>
					) : (
						<Flex
							dir="row"
							wd="335px"
							ht="26px"
							fs="12"
							ai="center"
							jc="flex-start"
						></Flex>
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
					새 비밀번호
				</Flex>
				{isBlue === false ? (
					<Box variant="stPassword">
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
							placeholder="새 비밀번호를 입력하세요"
						/>
						<Flex wd="24px" ht="24px" mg="0 13px 0 0">
							{passwordType.visible === false ? (
								<Svg variant="noShow" onClick={passwordTypeHandler} />
							) : (
								<Svg variant="show" onClick={passwordTypeHandler} />
							)}
						</Flex>
					</Box>
				) : (
					<Box variant="stPasswordBlue">
						<StInput
							id="newPassword"
							name="newPassword"
							onBlur={checkPasswordHandler}
							type={passwordType.type}
							value={password.value}
							onChange={password.onChange}
							variant="changeBlue"
							placeholder="새 비밀번호를 입력하세요"
						/>
						<Flex wd="24px" ht="24px" mg="0 13px 0 0">
							{passwordType.visible === false ? (
								<Svg variant="noShow" onClick={passwordTypeHandler} />
							) : (
								<Svg variant="show" onClick={passwordTypeHandler} />
							)}
						</Flex>
					</Box>
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
							<Box variant="stSvg">
								<Svg variant="alert" />
							</Box>
							<Box variant="stInfo">
								비밀번호는 8-20자, 영문 대소문자,숫자,특수문자 !@#$%^&*를 적어도
								하나이상 포함해야합니다
							</Box>
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
							<Box variant="stSvg">
								<Svg variant="alert" />
							</Box>
							<Box variant="stInfo">사용가능한 비밀번호 입니다</Box>
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
					새 비밀번호 확인
				</Flex>
				{isBlue === false ? (
					<Box variant="stRePassword">
						<StInput
							type={checkPasswordType.type}
							value={checkPass.value}
							onChange={checkPass.onChange}
							variant="join"
							placeholder="새 비밀번호를 한번 더 입력하세요"
						/>
						<Flex wd="24px" ht="24px" mg="0 13px 0 0">
							{checkPasswordType.visible === false ? (
								<Svg variant="noShow" onClick={checkPasswordTypeHandler} />
							) : (
								<Svg variant="show" onClick={checkPasswordTypeHandler} />
							)}
						</Flex>
					</Box>
				) : (
					<Box varian="stRePasswordBlue">
						<StInput
							type={checkPasswordType.type}
							value={checkPass.value}
							onChange={checkPass.onChange}
							variant="changeBlue"
							placeholder="새 비밀번호를 한번 더 입력하세요"
						/>
						<Flex wd="24px" ht="24px" mg="0 13px 0 0">
							{checkPasswordType.visible === false ? (
								<Svg variant="noShow" onClick={checkPasswordTypeHandler} />
							) : (
								<Svg variant="show" onClick={checkPasswordTypeHandler} />
							)}
						</Flex>
					</Box>
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
						<Box variant="stSvg">
							<Svg variant="alert" />
						</Box>
						<Box variant="stInfo">
							{" "}
							<Box variant="stInfo">
								비밀번호와 비밀번호 확인이 일치하지 않습니다
							</Box>
						</Box>
					</Flex>
				) : (
					<Flex dir="row" wd="335px" ht="26px" fs="12" ai="center"></Flex>
				)}
			</Flex>
			<Flex
				mg="10px 0 0 0"
				fw="600"
				fs="16px"
				pd="
			10px 126px"
				wd="335px"
				ht="60px"
				bc="#C8C8C8"
				radius="10px"
				onClick={passwordChangeHandler}
			>
				변경 완료
			</Flex>
			<NavBelow />
		</Flex>
	);
};

export default PasswordChange;
