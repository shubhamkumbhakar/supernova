import React from 'react'
import { useEffect } from 'react';

const ProgressBar = (props) => {
  const {currQues, total} = props.states;
  useEffect(()=>{
    const currPercent = ((currQues+1)*100)/total;
    const percent = ((currQues+0)*100)/total;
    console.log(currPercent, percent)
    document.getElementById('currbar').style.width = currPercent + "%";
    document.getElementById('bar').style.width = percent + "%";
  },[currQues]);
  return (
    <div id="progress">
        <div id="currbar">
          <div style={{width:'90vw'}}>
            <div id="bar"></div>
          </div> 
        </div>
    </div>
  )
}

export default ProgressBar