import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RefreshToken } from "../components";
// import {
// 	ProfilePage,
// 	SignInPage,
// 	SignUpPage,
// 	TodoListPage,
// 	AddFeedPage,
// 	ProfileEditPage,
// 	PasswordChangePage,
// 	FollowingPage,
// 	FollowerPage,
// 	DetailFeedPage,
// 	FollowingFeedListPage,
// 	RecommendedFeedListPage,
// 	FeedPage,
// 	InterestTagsPage,
// 	MyBadgesPage,
// 	BadgeSetiingPage,
// 	ReactionListPage,
// 	MyFeedPage,
// } from "../pages";
// import EditFeedPage from "../pages/feed/EditFeedPage";
// import EmailSignIn from "../pages/join/EmailSignIn";
// import GoogleLogin from "../pages/join/GoogleLogin";
// import KakaoLogin from "../pages/join/KakaoLogin";
// import NaverLogin from "../pages/join/NaverLogin";
// import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";
import Lottie from "lottie-react";
import spinner from "../common/gif/spinner.json";
import { Flex } from "../common";

const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const SignInPage = lazy(() => import("../pages/join/SignInPage"));
const SignUpPage = lazy(() => import("../pages/join/SignUpPage"));
const TodoListPage = lazy(() => import("../pages/todoList/TodoListPage"));
const AddFeedPage = lazy(() => import("../pages/feed/AddFeedPage"));
const ProfileEditPage = lazy(() => import("../pages/profile/ProfileEditPage"));
const PasswordChangePage = lazy(() =>
	import("../pages/profile/PasswordChangePage"),
);
const FollowingPage = lazy(() => import("../pages/profile/FollowingPage"));
const FollowerPage = lazy(() => import("../pages/profile/FollowerPage"));
const DetailFeedPage = lazy(() => import("../pages/feed/DetailFeedPage"));
const FollowingFeedListPage = lazy(() =>
	import("../pages/feed/FollowingFeedListPage"),
);
const RecommendedFeedListPage = lazy(() =>
	import("../pages/feed/RecommendedFeedListPage"),
);
const FeedPage = lazy(() => import("../pages/feed/FeedPage"));
const InterestTagsPage = lazy(() =>
	import("../pages/profile/InterestTagsPage"),
);
const MyBadgesPage = lazy(() => import("../pages/profile/MyBadgesPage"));
const BadgeSetiingPage = lazy(() =>
	import("../pages/profile/BadgeSetiingPage"),
);
const ReactionListPage = lazy(() => import("../pages/feed/ReactionListPage"));
const MyFeedPage = lazy(() => import("../pages/profile/MyFeedPage"));
const EditFeedPage = lazy(() => import("../pages/feed/EditFeedPage"));
const EmailSignIn = lazy(() => import("../pages/join/EmailSignIn"));
const GoogleLogin = lazy(() => import("../pages/join/GoogleLogin"));
const KakaoLogin = lazy(() => import("../pages/join/KakaoLogin"));
const NaverLogin = lazy(() => import("../pages/join/NaverLogin"));
const SearchPage = lazy(() => import("../pages/search/SearchPage"));

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Suspense
					fallback={
						<Flex mg="0 0 50px 0" wd="100%" ht="100%">
							<Lottie animationData={spinner} />
						</Flex>
					}
				>
					<Routes>
						<Route path="/emailSignIn" element={<EmailSignIn />} />
						<Route path="/" element={<SignInPage />} />
						<Route path="/signup" element={<SignUpPage />} />
						<Route path="/api/members/login/kakao" element={<KakaoLogin />} />
						<Route path="/api/members/login/naver" element={<NaverLogin />} />
						<Route path="/api/members/login/google" element={<GoogleLogin />} />
						<Route
							path="/*"
							element={
								<PrivateRoute>
									<RefreshToken />
								</PrivateRoute>
							}
						>
							<Route
								path="profile/:id"
								element={
									<PrivateRoute>
										<ProfilePage />
									</PrivateRoute>
								}
							/>
							<Route
								path="profile/edit"
								element={
									<PrivateRoute>
										<ProfileEditPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="profile/edit/password"
								element={
									<PrivateRoute>
										<PasswordChangePage />
									</PrivateRoute>
								}
							/>
							<Route
								path="profile/:id/badges"
								element={
									<PrivateRoute>
										<MyBadgesPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="profile/:id/badgeSetting"
								element={
									<PrivateRoute>
										<BadgeSetiingPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="profile/:id/following"
								element={
									<PrivateRoute>
										<FollowingPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="profile/:id/follower"
								element={
									<PrivateRoute>
										<FollowerPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="profile/edit/interest"
								element={
									<PrivateRoute>
										<InterestTagsPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="profile/:id/myblocks"
								element={
									<PrivateRoute>
										<MyFeedPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="todolist"
								element={
									<PrivateRoute>
										<TodoListPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="feed"
								element={
									<PrivateRoute>
										<FeedPage />
									</PrivateRoute>
								}
							>
								<Route path="following" element={<FollowingFeedListPage />} />
								<Route
									path="recommended"
									element={<RecommendedFeedListPage />}
								/>
							</Route>
							<Route
								path="addFeed"
								element={
									<PrivateRoute>
										<AddFeedPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="feed/:id"
								element={
									<PrivateRoute>
										<DetailFeedPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="feed/reactionList"
								element={
									<PrivateRoute>
										<ReactionListPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="search"
								element={
									<PrivateRoute>
										<SearchPage />
									</PrivateRoute>
								}
							/>
							<Route path="feedEdit/:id" element={<EditFeedPage />} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
};

export default Router;