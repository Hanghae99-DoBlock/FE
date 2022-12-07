import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const token = localStorage.getItem("accessToken");
	return !token ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
