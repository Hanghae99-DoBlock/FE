import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Flex, Svg } from "../../common";
import { deletePhoto } from "../../redux/modules/feed/feedSlice";

const PhotoList = ({ photo, isPhotoFull, setIsPhotoFull }) => {
	const dispatch = useDispatch();
	const photoList = useSelector(state => state.feed.photoList);
	const deletePhotoHandler = () => {
		dispatch(deletePhoto(photo));
	};

	return (
		<Flex onClick={deletePhotoHandler} wd="72px" ht="72px" position="relative">
			<Svg variant="deletePhoto" />
			<StImg src={photo.url} />
		</Flex>
	);
};

export default PhotoList;

export const StImg = styled.img`
	width: 72px;
	height: 72px;
	border-radius: 5px;
`;
