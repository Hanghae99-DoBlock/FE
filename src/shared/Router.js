import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilePage, SignInPage, SignUpPage, TodoListPage } from "../pages";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/:id" element={<ProfilePage />} />
					<Route path="/" element={<TodoListPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
