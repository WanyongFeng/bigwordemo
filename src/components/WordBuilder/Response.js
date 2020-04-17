import React, { useEffect, useState } from "react";

function Response({ correct, submitted, points, question }) {
  let [partWrong, setPartWrong] = useState(
    "Part of that word is correct. Look at the remaining choices."
  );
  let [answers, setAnswers] = useState([]);

  useEffect(() => {
    let temp = String(question.answer);
    temp = temp.split("-");
    setAnswers([...answers, temp]);
  }, [points]);

  let message = () => {
    if (submitted) {
      if (correct) {
        let temp = answers[answers.length - 2];
        if (temp.length == 2) {
            return `Congrautulations!!!, you are correct, you add ${temp[0]} to ${temp[1]} to make the word ${temp[0] + temp[1]}`
        }
        if (temp.length == 3) {
            return `Congrautulations!!!, you are correct, you add ${temp[0]} to ${temp[1]}, and add ${temp[2]} to make the word ${temp[0] + temp[1] + temp[2]}`
        }
      } else {
        if (points > 0 && points < 6) {
          return "The word doesn't make sense in this sentence. Try it again.";
        } else {
            let temp = answers[answers.length - 2];
            if (temp.length == 2) {
                return `The correct word is ${temp[0] + temp[1]}, try this new game, good luck!!!`
            }
            if (temp.length == 3) {
                return `The correct word is ${temp[0] + temp[1]}, try this new game, good luck!!!`
            }
        }
      }
    }
  };
  return (
    <div className="Response">
      <b style={{ color: "white", fontSize: "25px" }}>{message()}</b>
    </div>
  );
}

export default Response;
