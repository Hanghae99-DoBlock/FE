import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "../profile/style/slide.css";
import { Pagination } from "swiper";
import {
	Flex,
	Svg,
	FirstHeading,
	SecondHeading,
	ThirdHeading,
	Image,
	Hr,
} from "../../common";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { __getUsers } from "../../redux/modules/joinSlice";
const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);

	const [profile, setProfile] = useState("");
	console.log(profile.data);

	useEffect(() => {
		dispatch(__getUsers());
	}, [dispatch]);

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
				<Flex wd="335px" mg="auto">
					<Flex wd="100%" jc="space-between">
						<Flex jc="space-around">
							<Image variant="image" src={decodeToken.profileImage} />
							<FirstHeading fw="600" fs="18px" color="#131313" mg="30px 0 0 0">
								{decodeToken.nickname}
								<SecondHeading
									fw="400"
									fs="12px"
									color="#979797"
									mg="5px 0 0 0"
								>
									{decodeToken.sub}
								</SecondHeading>
							</FirstHeading>
						</Flex>
						<div onClick={() => navigate("/profile/edit")}>
							<Svg variant="Setting" />
						</div>
					</Flex>
				</Flex>
				<Flex
					mg="28px auto"
					wd="335px"
					ht="85px"
					bs="0px 2px 10px rgba(0, 0, 0, 0.1)"
					radius="10px"
					dir="row"
					jc="space-between"
					ai="center"
					pd="40px"
				>
					<SecondHeading fw="300" fs="12px" color="#979797">
						게시글
						<ThirdHeading
							fw="600"
							fs="19px"
							color="#7474ff"
							ta="center"
							mg="10px 0 0 0"
						>
							3
						</ThirdHeading>
					</SecondHeading>
					<Hr variant="hr" />
					<SecondHeading fw="300" fs="12px" color="#979797">
						팔로잉
						<ThirdHeading
							fw="600"
							fs="19px"
							color="#7474ff"
							ta="center"
							mg="10px 0 0 0"
						>
							220
						</ThirdHeading>
					</SecondHeading>
					<Hr variant="hr" />
					<SecondHeading fw="300" fs="12px" color="#979797">
						팔로워
						<ThirdHeading
							fw="600"
							fs="19px"
							color="#7474ff"
							ta="center"
							mg="10px 0 0 0"
						>
							39
						</ThirdHeading>
					</SecondHeading>
				</Flex>
				<Flex wd="331px" mg="auto">
					<Flex wd="100%" jc="space-between">
						<Flex jc="space-between">
							<Flex wd="24px" ht="24px" bc="#d9d9d9" mr="10px" />
							<SecondHeading fw="400" fs="13px" mg="0 0 0 10px">
								내가 작성한 피드 게시글
							</SecondHeading>
						</Flex>
						<Svg variant="rightArrow" />
					</Flex>
				</Flex>
				<Swiper
					slidesPerView="auto"
					loop={false}
					spaceBetween={12}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="mySwiper"
				>
					<SwiperSlide className="swiper-slide">
						<h2 className="h2">
							제목1<p>선택한 투두</p>
						</h2>
					</SwiperSlide>
					<SwiperSlide className="swiper-slide">
						<h2 className="h2">
							제목2<p>선택한 투두</p>
						</h2>
					</SwiperSlide>
					<SwiperSlide className="swiper-slide">
						<h2 className="h2">
							제목3<p>선택한 투두</p>
						</h2>
					</SwiperSlide>
					<SwiperSlide className="swiper-slide">
						<h2 className="h2">
							제목4<p>선택한 투두</p>
						</h2>
					</SwiperSlide>
				</Swiper>
				<Flex wd="331px" mg="20px 0 0 0">
					<Flex wd="100%" jc="space-between">
						<Flex jc="space-between">
							<Flex wd="24px" ht="24px" bc="#d9d9d9" mr="10px" />
							<SecondHeading fw="400" fs="13px" mg="0 0 0 10px">
								획득한 뱃지 목록
							</SecondHeading>
						</Flex>
						<Svg variant="RightArrow" />
					</Flex>
				</Flex>
				<Swiper
					slidesPerView="auto"
					loop={false}
					spaceBetween={9}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="mySwiper"
				>
					<SwiperSlide className="badge-slide"></SwiperSlide>
					<SwiperSlide className="badge-slide"></SwiperSlide>
					<SwiperSlide className="badge-slide"></SwiperSlide>
					<SwiperSlide className="badge-slide"></SwiperSlide>
				</Swiper>
			</Flex>
		</>
	);
};

export default Profile;
