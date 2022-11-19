import { Box, Button, Flex } from "../../common";
import { StInput } from "../../common/input/Input";
import Svg from "../../common/svg/Svg";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useInput from "../../common/hooks/useInput";
import AddFeedModal from "./ChoiceTodoModal";
import { useDispatch, useSelector } from "react-redux";
import BoastFeed from "./BoastFeed";
import {
	addTag,
	deleteTag,
	resetTodo,
} from "../../redux/modules/feed/feedSlice";
import TagList, { StTagInput } from "./TagList";

const AddFeedPage = () => {
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);
	const [tagInput, setTagInput] = useState([]);
	const [tagValue, setTagValue] = useState("");
	const [isReadOnly, setIsReadOnly] = useState(false);
	const boastFeed = useSelector(state => state.feed.checkedList);
	const tagList = useSelector(state => state.feed.tagList);

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
	};

	const orangeHandler = () => {
		setColor("#FE8358");
	};

	const blueHandler = () => {
		setColor("#49AFFA");
	};

	const greenHandler = () => {
		setColor("#4CCCB5");
	};
	const addTagInput = e => {
		console.log(tagInput);
		if (tagInput.length < 3) {
			setTagInput(
				tagInput.concat(
					<TagList tagInput={tagInput} deleteTagInput={deleteTagInput} />,
				),
			);
		} else {
			return;
		}
		addTagHandler(e);
	};
	const deleteTagInput = e => {
		if (e.target.readOnly) {
			console.log(e.target);
			dispatch(deleteTag({ value: e.target.value }));

			setTagInput(
				tagInput.filter((tag, index) => {
					console.log(tag);
					return tagInput.indexOf(tag);
				}),
			);
		}
	};
	const addTagHandler = e => {
		if (e.keyCode === 13 && tagList.length < 3) {
			setTagInput(...tagInput, e.target.value);
			setIsReadOnly(true);
			dispatch(addTag({ value: tagValue }));
		}
	};

	useEffect(() => {}, [boastFeedNonDuple, tagList]);
	const openModalHandler = () => {
		setOpenModal(true);
		dispatch(resetTodo());
	};

	// const addHashtag = e => {
	// 	if (e?.keyCode === 32 && hashtagArr.length < 3) {
	// 		setHashtagArr([...hashtagArr, hashtag.value]);
	// 		hashtag.onReset();
	// 	} else if (hashtagArr.length >= 3) {
	// 		hashtagArr.splice(3, 1);
	// 	}
	// };

	return (
		<>
			{openModal && <AddFeedModal setOpenModal={setOpenModal} />}
			<Flex
				dir="column"
				mw="375px"
				mxw="375px"
				mh="667px"
				mg="0 auto"
				jc="flex-start"
				gap="20px"
				ai="flex-start"
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
						ai="flex-start"
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
						<StYellowBox onClick={yeollowHandler}></StYellowBox>
						<StOrangeBox onClick={orangeHandler}></StOrangeBox>
						<StBlueBox onClick={blueHandler}></StBlueBox>
						<StGreenBox onClick={greenHandler}></StGreenBox>
					</Flex>
				</Flex>
				<Flex
					dir="column"
					wd="375px"
					ht="82px"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
				>
					<Flex jc="flex-start" ai="baseline" gap="6px">
						<Flex
							dir="row"
							ai="flex-start"
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
							ai="flex-start"
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
				</Flex>
				<Flex
					dir="column"
					wd="375px"
					mh="82px"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
					gap="13px"
				>
					<Flex jc="flex-start" gap="6px" ai="baseline">
						<Flex
							dir="row"
							ai="flex-start"
							gap="6px"
							wd="108px"
							ht="26px"
							fs="14"
							fw="600"
							jc="flex-start"
						>
							자랑하고 싶은 투두
						</Flex>

						<Flex
							dir="row"
							ai="flex-start"
							gap="6px"
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
					<Box variant="feedTodo">
						<Flex jc="space-between" wd="335px">
							<Flex fs="14" color="#808080">
								투두 추가
							</Flex>
							<Flex wd="14px" ht="14px" onClick={openModalHandler}>
								<Svg variant="plusTodo" />
							</Flex>
						</Flex>
					</Box>
					<Flex wd="335px" mht="40px" ai="flex-start" dir="column" gap="13px">
						{boastFeedNonDuple?.map(todo => {
							return <BoastFeed todo={todo} />;
						})}
					</Flex>
				</Flex>
				<Flex
					dir="column"
					wd="375px"
					ht="72px"
					jc="flex-start"
					pd="0 20px"
					ai="normal"
					gap="20px"
				>
					<Flex jc="flex-start" gap="6px" ai="baseline">
						<Flex
							dir="row"
							ai="flex-start"
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
							ai="flex-start"
							gap="6px"
							wd="148px"
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
					<Flex wd="335px" ht="160px" ai="flex-start" gap="13px">
						<StDetailContent maxLength={100} />
					</Flex>
					<Flex
						dir="row"
						ai="flex-start"
						gap="6px"
						wd="65px"
						ht="26px"
						fs="14"
						fw="600"
						jc="flex-start"
					>
						태그 추가
					</Flex>
					<Flex
						dir="row"
						ai="flex-start"
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
					<Flex dir="row" ai="center" jc="flex-start" gap="7px">
						<Button variant="addTag" onClick={addTagInput}>
							<Svg variant="plus" />
						</Button>
						{tagInput.map((tag, idx) => {
							return (
								<TagList
									tagInput={tagInput}
									deleteTagInput={deleteTagInput}
									setTagInput={setTagInput}
									key={tag.idx}
								/>
							);
						})}
						{/* {tagList?.map(tag => {
							return <TagList />;
						})} */}
					</Flex>
					<Flex
						wd="100vw"
						ht="94px"
						pd="17px 20px"
						position="fixed"
						left="-8px"
						bottom="0"
						bg="white"
						jc="center"
						ai="center"
					>
						<Button variant="join">업로드 하기</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default AddFeedPage;

export const StYellowBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #ffac33;
	border-radius: 10px;
	:hover {
		cursor: pointer;
	}

	:focus {
		outline: 2px solid #7474ff;
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
	:focus {
		outline: 2px solid #7474ff;
	}
`;

export const StBlueBox = styled.button`
	width: 40px;
	height: 40px;
	background-color: #49affa;
	border-radius: 10px;

	:hover {
		cursor: pointer;
	}
	:focus {
		outline: 2px solid #7474ff;
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

export const StDetailContent = styled.textarea`
	min-width: 335px;
	max-width: 335px;
	min-height: 160px;
	max-height: 160px;
	background-color: #f4f4f4;
	border-radius: 10px;
	padding: 12px 16px 12px 16px;
	outline-color: #7474ff;
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
