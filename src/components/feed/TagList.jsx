import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addTag, deleteTag } from "../../redux/modules/feed/feedSlice";
import { Flex, Svg } from "../../common";

const TagList = props => {
	const { tag, tagInput, setTagInput, setIsInputHidden } = props;
	const dispatch = useDispatch();
	const [tagValue, setTagValue] = useState("");
	const deleteTagInput = e => {
		dispatch(deleteTag(tag.id));
	};

	return (
		<Flex dir="row" jc="center" ai="center">
			<Flex bg="#f8f8f8" radius="10px">
				<StTagInput value={tag.value} type="button" />
				<Flex cursor="pointer" onClick={deleteTagInput}>
					<Svg onClick={deleteTagInput} variant="tagDelete" />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default TagList;

export const StTagInput = styled.input`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	min-height: 38px;
	min-width: 100px;
	max-width: 315px;
	background-color: #f8f8f8;
	border-radius: 10px;
	text-align: center;
	font-size: 14px;
	padding: 0 10px;
	letter-spacing: -1px;
	word-spacing: -2px;
`;
