import styled, { css } from "styled-components";

const Box = ({ children, ...props }) => {
	return <StBox {...props}>{children}</StBox>;
};
export default Box;

const StBox = styled.div`
	/* Box 공통 스타일 */
	width: "100%";
	height: "100vh";

	${({ variant, profileImageUrl, feedColor, type, feedImgUrl, bg }) => {
		switch (variant) {
			case "textOverflow":
				return css`
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					word-break: break-all;
				`;
			case "tagChip":
				return css`
					display: ${type} !important;
					background-color: ${bg};
					cursor: pointer;
					height: 38px;
					border: 1px solid #e5e5e5;
					border-radius: 24px;
					padding: 0 14px;
					display: flex;
					justify-content: center;
					align-items: center;
				`;
			case "customTagChip":
				return css`
					display: ${type} !important;
					background-color: ${bg};
					cursor: pointer;
					height: 38px;
					border: 1px solid #e5e5e5;
					border-radius: 24px;
					padding: 0 5px 0 14px;
					display: flex;
					justify-content: center;
					align-items: center;
				`;
			case "tagChipInput":
				return css`
					display: ${type} !important;
					background-color: ${bg};
					height: 38px;
					border: 1px solid #e5e5e5;
					border-radius: 24px;
					padding: 0 5px 0 14px;
					display: flex;
					justify-content: center;
					align-items: center;
				`;
			case "searchScrollArea":
				return css`
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					width: 100%;
					height: 100vh;
					padding: 44px 20px;
					gap: 11px;
					overflow-x: hidden;
					overflow-y: auto;
					position: relative;
					//margin-bottom: 5px;
					::-webkit-scrollbar {
						display: none;
					}
				`;
			// 투두리스트 전체 영역
			case "todoListArea":
				return css`
					background: #f9f9f9;
					height: 100%;
					width: 100%;
					border-radius: 20px 20px 0 0;
					::-webkit-scrollbar {
						display: none;
					}
				`;

			// 투두리스트 스크롤 영역
			case "todoListScrollArea":
				return css`
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					width: 100%;
					height: 100%;
					background: #f9f9f9;
					overflow-x: hidden;
					overflow-y: auto;
					::-webkit-scrollbar {
						display: none;
					}
				`;

			// 피드 페이지 스크롤 영역
			case "feedScrollArea":
				return css`
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					width: 100%;
					height: 100vh;
					padding: 41px 0 0 0;
					overflow-x: hidden;
					overflow-y: auto;
					::-webkit-scrollbar {
						display: none;
					}
				`;
			case "todoContentcrollArea":
				return css`
					display: flex;
					height: 38px;
					margin: 2px 0 0 0;
					overflow-x: hidden;
					overflow-y: auto;
					align-items: flex-start;
					::-webkit-scrollbar {
						display: none;
					}
				`;
			case "memocrollArea":
				return css`
					display: flex;
					height: 39px;
					margin: 2px 0 0 0;
					overflow-x: hidden;
					overflow-y: auto;
					align-items: flex-start;
					::-webkit-scrollbar {
						display: none;
					}
				`;
			case "modalBox":
				return css`
					background-color: white;
					width: 279px;
					height: 258px;
					border-radius: 10px;
					padding: 21px 26px 14px 26px;
				`;
			case "badgeModalBox":
				return css`
					background-color: white;
					width: 281px;
					height: 290px;
					border-radius: 10px;
					box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
				`;
			case "feedTodo":
				return css`
					display: flex;
					width: 100%;
					max-width: 335px;
					height: 50px;
					background-color: #f4f4f4;
					border-radius: 10px;
					padding: 12px 16px 12px 16px;
					outline-color: #7474ff;
					align-items: center;
				`;
			case "addFeedComplete":
				return css`
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: white;
					width: 280px;
					height: 282px;
					border-radius: 10px;
					padding: 21px 20px 14px 20px;
				`;
			case "feedModal":
				return css`
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: white;
					width: 279px;
					height: 402px;
					border-radius: 10px;
					padding: 21px 20px 14px 20px;
				`;

			// 메모 아이콘 박스
			case "memoIconBox":
				return css`
					width: 20px;
					height: 100%;
					padding: 4px 0 0 2px;
					display: flex;
					align-items: flex-start;
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
					height: 80px;
					width: 80px;
					overflow: hidden;
					resize: none;
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
			case "stPasswordChange":
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
			case "passworadChange":
				return css`
					display: flex;
					flex-direction: row;
					width: 257px;
					background-color: #f4f4f4;
					align-items: center;
					border-radius: 10px;
					justify-content: space-between;
					:focus-within {
						outline: 1px solid #7474ff;
					}
				`;
			case "stPasswordBlue":
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
			case "stRePassword":
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
			case "stRePasswordBlue":
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
					cursor: pointer;
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
					cursor: pointer;
				`;

			// 프로필 이미지 스몰
			case "profilePicSmall":
				return css`
					background-color: white;
					background-image: url(${profileImageUrl});
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 50%;
					width: 24px;
					height: 24px;
				`;

			// 프로필 이미지 보통
			case "profilePicNormal":
				return css`
					background-image: url(${profileImageUrl});
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 50%;
					width: 34px;
					height: 34px;
				`;

			// 피드 사진
			case "feedImg":
				return css`
					background-image: url(${feedImgUrl});
					background-repeat: no-repeat;
					background-size: contain;
					background-position: center;
					background-color: #f8f8f8;
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 100%;
					height: 243px;
				`;

			// 네비게이션 바 아이콘
			case "navIconBox":
				return css`
					background-image: url(/images/${type}.svg);
					background-repeat: no-repeat;
					background-size: contain;
					width: 17px;
					height: 16px;
				`;
			case "profileBox":
				return css`
					cursor: pointer;
					position: relative;
					padding-bottom: 100px;
				`;
			case "profileEditBox":
				return css`
					position: relative;
					margin: 20px 0 40px 0;
				`;
			case "recommendSearchBox":
				return css`
					width: 274px;
					height: 112px;
				`;

			// 피드 아이템 아이콘
			case "feedPageIcon":
				return css`
					background-image: url(/images/${type}.svg);
					background-repeat: no-repeat;
					background-size: contain;
					width: 14px;
					height: 14px;
				`;

			case "imgPaginationIconBox":
				return css`
					background-image: url(/images/show${type}Img.svg);
					background-repeat: no-repeat;
					background-size: contain;
					width: 20px;
					height: 20px;
					margin: 12px;
				`;
			default:
				break;
		}
	}}
`;
