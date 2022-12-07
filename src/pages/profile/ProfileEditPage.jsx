import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
	Box,
	Flex,
	Image,
	Label,
	Svg,
	Input,
	grey100,
	Text,
	grey600,
	grey300,
} from "../../common";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../common/hooks/useInput";
import { __checkNick } from "../../redux/modules/join/joinSlice";
import { updatePro, __getUser } from "../../redux/modules/profileSlice";
import NavBelow from "../../components/nav/NavBelow";
import jwtDecode from "jwt-decode";
import { __resetProfileTags } from "../../redux/modules/middleware/profileThunk";

const ProfileEdit = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const nickname = useInput("");

	const [isBlue, setIsBlue] = useState(false);
	const [name, setName] = useState("");

	const checkNickname = useSelector(
		state => state?.join?.checkNickResult.status,
	);
	//닉네임 정규식
	// 1. 2-6자, 영어 대소문자 또는 숫자 또는 한글로 구성
	// 2. 특이사항 : 한글 초성 및 모음은 허가하지 않는다.
	const regNick = /^(?=.*[a-z0-9A-Z가-힣])[a-z0-9A-Z가-힣]{2,6}$/;

	const token = localStorage.getItem("accessToken");
	const decodedToken = jwtDecode(token);

	useEffect(() => {
		dispatch(__getUser(decodedToken.memberId));
	}, []);

	const checkNicknameHandler = () => {
		if (regNick.test(nickname.value)) {
			dispatch(__checkNick({ nickname: nickname.value }));
		}
	};

	// image preview useState
	const [previewImage, setPreviewImage] = useState("");
	const [uploadImageForm, setUploadImageForm] = useState(null);

	//profile useState
	const [profile, setProfile] = useState({
		nickname: "",
		profileImage: "",
	});

	const imgFileHandler = e => {
		setUploadImageForm(e.target.files[0]);
		// 닉네임 선, 이미지 후 수정 시 오류로 빠지는 부분 수정
		setProfile({ ...profile, profileImage: e.target.files[0] });

		let reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = () => {
			const previewImgUrl = reader.result;
			if (previewImgUrl) {
				// 이미지 연속 업로드 시 엑박 발생하는 부분 수정: 얕은 복사 제거
				setPreviewImage(previewImgUrl);
			}
		};
	};

	const postHandler = e => {
		setName(e.target.value);
		const { value, name } = e.target;
		setProfile({
			...profile,
			[name]: value,
			profileImage: uploadImageForm,
		});
	};

	const updateHandler = () => {
		dispatch(updatePro(profile));
	};

	const user = useSelector(state => state.profileSlice.profile);
	const onClickPasswordEdit = () => {
		navigate("/profile/edit/password/");
	};

	const resetTagsHandler = () => {
		dispatch(__resetProfileTags());
	};

	return (
		<>
			<Flex
				dir="column"
				jc="flex-start"
				wd="100%"
				ht="100vh"
				style={{ overflow: "auto" }}
			>
				<Flex wd="375px" dir="column">
					<Flex wd="335px" jc="space-between" mg="20px 0 0 0">
						<Svg variant="chevron" onClick={() => navigate(-1)} />
						<Flex fs="18" fw="600">
							회원 정보 수정
						</Flex>
						<Flex fs="16" fw="600" color="#D9D9D9" onClick={updateHandler}>
							적용
						</Flex>
					</Flex>
					<Box variant="profileEditBox">
						<Svg variant="profilePlus"></Svg>
						<Box variant="imageLayout">
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
								src={previewImage === "" ? user.profileImage : previewImage}
							/>
						</Box>
					</Box>
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
						<Box variant="stnickname" style={{ marginBottom: "7px" }}>
							<Input
								id="nickname"
								name="nickname"
								onBlur={checkNicknameHandler}
								defaultValue={user.nickname}
								onChange={postHandler}
								type="text"
								variant="join"
							/>
							<Flex wd="24px" ht="24px" mg="0 13px 0 0">
								{nickname.value.trim() === "" ? null : (
									<Svg onClick={nickname.onReset} variant="InputReset" />
								)}
							</Flex>
						</Box>
					) : (
						<Box variant="stnicknameBlue">
							<Input
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
						</Box>
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
								<Box variant="stSvg">
									<Svg variant="alert" />
								</Box>
								<Box variant="stInfo">
									닉네임은 2-6자, 영어 대소문자,숫자 또는 한글로 구성됩니다.
								</Box>
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
								<Box variant="stSvg">
									<Svg variant="alert" />
								</Box>
								<Box variant="stInfo">이미 사용중인 닉네임입니다.</Box>
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
								<Box variant="stInfo">사용가능한 닉네임입니다.</Box>
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
					<Box variant="stEmail" style={{ marginBottom: "26px" }}>
						<Input
							type="text"
							variant="join"
							defaultValue={user.email}
							disabled
							style={{ fontSize: "16px", fontWeight: 400, color: "#C8C8C8" }}
						/>
					</Box>
					<Flex
						wd="335px"
						ht="26px"
						fw="600"
						fs="14"
						lh="26"
						jc="flex-start"
						mg="0 0 10px 0"
					>
						관심사
					</Flex>

					{/* 관심사 태그 */}
					<Flex wd="335px" jc="flex-start">
						{!user.tagList || !user.tagList[0] ? (
							<Flex gap="13px">
								<Text variant="body3" color={grey600}>
									관심사가 없습니다.
								</Text>
								<Flex
									onClick={() => navigate(`interest`)}
									cursor="pointer"
									wd="120px"
									ht="30px"
									radius="5px"
									border={`1px solid ${grey300}`}
									gap="5px"
									pd="8px 12px"
								>
									<Text variant="body4">관심사 선택하기</Text>
									<Flex
										wd="5px"
										ht="8px"
										bi="url(/images/arrowRightBlack.svg)"
									/>
								</Flex>
							</Flex>
						) : (
							<Flex jc="flex-start" wrap="wrap" gap="10px">
								{user.tagList.map((tag, index) => (
									<Flex
										key={index}
										ht="38px"
										pd="8px 16px"
										radius="24px"
										bg={grey100}
									>
										<Text variant="body2Regular">{tag}</Text>
									</Flex>
								))}
								<Flex
									onClick={resetTagsHandler}
									cursor="pointer"
									wd="25px"
									ht="25px"
									radius="50%"
								>
									<Flex wd="13px" ht="15px" bi="url(/images/reset.svg)" />
								</Flex>
							</Flex>
						)}
					</Flex>
					<Flex wd="335px" jc="flex-end" mg="40px 0 120px 0">
						<Flex
							wd="100px"
							ht="34px"
							bg="#131313"
							radius="5px"
							color="#fff"
							fw="600"
							fs="11"
							onClick={onClickPasswordEdit}
							cursor="pointer"
						>
							비밀번호 변경 <Svg variant="rightArrow_three"></Svg>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<NavBelow />
		</>
	);
};

export default ProfileEdit;
