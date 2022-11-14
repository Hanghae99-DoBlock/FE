import styled, { css } from "styled-components";

const Label = ({ children, ...props }) => {
	return <StLabel {...props}>{children}</StLabel>;
};
export default Label;

const StLabel = styled.label`
	${({ variant }) => {
		switch (variant) {
			case "grey":
				return css`
					font-weight: 400;
					font-size: 13px;
				`;
			default:
				break;
		}
	}}
`;
