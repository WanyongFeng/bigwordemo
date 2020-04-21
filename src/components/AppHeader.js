import React from "react";
import "../App.css";

function AppHeader(props) {
	return (
		<div>
			<h1 className="HeadLine"> Big Words — {props.renderGame}</h1>
		</div>
	);
}

export default AppHeader;
