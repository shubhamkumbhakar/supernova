import React from 'react'

const ScoreCard = (props) => {
  const {setCurrentScreen} = props.actions;
  return (
    <div onClick={()=>setCurrentScreen('start')}>ScoreCard</div>
  )
}

export default ScoreCard