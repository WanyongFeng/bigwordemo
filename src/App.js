import React, { Component } from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spellbinder } from "./SpellBinder.js";
import { ChooseGame } from "./ChooseGame.js"

class App extends Component{
  state = {
      renderGame: ""
  };

  buttonClick = e => {
      this.setState({renderGame: e.target.value});
  };

  render(){
    switch(this.state.renderGame){
      case "spellbinder":
        return <Spellbinder />;
      default:
        return <ChooseGame buttonClick = {this.buttonClick}/>;
    }
  }
}

export default App;