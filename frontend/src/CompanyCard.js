import React from "react";

const CompanyCard = ({ company }) => {
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{company.name}</h5>
				<p>{company.description}</p>
			</div>
		</div>
	)
}

export default CompanyCard