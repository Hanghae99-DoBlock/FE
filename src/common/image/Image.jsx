import styled, { css } from "styled-components";

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
					background-repeat: no-repeat;
					background-size: cover;
					width: 60px;
					height: 60px;
					border-radius: 50%;
					margin-top: 18px;
					margin-right: 10px;
					outline: 2px solid white;
					outline-offset: -1px;
				`;
			case "followImage":
				return css`
					background-repeat: no-repeat;
					background-size: cover;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-top: 27px;
					margin-right: 10px;
					outline: 2px solid white;
					outline-offset: -1px;
				`;
			case "commentImage":
				return css`
					background-repeat: no-repeat;
					background-size: cover;
					width: 22px;
					height: 22px;
					border-radius: 50%;
					margin-top: 27px;
					margin-right: 5px;
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
			case "badgeImage":
				return css`
					margin: 8px;
				`;
			default:
				break;
		}
	}}
`;
