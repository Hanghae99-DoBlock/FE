import { useEffect, useState } from "react";
import { Flex } from "../../common";

const PcVerIllustration = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [screenSizeStatus, setScreenSizeStatus] = useState("small");

	useEffect(() => {
		const resizeListener = () => {
			setScreenWidth(window.innerWidth);
		};
		window.addEventListener("resize", resizeListener);
	});

	useEffect(() => {
		if (screenWidth > 1440) {
			setScreenSizeStatus("big");
		} else if (1440 > screenWidth && screenWidth > 1170) {
			setScreenSizeStatus("mid");
		} else {
			setScreenSizeStatus("small");
		}
	}, [screenWidth]);

	const pcBgUi = {
		big: { wd: "460px", ht: "433px" },
		mid: { wd: "276px", ht: "274px" },
		small: { wd: 0, ht: 0 },
	};

	return (
		<>
			<Flex position="absolute" top="0" left="0">
				<Flex ht="100vh" position="relative">
					<Flex
						wd={pcBgUi[screenSizeStatus].wd}
						ht={pcBgUi[screenSizeStatus].ht}
						bi="url(/images/pcVerIllustrationLeft.svg)"
					/>
				</Flex>
			</Flex>
			<Flex position="absolute" top="0" right="0">
				<Flex ht="100vh" position="relative">
					<Flex
						wd={pcBgUi[screenSizeStatus].wd}
						ht={pcBgUi[screenSizeStatus].ht}
						bi="url(/images/pcVerIllustrationRight.svg)"
					/>
				</Flex>
			</Flex>
		</>
	);
};

export default PcVerIllustration;
