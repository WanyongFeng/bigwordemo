import React from "react";
import "../../App.css";
import LinkInstruction from "../LinkInstruction";

function InfoBar({ examples, instructions }) {
	const checkCorrect = () => {

	};

	return (
		<div>
			<div className="Header">
				<LinkInstruction
					name={"Instructions"}
					body={<div dangerouslySetInnerHTML={{ __html: instructions }} />}
				></LinkInstruction>
				<LinkInstruction
					name={"Example"}
					body={<div dangerouslySetInnerHTML={{ __html: examples }} />}
				></LinkInstruction>
				<button className="Button" onClick={checkCorrect}>
					Submit
				</button>
			</div>
		</div>
	);
}

export default InfoBar;
