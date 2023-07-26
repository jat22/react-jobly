import React, { useState } from "react";
import useFields from "./hooks/useFields";

const SearchBar = ({ handleSearch, handleReset }) => {
	const [formData, handleChange, resetFormData] = useFields({
		term: ""
	})


	return (
		<div className="container">
			<form onSubmit={(e) => handleSearch(e,formData)}>
				<input 
					id="term"
					name="term" 
					onChange={handleChange} 
					type="text"  
					placeholder="Search Term"
					value={formData.term}
				/>
				<button type="submit">Search</button>
				<button onClick={(evt)=>handleReset(evt, resetFormData)}>Reset</button>
			</form>
		</div>
	)

}
export default SearchBar