import React, { useState } from "react";

import "./SearchForm.css";

const SearchForm = ({ search, purpose }) => {
	let INITIAL_STATE = {};

	// values of formdata will vary depending on whether searching for jobs (title) or companies (name)
	if (purpose === "jobs") {
		INITIAL_STATE = { title: "" };
	} else {
		INITIAL_STATE = { name: "" };
	}
	const [ fData, setFormData ] = useState(INITIAL_STATE);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name] : value
		}));
	};

	// when submitted, runs search function passed down from either CompanyList or JobList to set either companies or jobs to the result in state
	const handleSubmit = evt => {
		evt.preventDefault();
		search(fData);
		setFormData(INITIAL_STATE);
	};

	// render the correct form for the search bar's purpose
	const companySearch = (
		<form className="searchBar" onSubmit={handleSubmit}>
			<input //
				id="name"
				name="name"
				value={fData.name}
				onChange={handleChange}
				placeholder="Enter search term..."
			/>
			<button className="searchBtn">Submit</button>
		</form>
	);

	const jobSearch = (
		<form className="searchBar" onSubmit={handleSubmit}>
			<input //
				id="title"
				name="title"
				value={fData.title}
				onChange={handleChange}
				placeholder="Enter search term..."
			/>
			<button className="searchBtn">Submit</button>
		</form>
	);

	if (purpose === "companies") {
		return companySearch;
	} else {
		return jobSearch;
	}
};

export default SearchForm;
