import {useState} from 'react'
import './styles.css'
import buttonclick from '../../Assets/audio1.mp3'
import { useEffect } from 'react';

const Start = (props) => {
  const [buttonSound] = useState(new Audio(buttonclick));
  const {setCurrentScreen, backAudio} = props.actions;
  const start = () =>{
    buttonSound.play();
    // backAudio.play();
    setTimeout(()=>{
        setCurrentScreen('quiz')
    },500)
  }
  useEffect(()=>{
    backAudio.pause();
  },[])
  return (
    <div className="startscreen">
        <div className='button' onClick={start}>
            START QUIZ
        </div>
    </div>
  )
}

export default Start