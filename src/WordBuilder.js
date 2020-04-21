import React, { useState, useEffect } from "react";
import LeftSide from "./components/WordBuilder/LeftSide.js";
import RightSide from "./components/RightSide.js";
import axios from "axios";
import AppHeader from "./components/AppHeader.js";
import InfoBar from "./components/InfoBar.js";

export function WordBuilder(props) {
  let [prefix, setPrefix] = useState([]);
  let [root, setRoot] = useState([]);
  let [suffix, setSuffix] = useState([]);
  let [question, setQuestion] = useState({}); // question
  let [examples, setExamples] = useState(null);
  let [instructions, setInstructions] = useState(null);
  let [over, setOver] = useState(false); //check if the game is over ot not
  let [counter, setCounter] = useState(0); //index of loading game
  let [points, setPoints] = useState(0); // points for each question
  let [submitted, setSubmitted] = useState(false); // check whether submitted or not
  let [value, setValue] = useState(""); //what user types
  let [score, setScore] = useState(0); // totoal score
  let [correctWords, setCorrectWords] = useState([]); // correct words

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get("http://localhost:5000/getWordBuilder/0");
      response = JSON.parse(response.data);
      setInstructions(response.instructions);
      setExamples(response.example);
      let parts = response.parts;

      for (let i = 0; i < parts.length; i++){
        if(parts[i].heading === "Prefix"){
            setPrefix([...parts[i].words])
        }if (parts[i].heading === "Roots"){
            setRoot([...parts[i].words])
        }if(parts[i].heading === "Suffix"){
            setSuffix([...parts[i].words])
        }
      }
    }
    fetchData();
  }, []); //handles static value of a problem set

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get("http://localhost:5000/getWordBuilder/0");
      response = JSON.parse(response.data);
      setQuestion(response.sentences[counter]);
      setPoints(6);
      setValue("");
    }
    fetchData();
    setOver(false);
  }, [over]); //handles to load each question

  return (
    <div className="Main-content-format">
      <div className="LeftSide">
        <AppHeader renderGame={props.renderGame} />
        <a href="/" style={{ color: "white", marginLeft:"10px"}}>Home Page</a>
        <InfoBar examples={examples} instructions={instructions} />
        <LeftSide
          className="LeftSide"
          points={points}
          setPoints={setPoints}
          setOver={setOver}
          question={question}
          counter={counter}
          setCounter={setCounter}
          submitted={submitted}
          setSubmitted={setSubmitted}
          value={value}
          setValue={setValue}
          score={score}
          setScore={setScore}
          correctWords={correctWords}
          setCorrectWords={setCorrectWords}
          suffix = {suffix}
          root = {root}
          prefix = {prefix}
        ></LeftSide>
      </div>
      <RightSide
        score={score}
        correctWords={correctWords}
        className="RightSide"
      />
    </div>
  );
}
