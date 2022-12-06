import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBadgeListApi } from "../../api/badgeListApi";
import { Box, Flex, Svg } from "../../common";

const BadgeModal = ({ badgeItem, setIsAddTodoModalOpen, setBadgeSelected }) => {
	const { id } = useParams();

	// 투두 상태 관리
	const [badge, setBadge] = useState({});

	// 모달 닫기 핸들러
	const closeAddTodoModalHandler = () => {
		setIsAddTodoModalOpen(false);
		setBadge({});
	};

	const badges = useSelector(
		state => state.profileSlice.profile.badgeResponseDtoList,
	);
	const [badgeList, setBadgeList] = useState([]);
	useEffect(() => {
		__getBadgeType();
	}, []);

	const __getBadgeType = useCallback(async () => {
		const response = await getBadgeListApi({ id, badgeItem });
		setBadgeList(response);
	}, []);

	const onClickObtainedBadgeHandler = () => {
		setBadgeSelected(badgeItem);
		setIsAddTodoModalOpen(false);
		setBadge({});
	};

	return (
		<Flex bg="rgba(0, 0, 0, 0.5)" wd="100%" ht="100%" zIndex="1">
			<Box variant="badgeModalBox">
				<Flex jc="flex-end" mg="15px 15px 0 0">
					<Svg onClick={closeAddTodoModalHandler} variant="close"></Svg>
				</Flex>
				<Flex>
					<img src={badgeList.badgeImage} alt="" />
				</Flex>
				<Flex fw="600" fs="18">
					{badgeList.badgeName}
				</Flex>
				<Flex
					jc="center"
					mg="10px auto"
					wd="200px"
					fw="300"
					fs="14"
					color="#666666"
				>
					{badgeList.badgeDetail}
				</Flex>
				<Flex
					wd="247px"
					ht="50px"
					mg="20px auto"
					bg="#FFF0E6"
					radius="5px"
					color="#FF8737"
					fw="600"
					fs="14"
					cursor="pointer"
					onClick={onClickObtainedBadgeHandler}
				>
					내 대표 뱃지로 설정
				</Flex>
			</Box>
		</Flex>
	);
};

export default BadgeModal;
