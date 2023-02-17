import Lottie from "lottie-react";
import spinner from "../../common/gif/spinner.json";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, FirstHeading, Flex, Text } from "../../common";
import { grey600, white, black } from "../../common";
import { resetErrMsg, updateIsLoading } from "../../redux/modules/profileSlice";
import { __updateProfileTags } from "../../redux/modules/middleware/profileThunk";
import { updateIsToastExist } from "../../redux/modules/toastSlice";

const InterestTagsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, errMsg } = useSelector(state => state.profileSlice);
	const [inputDisplay, setInputDisplay] = useState("none");
	const [showInputBtndisplay, setShowInputBtnDisplay] = useState("block");
	const [tagContent, setTagContent] = useState("");
	const [customTags, setCustomTags] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const initialRecommendedTags = [
		{ tagContent: "💪 건강", isSelected: false, id: 0 },
		{ tagContent: "🏋️ 운동", isSelected: false, id: 1 },
		{ tagContent: "💰️ 재태크", isSelected: false, id: 2 },
		{ tagContent: "✨ 자기계발", isSelected: false, id: 3 },
		{ tagContent: "🥕 습관개선", isSelected: false, id: 4 },
		{ tagContent: "📚 독서", isSelected: false, id: 5 },
		{ tagContent: "🗣 외국어", isSelected: false, id: 6 },
		{ tagContent: "🎨 취미", isSelected: false, id: 7 },
	];
	const [recommendedTags, setRecommendedTags] = useState([
		...initialRecommendedTags,
	]);
	const refInput = useRef(null);

	useEffect(() => {
		if (isLoading === "완료") {
			navigate(-1);
			dispatch(updateIsLoading(null));
		}
	}, [isLoading]);

	useEffect(() => {
		if (errMsg) {
			dispatch(updateIsToastExist(errMsg));
			dispatch(resetErrMsg());
		}
	}, [errMsg]);

	useEffect(() => {
		refInput.current.focus();
	}, [inputDisplay]);

	// 커스텀 태그 인풋 열기 핸들러
	const showTagInputHandler = () => {
		setInputDisplay("block");
		setShowInputBtnDisplay("none");
	};

	// 커스텀 태그 인풋 닫기 핸들러
	const closeTagInputHandler = () => {
		setInputDisplay("none");
		setShowInputBtnDisplay("block");
		setTagContent("");
	};

	// 커스텀 태그 onChange 핸들러
	const onChangeHandler = e => {
		if (e.target.value.length < 15) {
			setTagContent(e.target.value);
		} else {
			dispatch(updateIsToastExist("더이상 입력할 수 없어요😭"));
		}
	};

	// 커스텀 태그 추가 핸들러
	const addTagHandler = e => {
		if (e.keyCode === 13) {
			const id = customTags[customTags.length - 1]?.id + 1 || 8;
			const tagItem = {
				id,
				tagContent: tagContent.replace(/ /g, ""),
				isSelected: false,
			};
			setCustomTags([...customTags, tagItem]);
			setInputDisplay("none");
			setTagContent("");
			if (customTags.length < 2) {
				setShowInputBtnDisplay("block");
			}
		}
	};

	// 커스텀 태그 삭제 핸들러
	const deleteTagHandler = (e, targetTagId) => {
		e.stopPropagation();
		const changedTagList = customTags.filter(
			currentTag => currentTag.id !== targetTagId,
		);
		setCustomTags(changedTagList);
		setShowInputBtnDisplay("block");

		// selectedTags에서도 삭제
		const [selectedTag] = customTags.filter(
			currentTag => currentTag.id === targetTagId,
		);
		if (selectedTag.isSelected) {
			const changedList = selectedTags.filter(
				currentTag => currentTag.id !== targetTagId,
			);
			setSelectedTags(changedList);
		}
	};

	// 추천 태그 선택 핸들러
	const selectRecommendedTagHandler = targetTagId => {
		// isSelected 변경
		if (selectedTags.length < 3 || recommendedTags[targetTagId].isSelected) {
			const changedList = recommendedTags.map(recommendedTag => {
				return recommendedTag.id === targetTagId
					? { ...recommendedTag, isSelected: !recommendedTag.isSelected }
					: recommendedTag;
			});
			setRecommendedTags(changedList);

			// selectedTags 변경
			if (recommendedTags[targetTagId].isSelected === false) {
				const slicedTagContent = recommendedTags[targetTagId].tagContent
					.slice(2)
					.replace(/ /g, "");
				const changedObj = {
					...recommendedTags[targetTagId],
					tagContent: slicedTagContent,
				};
				setSelectedTags([...selectedTags, changedObj]);
			} else {
				const changedList = selectedTags.filter(
					currentTag => currentTag.id !== targetTagId,
				);
				setSelectedTags(changedList);
			}
		}
	};

	// 커스텀 태그 선택 핸들러
	const selectCustomTagHandler = targetTagId => {
		const [selectedTag] = customTags.filter(
			currentTag => currentTag.id === targetTagId,
		);
		if (selectedTags.length < 3 || selectedTag.isSelected) {
			// isSelected 변경
			const changedList = customTags.map(customTag => {
				return customTag.id === targetTagId
					? { ...customTag, isSelected: !customTag.isSelected }
					: customTag;
			});
			setCustomTags(changedList);

			// selectedTags 변경
			if (selectedTag.isSelected === false) {
				setSelectedTags([...selectedTags, selectedTag]);
			} else {
				const changedList = selectedTags.filter(
					currentTag => currentTag.id !== targetTagId,
				);
				setSelectedTags(changedList);
			}
		}
	};

	// 제출 핸들러
	const submitHandler = () => {
		const request = selectedTags.map(tag => tag.tagContent);
		dispatch(__updateProfileTags(request));
	};

	// 선택된 태그 배경 색
	const tagBgUi = {
		true: black,
		false: white,
	};

	// 선택된 태그 폰트 색
	const tagTxtUi = {
		true: white,
		false: black,
	};

	return (
		<Flex pd="22px" wd="100%" ht="100vh" jc="space-between" dir="column">
			<Flex wd="100%" jc="flex-start">
				{/* 뒤로가기 */}
				<Flex
					onClick={() => navigate(-1)}
					cursor="pointer"
					wd="40px"
					ht="40px"
					radius="50%"
				>
					<Flex wd="24px" ht="24px" bi="url(/images/back.svg)" />
				</Flex>
			</Flex>
			<Flex gap="36px" ht="100%" dir="column">
				<Flex dir="column" gap="9px">
					<FirstHeading>관심사를 선택해주세요</FirstHeading>
					<Flex dir="column">
						<Text variant="body2Medium">3개까지 선택할 수 있어요</Text>
						<Text variant="body2Medium">관련된 피드를 추천해드릴게요</Text>
					</Flex>
				</Flex>

				<Flex wrap="wrap" gap="8px">
					{/* 추천 태그 목록 */}
					{recommendedTags.map(recommendedTag => (
						<Box
							onClick={() => selectRecommendedTagHandler(recommendedTag.id)}
							key={recommendedTag.id}
							variant="tagChip"
							bg={tagBgUi[recommendedTag.isSelected]}
						>
							<Text variant="body1" color={tagTxtUi[recommendedTag.isSelected]}>
								{recommendedTag.tagContent}
							</Text>
						</Box>
					))}

					{/* 커스텀 태그 목록 */}
					{customTags.map(customTag => (
						<Box
							onClick={() => selectCustomTagHandler(customTag.id)}
							bg={tagBgUi[customTag.isSelected]}
							key={customTag.id}
							variant="customTagChip"
						>
							<Text color={tagTxtUi[customTag.isSelected]} variant="body1">
								{customTag.tagContent}
							</Text>

							{/* 삭제 아이콘 */}
							<Flex
								onClick={e => deleteTagHandler(e, customTag.id)}
								cursor="pointer"
								ht="30px"
								wd="30px"
								radius="50%"
							>
								{customTag.isSelected ? (
									<Flex wd="12px" ht="12px" bi="url(/images/closeWhite.svg)" />
								) : (
									<Flex wd="12px" ht="12px" bi="url(/images/closeBlack.svg)" />
								)}
							</Flex>
						</Box>
					))}

					{/* 커스텀 태그 추가 인풋 */}
					<Box type={inputDisplay} variant="tagChipInput">
						<Flex>
							<Flex mg="3px 0 0 0">
								<input
									id="tagInputId"
									ref={refInput}
									onChange={onChangeHandler}
									onKeyDown={addTagHandler}
									value={tagContent || ""}
								/>
							</Flex>

							{/* 닫기 아이콘 */}
							<Flex
								onClick={closeTagInputHandler}
								cursor="pointer"
								ht="30px"
								wd="30px"
								radius="50%"
								mg="3px 0 0 0"
							>
								<Flex wd="12px" ht="12px" bi="url(/images/closeBlack.svg)" />
							</Flex>
						</Flex>
					</Box>

					{/* 태그 추가 칩 */}
					<Box
						type={showInputBtndisplay}
						onClick={showTagInputHandler}
						variant="tagChip"
					>
						<Flex mg="7px 0 0 0">
							<Text variant="body1">태그추가</Text>
							<Flex
								mg="0 0 0 5px"
								wd="14px"
								ht="14px"
								bi="url(/images/plusBlack.svg)"
							/>
						</Flex>
					</Box>
				</Flex>
			</Flex>
			{/* 버튼 */}
			{selectedTags.length === 0 ? (
				<Button variant="disactivatedXL">선택 완료</Button>
			) : isLoading ? (
				<Button variant="activatedXL">
					<Flex ht="100%">
						<Lottie animationData={spinner} />
					</Flex>
				</Button>
			) : (
				<Button onClick={submitHandler} variant="activatedXL">
					선택 완료
				</Button>
			)}
		</Flex>
	);
};
export default InterestTagsPage;
