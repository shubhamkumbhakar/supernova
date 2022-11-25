import { useEffect, useState } from 'react';
import './App.css';
import Quiz from './Components/Quiz'
import ScoreCard from './Components/ScoreCard'
import Start from './Components/Start'
import music from './Assets/background.mp3'
import axios from 'axios'

function App() {
  const [backAudio] = useState(new Audio(music));
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userMatches, setUserMatches] = useState([]);
  const [scores, setScores] = useState([]);
  const [questions, setQuestions] = useState([])
  useEffect(()=>{
    axios.get('https://supernova-api.herokuapp.com/worksheets/1')
      .then(res=>{
        console.log('Data fetched from api successcfully');
        setQuestions(res.data.questions);
      })
      .catch((err)=>{
        console.log('Error Fetching data');
        console.log(err);
      })
  },[])
  return (
    <div className="App">
      {
        currentScreen==='quiz'?
          <Quiz states={{questions, userMatches, scores}} actions={{setCurrentScreen, setUserMatches, setScores, backAudio}}/>:
        currentScreen==='score'?
          <ScoreCard states={{questions, scores}} actions={{setCurrentScreen, backAudio}}/>:
        <Start state={{questions}} actions={{setCurrentScreen, backAudio}}/>
      }
    </div>
  );
}

export default App;
