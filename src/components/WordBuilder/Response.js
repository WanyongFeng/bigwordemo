import React, { useEffect, useState } from "react";

function Response({ correct, submitted, points, question, value }) {
	let [answers, setAnswers] = useState([]);
	let [valCheck, setValCheck] = useState([]);

	useEffect(() => {
		let temp = String(question.answer);
		temp = temp.split("-");
		setAnswers([...answers, temp]);
	}, [points]);

	useEffect(() => {
		if (value && submitted) {
			setValCheck(value.substring(0, value.length - 1).split("-"));
		}
	}, [submitted])

	let message = () => {
		if (submitted) {
			if (correct) {
				let temp = answers[answers.length - 2];
				if (temp.length == 2) {
					return `Congrautulations!!!, you are correct, you add ${temp[0]} to ${
						temp[1]
						} to make the word ${temp[0] + temp[1]}`;
				}
				if (temp.length == 3) {
					return `Congrautulations!!!, you are correct, you add ${temp[0]} to ${
						temp[1]
						}, and add ${temp[2]} to make the word ${
						temp[0] + temp[1] + temp[2]
						}`;
				}
			} else {
				if (points > 0 && points < 6) {
					let prefixes = [
						"un",
						"re",
						"dis",
						"semi",
						"de",
						"in",
						"im",
						"non",
						"sub",
						"fore",
						"super",
						"pre",
						"mis",
						"inter",
						"anti",
						"trans",
						"mid",
						"bio",
						"geo",
						"con",
						"electr",
					];
					let suffixes = ["ed", "ly", "s", "ion", "ation", "ity", "able"];
					let ansCheck = String(question.answer);
					ansCheck = ansCheck.split("-");
					if (ansCheck.length == 2) {
						if (suffixes.includes(ansCheck[1])) {
							if (valCheck[0] === ansCheck[0]) return `you get the root right,which is ${ansCheck[0]}. But the suffix is not correct, try again!!!`;
							else {
								if (valCheck[1] === ansCheck[1]) return `you get the suffix right, which is ${ansCheck[1]}. But the root is not correct, try again!!!`;
								else return "the whole word you built is wrong, try again!!!";
							}
						} else {
							if (valCheck[0] === ansCheck[0]) return `you get the prefix right, which is ${ansCheck[0]}. But the root is not correct, try again!!!`;
							else {
								if (valCheck[1] === ansCheck[1]) return `you get the root right, which is ${ansCheck[1]}. But the prefix is not correct, try again!!!`;
								else return "the whole word you built is wrong, try again!!!";
							}
						}
					}
					if (ansCheck.length === 3) {
						if (ansCheck[0] === valCheck[0] && ansCheck[1] === valCheck[1]) return `you get the prefix and root right, which are ${ansCheck[0]} and ${ansCheck[1]}. But the suffix is not correct, try again!!!`;
						else if (ansCheck[0] === valCheck[0] && ansCheck[2] === valCheck[2]) return `you get the prefix and suffix right, which are ${ansCheck[0]} and ${ansCheck[2]}. But the root is not correct, try again!!!`;
						else if (ansCheck[1] === valCheck[1] && ansCheck[2] === valCheck[2]) return `you get the body and suffix right, which are ${ansCheck[1]} and ${ansCheck[2]}. But the prefix is not correct, try again!!!`;
						else if (ansCheck[0] === valCheck[0] && ansCheck[1] !== valCheck[1] && ansCheck[2] !== valCheck[2]) return `you get the prefix right, which are ${ansCheck[0]}. But the root and suffix is not correct, try again!!!`;
						else if (ansCheck[0] !== valCheck[0] && ansCheck[1] === valCheck[1] && ansCheck[2] !== valCheck[2]) return `you get the root right, which are ${ansCheck[1]}. But the prefix and suffix is not correct, try again!!!`;
						else if (ansCheck[0] !== valCheck[0] && ansCheck[1] !== valCheck[1] && ansCheck[2] === valCheck[2]) return `you get the suffix right, which are ${ansCheck[2]}. But the prefix and body is not correct, try again!!!`;
						else return "the whole word you built is wrong, try again!!!";
					}
				} else {
					let temp = answers[answers.length - 2];
					if (temp.length == 2) {
						return `The correct word is ${
							temp[0] + temp[1]
							}, try this new game, good luck!!!`;
					}
					if (temp.length == 3) {
						return `The correct word is ${
							temp[0] + temp[1]
							}, try this new game, good luck!!!`;
					}
				}
			}
		}
	};
	return (
		<div className="Response">
			<b style={{ color: "white", fontSize: "25px" }}>{message()}</b>
		</div>
	);
}

export default Response;
