import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import {
	ProfilePage,
	SignInPage,
	SignUpPage,
	TodoListPage,
	ProfileEditPage,
	PasswordChangePage,
} from "../pages";
=======
import { ProfilePage, SignInPage, SignUpPage, TodoListPage } from "../pages";
>>>>>>> ddfcd49c2bf9e3a3bd984ba6f17015a11502e834

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
<<<<<<< HEAD
					<Route path="/profile/:id" element={<ProfilePage />} />
					<Route path="/profile/edit/:id" element={<ProfileEditPage />} />
					<Route
						path="/profile/edit/password"
						element={<PasswordChangePage />}
					/>
=======
					<Route path="/:id" element={<ProfilePage />} />
>>>>>>> ddfcd49c2bf9e3a3bd984ba6f17015a11502e834
					<Route path="/" element={<TodoListPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
