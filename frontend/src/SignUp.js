import React, { useContext } from "react";
import useFields from "./hooks/useFields";

const SignUp = ({ handleSignup }) => {
	const [formData, handleChange] = useFields();

	return (
		<>
			<h1>SignUp</h1>
			<div className="container">
				<form onSubmit={(evt) => handleSignup(evt, formData)}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							onChange={handleChange}
							placeholder="Username"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={handleChange}
							placeholder="Password"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							onChange={handleChange}
							placeholder="First Name"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							onChange={handleChange}
							placeholder="Last Name"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							name="email"
							onChange={handleChange}
							placeholder="Email"
							className="form-control"
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
					>
						Submit
					</button>
				</form>
			</div>
		</>


	)
}
 export default SignUp