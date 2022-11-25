import {useEffect, useState} from 'react'
import './style.css'
import nextAudio from '../../Assets/buttonclick.mp3'
import moveAudio from '../../Assets/move.mp3'
import ProgressBar from './ProgressBar';
const Quiz = (props) => {
  const [nextButtonSound] = useState(new Audio(nextAudio));
  const [moveSound] = useState(new Audio(moveAudio));
  const [currQues, setCurrentQues] = useState(0);
  const [activeElemLeft, setActiveElemLeft] = useState(-1);
  const [activeElemRight, setActiveElemRight] = useState(-1);
  const {questions, scores} = props.states;
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);
  const {setCurrentScreen, setScores} = props.actions;
  const [totalMatch, setTotalMatch] = useState(0);
  const [matches, setMatches] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [imageSize, setImageSize] = useState(0);
  const reset = () => {
    setMatches([]);
    document.getElementById('check-message').innerHTML = ``;
    setLeftColumn(questions[currQues].leftColumn);
    setRightColumn(questions[currQues].rightColumn);
    setTotalMatch(0);
    for(let i=0;i<questions[currQues].leftColumn.length;i++){
        document.getElementById(`imgLeft${i}`).style.backgroundColor = '#fff';
        document.getElementById(`imgRight${i}`).style.backgroundColor = '#fff';
    }
    setIsChecked(false);
  }
  const nextQues = () =>{
    let score = 0;
    for(let i=0;i<totalMatch;i++){
        if(matches[i]===questions[currQues].correctMatch[i]){
            score++;
        }
    }
    scores[currQues]=score;
    setScores(scores);
    nextButtonSound.play();
    reset();
    const n = questions.length;
    if(currQues<n-1){
        setCurrentQues(currQues+1);
    }else{
        document.getElementById('bar').style.width = "100%";
        setTotalMatch(100);
        setTimeout(()=>{
            setCurrentScreen('score');
            setTotalMatch(0);
        },200)
        
    }
  }

  const unMatch = () => {
    moveSound.play();
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
    moveSound.play();
    let i = activeElemLeft;
    let j = activeElemRight;
    const distanceLeft = 74*(activeElemLeft - totalMatch);
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

  const checkMatch = () => {
    let score = 0;
     for(let i=0;i<totalMatch;i++){
        if(matches[i]===questions[currQues].correctMatch[i]){
            score++;
            for(let j=0;j<questions[currQues].leftColumn.length;j++){
                if(questions[currQues].leftColumn[j].optionIndex === i){
                    document.getElementById(`imgLeft${j}`).style.backgroundColor = 'green';
                    document.getElementById(`imgRight${j}`).style.backgroundColor = 'green';
                }
            }
        }else{
            for(let j=0;j<questions[currQues].leftColumn.length;j++){
                if(questions[currQues].leftColumn[j].optionIndex == i){
                    document.getElementById(`imgLeft${j}`).style.backgroundColor = 'red';
                    document.getElementById(`imgRight${j}`).style.backgroundColor = 'red';
                }
            } 
        }
     }
     document.getElementById('check-message').innerHTML = `You made ${score} correct answer${score>1?'s':''}.`
     scores[currQues] = score;
     setScores(scores);
     setIsChecked(true);
  }

  const toggleSelectionLeft = (i) => {
    if(activeElemLeft===i){
        setActiveElemLeft(-1);
    }else{
        setActiveElemLeft(i);
    }
  }

  const toggleSelectionRight = (i) => {
    if(activeElemRight===i){
        setActiveElemRight(-1);
    }else{
        setActiveElemRight(i);
    }
  }

  useEffect(()=>{
    const size = 170/questions[currQues].countOption;
    setImageSize(size);
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
        if(isChecked){
            return;
        }
        unMatch();
        setActiveElemLeft(-1);
        setActiveElemRight(-1);
    }
  },[activeElemLeft,activeElemRight])

  return (
        <>
        <ProgressBar states={{currQues, total: questions.length}}/>
        <div className='heading'> Match the Pairs. </div>
        <div className='quiz__table'>
            <div className='quiz__left'>
                {
                    leftColumn.map((image, i)=>(
                        <div key={i} id={`imgLeft${i}`} className={activeElemLeft===i?"quiz__imagebox active-left":i<totalMatch?"quiz__imagebox matched-left":"quiz__imagebox"} style={{height:`${imageSize}px`}} onClick={()=>toggleSelectionLeft(i)}>
                            <img src={image.url} width='auto' height={`${imageSize}px`} alt=""/>
                        </div>
                    ))
                }
            </div>
            <div className='quiz__right'>
                {
                    rightColumn.map((image, i)=>(
                        <div key={i} id={`imgRight${i}`} className={activeElemRight===i?"quiz__imagebox active-right":i<totalMatch?"quiz__imagebox matched-right":"quiz__imagebox"} style={{height:`${imageSize}px`}} onClick={()=>toggleSelectionRight(i)}>
                            <img src={image.url} width={`${imageSize}px`} height={`${imageSize}px`} alt=""/>
                        </div>
                    ))
                }
            </div>
        </div>
        <div id="check-message"></div>
        <div className="button-container">
            <button disabled={totalMatch<questions[currQues].countOption} onClick={checkMatch} className="check-button">Check</button>
            <button onClick={nextQues} className="next-button">Next</button>
        </div>
        </>
  )
}

export default Quiz