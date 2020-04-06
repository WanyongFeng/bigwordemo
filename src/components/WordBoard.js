import React from "react";

function WordBoard({ correctWords }) {


  return (
    <div className="WordBoard">
      <p>Correct words:</p>
      {correctWords.map((v) => <p>{v}</p>)}
    </div>
  );
}

export default WordBoard;
