import styled from "styled-components";

export const Flex = styled.div`
	/* 공통 */
	display: flex;

	/* flex 속성 */
	flex-direction: ${({ fd }) => (fd ? fd : "row")};
	justify-content: ${({ jc }) => (jc ? jc : "center")};
	align-items: ${({ ai }) => (ai ? ai : "center")};

	/* 위치 */
	z-index: ${({ zIndex }) => (zIndex ? zIndex : "")};
	position: ${({ position }) => (position ? position : "")};

	/* 사이즈 */
	height: ${({ height }) => (height ? height : "")};
	width: ${({ width }) => (width ? width : "")};
	max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "")};
	min-width: ${({ minWidth }) => (minWidth ? minWidth : "")};

	/* 스타일 */
	background-color: ${({ bgColor }) => (bgColor ? bgColor : "")};
	border-radius: ${({ radius }) => (radius ? radius : "")};

	/* 여백 */
	gap: ${({ gap }) => (gap ? gap : "")};
	padding: ${({ pad }) => (pad ? pad : "")};
	margin: ${({ margin }) => (margin ? margin : "")};
`;
