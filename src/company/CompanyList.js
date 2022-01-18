import React, { useEffect, useState } from "react";
import JoblyApi from "../api";

import CompanyCard from "./CompanyCard";
import SearchForm from "../SearchForm";

// PROBLEM: WHEN NAVIGATING TO THIS PAGE FROM THE LINK, DOES NOT LOAD ANYTHING
/*** Solved: Was previously passing through companies state from Navigator and updating whenever the user loaded company details. Now, CompanyDetail has its own state for a single company which updates for each new render. */

const CompanyList = () => {
	const [ companies, setCompanies ] = useState(null);

	// getCompanies and getJobs are defined outside of useEffect so that they can be passed down to CompanyList and JobList in order to be used in the searchbar
	useEffect(function getAllCompaniesOnMount() {
		console.debug("CompanyList useEffect getAllCompaniesOnMount");
		search();
	}, []);

	// uses getCompanies to reset companies in state. Passed down to SearchForm when rendered on companies page
	async function search(filter) {
		let companies = await JoblyApi.getCompanies(filter);
		setCompanies(companies);
	}

	if (!companies) return <p>Loading...</p>;

	return (
		<div className="container">
			<SearchForm search={search} purpose="companies" />
			{companies.map(company => (
				<CompanyCard
					key={company.handle}
					name={company.name}
					description={company.description}
					handle={company.handle}
				/>
			))}
		</div>
	);
};

export default CompanyList;
