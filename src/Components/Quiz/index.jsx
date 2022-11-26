import {useEffect, useState} from 'react'
import './style.css'
import nextAudio from '../../Assets/buttonclick.mp3'
import moveAudio from '../../Assets/move.mp3'
import ProgressBar from './ProgressBar';
const greenTick = 'https://e7.pngegg.com/pngimages/341/867/png-clipart-white-check-with-green-background-illustration-fingerprint-comcast-circle-symbol-technology-tick-miscellaneous-angle.png';
const redCross = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JVTN9BUYKRqAUaQfK7noC02bmBZY25lRiw&usqp=CAU';



const Quiz = (props) => {
  const {questions=[], scores} = props.states;
  const {setCurrentScreen, setScores} = props.actions;

  const [nextButtonSound] = useState(new Audio(nextAudio));
  const [moveSound] = useState(new Audio(moveAudio));
  const [currQues, setCurrentQues] = useState(0);
  const [activeElemLeft, setActiveElemLeft] = useState(-1);
  const [activeElemRight, setActiveElemRight] = useState(-1);
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);
  const [totalMatch, setTotalMatch] = useState(0);

  const [matches, setMatches] = useState([]);
  // matches are stored as an array of indexes of the right column.
  // The array index itself represent is the left column.
  // if user matches leftColumn[i] with rightColumn[j], it is stored as matches[i]=j.
  // In the same way, the correct matches is present inside the question's data inside questions[currQues].correctMatch.

  const [isChecked, setIsChecked] = useState(false);
  const [imageSize, setImageSize] = useState(0);


// reset function resets the changes in current coponent to render the new question in a fresh manner.
  const reset = () => {
    setActiveElemLeft(-1);
    setActiveElemRight(-1);
    setMatches([]);
    setLeftColumn(questions[currQues].leftColumn);
    setRightColumn(questions[currQues].rightColumn);
    setTotalMatch(0);
    setIsChecked(false);
  }
  
// nextQues updates the question in the same component. If it was last question, then the component scorecard is rendered
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
        setCurrentScreen('score');
    }
  }

// unMatch() function unmatches the currently matched options. 
// Currently matched options is identified if the index of that option is less than totalMatch done so far. 
// leftColumns and right columns are shuffled as per the new order using multiple swaps.
// totalMatch is decremented after one unmatch process is done.
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

// match() function matches the currently unmatched options. 
// Currently unmatched options is identified if the index of that option is greater than totalMatch done so far. 
// new match are drilled up to the queue of matched pairs.
// leftColumns and right columns are shuffled as per the new order using multiple swaps.
// totalMatch is incremented after one match process is done.
  const match = () => {
    moveSound.play();
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

  // This is executed when users request for check answer. 
  // It calculates the score as per the user's matches and questions[currQues].correctMatch
  // it updates the third column of green tick and red cross for user to see the correctness.
  // isChecked state is updated to mark the visibility of third column of green tick and red cross.
  const checkMatch = () => {
    let score = 0;
     for(let i=0;i<totalMatch;i++){
        if(matches[i]===questions[currQues].correctMatch[i]){
            score++;
        }
     }
     scores[currQues] = score;
     setScores(scores);
     setIsChecked(true);
  }

  // This method is to toggle the current selection in left column of options.
  const toggleSelectionLeft = (i) => {
    if(activeElemLeft===i){
        setActiveElemLeft(-1);
    }else{
        setActiveElemLeft(i);
    }
  }

// This method is to toggle the current selection in right column of options.
  const toggleSelectionRight = (i) => {
    if(activeElemRight===i){
        setActiveElemRight(-1);
    }else{
        setActiveElemRight(i);
    }
  }

  // This method inside useEffect determines the size of images as per the count of options in current question
  useEffect(()=>{
    const size = 170/questions[currQues].countOption;
    setImageSize(size);
    setLeftColumn(questions[currQues].leftColumn);
    setRightColumn(questions[currQues].rightColumn);
  },[currQues])


  // This method inside useEffect is rendered evertime user clicks on options to match them or to unmatch them
  useEffect(()=>{
    if(activeElemLeft>=0 && activeElemLeft>=totalMatch && activeElemRight>=0 && activeElemRight>=totalMatch){
        matches[leftColumn[activeElemLeft].optionIndex] = rightColumn[activeElemRight].optionIndex;
        setMatches(matches);

        match();
        
        setActiveElemLeft(-1);
        setActiveElemRight(-1);
    }else if((activeElemLeft>=0 && activeElemLeft<totalMatch) || (activeElemRight>=0 && activeElemRight<totalMatch)){
        if(isChecked){
            return;
        }
        console.log(matches);
        unMatch();
        setActiveElemLeft(-1);
        setActiveElemRight(-1);
    }else{
        return;
    }
  },[activeElemLeft,activeElemRight])

  if(!questions.length){
    return null;
  }

  return (
        <>
        <ProgressBar states={{currQues, total: questions.length}}/>
        <div className='heading'> Match the Pairs. </div>
        <div className='quiz__table'>
            <div className='quiz__left'>
                {
                    leftColumn.map((image, i)=>(
                        <div key={i} id={`imgLeft${i}`} className={(activeElemLeft===i && i>=totalMatch)?"quiz__imagebox active-left":i<totalMatch?"quiz__imagebox matched-left":"quiz__imagebox"} style={{height:`${imageSize}px`}} onClick={()=>toggleSelectionLeft(i)}>
                            <img src={image.url} width='auto' height={`${imageSize}px`} alt=""/>
                        </div>
                    ))
                }
            </div>
            <div className='quiz__right'>
                {
                    rightColumn.map((image, i)=>(
                        <div key={i} id={`imgRight${i}`} className={(activeElemRight===i && i>=totalMatch)?"quiz__imagebox active-right":i<totalMatch?"quiz__imagebox matched-right":"quiz__imagebox"} style={{height:`${imageSize}px`}} onClick={()=>toggleSelectionRight(i)}>
                            <img src={image.url} width={`${imageSize}px`} height={`${imageSize}px`} alt=""/>
                        </div>
                    ))
                }
            </div>
            <div className={isChecked?'result':'hide'}>
                {
                    rightColumn.map((image, i)=>(
                        <div key={i} id={`result${i}`} className="result_box">
                            <img src={matches[i]===questions[currQues].correctMatch[i]?greenTick:redCross} width={`${imageSize}px`} height={`${imageSize}px`} alt=""/>
                        </div>
                        
                    ))
                }
            </div>
        </div>
        <div className={isChecked? "check_message":'hide'}>You made {scores[currQues]} correct answer{scores[currQues]>1?'s':''}.</div>
        <div className="button-container">
            <button disabled={totalMatch<questions[currQues].countOption} onClick={checkMatch} className="check-button">Check</button>
            <button onClick={nextQues} className="next-button">Next</button>
        </div>
        </>
  )
}

export default Quiz