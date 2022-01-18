import React, { useContext } from "react";
import EditProfileForm from "./EditProfileForm";
import UserContext from "./userContext";

const Profile = ({ editUser }) => {
	const user = useContext(UserContext);

	return (
		<div>
			<h3>{user.username}'s Profile</h3>
			<ul>
				<li>
					Name: {user.firstName} {user.lastName}
				</li>
				<li>Email: {user.email}</li>
			</ul>
			<h4>Edit Profile</h4>
			<EditProfileForm editUser={editUser} />
		</div>
	);
};

export default Profile;
