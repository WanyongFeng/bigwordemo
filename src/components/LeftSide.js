import React, {useState} from 'react'
import Header from "./Header"
import Response from "./Response"
import GameBox from "./GameBox"

function LeftSide({points, setPoints, correct, setCorrect}) {
    
    let [submitted, setSubmitted] = useState(false);
    return (
        <div className = "LeftSide">
           <Header></Header>
           <Response correct = {correct} submitted = {submitted} setSubmitted = {setSubmitted} points = {points} setPoints = {setPoints}></Response>
           <GameBox setCorrect = {setCorrect} setSubmitted = {setSubmitted} submitted = {submitted}></GameBox> 
        </div>
    )
}

export default LeftSide
