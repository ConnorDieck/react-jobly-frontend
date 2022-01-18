import React, { useState } from "react";

const SignupForm = ({ register }) => {
	let INITIAL_STATE = {
		username  : "",
		password  : "",
		firstName : "",
		lastName  : "",
		email     : ""
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);

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
	};

	return (
		<form className="signupForm" onSubmit={handleSubmit}>
			<label htmlFor="username">Username:</label>
			<input //
				id="signup_username"
				name="username"
				value={(fData.username = "test")}
				onChange={handleChange}
				placeholder="Username"
			/>
			<label htmlFor="password">Password:</label>
			<input //
				id="signup_password"
				name="password"
				type="password"
				value={(fData.password = "test123")}
				onChange={handleChange}
				placeholder="Password"
			/>
			<label htmlFor="firstName">First Name:</label>
			<input //
				id="signup_firstName"
				name="firstName"
				value={(fData.firstName = "test")}
				onChange={handleChange}
				placeholder="First Name"
			/>
			<label htmlFor="lastName">Last Name:</label>
			<input //
				id="signup_lastName"
				name="lastName"
				value={(fData.lastName = "test")}
				onChange={handleChange}
				placeholder="Last Name"
			/>
			<label htmlFor="email">Email:</label>
			<input //
				id="signup_email"
				name="email"
				value={(fData.email = "test@email.com")}
				onChange={handleChange}
				placeholder="Email"
			/>
			<button>Sign Up</button>
		</form>
	);
};

export default SignupForm;
