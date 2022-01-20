import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./authForm.css";

const SignupForm = ({ register }) => {
	let INITIAL_STATE = {
		username  : "",
		password  : "",
		firstName : "",
		lastName  : "",
		email     : ""
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
		register(fData);
		setFormData(INITIAL_STATE);
		navigate("/");
	};

	return (
		<div className="form-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input //
					id="signup_username"
					name="username"
					value={fData.username}
					onChange={handleChange}
					placeholder="Username"
					className="styled-input"
				/>
				<label htmlFor="password">Password:</label>
				<input //
					id="signup_password"
					name="password"
					type="password"
					value={fData.password}
					onChange={handleChange}
					placeholder="Password"
					className="styled-input"
				/>
				<label htmlFor="firstName">First Name:</label>
				<input //
					id="signup_firstName"
					name="firstName"
					value={fData.firstName}
					onChange={handleChange}
					placeholder="First Name"
					className="styled-input"
				/>
				<label htmlFor="lastName">Last Name:</label>
				<input //
					id="signup_lastName"
					name="lastName"
					value={fData.lastName}
					onChange={handleChange}
					placeholder="Last Name"
					className="styled-input"
				/>
				<label htmlFor="email">Email:</label>
				<input //
					id="signup_email"
					name="email"
					value={fData.email}
					onChange={handleChange}
					placeholder="Email"
					className="styled-input"
				/>
				<button>Sign Up</button>
			</form>
		</div>
	);
};

export default SignupForm;
