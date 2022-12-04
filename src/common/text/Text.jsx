import styled, { css } from "styled-components";
import { black } from "../../common";

const Text = ({ children, ...props }) => {
	return <StText {...props}>{children}</StText>;
};
export default Text;

const StText = styled.span`
	${({ variant, color }) => {
		switch (variant) {
			case "big":
				return css`
					font-weight: 700;
					font-size: 20px;
				`;
			case "medium":
				return css`
					font-weight: 600;
					font-size: 19px;
					color: #131313;
				`;
			case "small":
				return css`
					font-weight: 500;
					font-size: 13px;
					line-height: 13px;
					color: #131313;
				`;
			case "greyBig":
				return css`
					font-weight: 600;
					font-size: 16px;
					color: #979797;
				`;
			case "grey":
				return css`
					font-weight: 500;
					font-size: 12px;
					color: #979797;
				`;
			case "normal":
				return css`
					font-weight: 500;
					font-size: 15px;
				`;

			// 피드
			case "whiteMicro":
				return css`
					color: #ffffff;
					font-weight: 600;
					font-size: 10px;
				`;
			case "whiteTiny":
				return css`
					color: #ffffff;
					font-weight: 500;
					font-size: 12px;
				`;
			case "whiteSmall":
				return css`
					color: #ffffff;
					font-weight: 510;
					font-size: 13px;
					margin: 0 0 2px 0;
				`;
			case "whiteMedium":
				return css`
					color: #ffffff;
					font-weight: 500;
					font-size: 14px;
				`;
			case "whiteBig":
				return css`
					color: #ffffff;
					font-weight: 800;
					font-size: 24px;
				`;
			case "tabMenu":
				return css`
					font-weight: 400;
					font-size: 14px;
					line-height: 27px;
				`;
			case "selectedTabMenu":
				return css`
					font-weight: 700;
					font-size: 14px;
				`;
			case "navText":
				return css`
					font-weight: 400;
					font-size: 10px;
				`;
			case "comment":
				return css`
					font-weight: 400;
					font-size: 14px;
					cursor: pointer;
				`;
			case "commentHeart":
				return css`
					font-weight: 400;
					font-size: 14px;
					color: red;
				`;
			case "deleteComment":
				return css`
					font-weight: 400;
					font-size: 14px;
					color: red;
					margin-left: 5px;
					cursor: pointer;
				`;
			// 피드 상세
			case "red":
				return css`
					font-weight: 500;
					font-size: 12px;
					color: #fd3049;
				`;
			case "orange":
				return css`
					font-weight: 500;
					font-size: 10px;
					color: #ff8737;
				`;
			case "title1":
				return css`
					font-weight: 700;
					font-size: 22px;
					line-height: 33px;
					color: ${color || black};
				`;
			case "title3":
				return css`
					font-weight: 600;
					font-size: 18px;
					color: ${color || black};
				`;
			case "body1":
				return css`
					font-weight: 400;
					font-size: 16px;
					line-height: 22px;
					color: ${color || black};
				`;
			case "body2Medium":
				return css`
					font-weight: 500;
					font-size: 14px;
					line-height: 24px;
					color: ${color || black};
				`;
			case "feedComment":
				return css`
					font-weight: 500;
					font-size: 14px;
					color: #ff8737;
				`;
			case "feedReaction":
				return css`
					margin: 0 5px;
					cursor: pointer;
				`;
			default:
				break;
		}
	}}
`;
