import React, { useEffect, useState } from "react";

function Response({
  correct,
  submitted,
  points,
  wrongFirst,
  wrongMiddle,
  wrongLast,
  question,
}) {
  let [text, setText] = useState(
    "That's correct. You got the right answer!"
  );
  let [answer, setAnswer] = useState([]);


  useEffect(() => {
    setAnswer([...answer,String(question.answer)]);
  }, [points]);

  let message = () => {
    if (submitted) {
      if (correct) {
        return text;
      } else {
        if (points === 5) {
          return wrongFirst;
        } else if (points === 4 || points === 3) {
          return wrongMiddle;
        } else if (points === 2 || points === 1) {
          return wrongLast;
        } else {
          return <p>you used all your chances, the correct answer is  <b>{answer[answer.length - 2]}</b></p>;
        }
      }
    }
  };
  return <div className="Response"><b style = {{color:"white", fontSize:"25px"}}>{message()}</b></div>;
}

export default Response;
