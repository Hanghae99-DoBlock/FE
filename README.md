# <img src="https://user-images.githubusercontent.com/108126419/207803210-3720fca9-3c05-43fe-a662-bd619bf1ce14.jpg" width="40">&nbsp;[Do!Block] 피드형 Todolist SNS

## Do!Block 소개 | About Us

### 할 일을 기록하고 공유하는 피드형 SNS! <br>

<img src="https://user-images.githubusercontent.com/108126419/207803730-a2a90832-b6d3-4948-8895-7385382cb9ec.png" width="800">

> - Do!Block은 사용자의 입장에서 "내가 한 일, 해야할 일을 TodoList로 관리하면서 동시에 공유할 수 있는 서비스가 없을까?" 하는 질문에서 시작한 프로젝트입니다.<br>
> - 매일 할 일을 Todo로 작성하여 기록하고, 완료한 Todo 중에 자랑/공유하고 싶은 Todo를 블록(피드)의 형태로 쌓아가며 사용자들과 소통하는 피드형 SNS입니다.<br>
> - 기존의 TodoList와 SNS 서비스에서 각각 분리되어있던 기능이 Do!Block에서는 Todo를 완료함과 동시에 블럭을 쌓아갈 수 있어 색다른 재미를 느낄 수 있습니다.
>   <br>

- **[Do!Block 바로가기](https://www.doblock.shop/)<br>**
- **[발표 자료](https://www.miricanvas.com/v/11mzz4j)<br>**
- **[팀 노션 주소](https://legendary-scaffold-c21.notion.site/Do-Block-03bf205c16b44de293a37f1a738eadac)**
- **[시연 영상](https://youtu.be/P7UCIujReOk)<br>**
  <br>
  <br>

  ## 🔭목차 | Contents

1. [ 프로젝트기간 | Project Period ](#------------project-period--br-)
2. [ 서비스 아키텍쳐 | Service Architecture ](#------------br-)
3. [ 아키텍쳐 도입 배경 | Architecture Introduction Background ](#--------------br-)
4. [ 기술적 의사결정 | Technical Decision Making ](#-----------)
5. [ 주요 기능 | Main Function ](#--------)
6. [ 팀 소개 | Team Introduction ](#----------------)
7. [ 기술 스택 | Technology Stack](#--------)
8. [ 사용 툴 | Tool Used](#-------)
9. [ 트러블슈팅| Trouble Shooting](#--------)

<br>
<br>

## 📆 프로젝트 기간 <br>

<ul>
  <li>개발 기간: 2022/11/04 ~ 2022/12/15(6주)</li>
  <li>런칭: 2022/12/09</li>
  <li>유저 피드백: 2022/12/09 ~ 2022/12/15</li>
  <li>추가 업데이트: 2022/12/09 ~ 진행 중</li>
</ul>

<br>
<br>

## 🏗 서비스 아키텍쳐<br>

![image](https://user-images.githubusercontent.com/108126419/207886272-d38c3b62-2427-4e38-9813-d57b04ded842.png)

<br>
<br>

## 📖 아키텍쳐 도입 배경<br>

<details> 
  <summary><strong>Redux-Toolkit</strong></summary><br>
  <li> Redux-Toolkit의 장점은 두 가지가 있다. Reudx의 단점으로 꼽히는 보일러플레이트 코드가 줄어든 다는 것이다.
보일러플레이트 코드가 많으면 코드의 예측가능성 측면에서 떨어지고 코드해석이 어려워져, 실수를 유발 시킬 수 있다.</li>
  <li> 또한 리덕스를 사용하다보면, redux devtool, immer, reselect등 여러가지 라이브러리들을 설치하게 된다. 하지만 Redux-Toolkit에는 이런 많은 라이브러리 들이 내장되어 있어서 많은 라이브러리들의 의존성을 줄일 수 있다.</li>
  <br>
</details>
<details> 
  <summary><strong>CloudType</strong></summary><br>
  <li> 별도의 파일 업로드나 웹서버 세팅 등의 번거로운 절차를 거치지 않고 Github와 연동하여 배포가 가능하다.</li>
  <li> Dockerfile을 통한 커스텀 이미지 빌드를 통해 서비스 배포가 가능하여 막강한 확장성과 호환성이 있다.</li>
  <li> HTTPS 전환을 위한 SSL 인증서 제공을 해주어 별도의 인증과정이 필요하지 않아 사용하게 되었다.</li> <br>
</details>
<br>
<br>

## 💖 주요 기능

<details>

  <summary><strong>📆 투두 리스트 (Drag & Drop, react-calendar)</strong></summary>

  <br/>

  <ul>
    <li>날짜별 투두 작성, 수정, 삭제, 조회</li>
    <li>드래그 앤 드롭</li>

<br>

  <img src="https://user-images.githubusercontent.com/108126419/207830787-d9e4711e-5cd4-4a8b-b526-0db0decb52bd.png" width="300">
  <img src="https://user-images.githubusercontent.com/108126419/207831025-333c96f3-f90c-4aac-b465-3677ac9e4711.png" width="302">
  <img src="https://user-images.githubusercontent.com/108126419/207831237-fd0b7099-2a1c-4db4-854b-aa80c8866350.png" width="300">
  <img src="https://user-images.githubusercontent.com/108126419/207832697-66c401a0-b5a7-4bbc-a104-05db3e2b4a47.png" width="302">

<br>

  </ul>

</details>

<details>

  <summary><strong>🖋 피드 작성</strong></summary>

  <br/>

  <ul>

<li>완료된 투두 목록만 투두 선택창에 불러오기</li>
<li>태그 추가하기</li>
<li>최대 4장까지 사진 업로드 가능</li>
<li>피드에 적용될 컬러 선택 가능</li>
  <br/>

  <img src="https://user-images.githubusercontent.com/108126419/207832276-2dfc3ba6-a396-48b8-a891-e1f795cb222e.png" width="301">
  <img src="https://user-images.githubusercontent.com/108126419/207832354-ed0c11ed-7ebe-4aac-ae90-ad09d6d59d3c.png" width="300">

  </ul>

</details>

<details>

  <summary><strong> 👀 피드 목록 조회</strong></summary>

  <br/>

  <ul>

  <li>추천 피드</li>
    - 선택한 관심사 태그를 바탕으로 게시글을 보여줌 <br>
    - 선택한 관심사 태그가 없다면 관심사 선택 페이지로 유도 <br>
    - 추천 태그를 선택하거나 커스텀 태그를 만들어 선택할 수 있음
  <li>팔로잉 피드</li>
    - 팔로우한 사람의 게시글과 자신의 게시글을 조회할 수 있음 <br>
  <li>무한 스크롤</li>
    - 게시글을 5개씩 불러옴 <br>
    <br/>

<img src="https://user-images.githubusercontent.com/108126419/207832626-c19d5b99-fda0-4842-8d10-f417acf9fdd5.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207833056-bb358093-6891-4ef0-a14f-7bedfa93596b.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207833122-9c678013-113e-4d32-a14d-7b3382f6e9f1.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207835078-a7f1d80c-4d19-4911-a55f-d535237a7324.PNG" width="301">

  </ul>

</details>

<details>

  <summary><strong> 피드 단건 조회</strong></summary>

<br/>

<ul>
  <li>게시글 수정, 삭제</li>
  <li>이미지 페이지네이션</li>
  <li>태그를 눌러 검색할 수 있음</li>
  <li>댓글 작성, 수정, 삭제</li>
  <li>리액션</li>
  <br />

<img src="https://user-images.githubusercontent.com/108126419/207833299-2b9b3b94-1961-4ab0-b6e1-309520093e2d.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207833360-ec6fb20b-b646-486f-b98b-734fd25db5a1.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207833419-6c9c8b26-683f-4ef1-bf30-ad4149c16003.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207834561-77cdb0dd-3f3a-4f7c-a504-aa8d3d971e3d.PNG" width="301">

</ul>

</details>

<details>

  <summary><strong>🔍 검색</strong></summary>

  <br/>

  <ul>

<li>태그 검색/ 유저찾기 검색 구분하여 검색가능</li>
<li>항목 조회시 태그는 5개, 유저 찾기는 10개 단위로 무한스크롤 조회</li>
    <br/>

<img src="https://user-images.githubusercontent.com/108126419/207835347-7e9e041b-111b-46fd-be8e-9a6083654bb4.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207835462-e49fd69f-8154-413d-ae97-1a46653faddb.png" width="300">
    <br>

  </ul>

</details>

<details>

  <summary><strong>🥇 뱃지</strong></summary>

  <br/>

  <ul>

  <li>대표 뱃지 설정</li>
    <br/>

<img src="https://user-images.githubusercontent.com/108126419/207835720-bfaf48d6-fdc3-4269-b263-00a5c30e50b4.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207835773-e8b82b84-5991-4627-adf0-5e5c7dd2fffe.png" width="300.5">

  </ul>

</details>

<details>

  <summary><strong>🙋 프로필</strong></summary>

  <br/>

  <ul>

  <li>내가 획득한 뱃지 보기(swiper)</li>
  <li>회원 정보 수정(닉네임/프로필 사진/비밀번호)</li>
  <li>관심사 설정</li>
  <li>팔로우/언팔로우 기능</li>
  <li>로그아웃</li>
  <li>내가 쌓은 블럭(내가 작성한 피드 모아보기)</li>
    <br/>

<img src="https://user-images.githubusercontent.com/108126419/207835912-86a3aaef-62ed-466c-a650-089ba04f3450.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207835973-e66a78df-6992-4cd2-8c3a-b1be80eec52c.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207836062-78e849ae-2a80-4775-a78d-08089bea2bf0.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207836115-5052586b-69f7-4b95-87cd-30b612aabf2b.png" width="300">
<img src="https://user-images.githubusercontent.com/108126419/207836729-2da0100d-aad4-4e98-9847-412017d1bc6f.PNG" width="303">
<img src="https://user-images.githubusercontent.com/108126419/207836168-061dfd5f-7bc4-4c13-bc3b-dba1e18c9541.png" width="300">

  </ul>

</details>

<br>
<br>

## 👨‍👩‍👧‍👦 TEAM 소개

|                             [오성은](https://github.com/ose1012) 부리더                             |                               [김민영](https://github.com/NyeongDev)                                |                               [가연우](https://github.com/Yeonwoo-Ga)                               |                             [이민규](https://github.com/Ming-gry) 리더                             |                             [박영성](https://github.com/youngsungpark)                             |                               [심민기](https://github.com/shiminki)                                |
| :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| <img src="https://img.shields.io/badge/front end-fcfd82?style=for-the-badge&logo=&logoColor=white"> | <img src="https://img.shields.io/badge/front end-fcfd82?style=for-the-badge&logo=&logoColor=white"> | <img src="https://img.shields.io/badge/front end-fcfd82?style=for-the-badge&logo=&logoColor=white"> | <img src="https://img.shields.io/badge/back end-fcfd82?style=for-the-badge&logo=&logoColor=white"> | <img src="https://img.shields.io/badge/back end-fcfd82?style=for-the-badge&logo=&logoColor=white"> | <img src="https://img.shields.io/badge/back end-fcfd82?style=for-the-badge&logo=&logoColor=white"> |
|                      ![](https://avatars.githubusercontent.com/u/67879917?v=4)                      |                     ![](https://avatars.githubusercontent.com/u/110284486?v=4)                      |                     ![](https://avatars.githubusercontent.com/u/100272045?v=4)                      |                     ![](https://avatars.githubusercontent.com/u/113870305?v=4)                     |                     ![](https://avatars.githubusercontent.com/u/108126419?v=4)                     |                     ![](https://avatars.githubusercontent.com/u/77321886?v=4)                      |

<br>

## 📚 기술 스택

### 💻 백엔드

<br>

 <p align="center">
 <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
 <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">
 <img src="https://img.shields.io/badge/-Springboot-6DB33F?style=for-the-badge&logo=Springboot&logoColor=white">
 <img src="https://img.shields.io/badge/Spring Data JPA-6DB33F?style=for-the-badge&logo=S&logoColor=white">
 <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
 <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">
 <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
 <img src="https://img.shields.io/badge/QueryDsl-2088FF?style=for-the-badge&logo=&logoColor=white">
 <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">
 <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
 <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
 <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">
 <img src="https://img.shields.io/badge/Amazon CodeDeploy-8A2BE2?style=for-the-badge&logo=Amazon RDS&logoColor=white">
 <img src="https://img.shields.io/badge/Amazon Route 53-00498c?style=for-the-badge&logo=Amazon RDS&logoColor=white">
 <img src="https://img.shields.io/badge/SSL-721412?style=for-the-badge&logo=SSL&logoColor=white">
 <img src="https://img.shields.io/badge/Cerbot-000000?style=for-the-badge&logoColor=white">
 <img src="https://img.shields.io/badge/kakao login-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">   
 <img src="https://img.shields.io/badge/google login-4285F4?style=for-the-badge&logo=google&logoColor=white">  
 </p>

### 💻 프론트엔드

<br>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white">
  <img src="https://img.shields.io/badge/cloudtype-000000?style=for-the-badge&logoColor=white"/>
  <img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white">
  <img src="https://img.shields.io/badge/ReduxToolkit-764ABC?style=for-the-badge&logo=ReduxToolkit&logoColor=white">
  <img src="https://img.shields.io/badge/kakao login-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">   
  <img src="https://img.shields.io/badge/google login-4285F4?style=for-the-badge&logo=google&logoColor=white">

  <br>

## 🔧 사용 툴

<br>

<p align="center">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=for-the-badge&logo=Sourcetree&logoColor=white"/>
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/>
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"/>

## 🎯 기술적 의사결정

- **[CloudType](https://github.com/Hanghae99-DoBlock/FE/wiki/CloudType)<br>**
- **[JWT Decode](https://github.com/Hanghae99-DoBlock/FE/wiki/JWT-Decode)<br>**
- **[ReduxToolkit](https://github.com/Hanghae99-DoBlock/FE/wiki/ReduxToolkit)<br>**
- **[Styled Components](https://github.com/Hanghae99-DoBlock/FE/wiki/Styled-Components)<br>**
- **[Axios](https://github.com/Hanghae99-DoBlock/FE/wiki/Axios)<br>**
- **[React-Router](https://github.com/Hanghae99-DoBlock/FE/wiki/React-Router)<br>**
- **[React-Calendar](https://github.com/Hanghae99-DoBlock/FE/wiki/React-Calendar)<br>**
- **[Swiper.js](https://github.com/Hanghae99-DoBlock/FE/wiki/Swiper.js)<br>**
- **[React Beautiful DND](https://github.com/Hanghae99-DoBlock/FE/wiki/React-Beautiful-DND)<br>**
- **[Day.js](https://github.com/Hanghae99-DoBlock/FE/wiki/Day.js)<br>**

<br>
<br>

## 🚀 트러블슈팅

- **[팔로잉/팔로워 리스트가 안 불러와지고 팔로우/언팔로우 버튼 활성화가 안되는 issue](https://github.com/Hanghae99-DoBlock/FE/wiki/%ED%8C%94%EB%A1%9C%EC%9E%89-%ED%8C%94%EB%A1%9C%EC%9B%8C-%EB%A6%AC%EC%8A%A4%ED%8A%B8%EA%B0%80-%EC%95%88-%EB%B6%88%EB%9F%AC%EC%99%80%EC%A7%80%EA%B3%A0-%ED%8C%94%EB%A1%9C%EC%9A%B0-%EC%96%B8%ED%8C%94%EB%A1%9C%EC%9A%B0-%EB%B2%84%ED%8A%BC-%ED%99%9C%EC%84%B1%ED%99%94%EA%B0%80-%EC%95%88%EB%90%98%EB%8A%94-Issue)<br>**
- **[태그 만들기에서 각각의 컴포넌트가 구별되지 않고,밸류값을 불러올 수 없던 issue](https://github.com/Hanghae99-DoBlock/FE/wiki/%ED%83%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0%EC%97%90%EC%84%9C-%EA%B0%81%EA%B0%81%EC%9D%98-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EA%B0%80-%EA%B5%AC%EB%B3%84%EB%90%98%EC%A7%80-%EC%95%8A%EA%B3%A0,%EB%B0%B8%EB%A5%98%EA%B0%92%EC%9D%84-%EB%B6%88%EB%9F%AC%EC%98%AC-%EC%88%98-%EC%97%86%EB%8D%98-issue)<br>**
- **[피드 수정페이지에서 태그 삭제가 되지 않던 issue](https://github.com/Hanghae99-DoBlock/FE/wiki/%ED%94%BC%EB%93%9C-%EC%88%98%EC%A0%95%ED%8E%98%EC%9D%B4%EC%A7%80%EC%97%90%EC%84%9C-%ED%83%9C%EA%B7%B8-%EC%82%AD%EC%A0%9C%EA%B0%80-%EB%90%98%EC%A7%80-%EC%95%8A%EB%8D%98-issue)<br>**
- **[다중 이미지 폼데이터로 보내지지 않던 issue](https://github.com/Hanghae99-DoBlock/FE/wiki/%EB%8B%A4%EC%A4%91-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%8F%BC%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A1%9C-%EB%B3%B4%EB%82%B4%EC%A7%80%EC%A7%80-%EC%95%8A%EB%8D%98-issue)<br>**
- **[드래그 앤 드롭 리렌더링 속도가 느린 이슈](https://github.com/Hanghae99-DoBlock/FE/wiki/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%86%8D%EB%8F%84%EA%B0%80-%EB%8A%90%EB%A6%B0-%EC%9D%B4%EC%8A%88)<br>**
- **[웹 페이지 성능 최적화 하기](https://github.com/Hanghae99-DoBlock/FE/wiki/%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-%ED%95%98%EA%B8%B0)<br>**
