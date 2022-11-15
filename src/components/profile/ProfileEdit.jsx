import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Flex, Image, Label, Svg } from "../../common";
import Input, { StInput } from "../../common/input/Input";
import Div from "../../common/div/Div";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../common/hooks/useInput";
import { __checkNick } from "../../redux/modules/joinSlice";
import { updatePro, __updateProfile } from "../../redux/modules/profileSlice";
import jwtDecode from "jwt-decode";

const ProfileEdit = () => {
	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = useParams();

	const nickname = useInput("");

	const [isBlue, setIsBlue] = useState(false);
	const [name, setName] = useState("");
	const [profile, setProfile] = useState({
		id: "",
		nickname: "",
		file: "",
	});

	const checkNickname = useSelector(
		state => state?.join?.checkNickResult.status,
	);
	//닉네임 정규식
	// 1. 2-6자, 영어 대소문자 또는 숫자 또는 한글로 구성
	// 2. 특이사항 : 한글 초성 및 모음은 허가하지 않는다.
	const regNick = /^(?=.*[a-z0-9A-Z가-힣])[a-z0-9A-Z가-힣]{2,6}$/;

	const checkNicknameHandler = () => {
		if (regNick.test(nickname.value)) {
			dispatch(__checkNick({ nickname: nickname.value }));
		}
	};

	const postHandler = e => {
		setName(e.target.value);
		const { value, name } = e.target;
		setProfile({
			...profile,
			[name]: value,
			file: uploadImageForm,
		});
	};

	const updateHandler = () => {
		dispatch(updatePro(profile));
	};

	// image preview useState
	const [previewImage, setPreviewImage] = useState("");
	const [uploadImageForm, setUploadImageForm] = useState(null);

	const imgFileHandler = e => {
		setUploadImageForm(e.target.files[0]);

		let reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = () => {
			const previewImgUrl = reader.result;
			if (previewImgUrl) {
				setPreviewImage([...previewImage, previewImgUrl]);
			}
		};
	};

	return (
		<Flex
			dir="column"
			mw="375px"
			mxw="375px"
			mh="667px"
			mg="0 auto"
			style={{ overflow: "auto" }}
		>
			<Flex wd="375px" mg="auto" dir="column">
				<Flex wd="335px" jc="space-between">
					<Svg variant="chevron" onClick={() => navigate("/profile/:id")} />
					<Flex
						fs="18"
						fw="600"
						style={{ cursor: "pointer" }}
						onClick={updateHandler}
					>
						저장
					</Flex>
				</Flex>
				<Div variant="imageLayout">
					<Label variant="imageLabel" htmlFor="file" />
					<Input
						variant="imageInput"
						id="addFile"
						type="file"
						name="imageUrl"
						placeholder="업로드"
						accept={"image/*"}
						onChange={imgFileHandler}
					/>
					<Image
						variant="imagePreview"
						src={previewImage === "" ? decodeToken.profileImage : previewImage}
						// src={previewImage}
					/>
				</Div>
				<Flex
					wd="335px"
					ht="26px"
					fw="600"
					fs="14"
					lh="26"
					jc="flex-start"
					mg="0 0 5px 0"
				>
					닉네임
				</Flex>
				{isBlue === false ? (
					<Stnickname style={{ marginBottom: "7px" }}>
						<StInput
							id="nickname"
							name="nickname"
							onBlur={checkNicknameHandler}
							defaultValue={decodeToken.nickname}
							onChange={postHandler}
							type="text"
							variant="join"
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
							id="nickname"
							name="nickname"
							onBlur={checkNicknameHandler}
							value={nickname.value}
							onChange={postHandler}
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
				<Flex
					wd="335px"
					ht="26px"
					fw="600"
					fs="14"
					lh="26"
					jc="flex-start"
					mg="0 0 5px 0"
				>
					이메일
				</Flex>
				<StEmail style={{ marginBottom: "26px" }}>
					<StInput
						type="text"
						variant="join"
						defaultValue="doblock@gmail.com"
						disabled
						style={{ fontSize: "16px", fontWeight: 400, color: "#C8C8C8" }}
					/>
				</StEmail>
				<Flex
					wd="335px"
					ht="26px"
					fw="600"
					fs="14"
					lh="26"
					jc="flex-start"
					mg="0 0 5px 0"
				>
					비밀번호
				</Flex>
				<Flex>
					<StPassword style={{ marginBottom: "26px" }}>
						<StInput
							type="password"
							defaultValue="12341234!"
							variant="join"
							disabled
							style={{ fontSize: "16px", fontWeight: 400, color: "#C8C8C8" }}
						/>
					</StPassword>
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
					대표 뱃지 (최대 3개)
				</Flex>
				<Div variant="stTextArea" style={{ marginBottom: "26px" }}>
					<Div
						variant="textArea"
						type="text"
						style={{ fontSize: "16px", fontWeight: 400, color: "#C8C8C8" }}
					/>
				</Div>
			</Flex>
		</Flex>
	);
};

export default ProfileEdit;
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
