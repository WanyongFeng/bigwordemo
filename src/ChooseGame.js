import React from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./components/AppHeader.js";

export function ChooseGame(props){
    return(
        <div className="GameFrame">
            <AppHeader renderGame={props.renderGame}/>
            <br />
            <br />
            <button className="Button" value="Spell Binder" variant="primary" onClick={props.buttonClick}>Spell Binder</button>
            <br />
        </div>
    );
}