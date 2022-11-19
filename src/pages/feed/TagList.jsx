import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addTag, deleteTag } from "../../redux/modules/feed/feedSlice";

const TagList = props => {
	const { tagInput, deleteTagInput, setTagInput } = props;
	const dispatch = useDispatch();
	const tagList = useSelector(state => state.feed.tagList);
	const [tagValue, setTagValue] = useState("");
	const [isReadOnly, setIsReadOnly] = useState(false);
	// const deleteTagInputHandler = e => {
	// 	console.log(e.target.readOnly);
	// 	if (e.target.readOnly === true) {
	// 		deleteTagInput();
	// 	} else {
	// 		return;
	// 	}
	// };

	const addTagHandler = e => {
		if (e.keyCode === 13 && tagList.length < 3) {
			setIsReadOnly(true);
			dispatch(addTag({ value: tagValue }));
		}
	};
	const changeTagValueHandler = e => {
		setTagValue(e.target.value);
	};

	const isEmptyInputHandler = () => {
		console.log(tagInput);
		if (tagValue.trim() === "") {
			console.log("tagInput:", tagInput);
			setTagInput([tagInput.pop()]);
			console.log("변경tagInput : ", tagInput);
		}
	};

	return (
		<StTagInput
			onClick={deleteTagInput}
			onKeyDown={addTagHandler}
			onChange={changeTagValueHandler}
			value={tagValue}
			readOnly={isReadOnly}
			onBlur={isEmptyInputHandler}
			autoFocus={true}
		/>
	);
};

export default TagList;

export const StTagInput = styled.input`
	height: 38px;
	min-width: 38px;
	background-color: #f8f8f8;
	border-radius: 10px;
`;
