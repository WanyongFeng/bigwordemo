import React, { useState, useEffect } from "react";
import "../../App.css";

function GameBox({
	submitted,
	setSubmitted,
	setCorrect,
	question,
	points,
	setPoints,
	value,
	setValue,
	suffix,
	root,
	prefix,
}) {
	let [problem, setProblem] = useState("");
	let [answer, setAnswer] = useState("");

	useEffect(() => {
		setProblem(String(question.sentence));
		setAnswer(String(question.answer));
	}, [question]);

	useEffect(() => {
		if (value && value !== "") {
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
		setValue(value + e.target.value + "-");
	};

	let check = () => {
		let inputVal = value.substring(0, value.length - 1);
		setCorrect(answer === inputVal);
		setSubmitted(true);
	};

	let showQuestion = () => {
		let temp = problem.replace(/[_]+/g, "-");
		let result = temp.split("-");
		let firstPart = result[0];
		let secondPart = result[1] + " ";
		return (
			<div>
				<br />
				<b style={{ color: "white", fontSize: "25px" }}>
					{firstPart}
					{
						<input
							type="text"
							value={value.substring(0, value.length - 1).replace("-", "")}
						/>
					}
					{secondPart}
				</b>
			</div>
		);
	};
	return (
		<div>
			<br />
			<br />
			<br />
			{showQuestion()}
			<button
				disabled={!value}
				onClick={check}
				style={{ marginBottom: "-100px" }}
			>
				Submit
      </button>
			<br />
			<div className="WordBinderBox">
				<div className="container">
					<b style={{ fontSize: "30px", color: "white" }}>Prefix</b>
					{prefix.map((val) => (
						<div>
							<button onClick={onChange} value={val} className="cell1">
								{val}
							</button>
						</div>
					))}
				</div>
				<div className="container">
					<b style={{ fontSize: "30px", color: "white" }}>Root</b>
					{root.map((val) => (
						<div>
							<button onClick={onChange} value={val} className="cell2">
								{val}
							</button>
						</div>
					))}
				</div>
				<div className="container">
					<b style={{ fontSize: "30px", color: "white" }}>Suffix</b>
					{suffix.map((val) => (
						<div>
							<button onClick={onChange} value={val} className="cell3">
								{val}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default GameBox;
