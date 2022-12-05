import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Flex, grey300, grey600, Text } from "../../common";
import { FeedItem } from "../../components";
import { __getRecommendedFeeds } from "../../redux/modules/middleware/feedListThunk";

const RecommendedFeedListPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const target = useRef(null);
	const { recommendedFeedList, isNextRecommendedFeedPageExist } = useSelector(
		state => state.feed,
	);

	useEffect(() => {
		if (isNextRecommendedFeedPageExist) {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					dispatch(__getRecommendedFeeds());
				}
			});
			observer.observe(target.current);
			return () => {
				observer.disconnect(observer);
			};
		}
	}, [isNextRecommendedFeedPageExist]);

	return (
		<>
			<Box variant="feedScrollArea">
				{recommendedFeedList[0] ? (
					<>
						{recommendedFeedList.map(feedItem => (
							<FeedItem key={feedItem.feedId} feedItem={feedItem} />
						))}
						{isNextRecommendedFeedPageExist ? null : (
							<Flex border="50px solid transparent" />
						)}
					</>
				) : (
					<Flex dir="column" ht="100%" pd="0 0 40px 0" gap="15px">
						<Flex wd="107px" ht="64px" bi="url(/images/blockStacksGrey.svg)" />
						<Text variant="body2Medium">추천 피드가 없습니다.</Text>
						<Flex dir="column">
							<Text variant="body3" color={grey600}>
								관심사를 선택하면
							</Text>
							<Text variant="body3" color={grey600}>
								흥미로울 만한 피드를 추천해드려요.
							</Text>
						</Flex>
						<Flex
							onClick={() => navigate(`/profile/edit/interest`)}
							cursor="pointer"
							wd="120px"
							ht="30px"
							radius="5px"
							border={`1px solid ${grey300}`}
							gap="5px"
							pd="8px 12px"
							mg="15px 0 0 0"
						>
							<Text variant="body4">관심사 선택하기</Text>
							<Flex wd="5px" ht="8px" bi="url(/images/arrowRightBlack.svg)" />
						</Flex>
					</Flex>
				)}
				{isNextRecommendedFeedPageExist ? null : (
					<Flex border="50px solid transparent" />
				)}
				<div ref={target} />
			</Box>
		</>
	);
};

export default RecommendedFeedListPage;
