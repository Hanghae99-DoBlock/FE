import styled from "styled-components";

const Flex = ({ children, ...props }) => {
	return <StFlex {...props}>{children}</StFlex>;
};

export default Flex;

export const StFlex = styled.div`
	/* 공통 */
	display: flex;

	/* flex 속성 */
	flex-direction: ${({ dir }) => (dir ? dir : "row")};
	justify-content: ${({ jc }) => (jc ? jc : "center")};
	align-items: ${({ ai }) => (ai ? ai : "center")};

	/* 사이즈 */
	width: ${({ wd }) => wd};
	height: ${({ ht }) => ht};
	min-height: ${({ mh }) => mh};
	max-height: ${({ mxh }) => mxh};
	min-width: ${({ mw }) => mw};
	max-width: ${({ mxw }) => mxw};

	/* 스타일 */
	background: ${({ bc }) => bc};
	background-color: ${({ bg }) => bg};
	border: ${({ border }) => border};
	border-top: ${({ bt }) => bt};
	border-bottom: ${({ bb }) => bb};
	border-left: ${({ bl }) => bl};
	border-right: ${({ br }) => br};
	border-radius: ${({ radius }) => radius};
	box-shadow: ${({ bs }) => bs};

	/* 여백 */
	margin: ${({ mg }) => mg};
	gap: ${({ gap }) => gap};
	padding: ${({ pd }) => pd};

	/* 위치 */
	top: ${({ top }) => top};
	left: ${({ left }) => left};
	right: ${({ right }) => right};
	position: ${({ position }) => position};
	z-index: ${({ zIndex }) => zIndex};

	/* 폰트 */
	color: ${({ color }) => color};
	font-size: ${({ fs }) => `${fs}px`};
	font-weight: ${({ fw }) => fw};
	line-height: ${({ lh }) => `${lh}px`};
`;
