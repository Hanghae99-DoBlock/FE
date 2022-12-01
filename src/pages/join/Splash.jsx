import React from "react";
import { Flex, Svg } from "../../common";

const Splash = () => {
	return (
		<Flex
			dir="row"
			mwd="100%"
			mht="100%"
			bg="#FF8737"
			ai="center"
			jc="center"
			mg="0 auto"
			overflow="hidden"
		>
			<Svg variant="splashLogo" />
		</Flex>
	);
};

export default Splash;
