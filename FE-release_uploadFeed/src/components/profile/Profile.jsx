import {
	Flex,
	Svg,
	FirstHeading,
	SecondHeading,
	Image,
	Hr,
} from "../../common";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __followThunk, __getUser } from "../../redux/modules/profileSlice";
const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);

	const profile = useSelector(state => state.profileSlice.profile);

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
							<FirstHeading fw="600" fs="18px" color="#131313" mg="30px 0 0 0">
								{profile.nickname}
								<Flex fw="400" fs="12" color="#979797" mg="5px 0 0 0">
									{profile.email}
								</Flex>
							</FirstHeading>
						</Flex>
						{decodeToken.memberId === profile.memberId ? (
							<Svg variant="setting" onClick={profileEditHandler} />
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
					bs="0px 2px 10px rgba(0, 0, 0, 0.1)"
					radius="10px"
					dir="row"
					jc="space-between"
					ai="center"
					pd="40px"
				>
					<SecondHeading fw="300" fs="12px" color="#979797">
						게시글
						<Flex fw="600" fs="19" color="#7474ff" ta="center" mg="10px 0 0 0">
							{profile.countFeed}
						</Flex>
					</SecondHeading>
					<Hr variant="hr" />
					<SecondHeading fw="300" fs="12px" color="#979797">
						팔로잉
						<Flex
							fw="600"
							fs="19"
							color="#7474ff"
							ta="center"
							mg="10px 0 0 0"
							onClick={() => {
								navigate(`/profile/${id}/following`);
							}}
						>
							{profile.countFollowing}
						</Flex>
					</SecondHeading>
					<Hr variant="hr" />
					<SecondHeading fw="300" fs="12px" color="#979797">
						팔로워
						<Flex
							fw="600"
							fs="19"
							color="#7474ff"
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
				<Flex wd="331px" mg="20px auto">
					<Flex wd="100%" jc="space-between">
						<Flex jc="space-between">
							<SecondHeading fw="600" fs="15px">
								내가 작성한 피드 게시글
							</SecondHeading>
						</Flex>
						<Svg variant="rightArrow"></Svg>
					</Flex>
				</Flex>
				<Flex
					wd="333px"
					ht="72px"
					bc="#fff"
					radius="10px"
					jc="flex-start"
					pd="20px"
					mg="0 0 10px 0"
				>
					<FirstHeading fs="13px" fw="600">
						미라클모닝 3개월째 성공😊
						<Flex mg="5px 0 0 0" fs="13" fw="300">
							#미라클모닝 #뿌듯 #오늘도성공
						</Flex>
					</FirstHeading>
				</Flex>
				<Flex
					wd="333px"
					ht="72px"
					bc="#fff"
					radius="10px"
					jc="flex-start"
					pd="20px"
					mg="0 0 10px 0"
				>
					<FirstHeading fs="13px" fw="600">
						미라클모닝 3개월째 성공😊
						<Flex mg="5px 0 0 0" fs="13" fw="300">
							#미라클모닝 #뿌듯 #오늘도성공
						</Flex>
					</FirstHeading>
				</Flex>
				<Flex
					wd="333px"
					ht="72px"
					bc="#fff"
					radius="10px"
					jc="flex-start"
					pd="20px"
				>
					<FirstHeading fs="13px" fw="600">
						미라클모닝 3개월째 성공😊
						<Flex mg="5px 0 0 0" fs="13" fw="300">
							#미라클모닝 #뿌듯 #오늘도성공
						</Flex>
					</FirstHeading>
				</Flex>
				<Flex wd="331px" mg="20px auto">
					<Flex wd="100%" jc="space-between">
						<Flex jc="space-between">
							<SecondHeading fw="600" fs="15px">
								{decodeToken.memberId === profile.memberId
									? "내 뱃지 12개"
									: "획득한 뱃지 12개"}
							</SecondHeading>
						</Flex>
						<Svg variant="rightArrow"></Svg>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default Profile;