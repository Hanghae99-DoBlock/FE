import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Text, Svg } from "../../common";
import { FeedItem, NavBelow } from "../../components";
import {
	__getFollowingFeeds,
	__getRecommendedFeeds,
	__SearchTagAndMember,
} from "../../redux/modules/feed/feedSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../common/hooks/useInput";

const FeedPage = () => {
	const dispatch = useDispatch();
	const feedList = useSelector(state => state.feed.feedList);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(__getFollowingFeeds());
	}, []);

	// 상단 탭 메뉴 ui 상태 관리
	const [tagSearchMenuType, setTagSearchMenuType] = useState("selectedTabMenu");
	const [userSearchMenuType, setUserSearchMenuType] = useState("tabMenu");
	const [category, setCatagory] = useState("feed");
	const searchInput = useInput();
	// 검색 종류 변경 핸들러
	const changeSearchTypeHandler = searchType => {
		if (searchType === "tagSearchList") {
			dispatch(__getFollowingFeeds());
			setTagSearchMenuType("selectedTabMenu");
			setUserSearchMenuType("tabMenu");
			setCatagory("feed");
		} else {
			dispatch(__getRecommendedFeeds());
			setUserSearchMenuType("selectedTabMenu");
			setTagSearchMenuType("tabMenu");
			setCatagory("member");
		}
	};

	const searchHandler = () => {
		dispatch(
			__SearchTagAndMember({ keyword: searchInput.value, category: category }),
		);
	};

	return (
		<>
			<Flex dir="column" wd="100%">
				<Flex
					dir="row"
					wd="100%"
					ht="65px"
					ai="center"
					gap="10px"
					jc="flex-start"
				>
					<Flex mg="0 0 0 14px" onClick={searchHandler}>
						<Svg variant="search" />
					</Flex>
					<StSearchInput
						placeholder="검색어를 입력하세요"
						value={searchInput.value}
						onChange={searchInput.onChange}
					/>
					<Flex
						wd="34px"
						ht="26px"
						fs="16"
						cursor="pointer"
						onClick={() => navigate("/feed")}
					>
						닫기
					</Flex>
				</Flex>
				<Flex
					dir="row"
					wd="100%"
					ht="4px"
					bc="#F8F8F8"
					bt="1px solid #EFEFEF;"
				></Flex>
				{/* 상단 탭 메뉴 */}
				<Flex wd="100%" mxw="430px" ht="41px" top="0">
					<Box
						onClick={() => changeSearchTypeHandler("tagSearchList")}
						variant={tagSearchMenuType}
					>
						<Text variant={tagSearchMenuType}>태그 검색</Text>
					</Box>
					<Box
						onClick={() => changeSearchTypeHandler("SearchedUser")}
						variant={userSearchMenuType}
					>
						<Text variant={userSearchMenuType}>유저 찾기</Text>
					</Box>
				</Flex>

				{/* 검색 리스트 */}
				<Box variant="feedScrollArea"></Box>
			</Flex>
			<NavBelow />
		</>
	);
};

export default FeedPage;

export const StSearchInput = styled.input`
	border: none;
	width: 330px;
	height: 26px;
`;
