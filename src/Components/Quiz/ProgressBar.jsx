import React from 'react'
import { useEffect, useState } from 'react';

const ProgressBar = (props) => {
  const {currQues, total} = props.states;
  const [yellowPercent, setYellowPercent] = useState(0);
  const [greenPercent, setGreenPercent] = useState(0);
  useEffect(()=>{
    const currPercent = ((currQues+1)*100)/total;
    const pastPercent = (currQues*100)/total;
    setYellowPercent(currPercent);
    setGreenPercent(pastPercent);
  },[currQues]);
  return (
    <div className="progress_bar_wrapper">
        <div className="yellow_bar" style={{width:`${yellowPercent}%`}}>
          <div style={{width:'90vw'}}>
            <div className="green_bar" style={{width:`${greenPercent}%`}}></div>
          </div> 
        </div>
    </div>
  )
}

export default ProgressBar