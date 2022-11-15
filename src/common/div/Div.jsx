import styled, { css } from "styled-components";

const Div = ({ children, ...props }) => {
	return (
		<>
			<StTextArea {...props}>{children}</StTextArea>
		</>
	);
};
export default Div;

const StTextArea = styled.div`
	${({ variant }) => {
		switch (variant) {
			case "textArea":
				return css`
					padding: 12px 188px 12px 16px;
					background-color: #f4f4f4;
					width: 335px;
					height: 205px;
					overflow: hidden;
					resize: none;
					border-radius: 10px;
				`;
			case "stTextArea":
				return css`
					display: flex;
					flex-direction: row;
				`;
			case "imageLayout":
				return css`
					position: relative;
					border-radius: 100%;
					height: 100px;
					width: 100px;
					overflow: hidden;
					resize: none;
					margin: 20px 0 40px 0;
					border: 3px solid #c8c8c8;
				`;
			default:
				break;
		}
	}}
`;
