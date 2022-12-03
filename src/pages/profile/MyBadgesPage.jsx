import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Flex from "../../common/flex/Flex";
import Image from "../../common/image/Image";
import Svg from "../../common/svg/Svg";
import NavBelow from "../../components/nav/NavBelow";
import { __getBadgeList } from "../../redux/modules/profileSlice";

const MyBadgesPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(__getBadgeList(id));
	}, []);

	const badgeList = useSelector(
		state => state.profileSlice.profile.badgeResponseDtoList,
	);

	const representativeBadge = useSelector(state => state.profileSlice.profile);
	console.log(representativeBadge);

	return (
		<>
			<Flex dir="column" mw="375px" mxw="375px" mg="0 auto">
				<Flex
					dir="row"
					ht="58px"
					jc="space-between"
					pd="8px 0"
					ai="center"
					bb="1px solid #EFEFEF"
				>
					<Flex wd="125px" ht="42px" jc="flex-start" mg="0 0 0 17px">
						<Svg
							variant="chevron"
							onClick={() => {
								navigate(-1);
							}}
						/>
					</Flex>
					<Flex fs="18" fw="600">
						내 뱃지
					</Flex>
					<Flex wd="125px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
				</Flex>
				{representativeBadge.badgeImage !== null ? (
					<>
						<Flex fw="600" fs="18" mg="40px auto 15px auto">
							나의 대표 뱃지
						</Flex>
						<Flex fw="300" fs="14">
							뱃지는 피드에서 닉네임과 함께 노출됩니다.
						</Flex>
						<Flex mg="20px 0 0 0">
							<Image src={representativeBadge.badgeImage}></Image>
						</Flex>
						<Flex
							wd="120px"
							ht="37px"
							bg="#FFF4ED"
							radius="8px"
							color="#FF8737"
							fw="600"
							fs="14"
						>
							{representativeBadge.badgeName}
						</Flex>
						<Flex
							pd="10px 10px 10px 12px"
							wd="120px"
							ht="37px"
							bg="#131313"
							radius="5px"
							color="#fff"
							fw="600"
							fs="12"
							mg="30px 0 0 0"
							cursor="pointer"
							onClick={() => {
								navigate(`/profile/${id}/badgeSetting/`);
							}}
						>
							대표 뱃지 설정
							<Svg variant="badgeRightArrow"></Svg>
						</Flex>
					</>
				) : (
					<>
						<Flex fw="600" fs="18" mg="40px auto 15px auto">
							대표 뱃지가 없습니다.
						</Flex>
						<Flex fw="300" fs="14">
							뱃지는 피드에서 닉네임과 함께 노출됩니다.
						</Flex>
						<Svg variant="profileBlock"></Svg>
						<Flex
							pd="10px 10px 10px 12px"
							wd="120px"
							ht="37px"
							bg="#131313"
							radius="5px"
							color="#fff"
							fw="600"
							fs="12"
							mg="30px 0 0 0"
							cursor="pointer"
							onClick={() => {
								navigate(`/profile/${id}/badgeSetting/`);
							}}
						>
							대표 뱃지 설정
							<Svg variant="badgeRightArrow"></Svg>
						</Flex>
					</>
				)}
				<Flex wd="375px" ht="4px" bg="#F8F8F8" mg="40px 0 20px 0"></Flex>
			</Flex>
			<Flex mw="375px" mxw="375px" wrap="wrap" mg="0 auto 100px auto">
				{badgeList &&
					badgeList.map(data => (
						<>
							{data.obtainedBadge === true ? (
								<Flex dir="row" wrap="wrap" mg="0 0 20px 0">
									<Flex dir="column" fw="600" fs="14">
										<Image variant="badgeImage" src={data.badgeImage} />
										{data.badgeName}
									</Flex>
								</Flex>
							) : (
								<Flex dir="row" wrap="wrap" mg="0 0 20px 0">
									<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
										<Image variant="badgeImage" src={data.badgeImage} />
										{data.badgeName}
									</Flex>
								</Flex>
							)}
						</>
					))}
			</Flex>
			<NavBelow />
		</>
	);
};

export default MyBadgesPage;
