import Lottie from "lottie-react";
import spinner from "../../common/gif/spinner.json";
import { useEffect, useState } from "react";
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
		{ tagContent: "πͺ κ±΄κ°", isSelected: false, id: 0 },
		{ tagContent: "ποΈ μ΄λ", isSelected: false, id: 1 },
		{ tagContent: "π°οΈ μ¬νν¬", isSelected: false, id: 2 },
		{ tagContent: "β¨ μκΈ°κ³λ°", isSelected: false, id: 3 },
		{ tagContent: "π₯ μ΅κ΄κ°μ ", isSelected: false, id: 4 },
		{ tagContent: "π λμ", isSelected: false, id: 5 },
		{ tagContent: "π£ μΈκ΅­μ΄", isSelected: false, id: 6 },
		{ tagContent: "π¨ μ·¨λ―Έ", isSelected: false, id: 7 },
	];
	const [recommendedTags, setRecommendedTags] = useState([
		...initialRecommendedTags,
	]);

	useEffect(() => {
		if (isLoading === "μλ£") {
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

	// μ»€μ€ν νκ·Έ μΈν μ΄κΈ° νΈλ€λ¬
	const showTagInputHandler = () => {
		setInputDisplay("block");
		setShowInputBtnDisplay("none");
	};

	// μ»€μ€ν νκ·Έ μΈν λ«κΈ° νΈλ€λ¬
	const closeTagInputHandler = () => {
		setInputDisplay("none");
		setShowInputBtnDisplay("block");
		setTagContent("");
	};

	// μ»€μ€ν νκ·Έ onChange νΈλ€λ¬
	const onChangeHandler = e => {
		if (e.target.value.length < 15) {
			setTagContent(e.target.value);
		} else {
			dispatch(updateIsToastExist("λμ΄μ μλ ₯ν  μ μμ΄μπ­"));
		}
	};

	// μ»€μ€ν νκ·Έ μΆκ° νΈλ€λ¬
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

	// μ»€μ€ν νκ·Έ μ­μ  νΈλ€λ¬
	const deleteTagHandler = (e, targetTagId) => {
		e.stopPropagation();
		const changedTagList = customTags.filter(
			currentTag => currentTag.id !== targetTagId,
		);
		setCustomTags(changedTagList);
		setShowInputBtnDisplay("block");

		// selectedTagsμμλ μ­μ 
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

	// μΆμ² νκ·Έ μ ν νΈλ€λ¬
	const selectRecommendedTagHandler = targetTagId => {
		// isSelected λ³κ²½
		if (selectedTags.length < 3 || recommendedTags[targetTagId].isSelected) {
			const changedList = recommendedTags.map(recommendedTag => {
				return recommendedTag.id === targetTagId
					? { ...recommendedTag, isSelected: !recommendedTag.isSelected }
					: recommendedTag;
			});
			setRecommendedTags(changedList);

			// selectedTags λ³κ²½
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

	// μ»€μ€ν νκ·Έ μ ν νΈλ€λ¬
	const selectCustomTagHandler = targetTagId => {
		const [selectedTag] = customTags.filter(
			currentTag => currentTag.id === targetTagId,
		);
		if (selectedTags.length < 3 || selectedTag.isSelected) {
			// isSelected λ³κ²½
			const changedList = customTags.map(customTag => {
				return customTag.id === targetTagId
					? { ...customTag, isSelected: !customTag.isSelected }
					: customTag;
			});
			setCustomTags(changedList);

			// selectedTags λ³κ²½
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

	// μ μΆ νΈλ€λ¬
	const submitHandler = () => {
		const request = selectedTags.map(tag => tag.tagContent);
		dispatch(__updateProfileTags(request));
	};

	// μ νλ νκ·Έ λ°°κ²½ μ
	const tagBgUi = {
		true: black,
		false: white,
	};

	// μ νλ νκ·Έ ν°νΈ μ
	const tagTxtUi = {
		true: white,
		false: black,
	};

	return (
		<Flex pd="22px" wd="100%" ht="100vh" jc="space-between" dir="column">
			<Flex wd="100%" jc="flex-start">
				{/* λ€λ‘κ°κΈ° */}
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
					<FirstHeading>κ΄μ¬μ¬λ₯Ό μ νν΄μ£ΌμΈμ</FirstHeading>
					<Flex dir="column">
						<Text variant="body2Medium">3κ°κΉμ§ μ νν  μ μμ΄μ</Text>
						<Text variant="body2Medium">κ΄λ ¨λ νΌλλ₯Ό μΆμ²ν΄λλ¦΄κ²μ</Text>
					</Flex>
				</Flex>

				<Flex wrap="wrap" gap="8px">
					{/* μΆμ² νκ·Έ λͺ©λ‘ */}
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

					{/* μ»€μ€ν νκ·Έ λͺ©λ‘ */}
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

							{/* μ­μ  μμ΄μ½ */}
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

					{/* μ»€μ€ν νκ·Έ μΆκ° μΈν */}
					<Box type={inputDisplay} variant="tagChipInput">
						<Flex>
							<Flex mg="3px 0 0 0">
								<input
									id="tagInputId"
									autoFocus
									onChange={onChangeHandler}
									onKeyDown={addTagHandler}
									value={tagContent || ""}
								/>
							</Flex>

							{/* λ«κΈ° μμ΄μ½ */}
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

					{/* νκ·Έ μΆκ° μΉ© */}
					<Box
						type={showInputBtndisplay}
						onClick={showTagInputHandler}
						variant="tagChip"
					>
						<Flex mg="7px 0 0 0">
							<Text variant="body1">νκ·ΈμΆκ°</Text>
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
			{/* λ²νΌ */}
			{selectedTags.length === 0 ? (
				<Button variant="disactivatedXL">μ ν μλ£</Button>
			) : isLoading ? (
				<Button variant="activatedXL">
					<Flex ht="100%">
						<Lottie animationData={spinner} />
					</Flex>
				</Button>
			) : (
				<Button onClick={submitHandler} variant="activatedXL">
					μ ν μλ£
				</Button>
			)}
		</Flex>
	);
};
export default InterestTagsPage;
