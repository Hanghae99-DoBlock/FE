import Flex from "../../common/flex/Flex";
import Image from "../../common/image/Image";
import Svg from "../../common/svg/Svg";
import NavBelow from "../../components/nav/NavBelow";

const MyBadgesPage = () => {
	return (
		<Flex dir="column" mw="375px" mxw="375px" mh="667px" mg="0 auto">
			<Flex
				dir="row"
				ht="58px"
				jc="space-between"
				pd="8px 0"
				ai="center"
				bb="1px solid #EFEFEF"
			>
				<Flex wd="125px" ht="42px" jc="flex-start" mg="0 0 0 17px">
					<Svg variant="chevron" />
				</Flex>
				<Flex fs="18" fw="600">
					내 뱃지 {10}
				</Flex>
				<Flex wd="125px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
			</Flex>
			<Flex fw="600" fs="18" mg="40px auto 15px auto">
				대표 뱃지가 없습니다.
			</Flex>
			<Flex fw="300" fs="14">
				뱃지는 피드에서 닉네임과 함께 노출됩니다.
			</Flex>
			<Svg variant="profileBlock"></Svg>
			<Flex
				pd="10px 10px 10px 12px"
				wd="120px"
				ht="37px"
				bg="#131313"
				radius="5px"
				color="#fff"
				fw="600"
				fs="12"
				mg="40px 0 0 0"
				cursor="pointer"
			>
				대표 뱃지 설정
				<Svg variant="badgeRightArrow"></Svg>
			</Flex>
			<Flex wd="375px" ht="4px" bg="#F8F8F8" mg="40px 0 20px 0"></Flex>
			<Flex wd="327px" wrap="wrap" mg="0 0 120px 0 ">
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/투두1.png"
						alt="갓생스타터"
					/>
					갓생스타터
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image variant="badgeImage" src="/images/투두1.png" alt="계란 한판" />
					계란 한판
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/투두2.png"
						alt="진짜 갓생러"
					/>
					진짜 갓생러
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/팔로우1.png"
						alt="저도 친구 있어요"
					/>
					저도 친구 있어요
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/팔로우2.png"
						alt="준 연예인"
					/>
					준 연예인
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/팔로우3.png"
						alt="이곳의 셀럽"
					/>
					이곳의 셀럽
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/피드1.png"
						alt="수줍은 첫 피드"
					/>
					수줍은 첫 피드
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/피드2.png"
						alt="블럭 수집가"
					/>
					블럭 수집가
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image variant="badgeImage" src="/images/피드3.png" alt="소통왕" />
					소통왕
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/리액션1.png"
						alt="따뜻함의 시작"
					/>
					따뜻함의 시작
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/리액션2.png"
						alt="분위기 메이커"
					/>
					분위기 메이커
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/리액션3.png"
						alt="센스쟁이"
					/>
					센스쟁이
				</Flex>
			</Flex>
			<NavBelow />
		</Flex>
	);
};

export default MyBadgesPage;
