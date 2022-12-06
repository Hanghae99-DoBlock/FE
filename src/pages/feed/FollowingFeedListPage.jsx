import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex } from "../../common";
import { FeedItem } from "../../components";
import { __getFollowingFeeds } from "../../redux/modules/middleware/feedListThunk";

const FollowingFeedListPage = () => {
	const dispatch = useDispatch();
	const target = useRef(null);
	const { followingFeedList, isNextFollowingFeedPageExist } = useSelector(
		state => state.feed,
	);

	useEffect(() => {
		if (isNextFollowingFeedPageExist) {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					dispatch(__getFollowingFeeds());
				}
			});
			observer.observe(target.current);
			return () => {
				observer.disconnect(observer);
			};
		}
	}, [isNextFollowingFeedPageExist]);

	return (
		<Box variant="feedScrollArea">
			{followingFeedList.map(feedItem => (
				<FeedItem key={feedItem.feedId} feedItem={feedItem} />
			))}
			{isNextFollowingFeedPageExist ? null : (
				<Flex ht="80px" border="25px solid transparent" />
			)}
			<div ref={target} />
		</Box>
	);
};

export default FollowingFeedListPage;
