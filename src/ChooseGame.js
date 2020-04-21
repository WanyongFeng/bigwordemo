import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./components/AppHeader.js";

export function ChooseGame(props) {
  return (
    <div className="GameFrame">
      <AppHeader renderGame={props.renderGame} />
      <br />
      <br />
      <a style={{ color: "white"}} href="/SpellBinder">
        Spell Binder
      </a>
      <br />
      <a style={{ color: "white" }} href="/WordBuilder">
        Word Builder
      </a>
      <br />
      <a style={{ color: "white" }} href="/SortActivity">
        Sort
      </a>
      <br />
    </div>
  );
}
