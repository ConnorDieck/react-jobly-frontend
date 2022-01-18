import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ login }) => {
	let INITIAL_STATE = {
		username : "",
		password : ""
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);
	const navigate = useNavigate();

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	// when submitted, runs login function the current user and token to state
	const handleSubmit = evt => {
		evt.preventDefault();
		login(fData);
		setFormData(INITIAL_STATE);
		navigate("/");
	};

	return (
		<form className="loginForm" onSubmit={handleSubmit}>
			<label htmlFor="username">Username:</label>
			<input //
				id="login_username"
				name="username"
				value={fData.username}
				onChange={handleChange}
				placeholder="Username"
			/>
			<label htmlFor="password">Password:</label>
			<input //
				id="login_password"
				name="password"
				type="password"
				value={(fData.password = "test123")}
				onChange={handleChange}
				placeholder="Password"
			/>
			<button>Login</button>
		</form>
	);
};

export default LoginForm;
