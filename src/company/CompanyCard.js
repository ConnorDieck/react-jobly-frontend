import React from "react";
import "./CompanyCard.css";

const CompanyCard = ({ name, description, logo, handle }) => {
	return (
		<a href={`/companies/${handle}`}>
			<div className="companyCard">
				<span className="header">
					<h3>{name}</h3>
					<img src={logo} className="companyCardLogo" />
				</span>
				<p>{description}</p>
			</div>
		</a>
	);
};

export default CompanyCard;
