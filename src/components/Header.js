import React from "react";
import "../App.css";
import LinkInstruction from "./LinkInstruction";

function Header({ examples, instructions }) {
  return (
    <div>
      <h1 className = "HeadLine"> Big Words — Spell Binder</h1>
      <div className="Header">
        <LinkInstruction
          name={"Instructions"}
          body={<div dangerouslySetInnerHTML={{ __html: instructions }} />}
        ></LinkInstruction>
        <LinkInstruction
          name={"Example"}
          body={<div dangerouslySetInnerHTML={{ __html: examples }} />}
        ></LinkInstruction>
      </div>
    </div>
  );
}

export default Header;
