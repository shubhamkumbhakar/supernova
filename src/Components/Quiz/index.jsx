import {useState} from 'react'
import './style.css'
import sound from '../../Assets/buttonclick.mp3'
const Quiz = (props) => {
  const [audio] = useState(new Audio(sound));
  const [currQues, setCurrentQues] = useState(0);
  const {questions} = props.states;
  const {setCurrentScreen} = props.actions;
  const nextQues = () =>{
    audio.play();
    const n = questions.length;
    if(currQues<n-1){
        setCurrentQues(currQues+1);
    }else{
        setCurrentScreen('score');
    }
  }
  return (
        <>
        <div className='table'>
            <div className='left'>
                {
                    questions[currQues].leftImages.map((image)=>(
                        <div className='imagebox'>
                            <img src={image} alt=""/>
                        </div>
                    ))
                }
            </div>
            <div className='right'>
                {
                    questions[currQues].rightImages.map((image)=>(
                        <div className='imagebox'>
                            <img src={image} alt=""/>
                        </div>
                    ))
                }
            </div>
        </div>
        <button onClick={nextQues}>Next</button>
        </>
  )
}

export default Quiz