import React from 'react'
import ScoreBoard from "./ScoreBoard"
import WordBoard from "./WordBoard"
function RightSide({correct, points}) {
    return (
        <div className = "RightSide">
            <ScoreBoard correct = {correct} points = {points}></ScoreBoard>
            <WordBoard correct = {correct}></WordBoard>
        </div>
    )
}

export default RightSide
