import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import JoblyApi from "./api";
import jwt from "jsonwebtoken";

import NavBar from "./NavBar";
import CompanyList from "./company/CompanyList";
import CompanyDetail from "./company/CompanyDetail";
import JobList from "./job/JobList";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import EditProfileForm from "./user/EditProfileForm";
import Home from "./Home";
import NotFound from "./NotFound";

import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

function Navigator() {
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ applicationIds, setApplicationIds ] = useState(new Set([]));
	// Look in local storage for token
	const [ token, setToken ] = useLocalStorage("token", "");

	console.debug("isLoading=", isLoading, "currentUser=", currentUser, "token=", token);

	async function login(userData) {
		try {
			let newToken = await JoblyApi.login(userData);
			setToken(newToken);
			return { success: true };
		} catch (err) {
			console.error("login failed", err);
			return { success: false, err };
		}
	}

	async function register(userData) {
		try {
			let newToken = await JoblyApi.register(userData);
			setToken(newToken);
			return { success: true };
		} catch (err) {
			console.error("signup failed", err);
			return { success: false, err };
		}
	}

	async function editUser(updateData) {
		try {
			let newUser = await JoblyApi.editCurrentUser(currentUser.username, updateData);
			setCurrentUser(newUser);
			return { success: true };
		} catch (err) {
			console.error("edit user failed", err);
			return { success: false, err };
		}
	}

	function logout() {
		setToken(null);
	}

	// Checks if job was applied for
	function hasAppliedToJob(id) {
		return applicationIds.has(id);
	}

	// Applies to new job: makes API call and updates application IDs in state
	async function applyToJob(jobId) {
		if (hasAppliedToJob(jobId)) return;

		try {
			await JoblyApi.applyToJob(currentUser.username, jobId);
			setApplicationIds(new Set([ ...applicationIds, jobId ]));
		} catch (err) {
			console.error("application failed", err);
			return { success: false, err };
		}
	}

	// When token changes, get info on user or set to null (if logged out)
	useEffect(
		function loadUserInfo() {
			console.debug("Navigator useEffect loadUserInfo", "token=", token);

			async function getUserInfo() {
				if (token) {
					try {
						let { username } = jwt.decode(token);
						JoblyApi.token = token;
						let currentUser = await JoblyApi.getCurrentUser(username);
						setCurrentUser(currentUser);
						setApplicationIds(new Set(currentUser.applications));
					} catch (err) {
						console.error("Navigator getUserInfo: Problem loading", err);
						setCurrentUser(null);
					}
				} else {
					setCurrentUser(null);
				}
				setIsLoading(false);
			}

			setIsLoading(true);
			getUserInfo();
		},
		[ token ]
	);

	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}

	return (
		<UserContext.Provider value={{ currentUser, hasAppliedToJob, applyToJob }}>
			<BrowserRouter>
				<NavBar logout={logout} />
				<Routes>
					<Route //
						path="/"
						element={<Home />}
					/>
					<Route //
						path="/companies"
						element={currentUser ? <CompanyList /> : <NotFound />}
					/>
					<Route //
						path="/companies/:handle"
						element={currentUser ? <CompanyDetail /> : <NotFound />}
					/>
					<Route //
						path="/jobs"
						element={currentUser ? <JobList /> : <NotFound />}
					/>
					<Route //
						path="/login"
						element={<LoginForm login={login} />}
					/>
					<Route //
						path="/signup"
						element={<SignupForm register={register} />}
					/>
					<Route //
						path="/profile"
						element={currentUser ? <EditProfileForm editUser={editUser} /> : <NotFound />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default Navigator;
