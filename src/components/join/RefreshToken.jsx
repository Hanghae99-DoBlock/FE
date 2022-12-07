import axios from "axios";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ModalAlertExpirationToken } from "../../components";

const RefreshToken = () => {
	const [sAlertExpirationTokenModalOpen, setIsAlertExpirationTokenModalOpen] =
		useState(false);

	const requestRefreshToken = setInterval(() => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		axios
			.post(
				`${process.env.REACT_APP_SERVER_URL}/api/members/reissue`,
				{
					withCredentials: true,
				},
				{
					headers: {
						Authorization: accessToken,
						RefreshToken: refreshToken,
					},
				},
			)
			.then(response => {
				const accessToken = response.headers.authorization;
				const refreshToken = response.headers.refreshtoken;
				window.localStorage.setItem("accessToken", accessToken);
				window.localStorage.setItem("refreshToken", refreshToken);
			})
			.catch(error => {
				clearInterval(requestRefreshToken);
				setIsAlertExpirationTokenModalOpen(true);
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
			});
	}, 600000);

	return (
		<>
			{sAlertExpirationTokenModalOpen ? (
				<ModalAlertExpirationToken
					setIsAlertExpirationTokenModalOpen={
						setIsAlertExpirationTokenModalOpen
					}
				/>
			) : null}
			<Outlet></Outlet>
		</>
	);
};

export default RefreshToken;
