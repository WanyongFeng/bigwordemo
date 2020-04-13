import React from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function ChooseGame(props){
    return(
        <div className="GameFrame">
            <h1 class="HeadLine">Big Words - Choose a Game</h1> 
            <br />
            <br />
            <button className="Button" value="spellbinder" variant="primary" onClick={props.buttonClick}>Spell Binder</button>
            <br />
        </div>
    );
}