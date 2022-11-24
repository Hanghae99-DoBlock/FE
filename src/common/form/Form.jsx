import styled, { css } from "styled-components";

const Form = ({ children, ...props }) => {
	return <StForm {...props}>{children}</StForm>;
};
export default Form;

const StForm = styled.form`
	${({ variant }) => {
		switch (variant) {
			// 투두 작성 폼
			case "todoForm":
				return css`
					height: 200px;
					display: flex;
					flex-direction: column;
					color: #979797;
					justify-content: space-between;
				`;
			case "feedCommentForm":
				return css``;
			default:
				break;
		}
	}}
`;
