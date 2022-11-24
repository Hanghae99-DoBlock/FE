import styled, { css } from "styled-components";

const Hr = ({ children, ...props }) => {
	return <StHr {...props}>{children}</StHr>;
};
export default Hr;

const StHr = styled.hr`
	${({ variant }) => {
		switch (variant) {
			// 이미지 작성 폼
			case "hr":
				return css`
					height: 65px;
					width: 2px;
					border-width: 0;
					color: #f4f4f4;
					background-color: #f4f4f4;
				`;
			case "feedHr":
				return css`
					width: 430px;
					height: 2px;
					background-color: #efefef;
				`;
			default:
				break;
		}
	}}
`;
