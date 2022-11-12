import styled, { css } from "styled-components";

const Input = ({ children, ...props }) => {
	return <StInput {...props}>{children}</StInput>;
};
export default Input;

const StInput = styled.input`
	${({ variant }) => {
		switch (variant) {
			// 투두 컨텐트 인풋
			case "todoInput":
				return css`
					height: 48px;
					width: 100%;
					padding: 12px 0;
					caret-color: #7474ff;
					font-weight: 600;
					font-size: 19px;
					color: #131313;
				`;
			default:
				break;
		}
	}}
`;
