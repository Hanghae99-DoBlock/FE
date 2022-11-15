import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Flex, Svg } from "../../common";
import useInput from "../../common/hooks/useInput";
import { StInput } from "../../common/input/Input";
import { __checkPassWord } from "../../redux/modules/profileSlice";

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

	console.log(passWord);

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
			<StPassword style={{ marginBottom: "7px" }}>
				<StInput
					onBlur={checkPasswordHandler}
					type="password"
					defaultValue={password.value}
					onChange={password.onConfirm}
					variant="join"
					style={{ fontSize: "16px", fontWeight: 400, color: "#131313" }}
				/>
			</StPassword>
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
						<StSvg>
							<Svg variant="alert" />
						</StSvg>
						<StInfo>
							비밀번호는 8-20자, 영문 대소문자,숫자,특수문자 !@#$%^&*를 적어도
							하나이상 포함해야합니다
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
			<StPassword style={{ marginBottom: "7px" }}>
				<StInput
					onBlur={checkPasswordHandler}
					type={passwordType.type}
					defaultValue={password.value}
					onChange={password.onChange}
					variant="join"
					style={{ fontSize: "16px", fontWeight: 400, color: "#131313" }}
				/>
			</StPassword>
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
							비밀번호는 8-20자, 영문 대소문자,숫자,특수문자 !@#$%^&*를 적어도
							하나이상 포함해야합니다
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
			<StPassword style={{ marginBottom: "7px" }}>
				<StInput
					type={checkPasswordType.type}
					defaultValue={checkPass.value}
					onChange={checkPass.onChange}
					variant="join"
					style={{ fontSize: "16px", fontWeight: 400, color: "#131313" }}
				/>
			</StPassword>
			{checkPass.value.trim() !== "" && password.value !== checkPass.value ? (
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
