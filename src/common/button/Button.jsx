import styled, { css } from "styled-components";

const Button = ({ children, ...props }) => {
	return <StBtn {...props}>{children}</StBtn>;
};
export default Button;

const StBtn = styled.button`
	${({ variant }) => {
		switch (variant) {
			case "join":
				return css`
					width: 335px;
					height: 60px;
					background-color: #7474ff;
					color: white;
					border-radius: 10px;
					border: 1px solid #7474ff;
					font-size: 16px;
					font-weight: 600;
					line-height: 19px;
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
			case "addBoastTodo":
				return css`
					width: 261px;
					height: 55px;
					background-color: #7474ff;
					color: white;
					border-radius: 10px;
					border: 1px solid #7474ff;
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
			default:
				break;
		}
	}};
`;
