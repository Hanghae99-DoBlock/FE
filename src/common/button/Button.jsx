import styled, { css } from "styled-components";
import { black, white, grey100, grey500, orange300 } from "../color";

const Button = ({ children, ...props }) => {
	return <StBtn {...props}>{children}</StBtn>;
};
export default Button;

const StBtn = styled.button`
	${({ variant }) => {
		switch (variant) {
			case "join":
				return css`
					width: 100%;
					height: 60px;
					background-color: #ff8737;
					color: white;
					border-radius: 10px;
					border: 1px solid #ff8737;
					font-size: 16px;
					font-weight: 600;
					line-height: 19px;
				`;
			case "halfPrimary":
				return css`
					width: 100%;
					height: 50px;
					background-color: #ffeff1;
					color: #fd3049;
					border-radius: 5px;
					font-size: 14px;
					font-weight: 600;
				`;
			case "halfTertiary":
				return css`
					width: 100%;
					height: 50px;
					background-color: #f8f8f8;
					color: #666666;
					border-radius: 5px;
					font-size: 14px;
					font-weight: 600;
				`;
			// 투두 추가 버튼
			case "addTodo":
				return css`
					width: 100%;
					height: 49px;
					background: #7474ff;
					border-radius: 10px;
					font-weight: 600;
					font-size: 14px;
					color: #ffffff;
				`;

			// 투두 수정 버튼
			case "modTodo":
				return css`
					width: 185px;
					height: 49px;
					background: #7474ff;
					border-radius: 10px;
					font-weight: 600;
					font-size: 14px;
					color: #ffffff;
				`;

			// 투두 공유 버튼
			case "shareTodo":
				return css`
					width: 54px;
					height: 49px;
					background: #efefff;
					border-radius: 10px;
					border-radius: 10px;
				`;

			case "addBoastTodo":
				return css`
					width: 261px;
					height: 55px;
					background-color: #ff8737;
					color: white;
					border-radius: 10px;
					border: 1px solid #ff8737;
					font-size: 15px;
					font-weight: 600;
					line-height: 19px;
				`;

			case "addTag":
				return css`
					width: 38px;
					height: 38px;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 4px 12px;
					gap: 8px;
					background-color: #ededff;
					border-radius: 10px;
				`;
			case "feedReaction":
				return css`
					font-size: 18px;
					margin: 0 5px;
					cursor: pointer;
				`;
			case "delTodo":
				return css`
					cursor: pointer;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 45px;
					height: 27px;
					background-color: #ffeff1;
					border-radius: 5px;
					color: #fd3049;
					font-weight: 700;
					font-size: 11px;
				`;
			case "disactivatedCta":
				return css`
					width: 100%;
					height: 50px;
					background-color: ${grey100};
					border-radius: 5px;
					color: ${grey500};
					font-weight: 600;
					font-size: 14px;
				`;
			case "activatedCta":
				return css`
					cursor: pointer;
					width: 100%;
					height: 50px;
					background-color: ${orange300};
					border-radius: 5px;
					color: ${white};
					font-weight: 600;
					font-size: 14px;
				`;
			case "disactivatedXL":
				return css`
					width: 100%;
					height: 62px;
					background-color: ${grey100};
					border-radius: 10px;
					color: ${grey500};
					font-weight: 700;
					font-weight: 400;
					font-size: 16px;
				`;
			case "activatedXL":
				return css`
					cursor: pointer;
					width: 100%;
					height: 62px;
					background-color: ${black};
					border-radius: 10px;
					color: ${white};
					font-weight: 700;
					font-weight: 400;
					font-size: 16px;
				`;
			default:
				break;
		}
	}};
`;
