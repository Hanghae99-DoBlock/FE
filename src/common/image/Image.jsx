import styled, { css } from "styled-components";
import ProfileImage from "../../images/profile.jpeg";

const Image = ({ children, ...props }) => {
	return <StImage {...props}>{children}</StImage>;
};
export default Image;

const StImage = styled.img`
	${({ variant }) => {
		switch (variant) {
			// 이미지 작성 폼
			case "image":
				return css`
					background-image: url(${ProfileImage});
					background-repeat: no-repeat;
					background-size: cover;
					width: 60px;
					height: 60px;
					border-radius: 50%;
					margin-top: 27px;
					margin-right: 10px;
					outline: 2px solid white;
					outline-offset: -1px;
				`;
			case "imagePreview":
				return css`
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					object-fit: cover;
				`;
			case "profilePicSmall":
				return css`
					background-image: url(${ProfileImage});
					background-repeat: no-repeat;
					background-size: cover;
					width: 24px;
					height: 24px;
					border-radius: 50%;
					outline-offset: -1px;
				`;
			default:
				break;
		}
	}}
`;
