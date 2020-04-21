import React from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spellbinder } from "./SpellBinder.js";
import { ChooseGame } from "./ChooseGame.js";
import { SortActivity } from "./SortActivity.js";
import { WordBuilder } from "./WordBuilder.js";
import { BrowserRouter, Route } from "react-router-dom";


export function App(props) {
	return (
		<BrowserRouter>
			<Route path="/" exact component={() => <ChooseGame renderGame={"Home Page"} />}></Route>
			<Route path="/SpellBinder" exact component={() => <Spellbinder renderGame={"Spell Binder"} />}></Route>
			<Route path="/WordBuilder" exact component={() => <WordBuilder renderGame={"Word Builder"} />}></Route>
			<Route path="/SortActivity" exact component={() => <SortActivity renderGame={"Sort"} />}></Route>
		</BrowserRouter>
	)
}