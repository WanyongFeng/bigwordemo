import React, { useEffect, useState } from "react";

function Response({ correct, submitted, points, setPoints }) {
  let [text, setText] = useState(
    "That's correct. You wrote funniest by dropping the y and adding -iest."
  );
  useEffect(() => {
    if (
      text ===
        "That word is not correct. Look at the sample words to decide how to add -est or -iest." &&
      submitted
    ) {
      setPoints(points - 1);
    }
  }, [submitted]);

  let message = (correct, submitted) => {
    if (submitted) {
      if (correct) {
        if (
          text ===
          "That word is not correct. Look at the sample words to decide how to add -est or -iest."
        ) {
          setText(
            "That's correct. You wrote funniest by dropping the y and adding -iest."
          );
        }
        return text;
      } else {
        if (
          text ===
            "That's correct. You wrote funniest by dropping the y and adding -iest." &&
          points > 0
        ) {
          setText(
            "That word is not correct. Look at the sample words to decide how to add -est or -iest."
          );
        }
        return text;
      }
    }
  };
  return <div className="Response">{points >=0 ? message(correct, submitted) : "you used all your chances, the answer is funniest"}</div>;
}

export default Response;
