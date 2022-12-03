import {
	Flex,
	Svg,
	FirstHeading,
	SecondHeading,
	Image,
	Hr,
	Text,
	ThirdHeading,
	Box,
} from "../../common";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	__followThunk,
	__getBadgeList,
	__getUser,
} from "../../redux/modules/profileSlice";
import NavBelow from "../nav/NavBelow";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "../profile/style/slide.css";
import { Pagination } from "swiper";
import styled from "styled-components";
const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);

	const profile = useSelector(state => state.profileSlice.profile);

	const acquisitionBadge = useSelector(
		state => state.profileSlice.profile.badgeImageList,
	);

	console.log(profile);

	useEffect(() => {
		dispatch(__getUser(id));
	}, []);

	const profileEditHandler = () => {
		navigate(`/profile/edit`);
	};

	return (
		<>
			<Flex
				wd="100%"
				dir="column"
				mw="375px"
				mxw="375px"
				mh="667px"
				mg="0 auto"
				style={{ overflow: "auto" }}
			>
				{decodeToken.memberId === profile.memberId ? (
					<Flex wd="375px" ht="62px" bb="2px solid #EFEFEF">
						<Flex wd="335px" fw="600" fs="18px" jc="flex-start">
							내 프로필
						</Flex>
					</Flex>
				) : null}
				<Flex wd="335px" mg="0px auto 20px auto;">
					<Flex wd="100%" jc="space-between">
						<Flex jc="space-around">
							<Image
								variant="image"
								src={
									decodeToken.profileImage === ""
										? decodeToken.profileImage
										: profile.profileImage
								}
							/>
							<FirstHeading fw="600" fs="18px" color="#131313" mg="18px 0 0 0">
								{profile.nickname}
								<Flex fw="400" fs="12" color="#979797" mg="5px 0 0 0">
									{profile.email}
								</Flex>
							</FirstHeading>
						</Flex>
						{decodeToken.memberId === profile.memberId ? (
							<Flex>
								<Svg variant="logOut" />
								<Svg variant="setting" onClick={profileEditHandler} />
							</Flex>
						) : profile.followOrNot === false ? (
							<Svg
								variant="profileFollow"
								onClick={() => {
									dispatch(__followThunk(id));
								}}
							></Svg>
						) : (
							<Svg
								variant="profileFollowCancel"
								onClick={() => {
									dispatch(__followThunk(id));
								}}
							></Svg>
						)}
					</Flex>
				</Flex>
				<Flex
					mg="0 auto"
					wd="335px"
					ht="85px"
					radius="10px"
					dir="row"
					jc="space-between"
					ai="center"
					pd="40px"
					bg="#F8F8F8"
				>
					<SecondHeading
						fw="300"
						fs="12px"
						color="#666666"
						onClick={() => navigate("/feed")}
					>
						내 블럭
						<Flex fw="600" fs="19" color="#131313" ta="center" mg="10px 0 0 0">
							{profile.countFeed}
						</Flex>
					</SecondHeading>
					<SecondHeading fw="300" fs="12px" color="#666666">
						팔로잉
						<Flex
							fw="600"
							fs="19"
							color="#131313"
							ta="center"
							mg="10px 0 0 0"
							onClick={() => {
								navigate(`/profile/${id}/following`);
							}}
						>
							{profile.countFollowing}
						</Flex>
					</SecondHeading>
					<SecondHeading fw="300" fs="12px" color="#666666">
						팔로워
						<Flex
							fw="600"
							fs="19"
							color="#131313"
							ta="center"
							mg="10px 0 0 0"
							onClick={() => {
								navigate(`/profile/${id}/follower`);
							}}
						>
							{profile.countFollower}
						</Flex>
					</SecondHeading>
				</Flex>
				<Flex wd="375px" bb="2px solid #EFEFEF" mg="20px 0 0 0"></Flex>
				<Flex wd="331px" mg="20px auto">
					<Flex wd="100%" jc="flex-start">
						<Flex
							onClick={() => {
								navigate(`/profile/${id}/badges`);
							}}
						>
							<SecondHeading fw="600" fs="15px" mg="0 10px 0 0">
								획득한 뱃지 {profile.countBadge}
							</SecondHeading>
						</Flex>
						<Svg
							variant="rightArrow"
							onClick={() => {
								navigate(`/profile/${id}/badges`);
							}}
						></Svg>
					</Flex>
				</Flex>
				<Swiper
					slidesPerView="auto"
					loop={false}
					spaceBetween={30}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="mySwiper"
				>
					{acquisitionBadge?.map(data => (
						<SwiperSlide className="badge-slide" key={data.id}>
							<Image
								src={data}
								onClick={() => {
									navigate(`/profile/${id}/badges`);
								}}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<Flex wd="375px" bb="2px solid #EFEFEF" mg="20px 0 0 0"></Flex>
				<Flex wd="331px" mg="20px auto">
					<Flex wd="100%" jc="flex-start">
						<Flex>
							<SecondHeading fw="600" fs="15px" mg="0 10px 0 0">
								내가 쌓은 블럭
							</SecondHeading>
						</Flex>
						<Svg variant="rightArrow" onClick={() => navigate("/feed")}></Svg>
					</Flex>
				</Flex>
				{profile.countFeed === 0 ? (
					<>
						<Svg variant="profileBlock"></Svg>
						<Flex fw="600" fs="14px" color="#3F3F3F" mg="20px 0 0 0">
							쌓은 블럭이 없어요
						</Flex>
						<Flex fw="300" fs="12px" color="#A2A2A2" mg="15px 0 140px 0">
							피드를 작성해서 블럭을 쌓아보세요!
						</Flex>
					</>
				) : (
					<Box variant="profileBox">
						<Flex jc="flex-end" position="absolute" right="10px" top="-38px">
							<Svg variant="block" />
						</Flex>
						{profile.feedResponseDtoList?.map(data => (
							<Flex
								wd="333px"
								ht="72px"
								bc="#F8F8F8"
								radius="10px"
								jc="flex-start"
								pd="20px"
								mg="0 0 10px 0"
							>
								<FirstHeading fs="13px" fw="600">
									{data.feedTitle}
									<Flex mg="5px 0 0 0" fs="13" fw="300">
										{data.feedContent}
									</Flex>
								</FirstHeading>
							</Flex>
						))}
					</Box>
				)}
			</Flex>
			<NavBelow />
		</>
	);
};

export default Profile;

const Test = styled.div`
	position: relative;
	padding-bottom: 100px;
`;
