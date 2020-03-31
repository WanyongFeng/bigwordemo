import React from "react";

function WordBoard({ correct }) {
  let check = correct => {
    if (correct) {
      return <p>funniest</p>;
    }
  };

  return (
    <div className="WordBoard">
      <p>Correct words:</p>
      {check(correct)}
    </div>
  );
}

export default WordBoard;
