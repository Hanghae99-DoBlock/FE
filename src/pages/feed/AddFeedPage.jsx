import { Box, Button, Flex } from "../../common";
import Input, { StInput } from "../../common/input/Input";
import Svg from "../../common/svg/Svg";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useInput from "../../common/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { BoastFeed } from "../../components";
import "./style/AddFeedStyle.css";
import {
	addFormPhoto,
	addPhoto,
	addTag,
	resetTodo,
	__getSuccessTodo,
	__uploadFeed,
} from "../../redux/modules/feed/feedSlice";
import { PhotoList, TagList, ChoiceTodoModal } from "../../components";
import uuid from "react-uuid";
import { __getTodoList } from "../../redux/modules/todoList/todoListSlice";
const AddFeedPage = () => {
	const dispatch = useDispatch();
	const title = useInput();
	const [openModal, setOpenModal] = useState(false);
	const [tagInput, setTagInput] = useState([]);
	const [tagValue, setTagValue] = useState("");
	const boastFeed = useSelector(state => state.feed.checkedList);
	const tagList = useSelector(state => state.feed.tagList);
	const photoList = useSelector(state => state.feed.photoList);
	const successTodoList = useSelector(state => state?.feed.successTodo);
	const formPhotoList = useSelector(state => state.feed.formPhotoList);
	const [id, setId] = useState(tagList.length);
	const [isInputHidden, setIsInputHidden] = useState(true);
	const [detail, setDetail] = useState("");
	const [isPhotoFull, setIsPhotoFull] = useState(false);
	const todoIdArray = boastFeed.map(todo => {
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
	useEffect(() => {
		//등록된 사진의 개수가 4개이상일시, 파일추가 버튼을 숨기는 로직
		if (photoList.length >= 4) {
			setIsPhotoFull(true);
		} else {
			setIsPhotoFull(false);
		}
		dispatch(__getSuccessTodo({ year: year, month: month + 1, date: day }));
	}, [photoList]);
	{
		/*boastFeed에서 중복을 제거한 버전 .일치하는 첫번째 값만을 리턴한다*/
	}
	const boastFeedNonDuple = boastFeed?.filter((val, i) => {
		return boastFeed.indexOf(val) === i;
	});
	const [color, setColor] = useState("");

	{
		/*전달할 색상 값 변경 */
	}
	const yeollowHandler = () => {
		setColor("#FFAC33");
		setIsYellowChecked(true);
		setIsBlueChecked(false);
		setIsGreenChecked(false);
		setIsOrangeChecked(false);
	};

	const orangeHandler = () => {
		setColor("#FE8358");
		setIsYellowChecked(false);
		setIsBlueChecked(false);
		setIsGreenChecked(false);
		setIsOrangeChecked(true);
	};

	const blueHandler = () => {
		setColor("#49AFFA");
		setIsYellowChecked(false);
		setIsBlueChecked(true);
		setIsGreenChecked(false);
		setIsOrangeChecked(false);
	};

	const greenHandler = () => {
		setColor("#4CCCB5");
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

				dispatch(addPhoto({ id: photoId, url: previewImg }));
			};

			if (e.target.files[i]) {
				reader.readAsDataURL(e.target.files[i]);
			}
		}
	};
	const uploadFeedHandler = () => {
		//필수 항목 입력 검사
		if (todoIdArray.length < 1 || photoUrlArray.length < 1) {
			alert("사진과 자랑하고싶은 투두는 필수항목입니다");
		} else {
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
		}
	};
	const openModalHandler = () => {
		setOpenModal(true);
		dispatch(resetTodo());
	};

	return (
		<>
			{openModal && <ChoiceTodoModal setOpenModal={setOpenModal} />}
			<Flex
				dir="column"
				mw="375px"
				mxw="375px"
				mh="667px"
				mg="0 auto"
				jc="flex-start"
				gap="25px"
				ai="center"
			>
				<Flex
					dir="row"
					wd="375px"
					ht="58px"
					jc="space-between"
					pd="8px 0"
					ai="center"
					mg="0 0 5px 0"
				>
					<Flex wd="125px" ht="42px" jc="flex-start" mg="0 0 0 17px">
						<Svg variant="chevron" />
					</Flex>
					<Flex fs="18" wd="125px">
						피드 남기기
					</Flex>
					<Flex wd="125px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
				</Flex>
				<Flex
					dir="column"
					wd="375px"
					ht="72px"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
				>
					<Flex
						dir="row"
						ai="center"
						gap="6px"
						wd="70px"
						ht="26px"
						fs="14"
						fw="600"
						jc="flex-start"
					>
						피드 컬러
					</Flex>
					<Flex wd="199px" ht="40px" ai="flex-start" gap="13px">
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
				<Flex
					dir="column"
					wd="375px"
					ht="82px"
					jc="flex-start"
					pd="0 20px"
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
							wd="148px"
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
					wd="375px"
					mh="82px"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
					gap="6px"
				>
					<Flex jc="space-between" ai="baseline" wd="328px" ht="26px" gap="6px">
						<Flex gap="6px">
							<Flex
								dir="row"
								ai="center"
								wd="125px"
								ht="26px"
								fs="14"
								fw="600"
								jc="flex-start"
							>
								자랑하고 싶은 투두
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
						<Flex onClick={openModalHandler}>
							<Svg variant="addBoastTodo" />
						</Flex>
					</Flex>
					<Box variant="feedTodo">
						<Flex jc="space-between" wd="335px">
							<Flex fs="14" color="#808080">
								투두 추가
							</Flex>
						</Flex>
					</Box>
					<Flex wd="335px" mht="40px" ai="flex-start" dir="column" gap="13px">
						{boastFeed?.map(todo => {
							return <BoastFeed todo={todo} key={todo.id} />;
						})}
					</Flex>
				</Flex>
				<Flex
					dir="column"
					wd="375px"
					ht="100%"
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
						wd="335px"
						ht="160px"
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
					wd="375px"
					ht="72px"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
					gap="6px"
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

					<Flex
						dir="row"
						ai="center"
						jc="flex-start"
						gap="7px"
						wrap="wrap"
						ht="70px"
					>
						{tagList?.map((tag, idx) => {
							return (
								<TagList
									tag={tag}
									tagInput={tagInput}
									setTagInput={setTagInput}
									key={idx}
									id={id}
								/>
							);
						})}
						{isInputHidden === false ? (
							<StInputTag
								value={tagValue}
								onChange={changeTagHandler}
								onKeyDown={addTagHandler}
								autoFocus={true}
							/>
						) : null}
						<Button variant="addTag" onClick={addTagInput}>
							<Svg variant="bluePlus" />
						</Button>
						<Flex gap="5px">
							<Flex>
								<Svg variant="alert" />
							</Flex>
							<Flex fs="12" color="#131313" oc="0.4">
								태그 입력후 엔터키 입력시 등록되며, 등록된 태그를 누르면
								삭제됩니다.
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					dir="column"
					wd="335px"
					ht="102px"
					jc="center"
					ai="flex-start"
					mg="25px 0 0 0"
					gap="10px"
				>
					<Flex jc="flex-start" gap="6px">
						<Flex
							dir="row"
							ai="center"
							gap="6px"
							wd="30px"
							ht="18px"
							fs="14"
							fw="600"
							jc="flex-start"
						>
							사진
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
					wd="100vw"
					ht="94px"
					pd="17px 20px"
					position="sticky"
					left="-8px"
					bottom="0"
					bg="white"
					jc="center"
					ai="center"
				>
					<Button variant="join" onClick={uploadFeedHandler}>
						업로드 하기
					</Button>
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
	right: 5%;
`;

export const StTextCount = styled.span`
	font-size: 16px;
	color: #a2a2a2;
	position: absolute;
	bottom: 5%;
	right: 5%;
`;

export const StInputTag = styled.input`
	display: flex;
	height: 38px;
	min-width: 38px;
	background-color: #f8f8f8;
	border-radius: 10px;
`;

export const StYellowBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #ffac33;
	border-radius: 10px;
	:hover {
		cursor: pointer;
	}
`;

export const StCheckedYellowBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #ffac33;
	border-radius: 10px;
	outline: 2px solid #7474ff;
	:hover {
		cursor: pointer;
	}
`;
export const StOrangeBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #fe8358;
	border-radius: 10px;
	:hover {
		cursor: pointer;
	}
`;

export const StCheckedOrangeBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #fe8358;
	border-radius: 10px;
	:hover {
		cursor: pointer;
	}

	outline: 2px solid #7474ff;
`;
export const StBlueBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #49affa;
	border-radius: 10px;

	:hover {
		cursor: pointer;
	}
`;

export const StCheckedBlueBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #49affa;
	border-radius: 10px;
	outline: 2px solid #7474ff;

	:hover {
		cursor: pointer;
	}
`;

export const StGreenBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #4cccb5;
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
	background-color: #4cccb5;
	border-radius: 10px;
	outline: 2px solid #7474ff;
	:hover {
		cursor: pointer;
	}
`;

export const StDetailContent = styled.textarea`
	min-width: 335px;
	max-width: 335px;
	min-height: 160px;
	max-height: 160px;
	background-color: #f4f4f4;
	border-radius: 10px;
	padding: 12px 16px 12px 16px;
	outline-color: #7474ff;
	resize: none;
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
