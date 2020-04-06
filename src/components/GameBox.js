import React, { useState, useEffect } from "react";

function GameBox({
  submitted,
  setSubmitted,
  setCorrect,
  question,
  models,
  points,
  setPoints,
  value,
  setValue,
}) {
  let [problem, setProblem] = useState("");
  let [answer, setAnswer] = useState("");

  useEffect(() => {
    setProblem(String(question.sentence));
    setAnswer(String(question.answer));
  },[question]);

  useEffect(() => {
    if(value){
      setSubmitted(false);
      setCorrect(false);
    }
  },[value]);

  useEffect(() => {
    if(submitted){
      setPoints(points - 1)
    }
  },[submitted])

  let onChange = (e) => {
    setValue(e.target.value);
  };

  let check = () => {
    setCorrect(answer === value);
    setSubmitted(true);
  };

  let showQuestion = () => {
    let temp = problem.replace(/[_]+/g,'');
    let result = temp.split(")");
    let firstPart = result[0] + ") ";
    let secondPart = result[1] + " ";
    return (
      <div>
        {firstPart}
        {<input type="text" value={value} onChange={onChange} />}
        {secondPart}
      </div>
    );
  };
  return (
    <div className="GameBox">
      {models.map((v) => (
        <b>
          {v.from} → {v.to} &nbsp; &nbsp; &nbsp;
        </b>
      ))}
      <br />
      <br />
      <br />
      {showQuestion()}
      <br />
      <br />
      <br />
      <br />
      <button disabled={!value} onClick={check}>
        submit
      </button>
    </div>
  );
}

export default GameBox;
