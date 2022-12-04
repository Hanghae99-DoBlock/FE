import styled, { css } from "styled-components";

export const FirstHeading = styled.h1`
	font-weight: 700;
	font-size: 24px;
	line-height: 33px;
	color: ${({ color }) => (color ? color : "")};
	font-size: ${({ fs }) => (fs ? fs : "")};
	text-align: ${({ ta }) => (ta ? ta : "")};
	letter-spacing: ${({ ls }) => (ls ? ls : "")};
	text-transform: ${({ tt }) => (tt ? tt : "")};
	font-weight: ${({ fw }) => (fw ? fw : "")};
	margin: ${({ mg }) => (mg ? mg : "")};
`;
export const SecondHeading = styled.h2`
	color: ${({ color }) => (color ? color : "")};
	font-size: ${({ fs }) => (fs ? fs : "")};
	text-align: ${({ ta }) => (ta ? ta : "")};
	letter-spacing: ${({ ls }) => (ls ? ls : "")};
	text-transform: ${({ tt }) => (tt ? tt : "")};
	font-weight: ${({ fw }) => (fw ? fw : "")};
	margin: ${({ mg }) => (mg ? mg : "")};
`;

export const ThirdHeading = styled.h3`
	font-weight: 600;
	color: ${({ color }) => (color ? color : "")};
	font-size: ${({ fs }) => (fs ? fs : "")};
	text-align: ${({ ta }) => (ta ? ta : "")};
	letter-spacing: ${({ ls }) => (ls ? ls : "")};
	text-transform: ${({ tt }) => (tt ? tt : "")};
	font-weight: ${({ fw }) => (fw ? fw : "")};
	margin: ${({ mg }) => (mg ? mg : "")};
	/* margin-bottom: 45px; */
`;
