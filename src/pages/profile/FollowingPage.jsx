import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FirstHeading, Flex, Image, Svg } from "../../common";
import NavBelow from "../../components/nav/NavBelow";
import {
	__followThunk,
	__getFollowing,
} from "../../redux/modules/profileSlice";

const Following = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);

	const followingList = useSelector(state => state.profileSlice.followingList);
	const profile = useSelector(state => state.profileSlice.profile);
	useEffect(() => {
		dispatch(__getFollowing(id));
	}, []);

	const anotherMemberPage = memberId => {
		navigate(`/profile/${memberId}`);
	};
	const unfollowHandler = memberId => {
		dispatch(__followThunk(memberId));
	};
	const followingHandler = memberId => {
		dispatch(__followThunk(memberId));
	};

	return (
		<>
			<Flex dir="column" wd="100%" ht="100vh" mg="0 auto" jc="flex-start">
				<Flex
					dir="row"
					wd="100%"
					ht="58px"
					jc="space-between"
					pd="8px 0"
					ai="center"
				>
					<Flex wd="113px" ht="42px" jc="flex-start" mg="0 0 0 17px">
						<Svg variant="chevron" onClick={() => navigate(-1)} />
					</Flex>
					<Flex fs="18" fw="600">
						팔로우
					</Flex>
					<Flex wd="113px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
				</Flex>
				{followingList.length === 0 ? (
					<>
						<Svg variant="profileBlock"></Svg>
						<Flex mg="10px 0 0 0" fw="600" fs="14" color="#3F3F3F">
							팔로우하는 사람이 없어요..
						</Flex>
					</>
				) : (
					Array.from(followingList).map(data => (
						<Flex
							wd="335px"
							jc="space-between"
							mg="0 0 20px 0 "
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
									onClick={() => {
										anotherMemberPage(data.memberId);
									}}
								>
									{data.nickname}
								</FirstHeading>
							</Flex>
							<Flex>
								{decodeToken.memberId !== data.memberId ? (
									data.followOrNot === false ? (
										<Svg
											variant="follow"
											onClick={() => {
												followingHandler(data.memberId);
											}}
										></Svg>
									) : (
										<Svg
											variant="followCancel"
											onClick={() => {
												unfollowHandler(data.memberId);
											}}
										></Svg>
									)
								) : null}
							</Flex>
						</Flex>
					))
				)}
			</Flex>
			<NavBelow />
		</>
	);
};

export default Following;
