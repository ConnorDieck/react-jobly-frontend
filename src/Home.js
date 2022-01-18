import React, { useContext } from "react";
import UserContext from "./auth/UserContext";

const Home = () => {
	const { currentUser } = useContext(UserContext);
	let msg = {};
	if (currentUser) {
		msg = <p>Welcome to Jobly, {currentUser.username}!</p>;
	} else {
		msg = <p>Welcome to Jobly! Please log in or sign up to get started.</p>;
	}
	return <div>{msg}</div>;
};

export default Home;
