import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	ProfilePage,
	SignInPage,
	SignUpPage,
	TodoListPage,
<<<<<<< HEAD
	AddFeedPage,
=======
	ProfileEditPage,
	PasswordChangePage,
>>>>>>> d9b7bc5989a2551f0c5704c47b05a3995ccb68bf
} from "../pages";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/profile/:id" element={<ProfilePage />} />
					<Route path="/profile/edit/:id" element={<ProfileEditPage />} />
					<Route
						path="/profile/edit/password"
						element={<PasswordChangePage />}
					/>
					<Route path="/" element={<TodoListPage />} />
					<Route path="/addFeed" element={<AddFeedPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
