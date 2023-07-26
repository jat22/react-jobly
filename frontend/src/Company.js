import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import JobCard from "./JobCard"
import UserContext from "./UserContext";


const Company = () => {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()
	const { handle } = useParams()

	const [company, setCompany] = useState({})

	useEffect(() => {
		if(!user.token) navigate('/unauthorized', {replace:true})
		async function getCompany() {
			const res = await JoblyApi.getCompany(handle)
			setCompany(c => res)
		};
		getCompany();
	}, [])

	if(!company.name) {
		return <div>Loading...</div>
	}

	return (
		<>
			<h1>{company.name}</h1>
			<div className="container">
				{company.jobs.length > 0 
					? company.jobs.map((j) => (
						<JobCard key={j.id} job={j} />))
					: <h3>No Jobs Found</h3>
					}
			</div>
			
		</>
		
	)
}
 export default Company