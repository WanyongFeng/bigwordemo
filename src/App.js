import React, { useState, useEffect } from "react";
import "./App.css";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
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
  let [submitted, setSubmitted] = useState(false);
  let [value, setValue] = useState("");
  let [score, setScore] = useState(0);
  let [correctWords, setCorrectWords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get("http://localhost:5000/getgame/0");
      response = JSON.parse(response.data);
      setWrongFirst(response.wrongFirst[0]);
      setWrongMiddle(response.wrongMiddle[0]);
      setWrongLast(response.wrongLast[0]);
      setInstructions(response.instructions);
      setExamples(response.example);
    }
    fetchData();
  }, [wrongMiddle]); //handles static value of a problem set

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
      <LeftSide
        className = "LeftSide"
        instructions={instructions}
        examples={examples}
        setModels = {setModels}
        models = {models}
        points = {points}
        setPoints = {setPoints}
        wrongFirst = {wrongFirst}
        wrongMiddle = {wrongMiddle}
        wrongLast = {wrongLast}
        setOver = {setOver}
        question = {question}
        counter = {counter}
        setCounter = {setCounter}
        submitted = {submitted}
        setSubmitted = {setSubmitted}
        value = {value}
        setValue = {setValue}
        score = {score}
        setScore = {setScore}
        correctWords = {correctWords}
        setCorrectWords = {setCorrectWords}
      ></LeftSide>
      <RightSide score = {score} correctWords = {correctWords} className = "RightSide"></RightSide>
    </div>
  );
}

export default App;
