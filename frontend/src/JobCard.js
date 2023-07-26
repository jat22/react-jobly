import React, { useContext } from "react";

import UserContext from "./UserContext";
import JoblyApi from "./JoblyApi";

const JobCard = ({ job }) => {
	const { user, setUser } = useContext(UserContext)
	
	const handleApply = async (evt) => {
		evt.preventDefault();
		await JoblyApi.addUserJob(user.username, job.id)
		setUser((currUser)=>(
			{...currUser, applications : [...currUser.applications, job.id]}
		))
	}

	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{job.title}</h5>
				<p>{job.companyName}</p>
				<p>Salary: {job.salary}</p>
				<p>Equity: {job.equity}</p>
				{user.applications.includes(job.id)
					? 	<button
							name="apply"
							className="btn btn-success"
							disabled="true"
						>
							Application Pending...
						</button>
					: 	<button
							name="apply"
							className="btn btn-primary"
							onClick={handleApply}
						>
							Apply
						</button>
				}
			</div>
		</div>
	)
}

export default JobCard