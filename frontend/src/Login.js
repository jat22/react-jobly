import React, { useContext } from "react";
import useFields from "./hooks/useFields";

const Login = ({ handleLogin }) => {
	const [formData, handleChange, resetFormData] = useFields(
						{
							username : "",
							password : ""
						});

	return (
		<>
			<h1>Login</h1>
			<div className="container">
				<form onSubmit={(evt)=>handleLogin(evt, formData)}>
					<div className="form-group">
						<label htmlFor="username">
							Username
						</label>
						<input 
							id="username"
							name="username"
							type="text" 
							className="form-control"
							onChange={handleChange}
							placeholder="Username"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">
							Password
						</label>
						<input 
							id="password"
							name="password"
							type="password" 
							className="form-control"
							onChange={handleChange}
							placeholder="Password"
						/>
					</div>
					<button className="btn btn-secondary">Login</button>
				</form>
			</div>
		</>

		
	)
}
 export default Login