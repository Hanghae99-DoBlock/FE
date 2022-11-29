import { BrowserRouter, Routes, Route } from "react-router-dom";
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
	FeedPage,
} from "../pages";
import SearchPage from "../pages/search/SearchPage";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route
						path="/profile/:id"
						element={
							<PrivateRoute>
								<ProfilePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/profile/edit"
						element={
							<PrivateRoute>
								<ProfileEditPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/profile/edit/password"
						element={
							<PrivateRoute>
								<PasswordChangePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/profile/:id/following"
						element={
							<PrivateRoute>
								<FollowingPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/profile/:id/follower"
						element={
							<PrivateRoute>
								<FollowerPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/todolist"
						element={
							<PrivateRoute>
								<TodoListPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/feed"
						element={
							<PrivateRoute>
								<FeedPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/addFeed"
						element={
							<PrivateRoute>
								<AddFeedPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/feed/:id"
						element={
							<PrivateRoute>
								<DetailFeedPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/search"
						element={
							<PrivateRoute>
								<SearchPage />
							</PrivateRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
