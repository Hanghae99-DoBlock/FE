import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FirstHeading, Flex, Image, Svg } from "../../common";
import { __followThunk, __getUsers } from "../../redux/modules/profileSlice";

const Following = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const token = localStorage.getItem("accessToken");
	const decodeToken = jwtDecode(token);

	const user = useSelector(state => state.profileSlice.profile);

	console.log(user);

	useEffect(() => {
		dispatch(__getUsers(id));
	}, []);

	return (
		<Flex
			dir="column"
			mw="375px"
			mxw="375px"
			mh="667px"
			mg="0 auto"
			style={{ overflow: "auto" }}
		>
			<Flex dir="row" ht="58px" jc="space-between" pd="8px 0" ai="center">
				<Flex wd="113px" ht="42px" jc="flex-start" mg="0 0 0 17px">
					<Svg variant="chevron" onClick={() => navigate(-1)} />
				</Flex>
				<Flex fs="18" fw="600">
					팔로잉
				</Flex>
				<Flex wd="113px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
			</Flex>
			{user.map(data => (
				<Flex jc="space-between" mg="0 0 20px 0 " wd="100%">
					<Flex>
						<Image
							variant="image"
							src={data.profileImage}
							alt=""
							style={{ marginTop: "4px" }}
						/>
						<FirstHeading fw="600" fs="13px">
							{data.nickname}
						</FirstHeading>
					</Flex>
					<Flex>
						{user.followOrNot === false ? (
							<Svg
								variant="follow"
								onClick={() => {
									dispatch(__followThunk(id));
								}}
							></Svg>
						) : (
							<Svg
								variant="followCancel"
								onClick={() => {
									dispatch(__followThunk(id));
								}}
							></Svg>
						)}
					</Flex>
				</Flex>
			))}
		</Flex>
	);
};

export default Following;
