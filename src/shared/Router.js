import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RefreshToken } from "../components";
import {
	ProfilePage,
	SignInPage,
	SignUpPage,
	TodoListPage,
	AddFeedPage,
	ProfileEditPage,
	PasswordChangePage,
	FollowingPage,
	FollowerPage,
	DetailFeedPage,
	FollowingFeedListPage,
	RecommendedFeedListPage,
	FeedPage,
	InterestTagsPage,
	MyBadgesPage,
	BadgeSetiingPage,
	ReactionListPage,
} from "../pages";
import EmailSignIn from "../pages/join/EmailSignIn";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/emailSignIn" element={<EmailSignIn />} />
					<Route path="/" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/*" element={<RefreshToken />}>
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
							<Route path="recommended" element={<RecommendedFeedListPage />} />
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
							path="/feed/reactionList"
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
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
