import styled, { css } from "styled-components";

const Box = ({ children, ...props }) => {
	return <StBox {...props}>{children}</StBox>;
};
export default Box;

const StBox = styled.div`
	/* Box 공통 스타일 */
	width: "100%";
	height: "100vh";

	${({ variant }) => {
		switch (variant) {
			// 투두리스트 전체 영역
			case "todoListArea":
				return css`
					background: #f9f9f9;
					width: 100%;
				`;

			// 모달창
			case "modalBox":
				return css`
					position: fixed;
					margin: 0 auto;
					background-color: white;
					width: 279px;
					height: 356px;
					border-radius: 10px;
					padding: 21px 20px 14px 20px;
				`;

			// 투두 박스
			case "todoContent":
				return css`
					height: 48px;
					padding: 12px 0;
				`;
			default:
				break;
		}
	}}
`;
