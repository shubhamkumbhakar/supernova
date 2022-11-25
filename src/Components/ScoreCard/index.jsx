import React from 'react'

const ScoreCard = (props) => {
  const {questions, scores} = props.states;
  const {setCurrentScreen} = props.actions;
  console.log(scores);
  return (
    <div>
      <div onClick={()=>setCurrentScreen('start')}>ScoreCard</div>
      <div>
        {
          questions.map((question, i)=>{
            return(
              <div key={question.id}>
                Q. {i+1}: {scores[i]}/{questions[i].countOption}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ScoreCard