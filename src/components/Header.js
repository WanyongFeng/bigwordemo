import React from "react";
import "../App.css";
import LinkInstruction from "./LinkInstruction";

function Header({examples, instructions}) {
  return (
    <div className="Header">
      Spell Binder
      <LinkInstruction
        name={"Instructions"}
        body={
          <div dangerouslySetInnerHTML={{__html: instructions}} />
        }
      ></LinkInstruction>
      <LinkInstruction
        name={"Example"}
        body={
          <div dangerouslySetInnerHTML={{__html: examples}} />
        }
      ></LinkInstruction>
    </div>
  );
}

export default Header;
