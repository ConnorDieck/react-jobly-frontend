import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "../job/JobCard";

const INITIAL_STATE = {
	handle       : "",
	name         : "",
	numEmployees : null,
	logoUrl      : null,
	description  : "",
	jobs         : []
};

const Company = () => {
	const [ company, setCompany ] = useState(INITIAL_STATE);

	// useParams gets the company handle from the URL
	const handle = useParams("handle");

	// Uses api helper function to load company and set to state
	async function getCompany(handle) {
		let companyRes = await JoblyApi.getCompany(handle);
		setCompany(companyRes);
	}

	// When component mounts, get info about company and set to state
	useEffect(
		() => {
			console.log("MOUNTING COMPANY DETAIL");
			try {
				async function loadCompany(data) {
					await getCompany(data.handle);
				}
				loadCompany(handle);
			} catch (err) {
				console.error(err);
			}
		},
		[ handle ]
	);

	return (
		<div>
			<h3>{company.name}</h3>
			<p>Number of employees: {company.numEmployees}</p>
			<p>{company.description}</p>
			{company.jobs.map(job => (
				<JobCard key={job.id} title={job.title} salary={job.salary} equity={job.equity} id={job.id} />
			))}
		</div>
	);
};

export default Company;
