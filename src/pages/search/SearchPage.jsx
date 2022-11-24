import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Text } from "../../common";
import { FeedItem, NavBelow } from "../../components";
import {
	__getFollowingFeeds,
	__getRecommendedFeeds,
} from "../../redux/modules/feed/feedSlice";

const FeedPage = () => {
	const dispatch = useDispatch();
	const feedList = useSelector(state => state.feed.feedList);

	useEffect(() => {
		dispatch(__getFollowingFeeds());
	}, []);

	// 상단 탭 메뉴 ui 상태 관리
	const [tagSearchMenuType, setTagSearchMenuType] = useState("selectedTabMenu");
	const [userSearchMenuType, setUserSearchMenuType] = useState("tabMenu");

	// 검색 종류 변경 핸들러
	const changeSearchTypeHandler = searchType => {
		if (searchType === "tagSearchList") {
			dispatch(__getFollowingFeeds());
			setTagSearchMenuType("selectedTabMenu");
			setUserSearchMenuType("tabMenu");
		} else {
			dispatch(__getRecommendedFeeds());
			setUserSearchMenuType("selectedTabMenu");
			setTagSearchMenuType("tabMenu");
		}
	};

	return (
		<>
			<Flex dir="column" wd="100%">
				{/* 상단 탭 메뉴 */}
				<Flex wd="100%" mxw="430px" ht="41px" position="fixed" top="0">
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
				<Box variant="feedScrollArea">
					<Flex
						dir="column"
						wd="274px"
						ht="112px"
						border="1px solid black"
						ai="flex-start"
						jc="flex-start"
					>
						<Flex
							dier="row"
							jc="flex-start"
							fs="14"
							fw="600"
							wd="75px"
							ht="26px"
						>
							추천 검색어
						</Flex>
						<Flex></Flex>
					</Flex>
				</Box>
			</Flex>
			<NavBelow />
		</>
	);
};

export default FeedPage;
