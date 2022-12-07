import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Svg, Text } from "../../common";
import { __updateReactions } from "../../redux/modules/feed/feedSlice";

const ReactionModal = () => {
	const [like, setLike] = useState(false);
	const [heart, setHeart] = useState(false);
	const [smile, setSmile] = useState(false);
	const [party, setParty] = useState(false);
	const [fire, setFire] = useState(false);
	const dispatch = useDispatch();
	const feedId = useSelector(state => state.feed.feedItem.feedId);

	const onClickLikeHandler = () => {
		setLike(!like);
	};
	const onClickHeartHandler = () => {
		setHeart(!heart);
	};
	const onClickSmileHandler = () => {
		setSmile(!smile);
	};
	const onClickPartyHandler = () => {
		setParty(!party);
	};
	const onClickFireHandler = () => {
		setFire(!fire);
	};

	return (
		<Flex
			position="absolute"
			top="-30px"
			wd="184px"
			ht="40px"
			bg="#fff"
			border="1px solid #EFEFEF"
			bs="0px 2px 6px rgba(0, 0, 0, 0.05)"
			radius="10px"
			pd="8px 16px"
		>
			<Flex>
				{like === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickLikeHandler();
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="LIKE"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickLikeHandler();
						}}
					>
						&#x1F44D;
					</Button>
				)}
				{heart === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickHeartHandler();
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="HEART"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickHeartHandler();
						}}
					>
						&#x2764;
					</Button>
				)}
				{smile === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickSmileHandler();
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="SMILE"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickSmileHandler();
						}}
					>
						&#x1F60A;
					</Button>
				)}
				{party === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickPartyHandler();
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="PARTY"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickPartyHandler();
						}}
					>
						&#x1F389;
					</Button>
				)}
				{fire === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickFireHandler();
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="FIRE"
						onClick={e => {
							dispatch(
								__updateReactions({ feedId, reactionType: e.target.value }),
							);
							onClickFireHandler();
						}}
					>
						&#x1F525;
					</Button>
				)}
			</Flex>
		</Flex>
	);
};

export default ReactionModal;
