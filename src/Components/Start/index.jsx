import {useState} from 'react'
import './styles.css'
import buttonclick from '../../Assets/audio1.mp3'

const Start = (props) => {
  const [buttonSound] = useState(new Audio(buttonclick))
  const {setCurrentScreen} = props.actions;
  const start = () =>{
    buttonSound.play();
    setTimeout(()=>{
        setCurrentScreen('quiz')
    },500)
  }
  return (
    <div className="startscreen">
        <div className='button' onClick={start}>
            START QUIZ
        </div>
    </div>
  )
}

export default Start