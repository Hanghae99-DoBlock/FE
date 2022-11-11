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
					width:335px;
					height: 60px;
					background-color: #7474FF;
					color:white;
					border-radius: 10px;
					border : 1px solid #7474FF;
					font-size : 16px;
					font-weight: 600;
					line-height : 19px;
				
				`;
			default:
				break;
		}
	}};
`;
