import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Image, Svg } from "../../common";
import NavBelow from "../../components/nav/NavBelow";
import BadgeModal from "../../components/profile/BadgeModal";
import { __editBadges, __getBadgeList } from "../../redux/modules/profileSlice";

const BadgeSetiingPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(__getBadgeList(id));
	}, []);

	const badgeList = useSelector(
		state => state.profileSlice.profile.badgeResponseDtoList,
	);
	const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
	const [badgeItem, setBadgeItem] = useState();

	const [badgeSelected, setBadgeSelected] = useState();

	// 투두 추가 모달 오픈 핸들러
	const openAddTodoModalHandler = badgeType => {
		setBadgeItem(badgeType);
		setIsAddTodoModalOpen(true);
	};

	const onClickObtainedBadgeHandler = () => {
		dispatch(__editBadges(badgeItem));
	};

	return (
		<Flex dir="column" mw="375px" mxw="375px" mg="0 auto">
			{/* 모달 */}
			{isAddTodoModalOpen ? (
				<Flex wd="100%" ht="100%" ai="flex-start" position="absolute">
					<Flex wd="100%" ht="100vh" position="relative">
						<Flex wd="100%" ht="100%" zIndex="2">
							<BadgeModal
								setBadgeSelected={setBadgeSelected}
								setIsAddTodoModalOpen={setIsAddTodoModalOpen}
								badgeItem={badgeItem}
							/>
						</Flex>
					</Flex>
				</Flex>
			) : null}
			<Flex
				dir="row"
				ht="58px"
				jc="space-between"
				pd="8px 0"
				ai="center"
				bb="1px solid #EFEFEF"
			>
				<Flex wd="115px" ht="42px" jc="flex-start" mg="0 0 0 17px">
					<Svg
						variant="chevron"
						onClick={() => {
							navigate(-1);
						}}
					/>
				</Flex>
				<Flex fs="18" fw="600">
					대표 뱃지 설정
				</Flex>
				<Flex wd="105px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
			</Flex>
			<Flex wd="327px" wrap="wrap" mg="0 0 120px 0 ">
				<Flex wrap="wrap">
					{badgeList &&
						badgeList.map(data => (
							<>
								{data.obtainedBadge === true ? (
									<Flex
										dir="row"
										wrap="wrap"
										mg="0 0 20px 0"
										cursor="pointer"
										onClick={() => {
											openAddTodoModalHandler(data.badgeType);
										}}
									>
										{badgeSelected === data.badgeType ? (
											<Flex dir="column" fw="600" fs="14">
												<Flex bg="#ffe7b8" radius="10px">
													<Image variant="badgeImage" src={data.badgeImage} />
												</Flex>
												{data.badgeName}
											</Flex>
										) : (
											<Flex dir="column" fw="600" fs="14">
												<Image variant="badgeImage" src={data.badgeImage} />
												{data.badgeName}
											</Flex>
										)}
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
				{badgeSelected !== badgeList?.badgeType ? (
					<Flex
						wd="331px"
						ht="60px"
						bc="#000000"
						radius="10px"
						fw="600"
						fs="16"
						color="#FFF"
						mg="30px 0 0 0"
						cursor="pointer"
						onClick={onClickObtainedBadgeHandler}
					>
						선택 완료
					</Flex>
				) : (
					<Flex
						wd="331px"
						ht="60px"
						bc="#F8F8F8"
						radius="10px"
						fw="600"
						fs="16"
						color="#CACACA"
						mg="30px 0 0 0"
					>
						선택 완료
					</Flex>
				)}
			</Flex>
			<NavBelow />
		</Flex>
	);
};

export default BadgeSetiingPage;
