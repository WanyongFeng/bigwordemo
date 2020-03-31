import React from "react";
import "../App.css";
import LinkInstruction from "./LinkInstruction";

function Header() {
  return (
    <div className="Header">
      Spell Binder
      <LinkInstruction
        name={"Instructions"}
        body={
          "Look at the letters in parentheses.  Add -al or -ial to the letters to complete the sentence.  Remember, sometimes you have to change the spelling of the root before adding -al or -ial.  Use the sample words for help."
        }
      ></LinkInstruction>
      <LinkInstruction
        name={"Example"}
        body={
          <div>
            <p>Try these sample sentences.</p>{" "}
            <p>
              The first item on the President's list was to reduce the (nation)
              ________ debt. The word you should have written is national and
              you make that by adding -al to the word nation.
            </p>
            <p>Here's another one.</p>
            <p>
              I was in complete (deny) ____________ that my final paper was lost
              when my computer crashed. The word that completes that sentence is
              denial, which is made by dropping a letter in deny and adding
              -ial.
            </p>
          </div>
        }
      ></LinkInstruction>
    </div>
  );
}

export default Header;
