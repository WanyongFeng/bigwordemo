import React, { useState, useEffect} from "react";
import Header from "./Header";
import Response from "./Response";
import GameBox from "./GameBox";

function LeftSide({
  points,
  setPoints,
  examples,
  instructions,
  models,
  wrongFirst,
  wrongMiddle,
  wrongLast,
  setOver,
  question,
  counter,
  setCounter,
  submitted,
  setSubmitted,
  value,
  setValue,
  score,
  setScore,
  correctWords,
  setCorrectWords
}) {

  let [correct, setCorrect] = useState(false);

  useEffect(() => {
      if((correct && (points < 6 && points > 0) ) || points == 0){
          if(correct && (points < 6 && points > 0)){
            setScore(score + points);
            setCorrectWords([...correctWords, String(question.answer)]);
          }
          setCounter(counter + 1);
          setOver(true);
      }
  },[points])
  return (
    <div className="LeftSide">
      <Header examples={examples} instructions={instructions}></Header>
      <Response
        submitted={submitted}
        correct = {correct}
        wrongFirst = {wrongFirst}
        wrongMiddle = {wrongMiddle}
        wrongLast = {wrongLast}
        question = {question}
        points = {points}
      ></Response>
      <GameBox
        submitted = {submitted}
        setSubmitted={setSubmitted}
        setCorrect = {setCorrect}
        question = {question}
        models = {models}
        points = {points}
        setPoints = {setPoints}
        value = {value}
        setValue = {setValue}
      ></GameBox>
    </div>
  );
}

export default LeftSide;
