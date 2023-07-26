import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyApi from "./JoblyApi";
import SearchBar from "./SearchBar";
import UserContext from "./UserContext";

const Jobs = () => {
	const { user } = useContext(UserContext)
	const [jobs, setJobs] = useState([]);
	const navigate = useNavigate()

	const getJobs = async(data={}) => {
		const res = await JoblyApi.getJobs(data);
			setJobs(j=>res)
	}

	useEffect(() => {
		if(!user.token) navigate('/unauthorized', {replace:true})
		getJobs();

	}, [])

	const handleSearch = (e, formData) => {
		e.preventDefault()
		getJobs({title : formData.term})
	}

	const handleReset = (e) => {
		e.preventDefault();
		getJobs()
 	}

	if(!jobs) return <h3>Loading...</h3>

	return (
		<>
			<div className="container">
				<h1>Jobs</h1>
				<SearchBar handleSearch={handleSearch} handleReset={handleReset} />
				{jobs.map((j) => <JobCard key={j.id} job={j} />)}
			</div>
			
		</>

	)
}
 export default Jobs