import React from 'react'
import { useEffect } from 'react';

const ProgressBar = (props) => {
  const {currQues, total} = props.states;
  useEffect(()=>{
    const currPercent = ((currQues+1)*100)/total;
    const percent = (currQues*100)/total;
    console.log(percent);
    document.getElementById('currbar').style.width = currPercent + "%";
    document.getElementById('bar').style.width = percent + "%";
  },[currQues]);
  return (
    <div id="progress">
        <div id="currbar">
            <div id="bar">

            </div>
        </div>
    </div>
  )
}

export default ProgressBar