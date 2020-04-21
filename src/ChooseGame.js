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
        WordBuilder
      </a>
      <br />
      <a style={{ color: "white" }} href="/SortActivity">
        SortActivity
      </a>
      <br />
    </div>
  );
}
