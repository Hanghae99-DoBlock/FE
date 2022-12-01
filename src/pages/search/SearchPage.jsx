import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Text, Svg, FirstHeading, Image } from "../../common";
import { FeedItem, NavBelow } from "../../components";
import { __SearchTagAndMember } from "../../redux/modules/feed/feedSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../common/hooks/useInput";
import {
	__followThunk,
	__getFollowing,
} from "../../redux/modules/profileSlice";

const FeedPage = () => {
	const dispatch = useDispatch();
	const feedList = useSelector(state => state.feed.feedList);
	const navigate = useNavigate();

	// 상단 탭 메뉴 ui 상태 관리
	const [tagSearchMenuType, setTagSearchMenuType] = useState("selectedTabMenu");
	const [userSearchMenuType, setUserSearchMenuType] = useState("tabMenu");
	const [category, setCatagory] = useState("feed");
	const searchInput = useInput();
	const searchTagItem = useSelector(state => state.feed.searchTag);
	const searchMemberItem = useSelector(state => state.feed.searchMember);
	const isFollow = useSelector(state => state.profileSlice.profile.followOrNot);
	const [follow, setFollow] = useState(isFollow);

	useEffect(() => {
		setFollow(isFollow);
	}, [isFollow]);

	const anotherMemberPage = memberId => {
		navigate(`/profile/${memberId}`);
	};
	const unfollowHandler = memberId => {
		dispatch(__followThunk(memberId));
		//searchHandler();
		setFollow(false);
	};
	const followingHandler = memberId => {
		dispatch(__followThunk(memberId));
		//searchHandler();
		setFollow(true);
	};

	// 검색 종류 변경 핸들러
	const changeSearchTypeHandler = searchType => {
		if (searchType === "tagSearchList") {
			setTagSearchMenuType("selectedTabMenu");
			setUserSearchMenuType("tabMenu");
			setCatagory("feed");
		} else {
			setUserSearchMenuType("selectedTabMenu");
			setTagSearchMenuType("tabMenu");
			setCatagory("member");
		}
	};
	const searchHandler = () => {
		dispatch(
			__SearchTagAndMember({
				keyword: searchInput.value,
				category: category,
			}),
		);
	};
	const searchEnterHandler = e => {
		if (e.keyCode === 13) {
			return dispatch(
				__SearchTagAndMember({
					keyword: searchInput.value,
					category: category,
				}),
			);
		}
	};

	return (
		<>
			<Flex dir="column" wd="100%" ht="100vh">
				<Flex
					dir="row"
					wd="100%"
					ht="65px"
					ai="center"
					gap="10px"
					jc="flex-start"
					position="sticky"
				>
					<Flex mg="0 0 0 14px" onClick={searchHandler}>
						<Svg variant="search" />
					</Flex>
					<StSearchInput
						placeholder="검색어를 입력하세요"
						value={searchInput.value || ""}
						onChange={searchInput.onChange}
						onKeyDown={searchEnterHandler}
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
				{category === "feed" ? (
					<Box variant="searchScrollArea">
						{searchTagItem.length >= 1
							? searchTagItem?.map(feedItem => {
									return <FeedItem key={feedItem.feedId} feedItem={feedItem} />;
							  })
							: null}
					</Box>
				) : (
					<Box variant="searchScrollArea">
						{searchMemberItem.length >= 1
							? searchMemberItem.map(data => (
									<Flex
										jc="space-between"
										mg="0 0 20px 0 "
										wd="100%"
										key={data.memberId}
									>
										<Flex>
											<Image
												variant="followImage"
												src={data.profileImage}
												alt=""
												style={{ marginTop: "4px" }}
												onClick={() => {
													anotherMemberPage(data.memberId);
												}}
											/>
											<FirstHeading
												fw="600"
												fs="13px"
												onClick={() => {
													anotherMemberPage(data.memberId);
												}}
											>
												{data.nickname}
											</FirstHeading>
										</Flex>
										<Flex>
											{follow === false ? (
												<Svg
													variant="follow"
													onClick={() => {
														followingHandler(data.memberId);
													}}
												></Svg>
											) : (
												<Svg
													variant="followCancel"
													onClick={() => {
														unfollowHandler(data.memberId);
													}}
												></Svg>
											)}
										</Flex>
									</Flex>
							  ))
							: null}
					</Box>
				)}
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
