import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Image, Svg } from "../../common";
import NavBelow from "../../components/nav/NavBelow";

const BadgeSetiingPage = () => {
	const navigate = useNavigate();
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
				<Flex wd="115px" ht="42px" jc="flex-start" mg="0 0 0 17px">
					<Svg
						variant="chevron"
						onClick={() => {
							navigate(-1);
						}}
					/>
				</Flex>
				<Flex fs="18" fw="600">
					대표 뱃지 설정
				</Flex>
				<Flex wd="105px" ht="42px" jc="center" mg="0 17px 0 0"></Flex>
			</Flex>
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
					<Image variant="badgeImage" src="/images/투두2.png" alt="계란 한판" />
					계란 한판
				</Flex>
				<Flex dir="column" color="#A2A2A2" fw="600" fs="14">
					<Image
						variant="badgeImage"
						src="/images/투두3.png"
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
				<Flex
					wd="331px"
					ht="60px"
					bc="#F8F8F8"
					radius="10px"
					fw="600"
					fs="16"
					color="#CACACA"
					mg="30px 0 0 0"
				>
					선택 완료
				</Flex>
			</Flex>
			<NavBelow />
		</Flex>
	);
};

export default BadgeSetiingPage;
