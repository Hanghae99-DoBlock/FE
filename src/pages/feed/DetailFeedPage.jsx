import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FirstHeading, Flex, Image, SecondHeading, Svg } from "../../common";
import { FeedComment } from "../../components";

const DetailFeedPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	return (
		<>
			<Flex
				dir="column"
				mw="375px"
				mxw="375px"
				mh="667px"
				mg="0 auto"
				overflow="auto"
			>
				<Flex wd="375px" mg="auto" dir="column">
					<Flex wd="335px" jc="space-between" mg=" 0 0 10px 0">
						<Svg variant="chevron" onClick={() => navigate(-1)} />
						<Flex>
							<FirstHeading color="#A2A2A2" mg="0 10px 0 0" fs="16" fw="600">
								수정
							</FirstHeading>
							<FirstHeading color="#FD3049" fs="16" fw="600">
								삭제
							</FirstHeading>
						</Flex>
					</Flex>
					<Flex wd="335px" jc="space-between" mg="0 0 20px 0">
						<Flex wd="335px" jc="flex-start">
							<Flex>
								<Image
									variant="followImage"
									// src={.profileImage}
									alt=""
									style={{ marginTop: "4px", backgroundColor: "blue" }}
									onClick={() => {
										// anotherMemberPage(.memberId);
									}}
								/>
							</Flex>
							<Flex dir="column" ai="flex-start">
								<Flex ai="flex-start" mg="0 0 5px 0">
									<Flex
										fw="600"
										fs="13"
										onClick={() => {
											// anotherMemberPage(.memberId);
										}}
									>
										닉네임입니다
										<Flex
											bc="#FFF4ED"
											color="#FF8737"
											fs="10"
											radius="5px"
											pd="4px 8px;"
										>
											뱃지입니다
										</Flex>
									</Flex>
								</Flex>
								<Flex>
									<SecondHeading fw="600" fs="12px" color="#A2A2A2">
										2022.11.21 14:34
									</SecondHeading>
								</Flex>
							</Flex>
						</Flex>
						<Flex>
							<Flex>
								<Svg variant="follow" onClick={() => {}}></Svg>
							</Flex>
						</Flex>
					</Flex>
					<Flex
						wd="335px"
						fw="600"
						fs="22"
						color="#131313"
						mg="0 0 30px 0"
						lh="30"
					>
						피드 제목입니다. 피드 제목입니다. 피드 제목입니다. 피드 제목입니다.
						피드 제목입니다.
					</Flex>
					<Flex
						dir="column"
						ai="flex-start"
						wd="335px"
						ht="133px"
						bc="#F8F8F8"
						radius="5px"
						pd="20px"
						mg="0 0 20px 0"
					>
						<Flex mg="5px">
							<Svg variant="feedCheck"></Svg>
							<FirstHeading fw="300" fs="14px" color="#131313">
								아침 5시에 일어나기
							</FirstHeading>
						</Flex>
						<Flex mg="5px">
							<Svg variant="feedCheck"></Svg>
							<FirstHeading fw="300" fs="14px" color="#131313">
								영양제 챙겨먹기
							</FirstHeading>
						</Flex>
						<Flex mg="5px">
							<Svg variant="feedCheck"></Svg>
							<FirstHeading fw="300" fs="14px" color="#131313">
								일어나서 콩이 산책 다녀오기
							</FirstHeading>
						</Flex>
					</Flex>
					<Flex
						wd="335px"
						lh="25"
						fw="300"
						fs="14px"
						color="#131313"
						mg="0 0 20px 0"
					>
						상세 내용은 사용자에게 최대 100자 보여집니다. 상세 내용은 사용자에게
						최대 100자 보여집니다. 상세 내용은 사용자에게 최대 100자 보여집니다.
						상세 내용은 사용자에게 최대 100자 보여집니다. 상세 내용은 사용자에게
						최대
					</Flex>
					<Flex wd="375px" ht="200px" bc="#F8F8F8" mg="0 0 20px 0"></Flex>
					<Flex wd="335px" dir="column">
						<Flex wd="335px" jc="flex-start" mg="0 0 10px 0">
							<Flex
								wd="95px"
								ht="29px"
								bg="#fff"
								border="1px solid #E5E5E5"
								radius="24px"
								mg="0 5px"
							>
								<FirstHeading fw="300" fs="13px" color="#131313">
									# 텍스트영역
								</FirstHeading>
							</Flex>
							<Flex
								wd="95px"
								ht="29px"
								bg="#fff"
								border="1px solid #E5E5E5"
								radius="24px"
								mg="0 5px"
							>
								<FirstHeading fw="300" fs="13px" color="#131313">
									# 텍스트영역
								</FirstHeading>
							</Flex>
							<Flex
								wd="95px"
								ht="29px"
								bg="#fff"
								border="1px solid #E5E5E5"
								radius="24px"
								mg="0 5px"
							>
								<FirstHeading fw="300" fs="13px" color="#131313">
									# 텍스트영역
								</FirstHeading>
							</Flex>
						</Flex>
						<Flex mg="0 0 10px 0">
							<Flex
								wd="220px"
								ht="29px"
								bg="#fff"
								border="1px solid #E5E5E5"
								radius="24px"
								mg="0 5px"
							>
								<FirstHeading fw="300" fs="13px" color="#131313">
									# 태그가많거나길어지면아래로
								</FirstHeading>
							</Flex>
							<Flex
								wd="95px"
								ht="29px"
								bg="#fff"
								border="1px solid #E5E5E5"
								radius="24px"
								mg="0 5px"
							>
								<FirstHeading fw="300" fs="13px" color="#131313">
									# 텍스트영역
								</FirstHeading>
							</Flex>
						</Flex>
						<Flex wd="335px" jc="flex-start">
							<Flex
								wd="95px"
								ht="29px"
								bg="#fff"
								border="1px solid #E5E5E5"
								radius="24px"
								mg="0 5px"
							>
								<FirstHeading fw="300" fs="13px" color="#131313">
									# 텍스트영역
								</FirstHeading>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<FeedComment />
			</Flex>
		</>
	);
};

export default DetailFeedPage;
