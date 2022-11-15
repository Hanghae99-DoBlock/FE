import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordChange from "../components/profile/PasswordChange";
import ProfileEdit from "../components/profile/ProfileEdit";
import { ProfilePage, SignInPage, SignUpPage, TodoListPage } from "../pages";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/profile/:id" element={<ProfilePage />} />
					<Route path="/profile/edit" element={<ProfileEdit />} />
					<Route path="/profile/edit/password" element={<PasswordChange />} />
					<Route path="/" element={<TodoListPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
