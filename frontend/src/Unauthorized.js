import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

const Unauthorized = () => {
	const { user } = useContext(UserContext)
	return (
		<>
			{ user.username && !user.isAdmin 
				? <h1>You are not authorized. Please contact an admin.</h1>
				: <h1>Please <NavLink to="/login">login</NavLink>.</h1>
			}
		</>

	)
}

export default Unauthorized;