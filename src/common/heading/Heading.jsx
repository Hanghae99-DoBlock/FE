import * as styles from "./Heading.styles";

export const FirstHeading = ({ children, ...props }) => {
	return <styles.FirstHeading {...props}>{children}</styles.FirstHeading>;
};

export const SecondHeading = ({ children, ...props }) => {
	return <styles.SecondHeading {...props}>{children}</styles.SecondHeading>;
};

export const ThirdHeading = ({ children, ...props }) => {
	return <styles.ThirdHeading {...props}>{children}</styles.ThirdHeading>;
};
