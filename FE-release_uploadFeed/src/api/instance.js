import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	headers: { Authorization: accessToken },
	withCredentials: true,
});
