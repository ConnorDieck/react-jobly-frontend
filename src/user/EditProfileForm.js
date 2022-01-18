import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";

const EditProfileForm = ({ editUser }) => {
	const user = useContext(UserContext);

	const INITIAL_STATE = {
		firstName : user.firstName,
		lastName  : user.lastName,
		email     : user.email,
		password  : ""
	};

	const [ fData, setFormData ] = useState(INITIAL_STATE);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	// when submitted, runs edit user function
	const handleSubmit = evt => {
		console.log(user.username);
		evt.preventDefault();
		editUser(fData);
		setFormData(INITIAL_STATE);
	};

	return (
		<form className="EditProfileForm" onSubmit={handleSubmit}>
			<label htmlFor="username">Username:</label>
			<p>{user.username}</p>
			<label htmlFor="firstName">First Name:</label>
			<input //
				id="edit_firstName"
				name="firstName"
				value={fData.firstName}
				onChange={handleChange}
				placeholder="First Name"
			/>
			<label htmlFor="lastName">Last Name:</label>
			<input //
				id="edit_lastName"
				name="lastName"
				value={fData.lastName}
				onChange={handleChange}
				placeholder="Last Name"
			/>
			<label htmlFor="email">Email:</label>
			<input //
				id="edit_email"
				name="email"
				value={fData.email}
				onChange={handleChange}
				placeholder="Email"
			/>
			<label htmlFor="password">Confirm password to make changes:</label>
			<input //
				id="edit_password"
				name="password"
				type="password"
				value={fData.password}
				onChange={handleChange}
				placeholder="Password"
			/>
			<button>Save Changes</button>
		</form>
	);
};

export default EditProfileForm;
