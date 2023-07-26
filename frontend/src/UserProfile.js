import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useParams, useNavigate } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import useFields from "./hooks/useFields";


const UserProfile = () => {
	const navigate = useNavigate()
	const { username } = useParams()
	const { user } = useContext(UserContext);

	const [userInfo, setUserInfo] = useState({})
	const [formData, handleChange, resetFormData, updateFormData] = useFields({})

	const getUser = async() => {
		try{
			const res = await JoblyApi.getUser(username);
			setUserInfo(res);
			updateFormData({
				username: res.username,
				firstName: res.firstName,
				lastName: res.lastName,
				email: res.email})
		} catch(err){
			return <h1>Loading...</h1>
		}
	};

	useEffect(() => {
		if(username !== user.username) navigate("/unauthorized", {replace:true})
		getUser();
	}, [])

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const res = JoblyApi.patchUser(username, formData)
		navigate("/")
	}

	if(!formData) return <h1>Loading...</h1>

	return (
		<>
			<div className="container">
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label 
									htmlFor="username" className="form-label">
										Username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									value={formData.username}
									className="form-control"
									readOnly
									disabled
								/>
							</div>
							<div className="form-group">
								<label 
									htmlFor="firstName" className="form-label">
										First Name
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									value={formData.firstName}
									className="form-control"
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label 
									htmlFor="lastName" className="form-label">
										Last Name
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									value={formData.lastName}
									className="form-control"
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									type="text"
									id="email"
									name="email"
									value={formData.email}
									className="form-control"
									onChange={handleChange}
								/>
							</div>
							<button className="btn btn-primary mt-2">Save Changes</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
 export default UserProfile