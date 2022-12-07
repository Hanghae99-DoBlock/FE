import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { black, Box, Flex, FloatingAddBtn, grey600, Text } from "../../common";
import { NavBelow } from "../../components";

const FeedPage = () => {
	const navigate = useNavigate();
	const isMatchFollowing = Boolean(useMatch("/feed/following"));
	const isMatchRecommended = Boolean(useMatch("/feed/recommended"));

	const topTabUi = {
		true: { box: "selectedTabMenu", color: black },
		false: { box: "tabMenu", color: grey600 },
	};

	// 피드 리스트 종류 변경 핸들러
	const changeFeedListTypeHandler = feedListType => {
		if (feedListType === "recommendedFeedList") {
			navigate(`recommended`);
		} else {
			navigate(`following`);
		}
	};

	return (
		<>
			{/* 피드 작성 버튼 */}
			<FloatingAddBtn onClick={() => navigate(`/addFeed`)} />
			<Flex dir="column" wd="100%">
				{/* 상단 탭 메뉴 */}
				<Flex wd="100%" mxw="430px" ht="41px" position="fixed" top="0">
					<Box
						onClick={() => changeFeedListTypeHandler("followingFeedList")}
						variant={topTabUi[isMatchFollowing].box}
					>
						<Text variant="title4" color={topTabUi[isMatchFollowing].color}>
							팔로잉
						</Text>
					</Box>
					<Box
						onClick={() => changeFeedListTypeHandler("recommendedFeedList")}
						variant={topTabUi[isMatchRecommended].box}
					>
						<Text variant="title4" color={topTabUi[isMatchRecommended].color}>
							추천 피드
						</Text>
					</Box>
				</Flex>

				{/* 피드 리스트 */}
				<Outlet></Outlet>
			</Flex>
			<NavBelow />
		</>
	);
};

export default FeedPage;
