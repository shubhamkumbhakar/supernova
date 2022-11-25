import React, { useEffect } from 'react'

const ScoreDetails = (props) => {
  const {questions, scores=[]} = props.states;
  const {setCurrentScreen} = props.actions;
  useEffect(()=>{
    for(let i=0;i<scores.length;i++){
      const percent = (scores[i]*100)/(questions[i].countOption);
      const color = 'rgb(211, 230, 40)';
      document.getElementById(`score_details_bar${i}`).style.width = percent + "%";
      document.getElementById(`score_details_bar${i}`).style.backgroundColor = color;
    }
    
  },[]);
  return (
    <div className='score_details_wrapper'>
      <div className='score_details_heading'>SCORE</div>
      <div>
        {
          scores.map((score,i)=>{
            return(
              <div className='score_details_bar_wrapper'>
                <div className='score_details_qindex'>Q{i+1}</div>
                <div className="score_details_bar_container">
                    <div className='score_details_bar' id={`score_details_bar${i}`}>
                      
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