import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addTag, deleteTag } from "../../redux/modules/feed/feedSlice";

const TagList = props => {
	const { tag, tagInput, setTagInput } = props;
	const dispatch = useDispatch();
	const tagList = useSelector(state => state.feed.tagList);
	const [tagValue, setTagValue] = useState("");
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [id, setId] = useState(tagList.length);

	const deleteTagInput = e => {
		setId(prev => prev + 1);
		dispatch(deleteTag({ id: tag.id, value: e.target.value }));
	};

	const changeTagValueHandler = e => {
		setTagValue(e.target.value);
	};

	const isEmptyInputHandler = () => {
		if (tagValue.trim() === "") {
			setTagInput([tagInput.pop()]);
		}
	};
	console.log(tag.id);
	return (
		<StTagInput
			onClick={deleteTagInput}
			//onKeyDown={addTagHandler}
			onChange={changeTagValueHandler}
			value={tag.value}
			readOnly={true}
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
	:hover {
		cursor: pointer;
	}
`;
