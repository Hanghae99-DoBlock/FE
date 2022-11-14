import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import ProfileImage from "../../images/profile.jpeg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "../profile/style/slide.css";
import { Pagination } from "swiper";
import Flex from "../../common/flex/Flex";
import {
	FirstHeading,
	SecondHeading,
	ThirdHeading,
} from "../../common/heading/Heading.styles";
import Svg from "../../common/svg/Svg";
const Profile = () => {
	return (
		<Flex wd="100%" dir="column">
			<Flex wd="335px" mg="auto">
				<Flex wd="100%" jc="space-between">
					<Flex jc="space-around">
						<Image />
						<FirstHeading fw="600" fs="18px" color="#131313" mg="30px 0 0 0">
							어쩌구
							<SecondHeading fw="400" fs="12px" color="#979797" mg="10px 0 0 0">
								doblock@gmail.com
							</SecondHeading>
						</FirstHeading>
					</Flex>
					<Svg variant="Setting" />
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
				<Hr />
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
				<Hr />
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
					<Svg variant="RightArrow" />
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
	);
};

export default Profile;

const Image = styled.div`
	background-image: url(${ProfileImage});
	background-repeat: no-repeat;
	background-size: cover;
	border: 1px solid #ccc;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin-top: 27px;
	margin-right: 10px;
`;

const Hr = styled.hr`
	height: 65px;
	width: 2px;
	border-width: 0;
	color: #f4f4f4;
	background-color: #f4f4f4;
`;
