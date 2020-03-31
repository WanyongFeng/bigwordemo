import React, { useState, useEffect } from "react";

let ex = "small → smallest \xa0\xa0 large → largest \xa0\xa0 fancy → fanciest";
let fques = "The new comedy was one of the (funny) ";
let sques = " movies I have ever seen.";
let answer = "funniest";

function GameBox({setCorrect, setSubmitted, submitted}) {
  let [value, setValue] = useState("");

  useEffect(() => {
    setSubmitted(false);
  }, [value]);

  let onChange = e => {
    setValue(e.target.value);
  };

  let check = () => {
    setCorrect(answer === value);
    setSubmitted(true)
  }
  return (
    <div className="GameBox">
      <b>{ex}</b>
      <br />
      <br />
      <br />
      {fques}
      {<input type="text" value={value} onChange={onChange} />}
      {sques}
      <br />
      <br />
      <br />
      <br />
      <button disabled={!value} onClick = {check}>submit</button>
    </div>
  );
}

export default GameBox;
