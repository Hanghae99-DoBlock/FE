import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Flex, Svg, Input, Box } from "../../common";
import useInput from "../../common/hooks/useInput";

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

	const password = useInput("");
	const checkPass = useInput("");

	// const passWord = useSelector(state => state.profileSlice);

	const [passWord, setPassWord] = useState("");

	//비밀번호 정규식
	// 1. 영문 대소문자, 숫자, 특수문자 !@#$%^&* 를 적어도 하나씩 포함해야됨
	// 2. 8-20자
	const regPass =
		/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-z0-9A-Z!@#$%^&*]{8,20}$/;

	const checkPasswordHandler = () => {
		if (regPass.test(password.value)) {
		}
	};

	return (
		<Flex dir="column" mw="375px" mxw="375px" mh="667px" mg="0 auto">
			<Flex dir="row" ht="58px" jc="space-between" pd="8px 0" ai="center">
				<Flex wd="113px" ht="42px" jc="flex-start" mg="0 0 0 17px">
					<Svg variant="chevron" onClick={() => navigate("/signin")} />
				</Flex>
				<Flex fs="18" fw="600">
					비밀번호 변경
				</Flex>
				<Flex wd="113px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
			</Flex>
			<Flex
				wd="335px"
				ht="26px"
				fw="600"
				fs="14"
				lh="26"
				jc="flex-start"
				mg="0 0 5px 0"
			>
				현재 비밀번호
			</Flex>
			<Box variant="stPassword" style={{ marginBottom: "7px" }}>
				<Input
					onBlur={checkPasswordHandler}
					type="password"
					defaultValue={password.value}
					onChange={password.onConfirm}
					variant="join"
					style={{ fontSize: "16px", fontWeight: 400, color: "#131313" }}
				/>
			</Box>
			<Flex dir="row" wd="335px" ht="26px">
				{/* 현재 비밀번호가 DB의 데이터와 일치할 경우 */}
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
			<Flex
				wd="335px"
				ht="26px"
				fw="600"
				fs="14"
				lh="26"
				jc="flex-start"
				mg="0 0 5px 0"
			>
				새 비밀번호
			</Flex>
			<Box variant="stPassword" style={{ marginBottom: "7px" }}>
				<Input
					onBlur={checkPasswordHandler}
					type={passwordType.type}
					defaultValue={password.value}
					onChange={password.onChange}
					variant="join"
					style={{ fontSize: "16px", fontWeight: 400, color: "#131313" }}
				/>
			</Box>
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
			<Flex
				wd="335px"
				ht="26px"
				fw="600"
				fs="14"
				lh="26"
				jc="flex-start"
				mg="0 0 5px 0"
			>
				새 비밀번호 확인
			</Flex>
			<Box variant="stPassword" style={{ marginBottom: "7px" }}>
				<Input
					type={checkPasswordType.type}
					defaultValue={checkPass.value}
					onChange={checkPass.onChange}
					variant="join"
					style={{ fontSize: "16px", fontWeight: 400, color: "#131313" }}
				/>
			</Box>
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
					<Box variant="stInfo">비밀번호를 다시 확인해주세요</Box>
				</Flex>
			) : (
				<Flex dir="row" wd="335px" ht="26px" fs="12" ai="center"></Flex>
			)}
			<Flex
				style={{ marginTop: "10px" }}
				fw="600"
				fs="16px"
				pd="
			10px 126px"
				wd="335px"
				ht="60px"
				bc="#C8C8C8"
				radius="10px"
			>
				변경 완료
			</Flex>
		</Flex>
	);
};

export default PasswordChange;
