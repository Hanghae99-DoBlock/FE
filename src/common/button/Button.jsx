import styled, { css } from "styled-components";

const Button = ({ children, ...props }) => {
	return <StBtn {...props}>{children}</StBtn>;
};
export default Button;

const StBtn = styled.button`
	${({ variant }) => {
		switch (variant) {
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
			default:
				break;
		}
	}};
`;
