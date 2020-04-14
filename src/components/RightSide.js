import React from 'react';
import ScoreBoard from "./ScoreBoard.js";
import WordBoard from "./WordBoard.js";

function RightSide({score, correctWords}) {
    return (
        <div className = "RightSide">
            <ScoreBoard score = {score}></ScoreBoard>
            <WordBoard correctWords = {correctWords}></WordBoard>
        </div>
    );
}

export default RightSide;
