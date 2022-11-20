import styled, { css } from "styled-components";

const TextArea = ({ children, ...props }) => {
	return <StTextArea {...props}>{children}</StTextArea>;
};
export default TextArea;

const StTextArea = styled.textarea`
	${({ variant }) => {
		switch (variant) {
			case "memo":
				return css`
					width: 100%;
					vertical-align: center;
					font-size: 13px;
					font-weight: 500;
					line-height: 22px;
					::placeholder {
						color: #979797;
					}
				`;
			default:
				break;
		}
	}}
`;
