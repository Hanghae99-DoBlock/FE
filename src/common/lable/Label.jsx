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
			case "imageLabel":
				return css`
					position: absolute;
					left: 0;
					top: 0;
					height: 100%;
					width: 100%;
					z-index: 1;
					background-color: transparent;
				`;
			default:
				break;
		}
	}}
`;
