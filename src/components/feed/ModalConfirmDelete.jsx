import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Svg, Text } from "../../common";
import { updateIsLoading } from "../../redux/modules/feed/feedSlice";
import { __deleteFeed } from "../../redux/modules/middleware/feedListThunk";

const ModalConfirmDelete = ({ setIsConfirmDeleteModalOpen, feedId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoading = useSelector(state => state.feed.isLoading);

	const closeConfirmDeleteModalHandler = () => {
		setIsConfirmDeleteModalOpen(false);
	};

	const deleteFeedHandler = () => {
		dispatch(__deleteFeed(feedId));
	};

	useEffect(() => {
		if (isLoading === false) {
			navigate(`../feed/following`);
			dispatch(updateIsLoading(null));
		}
	}, [isLoading]);

	return (
		<Flex bg="rgba(0, 0, 0, 0.5)" wd="100%" ht="100%" zIndex="1">
			<Flex
				jc="space-between"
				dir="column"
				bg="white"
				wd="280px"
				ht="290px"
				radius="10px"
				pd="20px 17px"
			>
				<Flex wd="100%" jc="flex-end" cursor="pointer">
					<Svg onClick={closeConfirmDeleteModalHandler} variant="close"></Svg>
				</Flex>
				<Flex dir="column">
					<Flex
						wd="72px"
						ht="60px"
						mg="0 0 30px 0"
						bi="url(/images/warning.svg)"
					/>
					<Flex dir="column" gap="10px" mg="0 0 20px 0">
						<Text variant="title3">정말 삭제하시겠습니까?</Text>
						<Text variant="body2">삭제한 게시글은 복구되지 않습니다.</Text>
					</Flex>
				</Flex>
				<Flex wd="100%" gap="9px">
					<Button
						onClick={closeConfirmDeleteModalHandler}
						variant="halfTertiary"
					>
						취소
					</Button>
					<Button onClick={deleteFeedHandler} variant="halfPrimary">
						삭제
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ModalConfirmDelete;
