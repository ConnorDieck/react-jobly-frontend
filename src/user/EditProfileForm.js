import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";

import "./userForm.css";

const EditProfileForm = ({ editUser }) => {
	const { currentUser } = useContext(UserContext);

	const INITIAL_STATE = {
		firstName : currentUser.firstName,
		lastName  : currentUser.lastName,
		email     : currentUser.email,
		password  : ""
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

	// when submitted, runs edit user function
	const handleSubmit = evt => {
		evt.preventDefault();
		editUser(fData);
		setFormData(INITIAL_STATE);
		navigate("/");
	};

	return (
		<div className="form-container">
			<form className="user-form" onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<p>{currentUser.username}</p>
				<label htmlFor="firstName">First Name:</label>
				<input //
					id="edit_firstName"
					name="firstName"
					value={fData.firstName}
					onChange={handleChange}
					placeholder="First Name"
					className="styled-input"
				/>
				<label htmlFor="lastName">Last Name:</label>
				<input //
					id="edit_lastName"
					name="lastName"
					value={fData.lastName}
					onChange={handleChange}
					placeholder="Last Name"
					className="styled-input"
				/>
				<label htmlFor="email">Email:</label>
				<input //
					id="edit_email"
					name="email"
					value={fData.email}
					onChange={handleChange}
					placeholder="Email"
					className="styled-input"
				/>
				<label htmlFor="password">Confirm password to make changes:</label>
				<input //
					id="edit_password"
					name="password"
					type="password"
					value={fData.password}
					onChange={handleChange}
					placeholder="Password"
					className="styled-input"
				/>
				<button>Save Changes</button>
			</form>
		</div>
	);
};

export default EditProfileForm;
