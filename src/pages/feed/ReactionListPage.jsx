import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FirstHeading, Flex, Image, Svg } from "../../common";
import { NavBelow } from "../../components";

const ReactionListPage = () => {
	const navigate = useNavigate();

	const reactionList = useSelector(
		state => state.feed.feedItem.reactionResponseDtoList,
	);
	const anotherMemberPage = memberId => {
		navigate(`/profile/${memberId}`);
	};
	return (
		<>
			<Flex
				dir="column"
				jc="flex-start"
				wd="100%"
				ht="100vh"
				style={{ overflow: "auto" }}
			>
				<Flex
					dir="row"
					ht="58px"
					jc="space-between"
					pd="8px 0"
					ai="center"
					bb="1px solid #EFEFEF"
				>
					<Flex wd="145px" ht="42px" jc="flex-start" mg="0 0 0 17px">
						<Svg
							variant="chevron"
							onClick={() => {
								navigate(-1);
							}}
						/>
					</Flex>
					<Flex fs="18" fw="600">
						리액션
					</Flex>
					<Flex wd="135px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
				</Flex>
				<Flex dir="column" mw="335px" mxw="375px" mg="15px auto 0 auto">
					{reactionList &&
						reactionList.map(data => (
							<Flex
								jc="space-between"
								mg="0 0 20px 0 "
								wd="100%"
								key={data.memberId}
							>
								<Flex>
									<Image
										variant="followImage"
										src={data.profileImage}
										alt=""
										style={{ marginTop: "4px" }}
										onClick={() => {
											anotherMemberPage(data.memberId);
										}}
									/>

									<FirstHeading
										fw="600"
										fs="13px"
										mg="8px 0 0 0"
										onClick={() => {
											anotherMemberPage(data.memberId);
										}}
									>
										{data.nickname}
										<Flex color="#A2A2A2" fw="300" fs="11" mg="-18px 0 0 0">
											{data.email}
										</Flex>
									</FirstHeading>
								</Flex>
								<Flex>
									{data.reactionType === "LIKE" ? "👍" : null}
									{data.reactionType === "HEART" ? "❤" : null}
									{data.reactionType === "SMILE" ? "😊" : null}
									{data.reactionType === "PARTY" ? "🎉" : null}
									{data.reactionType === "FIRE" ? "🔥" : null}
								</Flex>
							</Flex>
						))}
				</Flex>

				<NavBelow />
			</Flex>
		</>
	);
};

export default ReactionListPage;
