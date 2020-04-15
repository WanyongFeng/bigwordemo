import React, { useState, useEffect } from "react";
import LeftSide from "./components/SpellBinder/LeftSide.js";
import RightSide from "./components/RightSide.js";
import axios from "axios";
import AppHeader from "./components/AppHeader.js";
import InfoBar from "./components/InfoBar.js";

export function Spellbinder(props) {
    let [models, setModels] = useState([]); //models that shown as examples
    let [wrongMiddle, setWrongMiddle] = useState(""); // error message second, third  time
    let [question, setQuestion] = useState({}); // question
    let [wrongLast, setWrongLast] = useState(""); // error message forth, fifth, time
    let [examples, setExamples] = useState(null); //done
    let [instructions, setInstructions] = useState(null); //done
    let [wrongFirst, setWrongFirst] = useState(""); //error message first time
    let [over, setOver] = useState(false); //check if the game is over ot not
    let [counter, setCounter] = useState(0); //index of loading game
    let [points, setPoints] = useState(0); // points for each question
    let [submitted, setSubmitted] = useState(false); // check whether submitted or not
    let [value, setValue] = useState(""); //what user types
    let [score, setScore] = useState(0); // totoal score
    let [correctWords, setCorrectWords] = useState([]); // correct words

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get("http://localhost:5000/getgame/0");
      response = JSON.parse(response.data);
      setQuestion(response.sentences[counter]);
      setPoints(response.maxAttempts);
      setValue("");
      setModels(response.models);
    }
    fetchData();
    setOver(false);
  }, [over]); //handles to load each question

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("http://localhost:5000/getgame/0");
            response = JSON.parse(response.data);
            setQuestion(response.sentences[counter]);
            setPoints(response.maxAttempts);
            setValue("");
            setModels(response.models);
        }
        fetchData();
        setOver(false);
    }, [over]); //handles to load each question

    return (
        <div className="Main-content-format">
            <div className="LeftSide">
                <AppHeader renderGame={props.renderGame} />
                <InfoBar examples={examples} instructions={instructions} />
                <LeftSide className="LeftSide" setModels={setModels} models={models} points={points} setPoints={setPoints} wrongFirst={wrongFirst} wrongMiddle={wrongMiddle} wrongLast={wrongLast} setOver={setOver} question={question} counter={counter} setCounter={setCounter} submitted={submitted} setSubmitted={setSubmitted} value={value} setValue={setValue} score={score} setScore={setScore} correctWords={correctWords} setCorrectWords={setCorrectWords}></LeftSide>
            </div>
            <RightSide score={score} correctWords={correctWords} className="RightSide" />
        </div>
    );
}
