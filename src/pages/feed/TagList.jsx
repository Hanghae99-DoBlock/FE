import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addTag, deleteTag } from "../../redux/modules/feed/feedSlice";
import { Flex, Svg } from "../../common";

const TagList = props => {
	const { tag, tagInput, setTagInput } = props;
	const dispatch = useDispatch();
	const tagList = useSelector(state => state.feed.tagList);
	const [tagValue, setTagValue] = useState("");
	const [id, setId] = useState(tagList.length);

	const deleteTagInput = e => {
		setId(prev => prev + 1);
		dispatch(deleteTag({ id: tag.id, value: e.target.value }));
	};

	const changeTagValueHandler = e => {
		setTagValue(e.target.value);
	};
	{
		/*태그가 빈값인상태로 포커스아웃될경우 자동으로 해당 인풋을 삭제한다*/
	}
	const isEmptyInputHandler = () => {
		if (tagValue.trim() === "") {
			setTagInput([tagInput.pop()]);
		}
	};
	return (
		<Flex dir="row" jc="center" ai="center">
			<Flex bg="#f8f8f8" radius="10px">
				<StTagInput
					onClick={deleteTagInput}
					onChange={changeTagValueHandler}
					value={tag.value}
					onBlur={isEmptyInputHandler}
					type="button"
				/>
				<Svg variant="tagDelete" />
			</Flex>
		</Flex>
	);
};

export default TagList;

export const StTagInput = styled.input`
	display: flex;
	flex-wrap: wrap;
	min-height: 38px;
	min-width: 38px;
	background-color: #f8f8f8;
	border-radius: 10px;
	text-align: center;
	font-size: 14px;
	padding: 0 10px;
	letter-spacing: -1px;
	word-spacing: -2px;
	:hover {
		cursor: pointer;
	}
`;
