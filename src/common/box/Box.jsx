import styled, { css } from "styled-components";

const Box = ({ children, ...props }) => {
	return <StBox {...props}>{children}</StBox>;
};
export default Box;

const StBox = styled.div`
	/* Box 공통 스타일 */
	width: "100%";
	height: "100vh";

	${({ variant, profileImageUrl }) => {
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
					position: fixed;
					top: 20vh;
				`;

			// 투두 박스
			case "todoContent":
				return css`
					height: 48px;
					padding: 12px 0;
				`;
			// 텍스트 박스
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
			// 이미지 레이아웃(프로필 페이지)
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
			case "stSvg":
				return css`
					display: flex;
					align-items: center;
					width: 22px;
					height: 22px;
				`;
			case "stInfo":
				return css`
					color: #7474ff;
					display: flex;
					justify-content: flex-start;
					width: 300px;
				`;
			case "stnicknameBlue":
				return css`
					display: flex;
					flex-direction: row;
					width: 335px;
					background-color: #f4f4f4;
					align-items: center;
					border-radius: 10px;
					outline: 1px solid #7474ff;
					justify-content: space-between;
				`;
			case "stnickname":
				return css`
					display: flex;
					flex-direction: row;
					width: 335px;
					background-color: #f4f4f4;
					align-items: center;
					border-radius: 10px;
					justify-content: space-between;

					:focus-within {
						outline: 1px solid #7474ff;
					}
				`;
			case "stEmail":
				return css`
					display: flex;
					flex-direction: row;
					width: 335px;
					background-color: #f4f4f4;
					align-items: center;
					border-radius: 10px;
					justify-content: space-between;

					:focus-within {
						outline: 1px solid #7474ff;
					}
				`;
			case "stPassword":
				return css`
					display: flex;
					flex-direction: row;
					width: 335px;
					background-color: #f4f4f4;
					align-items: center;
					border-radius: 10px;
					justify-content: space-between;
					:focus-within {
						outline: 1px solid #7474ff;
					}
				`;
			// 기본 탭 메뉴
			case "tabMenu":
				return css`
					display: flex;
					width: 100%;
					height: 100%;
					justify-content: center;
					align-items: center;
					background: white;
					border-bottom: 1px solid #e0e0e0;
				`;

			// 선택된 탭 메뉴
			case "selectedTabMenu":
				return css`
					display: flex;
					width: 100%;
					height: 100%;
					justify-content: center;
					align-items: center;
					background: white;
					border-bottom: 2px solid #333333;
				`;

			// 피드 아이템 블루
			case "blueFeedItem":
				return css`
					width: 335px;
					height: 193px;
					background-image: url(/images/feed/blueFeedItem.svg);
					background-size: contain;
					background-repeat: no-repeat;
					padding: 45px 35px 25px;
				`;

			// 프로필 이미지 스몰
			case "profilePicSmall":
				return css`
					background-image: url(${profileImageUrl});
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 50%;
					width: 24px;
					height: 24px;
				`;
			default:
				break;
		}
	}}
`;
