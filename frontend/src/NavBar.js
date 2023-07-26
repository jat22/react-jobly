import React, { useContext } from "react";
import { Navbar, NavItem, NavbarBrand, Collapse } from "reactstrap";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

const NavBar = ({ handleLogout }) => {
	const { user } = useContext(UserContext)

	return (
		<div>
			<Navbar className="bg-light">
				<NavbarBrand href="/">Jobly</NavbarBrand>
						<NavItem className="no">
							<NavLink to='/companies'>Companies</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to='/jobs'>Jobs</NavLink>
						</NavItem>
						{user.isAdmin
							?	<NavItem>
									<NavLink to='/users'>Users</NavLink>
								</NavItem>
							: null
						}
						{!user.token
							? 	<>
									<NavItem>
										<NavLink to='/login'>Login</NavLink>
									</NavItem>
									<NavItem>
										<NavLink to='/signup'>SignUp</NavLink>
									</NavItem>
								</>
							:	<>
									<NavItem>
										<NavLink to={`/profile/${user.username}`}>Profile</NavLink>
									</NavItem>
									<NavItem>
										<a href="" onClick={handleLogout}>Log Out {user.username}</a>
									</NavItem>
								</>
						}
						
			</Navbar>			
			
		</div>
	)
}

export default NavBar