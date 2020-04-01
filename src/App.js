import React, {useState} from 'react';
import './App.css';
import LeftSide from "./components/LeftSide"
import RightSide from "./components/RightSide"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  let [points, setPoints] = useState(5);
  let [correct, setCorrect] = useState(false);
  return (
    <div className="Main-content-format">
      <LeftSide points = {points} setPoints = {setPoints} correct = {correct} setCorrect = {setCorrect}></LeftSide>
      <RightSide points = {points} correct = {correct}></RightSide>
    </div>
  );
}

export default App;
