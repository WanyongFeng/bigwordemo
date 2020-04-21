import React, { useState, useEffect } from "react";
import Models from "./Models.js";

function GameBox({
	submitted,
	setSubmitted,
	setCorrect,
	question,
	models,
	points,
	setPoints,
	value,
	setValue,
}) {
	let [problem, setProblem] = useState("");
	let [answer, setAnswer] = useState("");

	useEffect(() => {
		setProblem(String(question.sentence));
		setAnswer(String(question.answer));
	}, [question]);

	useEffect(() => {
		if (value && value !== String(question.hint)) {
			setSubmitted(false);
			setCorrect(false);
		}
	}, [value]);

	useEffect(() => {
		if (submitted) {
			setPoints(points - 1);
		}
	}, [submitted]);

	let onChange = (e) => {
		setValue(e.target.value);
	};

	let check = () => {
		setCorrect(answer === value);
		setSubmitted(true);
	};

	let showQuestion = () => {
		let temp = problem.replace(/[_]+/g, "");
		let result = temp.split(")");
		let firstPart = result[0] + ") ";
		let secondPart = result[1] + " ";
		return (
			<div>
				<Models models={models}></Models>
				<br />
				<b style={{ color: "white", fontSize: "25px" }}>
					{firstPart}
					{<input type="text" value={value} onChange={onChange} />}
					{secondPart}
				</b>
			</div>
		);
	};
	return (
		<div className="GameBox">
			<br />
			<br />
			<br />
			{showQuestion()}
			<br />
			<br />
			<br />
			<button disabled={!value} onClick={check}>
				Submit
      </button>
		</div>
	);
}

export default GameBox;
