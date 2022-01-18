import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

import SearchForm from "../SearchForm";

const JobList = () => {
	const [ jobs, setJobs ] = useState(null);

	useEffect(function getAllJobsOnMount() {
		console.debug("JobList useEffect getAllJobsOnMount");
		search();
	}, []);

	async function search(filter) {
		let jobs = await JoblyApi.getJobs(filter);
		setJobs(jobs);
	}

	if (!jobs) return <p>Loading...</p>;

	return (
		<div className="container">
			<SearchForm search={search} purpose="jobs" />
			{jobs.map(job => (
				<JobCard
					key={job.id}
					title={job.title}
					companyName={job.companyName}
					salary={job.salary}
					equity={job.equity}
					id={job.id}
				/>
			))}
		</div>
	);
};

export default JobList;
