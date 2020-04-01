import React, { useState, useEffect } from "react";
import axios from "axios";

let ex = "small → smallest \xa0\xa0 large → largest \xa0\xa0 fancy → fanciest";

function GameBox({ setCorrect, setSubmitted }) {
  let [value, setValue] = useState("");
  let [answer, setAnswer] = useState("");
  let [question, setQuestion] = useState("");

  useEffect(() => {
    async function fetchAnswer() {
      let response = await axios.get("http://localhost:5000/getgameanswer");
      setAnswer(response.data);
    }
    async function fetchQuestion() {
      let response = await axios.get("http://localhost:5000/getgamequestion");
      setQuestion(response.data);
    }
    fetchAnswer();
    fetchQuestion();
    setSubmitted(false);
  }, [value, answer, question]);

  let onChange = e => {
    setValue(e.target.value);
  };

  let check = () => {
    setCorrect(answer === value);
    setSubmitted(true);
  };

  let showQuestion = question => {
    let result = question.split(")");
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
      <b>{ex}</b>
      <br />
      <br />
      <br />
      {showQuestion(question)}
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
