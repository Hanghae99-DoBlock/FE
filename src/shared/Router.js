import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilePage, SignInPage, SignUpPage, TodoLisPage } from "../pages";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/" element={<TodoLisPage />} />
					<Route path="/:id" element={<ProfilePage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
