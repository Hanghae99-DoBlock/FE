import styled, { css } from "styled-components";

const Input = ({ ...props }) => {
	return <StInput {...props} />;
};

export default Input;

export const StInput = styled.input`
	${({ variant }) => {
		switch (variant) {
			//회원가입, 로그인시 사용
			case "join":
				return css`
					width: 335px;
					height: 50px;
					background-color: #f4f4f4;
					border-radius: 10px;
					padding: 12px 0 12px 16px;
					outline-color: #7474ff;
					::placeholder {
						color: #c8c8c8;
						margin-left: 16px;
						font-weight: 500;
						padding: 12px 0 16px;
					}
				`;

			//회원가입 시 input이 빈칸일 때 placeholder의 색상 변경시 사용
			case "changeBlue":
				return css`
					width: 335px;
					height: 50px;
					background-color: #f4f4f4;
					border-radius: 10px;
					padding: 12px 0 12px 16px;

					::placeholder {
						color: #7474ff;
						margin-left: 16px;
						font-weight: 500;
						padding: 12px 0 16px;
					}
				`;

			// 투두 컨텐트 인풋
			case "todoInput":
				return css`
					height: 48px;
					padding: 12px 0;
					caret-color: #7474ff;
					font-weight: 600;
					font-size: 19px;
					color: #131313;
				`;
			case "addFeedInput":
				return css`
					width: 335px;
					height: 50px;
					background-color: #f4f4f4;
					border-radius: 10px;
					padding: 12px 16px 12px 16px;
					outline-color: #7474ff;
					::placeholder {
						color: #c8c8c8;
						margin-left: 16px;
						font-weight: 500;
						padding: 12px 0 16px;
					}
				`;
			case "imageInput":
				return css`
					width: 100%;
					height: 100%;
					opacity: 0;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 2;
				`;
			//프로필 비밀번호 보여주는 인풋
			case "passwordInput":
				return css`
					width: 257px;
					height: 50px;
					background-color: #f4f4f4;
					border-radius: 10px;
					padding: 12px 0 12px 16px;
					outline-color: #7474ff;
					::placeholder {
						color: #c8c8c8;
						margin-left: 16px;
						font-weight: 500;
						padding: 12px 0 16px;
					}
				`;
			case "feedInput":
				return css`
					width: 319px;
					height: 36px;
					background-color: #ffffff;
					border: 1px solid #e5e5e5;
					border-radius: 50px;
					padding: 9px 16px;
					margin-right: 10px;
				`;
			default:
				break;
		}
	}}
`;