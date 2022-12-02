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
	flex-wrap: ${({ wrap }) => wrap};

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
	background-image: ${({ bi }) => bi};
	border: ${({ border }) => border};
	border-top: ${({ bt }) => bt};
	border-left: ${({ bl }) => bl};
	border-right: ${({ br }) => br};
	border-bottom: ${({ bb }) => bb};
	border-radius: ${({ radius }) => radius};
	box-shadow: ${({ bs }) => bs};
	border: ${({ border }) => border};
	opacity: ${({ oc }) => oc};
	cursor: ${({ cursor }) => cursor};

	/* 여백 */
	margin: ${({ mg }) => mg};
	gap: ${({ gap }) => gap};
	padding: ${({ pd }) => pd};

	/* 위치 */
	top: ${({ top }) => top};
	bottom: ${({ bottom }) => bottom};
	left: ${({ left }) => left};
	right: ${({ right }) => right};
	bottom: ${({ bottom }) => bottom};
	position: ${({ position }) => position};
	z-index: ${({ zIndex }) => zIndex};
	transform: ${({ transform }) => transform};

	/* 폰트 */
	color: ${({ color }) => color};
	font-size: ${({ fs }) => `${fs}px`};
	font-weight: ${({ fw }) => fw};
	line-height: ${({ lh }) => `${lh}px`};
	text-align: ${({ ta }) => ta};

	/* 스크롤 */
	overflow: ${({ overflow }) => overflow};
	overflow-x: ${({ overflowX }) => overflowX};
	overflow-y: ${({ overflowY }) => overflowY};
`;
