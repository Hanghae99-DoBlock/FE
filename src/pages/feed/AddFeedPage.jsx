import { Box, Flex } from "../../common";
import { StInput } from "../../common/input/Input";
import Svg from "../../common/svg/Svg";
import styled from "styled-components";
import { useState } from "react";
import useInput from "../../common/hooks/useInput";

const AddFeedPage = () => {
	const hashtag = useInput("");
	const [hashtagArr, setHashtagArr] = useState([]);

	const addHashtag = e => {
		if (e?.keyCode === 32 && hashtagArr.length < 3) {
			setHashtagArr([...hashtagArr, hashtag.value]);
			hashtag.onReset();
		} else if (hashtagArr.length >= 3) {
			hashtagArr.splice(3, 1);
		}
	};

	console.log(hashtag);
	console.log(hashtagArr);
	return (
		<Flex
			dir="column"
			mw="375px"
			mxw="375px"
			mh="667px"
			mg="0 auto"
			jc="flex-start"
			gap="20px"
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
					<Flex wd="40px" ht="40px" bg="#FFAC33" radius="10px"></Flex>
					<Flex wd="40px" ht="40px" bg="#FE8358" radius="10px"></Flex>
					<Flex wd="40px" ht="40px" bg="#49AFFA" radius="10px"></Flex>
					<Flex wd="40px" ht="40px" bg="#4CCCB5" radius="10px"></Flex>
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
				<Flex wd="335px" ht="40px" ai="flex-start" gap="13px">
					<StInput variant="addFeedInput" />
				</Flex>
			</Flex>
			<Flex
				dir="column"
				wd="375px"
				mh="82px"
				jc="flex-start"
				pd="0 20px"
				ai="normal"
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
					<StButton>선택버튼</StButton>
				</Flex>
				<Flex wd="335px" ht="40px" ai="flex-start" gap="13px">
					<Box variant="feedTodo">6시에 기상하기!</Box>
				</Flex>
			</Flex>
			<Flex
				dir="column"
				wd="375px"
				ht="72px"
				jc="flex-start"
				pd="0 20px"
				ai="normal"
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
				</Flex>
				<Flex wd="335px" ht="40px" ai="flex-start" gap="13px">
					<StInput
						onKeyDown={addHashtag}
						variant="addFeedInput"
						value={hashtag.value}
						onChange={hashtag.onChange}
					/>
				</Flex>
			</Flex>
			<Flex
				dir="column"
				wd="375px"
				ht="72px"
				jc="flex-start"
				pd="0 20px"
				ai="normal"
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
						최대 100자 입력 가능합니다
					</Flex>
				</Flex>
				<Flex wd="335px" ht="40px" ai="flex-start" gap="13px">
					<StDetailContent maxLength={100} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default AddFeedPage;

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
