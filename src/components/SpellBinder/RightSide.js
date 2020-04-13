import React from 'react';
import ScoreBoard from "../ScoreBoard";
import WordBoard from "../WordBoard";

function RightSide({score, correctWords}) {
    return (
        <div className = "RightSide">
            <ScoreBoard score = {score}></ScoreBoard>
            <WordBoard correctWords = {correctWords}></WordBoard>
        </div>
    );
}

export default RightSide;
