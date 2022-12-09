import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Flex, Svg, Text } from "../../common";
import {
	__editReactions,
	__removeReactions,
	__updateReactions,
} from "../../redux/modules/feed/feedSlice";

const ReactionModal = () => {
	const [like, setLike] = useState(false);
	const [heart, setHeart] = useState(false);
	const [smile, setSmile] = useState(false);
	const [party, setParty] = useState(false);
	const [fire, setFire] = useState(false);
	const dispatch = useDispatch();
	const feedId = useSelector(state => state.feed.feedItem.feedId);
	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);
	const reactionResponseDtoList = useSelector(
		state => state.feed.feedItem.reactionResponseDtoList,
	);
	useEffect(() => {
		const reaction = reactionResponseDtoList.filter(
			data => data.memberId === decodeToken.memberId,
		);
		if (reaction[0]) {
			if (reaction[0].reactionType === "LIKE") {
				setLike(true);
			} else if (reaction[0].reactionType === "HEART") {
				setHeart(true);
			} else if (reaction[0].reactionType === "SMILE") {
				setSmile(true);
			} else if (reaction[0].reactionType === "PARTY") {
				setParty(true);
			} else if (reaction[0].reactionType === "FIRE") {
				setFire(true);
			}
		}
	}, []);

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

	const onClickReactionCheck = e => {
		const reaction = reactionResponseDtoList.filter(
			data => data.memberId === decodeToken.memberId,
		);
		reaction[0]
			? dispatch(
					__editReactions({
						memberId: decodeToken.memberId,
						feedId,
						reactionType: e.target.value,
					}),
			  )
			: dispatch(
					__updateReactions({
						memberId: decodeToken.memberId,
						feedId,
						reactionType: e.target.value,
					}),
			  );
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
							onClickLikeHandler();
							dispatch(
								__removeReactions({
									memberId: decodeToken.memberId,
									feedId,
									reactionType: e.target.value,
								}),
							);
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="LIKE"
						onClick={e => {
							onClickLikeHandler();
							onClickReactionCheck(e);
						}}
					>
						&#x1F44D;
					</Button>
				)}
				{heart === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							onClickHeartHandler();
							dispatch(
								__removeReactions({
									memberId: decodeToken.memberId,
									feedId,
									reactionType: e.target.value,
								}),
							);
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="HEART"
						onClick={e => {
							onClickHeartHandler();
							onClickReactionCheck(e);
						}}
					>
						&#x2764;
					</Button>
				)}
				{smile === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							onClickSmileHandler();
							dispatch(
								__removeReactions({
									memberId: decodeToken.memberId,
									feedId,
									reactionType: e.target.value,
								}),
							);
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="SMILE"
						onClick={e => {
							onClickSmileHandler();
							onClickReactionCheck(e);
						}}
					>
						&#x1F60A;
					</Button>
				)}
				{party === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							onClickPartyHandler();
							dispatch(
								__removeReactions({
									memberId: decodeToken.memberId,
									feedId,
									reactionType: e.target.value,
								}),
							);
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="PARTY"
						onClick={e => {
							onClickPartyHandler();
							onClickReactionCheck(e);
						}}
					>
						&#x1F389;
					</Button>
				)}
				{fire === true ? (
					<Svg
						variant="feedReactionCheck"
						onClick={e => {
							onClickFireHandler();
							dispatch(
								__removeReactions({
									memberId: decodeToken.memberId,
									feedId,
									reactionType: e.target.value,
								}),
							);
						}}
					></Svg>
				) : (
					<Button
						variant="feedReaction"
						value="FIRE"
						onClick={e => {
							onClickFireHandler();
							onClickReactionCheck(e);
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
