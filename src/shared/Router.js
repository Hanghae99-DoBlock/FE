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

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/profile/:id" element={<ProfilePage />} />
					<Route path="/profile/edit" element={<ProfileEditPage />} />
					<Route
						path="/profile/edit/password"
						element={<PasswordChangePage />}
					/>
					<Route path="/profile/:id/following" element={<FollowingPage />} />
					<Route path="/profile/:id/follower" element={<FollowerPage />} />
					<Route path="/todolist" element={<TodoListPage />} />
					<Route path="/feed" element={<FeedPage />} />
					<Route path="/addFeed" element={<AddFeedPage />} />
					<Route path="/feed/:id" element={<DetailFeedPage />} />
					<Route path="/search" element={<SearchPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
