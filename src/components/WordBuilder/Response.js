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
					return `Great job, you are correct! You added ${temp[0]} to ${
						temp[1]
						} to make the word ${temp[0] + temp[1]}`;
				}
				if (temp.length == 3) {
					return `Great job, you are correct! You added ${temp[0]} to ${
						temp[1]
						}, and added ${temp[2]} to make the word ${
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
							if (valCheck[0] === ansCheck[0]) return `you got the root right, ${ansCheck[0]}, but the suffix is not correct. Try again!`;
							else {
								if (valCheck[1] === ansCheck[1]) return `you got the suffix right, ${ansCheck[1]}, but the root is not correct. Try again!`;
								else return "That's not correct, try rebuilding the whole word.";
							}
						} else {
							if (valCheck[0] === ansCheck[0]) return `you got the prefix right, ${ansCheck[0]}, but the root is not correct. Ttry again!`;
							else {
								if (valCheck[1] === ansCheck[1]) return `you got the root right, ${ansCheck[1]}, but the prefix is not correct. Try again!`;
								else return "That's not correct, try rebuilding the whole word.";
							}
						}
					}
					if (ansCheck.length === 3) {
						if (ansCheck[0] === valCheck[0] && ansCheck[1] === valCheck[1]) return `you got the prefix and the root right, ${ansCheck[0]} and ${ansCheck[1]}, but the suffix is not correct. Try again!`;
						else if (ansCheck[0] === valCheck[0] && ansCheck[2] === valCheck[2]) return `you got the prefix and suffix right, ${ansCheck[0]} and ${ansCheck[2]}, but the root is not correct. Try again!`;
						else if (ansCheck[1] === valCheck[1] && ansCheck[2] === valCheck[2]) return `you got the body and suffix right, ${ansCheck[1]} and ${ansCheck[2]}, but the prefix is not correct. Try again!`;
						else if (ansCheck[0] === valCheck[0] && ansCheck[1] !== valCheck[1] && ansCheck[2] !== valCheck[2]) return `you got the prefix right, ${ansCheck[0]}, but the root and suffix are not correct. Try again!`;
						else if (ansCheck[0] !== valCheck[0] && ansCheck[1] === valCheck[1] && ansCheck[2] !== valCheck[2]) return `you got the root right, ${ansCheck[1]}, but the prefix and suffix are not correct. Try again!`;
						else if (ansCheck[0] !== valCheck[0] && ansCheck[1] !== valCheck[1] && ansCheck[2] === valCheck[2]) return `you got the suffix right, ${ansCheck[2]}, but the prefix and body are not correct. Try again!`;
						else return "That's not correct, try rebuilding the whole word.";
					}
				} else {
					let temp = answers[answers.length - 2];
					if (temp.length == 2) {
						return `The correct word is ${
							temp[0] + temp[1]
							}, try the next game.`;
					}
					if (temp.length == 3) {
						return `The correct word is ${
							temp[0] + temp[1]
							}, try the next game.`;
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
