import { useState } from 'react';
import './App.css';
import Quiz from './Components/Quiz'
import ScoreCard from './Components/ScoreCard'
import Start from './Components/Start'

const questions = [
    {
      id: 1,
      leftImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZDx4HZmsT4C7iB5zKM3KVE0u8MTHuOJWdj_gvBLn&s",
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg",
        "https://thumbs.dreamstime.com/b/big-lord-shiva-statue-bangalore-18811578.jpg"
      ],
      rightImages: [
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg",
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg"
      ],
      correctMatch: [1,2,0]
    },
    {
      id: 2,
      leftImages: [
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg",
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg",
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg"
      ],
      rightImages: [
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg",
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg",
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg"
      ],
      correctMatch: [1,2,0]
    },
    {
      id: 1,
      leftImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZDx4HZmsT4C7iB5zKM3KVE0u8MTHuOJWdj_gvBLn&s",
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg",
        "https://thumbs.dreamstime.com/b/big-lord-shiva-statue-bangalore-18811578.jpg"
      ],
      rightImages: [
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg",
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
        "https://shubhamkumbhakar.in/static/media/pp.23c6fc659b84fe5423f2.jpeg"
      ],
      correctMatch: [1,2,0]
    }
]

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userMatches, setUserMatches] = useState([]);
  return (
    <div className="App">
      {
        currentScreen==='quiz'?
          <Quiz states={{questions, userMatches}} actions={{setCurrentScreen, setUserMatches}}/>:
        currentScreen==='score'?
          <ScoreCard state={{questions}} actions={{setCurrentScreen}}/>:
        <Start state={{questions}} actions={{setCurrentScreen}}/>
      }
    </div>
  );
}

export default App;
