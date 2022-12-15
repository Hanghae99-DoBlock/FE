import Lottie from "lottie-react";
import spinner from "../../common/gif/spinner.json";
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
	const { myFeedList, isNextmyFeedPageExist, isLoading } = useSelector(
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

			<Box variant="feedScrollArea">
				{isLoading && !myFeedList[0] ? (
					<Flex mg="0 0 50px 0" wd="100%" ht="100%">
						<Lottie animationData={spinner} />
					</Flex>
				) : myFeedList[0] ? (
					<>
						{myFeedList.map(feedItem => (
							<FeedItem key={feedItem.feedId} feedItem={feedItem} />
						))}
						{isLoading && (
							<Flex mg="0 0 80px 0" wd="100%" ht="100%">
								<Lottie animationData={spinner} />
							</Flex>
						)}
						{isNextmyFeedPageExist ? null : (
							<Flex border="100px solid transparent" />
						)}
					</>
				) : (
					<Flex dir="column" ht="100%" pd="0 0 40px 0" gap="15px">
						<Flex wd="107px" ht="64px" bi="url(/images/blockStacksGrey.svg)" />
						<Text variant="body2Medium">쌓은 블럭이 없습니다.</Text>
					</Flex>
				)}
				<div ref={target} style={{ border: "3px solid transparent" }} />
			</Box>
			<NavBelow />
		</>
	);
};

export default MyFeedPage;
