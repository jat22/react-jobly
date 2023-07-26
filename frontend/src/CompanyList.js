import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import CompanyCard from "./CompanyCard"
import SearchBar from "./SearchBar";
import UserContext from "./UserContext";

const CompanyList = () => {
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	
	const [companies, setCompanies] = useState([])

	const getCompanies = async (data={}) => {
		try{
			const comps = await JoblyApi.getAllCompanies(data);
			setCompanies(c => comps)
		} catch(err) {
			console.error(err)
		}
	};

	useEffect(()=>{
		if(!user.token) navigate('/unauthorized', {replace:true});
		getCompanies();
	}, [])

	const handleSearch = (e, formData) => {
		e.preventDefault()
		getCompanies({name : formData.term})
	}

	const handleReset = (e, resetFormData) => {
		e.preventDefault();
		resetFormData();
		getCompanies(); 
 	}

	if(!companies) {
		return <div>Loading...</div>
	} else{
		return (
			<>
				<h1>Companies</h1>
				<SearchBar handleSearch={handleSearch} handleReset={handleReset}/>
				<div className="container">
					{companies.map(c => (
						<NavLink key={c.handle} to={`/companies/${c.handle}`}>
							<CompanyCard  company={c} />
						</NavLink>
						))
					}
				</div>
			</>
		)
	}
}
 export default CompanyList