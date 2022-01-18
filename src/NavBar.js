import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./auth/UserContext";

import "./NavBar.css";

function NavBar({ logout }) {
	const { currentUser } = useContext(UserContext);
	let Navs = {};

	if (currentUser) {
		Navs = (
			<Navbar className="navbar" expand="md">
				<NavLink exact to="/" className="navbar-brand">
					Jobly
				</NavLink>

				<Nav navbar>
					<NavItem>
						<NavLink to="/companies">Companies</NavLink>
					</NavItem>
				</Nav>

				<Nav navbar>
					<NavItem>
						<NavLink to="/jobs">Jobs</NavLink>
					</NavItem>
				</Nav>

				<Nav navbar>
					<NavItem>
						<NavLink to="/profile">{currentUser.username} Profile</NavLink>
					</NavItem>
				</Nav>
				<Nav navbar>
					<NavItem>
						<NavLink to="/" onClick={() => logout()}>
							Logout
						</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		);
	} else {
		Navs = (
			<Navbar className="navbar" expand="md">
				<NavLink exact to="/" className="navbar-brand">
					Jobly
				</NavLink>

				<Nav navbar>
					<NavItem>
						<NavLink to="/companies">Companies</NavLink>
					</NavItem>
				</Nav>

				<Nav navbar>
					<NavItem>
						<NavLink to="/jobs">Jobs</NavLink>
					</NavItem>
				</Nav>

				<Nav navbar>
					<NavItem>
						<NavLink to="/login">Login</NavLink>
					</NavItem>
				</Nav>
				<Nav navbar>
					<NavItem>
						<NavLink to="/signup">Sign Up</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		);
	}

	return <div>{Navs}</div>;
}

export default NavBar;
