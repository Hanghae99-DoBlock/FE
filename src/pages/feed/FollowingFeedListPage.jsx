import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Text } from "../../common";
import { FeedItem } from "../../components";
import { resetFollowingList } from "../../redux/modules/feed/feedSlice";
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

	useEffect(() => {
		return () => {
			dispatch(resetFollowingList());
		};
	}, []);

	return (
		<Box variant="feedScrollArea">
			{followingFeedList[0] ? (
				<>
					{followingFeedList.map(feedItem => (
						<FeedItem key={feedItem.feedId} feedItem={feedItem} />
					))}
					{isNextFollowingFeedPageExist ? null : (
						<Flex border="50px solid transparent" />
					)}
				</>
			) : (
				<Flex dir="column" ht="100%" pd="0 0 40px 0" gap="15px">
					<Flex wd="107px" ht="64px" bi="url(/images/blockStacksGrey.svg)" />
					<Text variant="body2Medium">팔로잉 피드가 없습니다.</Text>
				</Flex>
			)}
			{isNextFollowingFeedPageExist ? null : (
				<Flex border="50px solid transparent" />
			)}

			<div ref={target} />
		</Box>
	);
};

export default FollowingFeedListPage;
