import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import "./Job.css";

const JobCard = ({ id, title, companyName, salary, equity }) => {
	const { hasAppliedToJob, applyToJob } = useContext(UserContext);
	const [ applied, setApplied ] = useState(false);

	useEffect(
		function updateAppliedStatus() {
			console.debug("JobCard useEffect updateAppliedStatus", "id=", id);
			console.log(hasAppliedToJob(id));

			setApplied(hasAppliedToJob(id));
		},
		[ id, hasAppliedToJob ]
	);

	/** Apply for a job */
	async function handleApply(evt) {
		if (hasAppliedToJob(id)) return;
		applyToJob(id);
		setApplied(true);
	}

	return (
		<div className="jobCard">
			<h3>{title}</h3>
			<h4>{companyName}</h4>
			<p>Salary: {salary}</p>
			<p>Equity: {equity}</p>
			<button className="btn btn-danger" onClick={handleApply} disabled={applied}>
				{applied ? "Applied" : "Apply"}
			</button>
		</div>
	);
};

export default JobCard;
