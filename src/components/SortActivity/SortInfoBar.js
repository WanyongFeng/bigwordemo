import React, { useState, useEffect } from "react";
import "../../App.css";
import LinkInstruction from "../LinkInstruction";

function SortInfoBar({
	examples,
	instructions,
	sourceBin,
	firstBin,
	secondBin,
	thirdBin,
	noneCorrect,
	partiallyCorrect,
	allCorrect,
	maxTries,
	maxTriesMessage,
	setSourceBin,
	setFirstBin,
	setSecondBin,
	setThirdBin,
	score,
	setScore,
	originalScore
}) {
	let [text, setText] = useState("");
	let [tries, setTries] = useState(0);

	useEffect(() => {
		setText("");
	}, [firstBin.correctWords]);
	
	const removeWord = (wordObjectArray, word) => {
		let newArray = [];
		wordObjectArray.forEach(wordObject => {
			if (wordObject.content !== word) {
				newArray.push(wordObject);
			}
		});
		return newArray;
	};

	const resetWords = (incorrectWords, firstBinChanges, secondBinChanges, thirdBinChanges) => {
		document.getElementsByClassName("DroppableColumn")[0].setAttribute("style", "background-color: red");

		setSourceBin({
			heading: sourceBin.heading,
			description: sourceBin.description,
			words: incorrectWords
		});

		setFirstBin({
			heading: firstBin.heading,
			description: firstBin.description,
			words: firstBinChanges,
			correctWords: firstBin.correctWords
		});

		setSecondBin({
			heading: secondBin.heading,
			description: secondBin.description,
			words: secondBinChanges,
			correctWords: secondBin.correctWords
		});

		setThirdBin({
			heading: thirdBin.heading,
			description: thirdBin.description,
			words: thirdBinChanges,
			correctWords: thirdBin.correctWords
		});
	};

	const checkCorrect = (e) => {
		if (sourceBin.words.length === 0 && (firstBin.words.length > 0 || secondBin.words.length > 0)) {
			let incorrectWords = [];
			let firstBinChanges = firstBin.words;
			let secondBinChanges = secondBin.words;
			let thirdBinChanges = thirdBin.words;

			setTries(tries++);

			firstBin.words.forEach(word => {
				if (!firstBin.correctWords.includes(word.content)) {
					incorrectWords.push(word);
					firstBinChanges = removeWord(firstBinChanges, word.content);
				}
			});

			secondBin.words.forEach(word => {
				if (!secondBin.correctWords.includes(word.content)) {
					incorrectWords.push(word);
					secondBinChanges = removeWord(secondBinChanges, word.content);
				}
			});

			thirdBin.words.forEach(word => {
				if (!thirdBin.correctWords.includes(word.content)) {
					incorrectWords.push(word);
					thirdBinChanges = removeWord(thirdBinChanges, word.content);
				}
			});

			const numWords = firstBin.correctWords.length + secondBin.correctWords.length + thirdBin.correctWords.length;

			if (incorrectWords.length === 0) {
				setText(allCorrect[Math.floor(Math.random() * allCorrect.length)]);
				document.getElementsByClassName("DroppableColumn")[0].setAttribute("style", "background-color: yellow");
			} else if (tries >= maxTries) {
				setText(maxTriesMessage[Math.floor(Math.random() * maxTriesMessage.length)]);
			} else if (incorrectWords.length === numWords) {
				setText(noneCorrect[Math.floor(Math.random() * noneCorrect.length)]);
				resetWords(incorrectWords, firstBinChanges, secondBinChanges, thirdBinChanges);
			} else {
				setText(partiallyCorrect[Math.floor(Math.random() * partiallyCorrect.length)]);
				resetWords(incorrectWords, firstBinChanges, secondBinChanges, thirdBinChanges);
			}
			setScore(originalScore+(5*(numWords-incorrectWords.length)));
		} else {
			setText("Finish sorting the words first!");
		}
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
				<br />
				<p className="SortResponseText">{text}</p>
			</div>
		</div>
	);
}

export default SortInfoBar;
