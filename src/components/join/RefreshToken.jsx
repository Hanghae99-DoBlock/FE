import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ModalAlertExpirationToken } from "../../components";

const RefreshToken = () => {
	const token = localStorage.getItem("accessToken");
	const tokenExpirationTime = jwtDecode(token).exp;
	const timeBeforeTokenExpiration = dayjs
		.unix(tokenExpirationTime)
		.subtract(10, "minute").$d;

	const [timeNow, setTimeNow] = useState(new Date());
	const [isAlertExpirationTokenModalOpen, setIsAlertExpirationTokenModalOpen] =
		useState(false);

	useEffect(() => {
		const setTimeFunc = setInterval(() => {
			setTimeNow(new Date());
		}, 60000);
	}, [new Date()]);

	useEffect(() => {
		if (timeNow === timeBeforeTokenExpiration) {
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
					setIsAlertExpirationTokenModalOpen(true);
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
				});
		}
	}, [timeBeforeTokenExpiration, timeNow]);

	return (
		<>
			{isAlertExpirationTokenModalOpen ? (
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
