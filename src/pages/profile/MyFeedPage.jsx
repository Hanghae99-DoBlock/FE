import jwtDecode from "jwt-decode";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, FloatingAddBtn, Text, white } from "../../common";
import { FeedItem, NavBelow } from "../../components";
import { resetMyFeed } from "../../redux/modules/feed/feedSlice";
import { __getMyFeeds } from "../../redux/modules/middleware/feedListThunk";

const MyFeedPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const target = useRef(null);
	const { myFeedList, isNextmyFeedPageExist } = useSelector(
		state => state.feed,
	);

	const token = localStorage.getItem("accessToken");
	const decodedToken = jwtDecode(token);

	useEffect(() => {
		if (isNextmyFeedPageExist) {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					dispatch(__getMyFeeds(id));
				}
			});
			observer.observe(target.current);
			return () => {
				observer.disconnect(observer);
			};
		}
	}, [isNextmyFeedPageExist]);

	useEffect(() => {
		return () => {
			dispatch(resetMyFeed());
		};
	}, []);

	return (
		<>
			{/* 피드 작성 버튼 */}
			<FloatingAddBtn onClick={() => navigate(`/addFeed`)} />

			{/* 헤더 */}
			<Flex
				position="fixed"
				jc="space-between"
				wd="100%"
				mxw="430px"
				ht="60px"
				pd="18px"
				bg={white}
			>
				<Flex
					onClick={() => navigate(-1)}
					cursor="pointer"
					wd="30px"
					ht="100%"
					radius="50%"
				>
					<Flex wd="19px" ht="15px" bi="url(/images/back.svg)" />
				</Flex>
				<Flex mg="0 30px 0 0">
					{decodedToken.memberId === Number(id) ? (
						<Text variant="title3">내가 쌓은 블럭</Text>
					) : (
						<Text variant="title3">쌓은 블럭</Text>
					)}
				</Flex>
				<div />
			</Flex>

			{myFeedList[0] ? (
				<Flex wd="100%" mg="19px 0 0 0">
					<Box variant="feedScrollArea">
						{myFeedList.map(feedItem => (
							<FeedItem key={feedItem.feedId} feedItem={feedItem} />
						))}
						{isNextmyFeedPageExist ? null : (
							<Flex border="50px solid transparent" />
						)}
					</Box>
				</Flex>
			) : (
				<Flex wd="100%" ht="100vh">
					<Flex dir="column" ht="100%" gap="15px">
						<Flex wd="107px" ht="64px" bi="url(/images/blockStacksGrey.svg)" />
						{decodedToken.memberId === Number(id) ? (
							<Text variant="body2Medium">내가 쌓은 블록이 없습니다.</Text>
						) : (
							<Text variant="body2Medium">쌓은 블럭이 없습니다.</Text>
						)}
					</Flex>
				</Flex>
			)}
			{isNextmyFeedPageExist ? null : <Flex border="50px solid transparent" />}
			<div ref={target} />
			<NavBelow />
		</>
	);
};

export default MyFeedPage;
