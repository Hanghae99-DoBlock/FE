import {
	Flex,
	Svg,
	SecondHeading,
	Image,
	Text,
	Box,
	grey600,
} from "../../common";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __followThunk, __getUser } from "../../redux/modules/profileSlice";
import NavBelow from "../nav/NavBelow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "../profile/style/slide.css";
import { Pagination } from "swiper";
const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);

	const profile = useSelector(state => state.profileSlice.profile);
	const feedResponseDtoList = useSelector(
		state => state.profileSlice.profile.feedResponseDtoList,
	);

	const acquisitionBadge = useSelector(
		state => state.profileSlice.profile.badgeImageList,
	);
	useEffect(() => {
		dispatch(__getUser(id));
	}, [id]);

	const profileEditHandler = () => {
		navigate(`/profile/edit`);
	};

	const logOutHandler = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		navigate(`/`);
	};
	return (
		<>
			<Flex
				wd="100%"
				dir="column"
				ht="100vh"
				jc="flex-start"
				style={{ overflow: "auto" }}
			>
				{decodeToken.memberId === profile.memberId ? (
					<Flex wd="100%" ht="62px" bb="2px solid #EFEFEF">
						<Flex wd="335px" fw="600" fs="18" jc="flex-start">
							내 프로필
						</Flex>
					</Flex>
				) : null}
				<Flex wd="335px" mg="0px auto 20px auto;">
					<Flex ht="88px" wd="100%" jc="space-between">
						<Flex gap="12px">
							<Image
								alt=""
								variant="image"
								src={
									decodeToken.profileImage === ""
										? decodeToken.profileImage
										: profile.profileImage
								}
							/>
							<Flex dir="column" ai="flex-start" gap="4px">
								<Text variant="profileLarge">{profile.nickname}</Text>
								<Text variant="body4" color={grey600}>
									{profile.email}
								</Text>
							</Flex>
						</Flex>
						{decodeToken.memberId === profile.memberId ? (
							<Flex>
								<Svg onClick={logOutHandler} variant="logOut" />
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
					<Flex onClick={() => navigate(`myblocks`)} cursor="pointer" Z>
						{decodeToken.memberId === profile.memberId ? (
							<SecondHeading fw="300" fs="12px" color="#666666">
								내 블럭
								<Flex
									fw="600"
									fs="19"
									color="#131313"
									ta="center"
									mg="10px 0 0 0"
								>
									{profile.countFeed}
								</Flex>
							</SecondHeading>
						) : (
							<SecondHeading fw="300" fs="12px" color="#666666">
								블럭
								<Flex
									fw="600"
									fs="19"
									color="#131313"
									ta="center"
									mg="10px 0 0 0"
								>
									{profile.countFeed}
								</Flex>
							</SecondHeading>
						)}
					</Flex>
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
				<Flex wd="100%" bb="2px solid #EFEFEF" mg="20px 0 0 0"></Flex>
				<Flex wd="331px" mg="20px auto">
					<Flex wd="100%" jc="flex-start">
						{decodeToken.memberId === profile.memberId ? (
							<Flex
								onClick={() => {
									navigate(`/profile/${id}/badges`);
								}}
							>
								<SecondHeading fw="600" fs="15px" mg="0 10px 0 0">
									획득한 뱃지 {profile.countBadge}
								</SecondHeading>
							</Flex>
						) : (
							<Flex>
								<SecondHeading fw="600" fs="15px" mg="0 10px 0 0">
									획득한 뱃지 {profile.countBadge}
								</SecondHeading>
							</Flex>
						)}
						{decodeToken.memberId !== profile.memberId ? (
							<Svg variant="rightArrow"></Svg>
						) : (
							<Svg
								variant="rightArrow"
								onClick={() => {
									navigate(`/profile/${id}/badges`);
								}}
							></Svg>
						)}
					</Flex>
				</Flex>
				{decodeToken.memberId !== profile.memberId ? (
					<Swiper
						slidesPerView="auto"
						loop={false}
						spaceBetween={20}
						pagination={{
							clickable: true,
						}}
						modules={[Pagination]}
						className="mySwiper"
					>
						{acquisitionBadge?.map(data => (
							<SwiperSlide className="badge-slide">
								<Image src={data} alt="" />
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<Swiper
						slidesPerView="auto"
						loop={false}
						spaceBetween={20}
						pagination={{
							clickable: true,
						}}
						modules={[Pagination]}
						className="mySwiper"
					>
						{acquisitionBadge?.map(data => (
							<SwiperSlide className="badge-slide">
								<Image
									src={data}
									alt=""
									onClick={() => {
										navigate(`/profile/${id}/badges`);
									}}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				)}
				<Flex wd="100%" bb="2px solid #EFEFEF" mg="20px 0 0 0" />
				<Flex wd="331px" ht="51px" jc="flex-start">
					<Flex onClick={() => navigate(`myblocks`)} cursor="pointer" ht="100%">
						{decodeToken.memberId === profile.memberId ? (
							<SecondHeading fw="600" fs="15px" mg="0 10px 0 0">
								내가 쌓은 블럭
							</SecondHeading>
						) : (
							<SecondHeading fw="600" fs="15px" mg="0 10px 0 0">
								쌓은 블럭
							</SecondHeading>
						)}
						<Svg variant="rightArrow"></Svg>
					</Flex>
				</Flex>
				{profile.countFeed === 0 ? (
					<>
						<Svg variant="profileBlock"></Svg>
						<Flex fw="600" fs="14" color="#3F3F3F" mg="20px 0 0 0">
							쌓은 블럭이 없어요
						</Flex>
						<Flex fw="300" fs="12" color="#A2A2A2" mg="15px 0 140px 0">
							피드를 작성해서 블럭을 쌓아보세요!
						</Flex>
					</>
				) : (
					<Box onClick={() => navigate(`myblocks`)} variant="profileBox">
						<Flex jc="flex-end" position="absolute" right="10px" top="-38px">
							<Svg variant="block" />
						</Flex>
						{feedResponseDtoList?.map(data => (
							<Flex
								dir="column"
								gap="5px"
								wd="333px"
								ht="80px"
								bc="#F8F8F8"
								radius="10px"
								ai="flex-start"
								pd="20px"
								mg="0 0 10px 0"
								key={data.memberId}
							>
								<Box variant="textOverflow">
									<Text variant="body2Medium">{data.feedTitle}</Text>
								</Box>
								<Box variant="textOverflow">
									<Text variant="body3" color={grey600}>
										{data.feedContent}
									</Text>
								</Box>
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
