import styled, { css } from "styled-components";
import { white } from "../../common";

const Layout = ({ children, ...props }) => {
	return <StLayout {...props}>{children}</StLayout>;
};
export default Layout;

const StLayout = styled.div`
	${({ variant }) => {
		switch (variant) {
			// 전체 페이지 공통 레이아웃
			case "commonLayout":
				return css`
					min-width: 320px;
					max-width: 430px;
					margin: 0 auto;
					align-items: flex-start;
					height: 100%;
					position: relative;
					display: flex;
					flex-direction: column;
					background-color: ${white};
				`;
			default:
				break;
		}
	}}
`;
