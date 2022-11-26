import React, { useEffect, useState } from 'react'

const ScoreDetails = (props) => {
  const {questions, scores=[]} = props.states;
  const {setCurrentScreen} = props.actions;
  const [barWidths, setBarWidths] = useState([]);
  useEffect(()=>{
    const tempWidths = [];
    for(let i=0;i<scores.length;i++){
      const percent = (scores[i]*100)/(questions[i].countOption);
      tempWidths.push(percent);
    }
    setBarWidths(tempWidths);
  },[]);
  return (
    <div className='score_details_wrapper'>
      <div className='score_details_heading'>SCORE</div>
      <div>
        {
          scores.map((score,i)=>{
            return(
              <div key={i} className='score_details_bar_wrapper'>
                <div className='score_details_qindex'>Q{i+1}</div>
                <div className="score_details_bar_container">
                    <div className='score_details_bar' style={{width:`${barWidths[i]}%`}}>
                      
                    </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ScoreDetails