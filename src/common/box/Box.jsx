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
					height: 100%;
					width: 100%;
				`;

			// 모달창
			case "modalBox":
				return css`
					background-color: white;
					width: 279px;
					height: 356px;
					border-radius: 10px;
					padding: 21px 26px 14px 26px;
				`;

			// 투두 박스
			case "todoContent":
				return css`
					height: 48px;
					padding: 12px 0;
				`;

			// 메모 아이콘 박스
			case "memoIconBox":
				return css`
					width: 20px;
					height: 20px;
					padding: 5px 0 0 2px;
				`;
			default:
				break;
		}
	}}
`;
