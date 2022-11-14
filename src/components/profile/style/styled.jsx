import styled from "styled-components";
import Profile from "../../../images/profile.jpeg";

export const Container = styled.div`
	width: 335px;
	margin: auto;
`;
export const SpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
`;
export const SpaceAround = styled.div`
	display: flex;
	justify-content: space-around;
`;
export const Image = styled.div`
	background-image: url(${Profile});
	background-repeat: no-repeat;
	background-size: cover;
	border: 1px solid #ccc;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin-top: 27px;
`;
export const H2 = styled.h2`
	font-weight: 600;
	font-size: 18px;
	margin: 40px 0 0 10px;
	color: #131313;
`;
export const P = styled.p`
	font-weight: 400;
	font-size: 12px;
	color: #979797;
	margin: 5px 0 0 0;
`;
export const Setting = styled.div`
	margin: 42px 15px 0 0;
`;
export const Follow = styled.div`
	margin: 28px auto;
	width: 335px;
	height: 85px;
	background: #ffffff;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 40px;
`;
export const H4 = styled.h4`
	font-weight: 300;
	font-size: 12px;
	color: #979797;
`;
export const FollowP = styled.p`
	font-weight: 600;
	font-size: 19px;
	color: #7474ff;
	text-align: center;
	margin-top: 10px;
`;
export const Hr = styled.hr`
	height: 65px;
	width: 2px;
	border-width: 0;
	color: #f4f4f4;
	background-color: #f4f4f4;
`;
export const Feed = styled.div`
	width: 331px;
	margin: auto;
`;
export const FeedFlex = styled.div`
	display: flex;
	justify-content: space-between;
`;
export const Icon = styled.div`
	width: 24px;
	height: 24px;
	background: #d9d9d9;
	margin-right: 10px;
`;
export const FeedP = styled.div`
	font-weight: 400;
	font-size: 13px;
	margin-top: 4px;
`;
export const Badge = styled.div`
	width: 331px;
	margin: 20px auto;
`;
