import React from "react";

function ScoreBoard({score}) {
  return (
    <div className="ScoreBoard">
      <p style={{ color: "white" }}>Score:</p>
      <b style = {{color: "white", fontSize: "30px"}}>{score}</b>
    </div>
  );
}

export default ScoreBoard;
