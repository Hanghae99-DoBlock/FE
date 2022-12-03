import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex } from "../../common";
import { FeedItem, NavBelow } from "../../components";
import { __getRecommendedFeeds } from "../../redux/modules/middleware/feedListThunk";

const RecommendedFeedListPage = () => {
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
				{recommendedFeedList.map(feedItem => (
					<FeedItem key={feedItem.feedId} feedItem={feedItem} />
				))}
				{isNextRecommendedFeedPageExist ? null : (
					<Flex ht="80px" border="25px solid transparent" />
				)}
				<div ref={target} />
			</Box>
			<NavBelow />
		</>
	);
};

export default RecommendedFeedListPage;
