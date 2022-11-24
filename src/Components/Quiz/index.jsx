import {useEffect, useState} from 'react'
import './style.css'
import sound from '../../Assets/buttonclick.mp3'
const Quiz = (props) => {
  const [audio] = useState(new Audio(sound));
  const [currQues, setCurrentQues] = useState(0);
  const [activeElemLeft, setActiveElemLeft] = useState(-1);
  const [activeElemRight, setActiveElemRight] = useState(-1);
  const {questions} = props.states
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);
  const {setCurrentScreen} = props.actions;
  const [totalMatch, setTotalMatch] = useState(0);
  const [matches, setMatches] = useState([]);
  const [matchedLeft, setMatchedLeft] = useState(new Set());
  const [matchedRight, setMatchedRight] = useState(new Set());
  const reset = () => {
    setMatches([]);
    setLeftColumn(questions[currQues].leftColumn);
    setRightColumn(questions[currQues].rightColumn);
    setTotalMatch(0);
  }
  const nextQues = () =>{
    audio.play();
    reset()
    const n = questions.length;
    if(currQues<n-1){
        setCurrentQues(currQues+1);
    }else{
        setCurrentScreen('score');
    }
  }

  const unMatch = () => {
    let i = activeElemLeft>=0?activeElemLeft:activeElemRight;
    while(i<totalMatch-1){
        const tempLeft = leftColumn[i];
        leftColumn[i] = leftColumn[i+1];
        leftColumn[i+1] = tempLeft;

        const tempRight = rightColumn[i];
        rightColumn[i] = rightColumn[i+1];
        rightColumn[i+1] = tempRight;
        
        i++;
    }
    setLeftColumn(leftColumn);
    setRightColumn(rightColumn);
    setTotalMatch(totalMatch-1);
  }
  const match = () => {
    let i = activeElemLeft;
    let j = activeElemRight;
    
    while(i>totalMatch){
        const temp = leftColumn[i];
        leftColumn[i] = leftColumn[i-1];
        leftColumn[i-1] = temp;
        i--;
    }
    setLeftColumn(leftColumn);
    while(j>totalMatch){
        const temp = rightColumn[j];
        rightColumn[j] = rightColumn[j-1];
        rightColumn[j-1] = temp;
        j--;
    }
    setRightColumn(rightColumn)
    setTotalMatch(totalMatch+1);
    
  }

  useEffect(()=>{
    setLeftColumn(questions[currQues].leftColumn);
    setRightColumn(questions[currQues].rightColumn);
  },[currQues])


  useEffect(()=>{
    if(activeElemLeft>=0 && activeElemLeft>=totalMatch && activeElemRight>=0 && activeElemRight>=totalMatch){
        matches[leftColumn[activeElemLeft].optionIndex] = rightColumn[activeElemRight].optionIndex;
        setMatches(matches);
        console.log(matches);

        match();
        
        setActiveElemLeft(-1);
        setActiveElemRight(-1);
    }else if((activeElemLeft>=0 && activeElemLeft<totalMatch) || (activeElemRight>=0 && activeElemRight<totalMatch)){
        unMatch();
        setActiveElemLeft(-1);
        setActiveElemRight(-1);
    }
  },[activeElemLeft,activeElemRight])
  return (
        <>
        <div> Match the following. </div>
        <div className='quiz__table'>
            <div className='quiz__left'>
                {
                    leftColumn.map((image, i)=>(
                        <div key={i} id={`imgLeft${i}`} className={activeElemLeft===i?"quiz__imagebox active-left":i<totalMatch?"quiz__imagebox matched-left":"quiz__imagebox"} onClick={()=>{
                            console.log(activeElemLeft);
                            if(activeElemLeft===i){
                                setActiveElemLeft(-1);
                            }else{
                                setActiveElemLeft(i);
                            }
                        }}>
                            <img src={image.url} style={{maxHeight:'15vh', maxWidth:'15vh'}}  alt=""/>
                        </div>
                    ))
                }
            </div>
            <div className='quiz__right'>
                {
                    rightColumn.map((image, i)=>(
                        <div key={i} id={`imgRight${i}`} className={activeElemRight===i?"quiz__imagebox active-right":i<totalMatch?"quiz__imagebox matched-right":"quiz__imagebox"} onClick={()=>{
                            console.log(activeElemRight);
                            if(activeElemRight===i){
                                setActiveElemRight(-1);
                            }else{
                                setActiveElemRight(i);
                            }
                            
                            
                        }}>
                            <img src={image.url} style={{maxHeight:'15vh', maxWidth:'15vh'}} alt=""/>
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