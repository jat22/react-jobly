import React, { useContext } from "react";
import UserContext from "./UserContext";
import { NavLink } from "react-router-dom";


const Home = () => {
	const { user } = useContext(UserContext)

	return (
		<>
			<h1>Jobly</h1>
			{user.username
				? 	<h4>Welcome {user.username}</h4>
				:	<>
						<h4>Find your next job!</h4>
						<NavLink to="/login">
							<button className="btn btn-primary">Login</button>
						</NavLink>
						<NavLink to="/signup">
							<button className="btn btn-primary">Sign Up</button>
						</NavLink>						
					</>
			}
		</>

		
	)
}
 export default Home