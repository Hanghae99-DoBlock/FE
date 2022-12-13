import { Box, Button, Flex, Toast } from "../../common";
import Input, { StInput } from "../../common/input/Input";
import Svg from "../../common/svg/Svg";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useInput from "../../common/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { BoastFeed } from "../../components";
import Lottie from "lottie-react";
import spinner from "../../common/gif/spinner.json";
import "./style/AddFeedStyle.css";
import {
	addFormPhoto,
	addPhoto,
	addTag,
	changeLoading,
	changeStatus,
	resetFeed,
	resetFollowingList,
	resetFormPhotoList,
	resetTodo,
	__getSuccessTodo,
	__uploadFeed,
} from "../../redux/modules/feed/feedSlice";
import { PhotoList, TagList, ChoiceTodoModal } from "../../components";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { updateIsToastExist } from "../../redux/modules/toastSlice";
import AddFeedCompleteModal from "../../components/feed/AddFeedCompleteModal";
import imageCompression from "browser-image-compression";
const AddFeedPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const title = useInput();
	const [openModal, setOpenModal] = useState(false);
	const [completedModal, setCompletedModal] = useState(false);
	const [tagInput, setTagInput] = useState([]);
	const [tagValue, setTagValue] = useState("");
	const boastFeed = useSelector(state => state.feed.checkedList);
	const tagList = useSelector(state => state.feed.tagList);
	const photoList = useSelector(state => state.feed.photoList);
	const formPhotoList = useSelector(state => state.feed.formPhotoList);
	const [id, setId] = useState(tagList.length);
	const [isInputHidden, setIsInputHidden] = useState(true);
	const [detail, setDetail] = useState("");
	const [isPhotoFull, setIsPhotoFull] = useState(false);
	const [isPostPossible, setIsPostPossible] = useState(false);
	const loading = useSelector(state => state.feed.isLoading);
	const isCompleted = useSelector(state => state.feed.isCompleted);
	const uploadResult = useSelector(state => state.feed.uploadResult);
	const uploadResultCode = useSelector(state => state.feed.uploadResultCode);
	let todoIdArray = boastFeed.map(todo => {
		return todo.id;
	});
	const photoUrlArray = photoList.map(photo => {
		return photo.url;
	});
	const tagArray = tagList.map(tag => {
		return tag.value;
	});
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth();
	const day = today.getDate();
	//색상변경
	const [isYellowChecked, setIsYellowChecked] = useState(false);
	const [isOrangeChecked, setIsOrangeChecked] = useState(false);
	const [isBlueChecked, setIsBlueChecked] = useState(false);
	const [isGreenChecked, setIsGreenChecked] = useState(false);
	const [color, setColor] = useState("");

	useEffect(() => {
		dispatch(resetFeed());

		setColor("");
		title.value = "";
		setDetail("");
		dispatch(resetFormPhotoList());
	}, []);
	useEffect(() => {
		//등록된 사진의 개수가 4개이상일시, 파일추가 버튼을 숨기는 로직
		if (photoList.length >= 4) {
			setIsPhotoFull(true);
		} else {
			setIsPhotoFull(false);
		}
		dispatch(__getSuccessTodo({ year: year, month: month + 1, date: day }));
		if (isCompleted === 200) {
			dispatch(changeStatus());
			setCompletedModal(true);
		}
	}, [photoList, isCompleted]);

	{
		/*전달할 색상 값 변경 */
	}
	const yeollowHandler = () => {
		setColor("#FFD645");
		setIsYellowChecked(true);
		setIsBlueChecked(false);
		setIsGreenChecked(false);
		setIsOrangeChecked(false);
	};

	const orangeHandler = () => {
		setColor("#FFB443");
		setIsYellowChecked(false);
		setIsBlueChecked(false);
		setIsGreenChecked(false);
		setIsOrangeChecked(true);
	};

	const blueHandler = () => {
		setColor("#6ED6F8");
		setIsYellowChecked(false);
		setIsBlueChecked(true);
		setIsGreenChecked(false);
		setIsOrangeChecked(false);
	};

	const greenHandler = () => {
		setColor("#5DE5B4");
		setIsYellowChecked(false);
		setIsBlueChecked(false);
		setIsGreenChecked(true);
		setIsOrangeChecked(false);
	};

	const addTagInput = e => {
		setIsInputHidden(!isInputHidden);
	};

	const changeTagHandler = e => {
		setTagValue(e.target.value);
	};

	const addTagHandler = e => {
		if (e.keyCode === 13 && tagValue.trim() === "") {
			return alert("태그를 입력해주세요");
		} else if (e.keyCode === 13 && tagList.length <= 3) {
			setId(prev => prev + 1);

			dispatch(addTag({ id: id, value: tagValue }));
			setIsInputHidden(true);
			setTagValue("");
		}
	};

	const changeDetail = e => {
		setDetail(e.target.value);
	};

	// 사진 추가 핸들러
	const photoChangeHandler = e => {
		e.preventDefault();
		for (let i = 0; i < 4; i++) {
			let photoId = uuid();
			let reader = new FileReader();
			let file = e.target.files[i];
			if (file !== undefined) {
				dispatch(addFormPhoto(file));
			}
			reader.onloadend = () => {
				const previewImg = reader.result;
				dispatch(
					addPhoto({
						id: photoId,
						url: previewImg,
						lastModified: file.lastModified,
					}),
				);
			};

			if (e.target.files[i]) {
				reader.readAsDataURL(e.target.files[i]);
			}
		}
	};
	const uploadFeedHandler = () => {
		//필수 항목 입력 검사
		if (boastFeed.length >= 1 && photoList.length >= 1 && color.length >= 1) {
			dispatch(
				__uploadFeed({
					todoIdList: todoIdArray,
					feedTitle: title.value,
					feedContent: detail,
					feedImageList: formPhotoList,
					feedColor: color,
					tagList: tagArray,
				}),
			);
			dispatch(resetFollowingList());
		}

		if (uploadResultCode !== 200 && uploadResult === "EXCEED_FILE_SIZE") {
			dispatch(
				updateIsToastExist("이미지는 1장당 최대 5MB까지 등록 가능합니다"),
			);
		} else if (uploadResultCode !== 200 && uploadResult === "NOT_VALID_IMAGE") {
			dispatch(updateIsToastExist("jpg,jpeg,png 형식만 업로드 가능합니다"));
		}
	};
	const openModalHandler = () => {
		setOpenModal(true);
		dispatch(resetTodo());
	};

	const tagInputEmptyHandler = () => {
		if (tagValue.trim() === "") {
			setIsInputHidden(true);
		}
	};
	console.log(tagList);

	useEffect(() => {
		if (todoIdArray.length >= 1 && photoList.length >= 1 && color) {
			setIsPostPossible(true);
		} else {
			setIsPostPossible(false);
		}
	}, [boastFeed, photoList, formPhotoList, color]);
	return (
		<>
			{openModal && <ChoiceTodoModal setOpenModal={setOpenModal} />}
			{completedModal && (
				<AddFeedCompleteModal setCompletedModal={setCompletedModal} />
			)}
			{loading && (
				<Flex wd="100%" ht="100%" ai="flex-start" position="absolute">
					<Flex wd="100%" ht="100vh" position="relative">
						<Flex wd="100%" ht="100%" zIndex="2">
							<Flex wd="100%" ht="100vh" bg="rgba(255,255,255,0.5)">
								<Lottie animationData={spinner} />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			)}

			<Flex
				dir="column"
				wd="100%"
				ht="100%"
				mg="0 auto"
				jc="flex-start"
				gap="25px"
				ai="center"
				wrap="wrap"
				pd="0 20px 0 20px"
			>
				<Flex
					dir="row"
					wd="100%"
					ht="58px"
					jc="space-between"
					pd="8px 0"
					ai="center"
					mg="0 0 5px 0"
				>
					<Flex
						wd="125px"
						ht="42px"
						jc="flex-start"
						mg="0 0 0 17px"
						onClick={() => navigate("/feed/following")}
					>
						<Svg variant="chevron" />
					</Flex>
					<Flex fs="18" wd="125px">
						피드 남기기
					</Flex>
					{!isPostPossible ? (
						<Flex
							wd="125px"
							ht="42px"
							jc="flex-end"
							mg="0 17px 0 0"
							fs="16"
							color="#D9D9D9"
							cursor="pointer"
						>
							게시
						</Flex>
					) : (
						<Flex
							wd="125px"
							ht="42px"
							jc="flex-end"
							mg="0 17px 0 0"
							fs="16"
							color="#FF8737"
							cursor="pointer"
							onClick={uploadFeedHandler}
						>
							게시
						</Flex>
					)}
				</Flex>
				<Flex
					dir="column"
					wd="100%"
					ht="82px"
					jc="flex-start"
					pd="0 20px 0 20px"
					ai="normal"
					gap="6px"
				>
					<Flex jc="flex-start" ai="baseline" gap="6px">
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							wd="28px"
							ht="26px"
							fs="14"
							fw="600"
							jc="flex-start"
						>
							제목
						</Flex>
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							mw="148px"
							ht="26px"
							fs="12"
							jc="flex-start"
							color="#131313"
							oc="0.4"
							fw="600"
						>
							최대 30자 입력 가능합니다
						</Flex>
					</Flex>
					{/*제목 입력*/}
					<Input
						variant="addFeedInput"
						value={title.value || ""}
						onChange={title.onChange}
					/>
				</Flex>
				<Flex
					dir="column"
					wd="100%"
					mh="82px"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
					gap="6px"
				>
					<Flex jc="space-between" ai="baseline" wd="100%" ht="26px" gap="6px">
						<Flex gap="6px">
							<Flex
								dir="row"
								ai="center"
								wd="135px"
								ht="26px"
								fs="14"
								fw="600"
								jc="flex-start"
							>
								자랑하고 싶은 투두 *
							</Flex>

							<Flex
								dir="row"
								ai="center"
								wd="148px"
								ht="26px"
								fs="12"
								jc="flex-start"
								color="#131313"
								oc="0.4"
								fw="600"
							>
								최대 3개 선택 가능합니다
							</Flex>
						</Flex>
						{boastFeed.length !== 0 ? (
							<Flex onClick={openModalHandler}>
								<Svg variant="addBoastTodo" />
							</Flex>
						) : null}
					</Flex>
					<Box variant="feedTodo">
						<Flex jc="space-between" wd="100%">
							<Flex fs="14" color="#808080">
								투두 추가
							</Flex>
							<Flex onClick={openModalHandler}>
								<Svg variant="plusBoastFeed" />
							</Flex>
						</Flex>
					</Box>
					<Flex wd="100%" mht="40px" ai="flex-start" dir="column" gap="13px">
						{boastFeed?.map(todo => {
							return <BoastFeed todo={todo} key={todo.id} />;
						})}
					</Flex>
				</Flex>
				<Flex
					dir="column"
					wd="100%"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
					gap="6px"
				>
					<Flex jc="flex-start" gap="6px">
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							wd="65px"
							ht="26px"
							fs="14"
							fw="600"
							jc="flex-start"
						>
							상세 내용
						</Flex>
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							wd="155px"
							ht="26px"
							fs="12"
							jc="flex-start"
							color="#131313"
							oc="0.4"
							fw="600"
						>
							최대 100자 입력 가능합니다
						</Flex>
					</Flex>
					<Flex
						wd="100%"
						ht="160px"
						jc="flex-start"
						ai="flex-start"
						gap="13px"
						position="relative"
					>
						<StDetailContent
							value={detail}
							onChange={changeDetail}
							maxLength={100}
						/>
						{!detail.length > 0 ? (
							<StTextCount>{detail.length}/100</StTextCount>
						) : (
							<StTextCountBlack>{detail.length}/100</StTextCountBlack>
						)}
					</Flex>
				</Flex>
				<Flex
					dir="column"
					wd="100%"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
					gap="6px"
					wrap="wrap"
				>
					<Flex dir="row" jc="flex-start">
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							wd="65px"
							ht="26px"
							fs="14"
							fw="600"
							jc="flex-start"
							wrap="wrap"
						>
							해시 태그
						</Flex>
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							wd="148px"
							ht="26px"
							fs="12"
							jc="flex-start"
							color="#131313"
							oc="0.4"
							fw="600"
						>
							최대 3개 입력 가능합니다
						</Flex>
					</Flex>

					<Flex dir="row" ai="center" jc="flex-start" gap="7px" wrap="wrap">
						{tagList?.map((tag, idx) => {
							return (
								<TagList
									tag={tag}
									tagInput={tagInput}
									setTagInput={setTagInput}
									key={idx}
									id={id}
									setIsInputHidden={setIsInputHidden}
								/>
							);
						})}

						{isInputHidden === false ? (
							<StInputTag
								onBlur={tagInputEmptyHandler}
								value={tagValue}
								onChange={changeTagHandler}
								onKeyDown={addTagHandler}
								autoFocus={true}
							/>
						) : null}
						{tagList.length < 3 ? (
							<Button variant="addTag" onClick={addTagInput}>
								<Svg variant="bluePlus" />
							</Button>
						) : null}
						<Flex gap="5px"></Flex>
					</Flex>
				</Flex>
				<Flex
					dir="column"
					wd="100%"
					ht="120px"
					jc="center"
					ai="flex-start"
					gap="10px"
					pd="0 20px"
				>
					<Flex jc="flex-start" gap="6px">
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							wd="40px"
							ht="18px"
							fs="14"
							fw="600"
							jc="flex-start"
						>
							사진 *
						</Flex>
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							wd="160px"
							ht="26px"
							fs="12"
							jc="flex-start"
							color="#131313"
							oc="0.4"
							fw="600"
						>
							최대 4장 업로드 가능합니다
						</Flex>
					</Flex>
					<Flex dir="row" gap="10px">
						{isPhotoFull === false ? (
							<StPhotoUploadLabel
								htmlFor="upLoadPhoto"
								onChange={photoChangeHandler}
							>
								<Flex jc="center" ai="center" wd="72px" ht="72px">
									<Svg variant="plusPhoto" />
								</Flex>
								<input type="file" id="upLoadPhoto" multiple />
							</StPhotoUploadLabel>
						) : null}
						{photoList?.map(photo => {
							return (
								<PhotoList
									setIsPhotoFull={setIsPhotoFull}
									isPhotoFull={isPhotoFull}
									photo={photo}
									key={photo.id}
								/>
							);
						})}
					</Flex>
				</Flex>
				<Flex
					dir="column"
					wd="100%"
					jc="center"
					ai="flex-start"
					gap="10px"
					pd="0 20px"
				>
					<Flex
						dir="row"
						ai="center"
						gap="6px"
						wd="75px"
						ht="26px"
						fs="14"
						fw="600"
						jc="flex-start"
					>
						피드 컬러 *
					</Flex>
					<Flex
						wd="199px"
						ht="40px"
						ai="flex-start"
						gap="13px"
						mg="0 0 120px 0"
					>
						{!isYellowChecked ? (
							<StYellowBox onClick={yeollowHandler}></StYellowBox>
						) : (
							<StCheckedYellowBox></StCheckedYellowBox>
						)}
						{!isOrangeChecked ? (
							<StOrangeBox onClick={orangeHandler}></StOrangeBox>
						) : (
							<StCheckedOrangeBox></StCheckedOrangeBox>
						)}
						{!isBlueChecked ? (
							<StBlueBox onClick={blueHandler}></StBlueBox>
						) : (
							<StCheckedBlueBox></StCheckedBlueBox>
						)}
						{!isGreenChecked ? (
							<StGreenBox onClick={greenHandler}></StGreenBox>
						) : (
							<StCheckedGreenBox></StCheckedGreenBox>
						)}
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default AddFeedPage;

export const StPhotoUploadLabel = styled.label`
	width: 72px;
	height: 72px;
	border: 1px solid #e5e5e5;
	border-radius: 5px;

	& input {
		display: none;
	}
`;

export const StTextCountBlack = styled.span`
	font-size: 16px;
	color: black;
	position: absolute;
	bottom: 5%;
	right: 15%;
`;

export const StTextCount = styled.span`
	font-size: 16px;
	color: #a2a2a2;
	position: absolute;
	bottom: 5%;
	right: 7%;
`;

export const StInputTag = styled.input`
	display: flex;
	height: 38px;
	width: 100px;
	background-color: #f8f8f8;
	border-radius: 10px;
	flex-wrap: wrap;
`;

export const StYellowBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #ffd645;
	border-radius: 10px;
	:hover {
		cursor: pointer;
	}
`;

export const StCheckedYellowBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #ffd645;
	border-radius: 10px;
	outline: 2px solid #7474ff;
	:hover {
		cursor: pointer;
	}
`;
export const StOrangeBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #ffb443;
	border-radius: 10px;
	:hover {
		cursor: pointer;
	}
`;

export const StCheckedOrangeBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #ffb443;
	border-radius: 10px;
	:hover {
		cursor: pointer;
	}

	outline: 2px solid #7474ff;
`;
export const StBlueBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #6ed6f8;
	border-radius: 10px;

	:hover {
		cursor: pointer;
	}
`;

export const StCheckedBlueBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #6ed6f8;
	border-radius: 10px;
	outline: 2px solid #7474ff;

	:hover {
		cursor: pointer;
	}
`;

export const StGreenBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #5de5b4;
	border-radius: 10px;
	:hover {
		cursor: pointer;
	}
	:focus {
		outline: 2px solid #7474ff;
	}
`;

export const StCheckedGreenBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #5de5b4;
	border-radius: 10px;
	outline: 2px solid #7474ff;
	:hover {
		cursor: pointer;
	}
`;

export const StDetailContent = styled.textarea`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	max-width: 335px;
	min-height: 160px;
	max-height: 160px;
	background-color: #f4f4f4;
	border-radius: 10px;
	padding: 12px 16px 12px 16px;
	outline-color: #7474ff;
	resize: none;
	position: relative;
`;

export const StButton = styled.button`
	font-size: 12px;
	width: 58px;
	height: 26px;
	background-color: #a7a7a7;
	color: #131313;
	opacity: 0.4;
	letter-spacing: -2px;
	padding: 0px 8px;
	margin-left: 10px;
`;
