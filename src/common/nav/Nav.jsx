import styled from "styled-components";

const Nav = ({ children, ...props }) => {
	return <StNav {...props}>{children}</StNav>;
};
export default Nav;

const StNav = styled.nav`
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 430px;
	height: 72px;
	background: #ffffff;
	box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
`;
