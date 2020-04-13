import React, { useState, useEffect } from "react";
import Response from "./Response.js";
import GameBox from "../GameBox.js";

function LeftSide({
  points,
  setPoints,
  models,
  setModels,
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
  setCorrectWords,
}) {
  let [correct, setCorrect] = useState(false);

  useEffect(() => {
    if ((correct && points < 6 && points > 0) || points == 0) {
      if (correct && points < 6 && points > 0) {
        setScore(score + points);
        setCorrectWords([...correctWords, String(question.answer)]);
      }
      setCounter(counter + 1);
      setOver(true);
    } //when the game is over
    if (!correct && points < 6 && points > 0) {
      if (points === 4) {
        let modelIndex = parseInt(question.model) - 1;
        for (let i = 0; i < models.length; i++) {
          if (i !== modelIndex) {
            models.splice(i, 1);
            break;
          }
        }
        setModels(models);
      }
      if (points === 3) {
        let modelIndex = parseInt(question.model) - 1;
        for (let i = 0; i < models.length; i++) {
          if (i !== modelIndex) {
            models.splice(i, 1);
            break;
          }
        }
        setModels(models);
      }
      if(points === 2){
        setValue(String(question.hint));
      }
      if(points === 1){
        setValue(String(question.hint));
      }
    }
  }, [points]);  //reaction based on change of points
  return (
    <span>
      <Response
        submitted={submitted}
        correct={correct}
        wrongFirst={wrongFirst}
        wrongMiddle={wrongMiddle}
        wrongLast={wrongLast}
        question={question}
        points={points}
      ></Response>
      <GameBox
        submitted={submitted}
        setSubmitted={setSubmitted}
        setCorrect={setCorrect}
        question={question}
        setModels={setModels}
        models={models}
        points={points}
        setPoints={setPoints}
        value={value}
        setValue={setValue}
      ></GameBox>
    </span>
  );
}

export default LeftSide;
