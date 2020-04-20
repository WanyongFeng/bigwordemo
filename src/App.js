import React, { useState } from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spellbinder } from "./SpellBinder.js";
import { ChooseGame } from "./ChooseGame.js";
import { SortActivity } from "./SortActivity.js";
import { WordBuilder } from "./WordBuilder.js";

export function App(props){
    let [renderGame, setRenderGame] = useState("Choose a Game");

    const buttonClick = (e) => {
        setRenderGame(e.target.value);
    };

    switch(renderGame){
      case "Spell Binder":
        return (<Spellbinder renderGame={renderGame} />);
      case "Sort":
        return <SortActivity renderGame={renderGame} />;
      case "Word Builder":
        return <WordBuilder renderGame={renderGame} />;
      default:
        return (<ChooseGame renderGame={renderGame} buttonClick = {buttonClick} />);
    }
}