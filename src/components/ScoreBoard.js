import React from "react";

function ScoreBoard({ correct, points }) {
  let check = correct => {
    if (correct) {
      return <p style={{ color: "white" }}>{points}</p>;
    }
  };
  return (
    <div className="ScoreBoard">
      <p style={{ color: "white" }}>score:</p>
      {check(correct)}
    </div>
  );
}

export default ScoreBoard;
