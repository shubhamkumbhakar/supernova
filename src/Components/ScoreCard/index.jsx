import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ScoreBadge from './ScoreBadge';
import ScoreDetails from './ScoreDetails';
import './styles.css'

const ScoreCard = (props) => {
  const {questions, scores} = props.states;
  const {setCurrentScreen} = props.actions;
  const [stars, setStars] = useState(0);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  useEffect(()=>{
    let maxScore = 0;
    let totalScore = 0;
    for(let i=0;i<questions.length;i++){
      maxScore += questions[i].countOption;
      totalScore += scores[i] 
    } 
    setScore(totalScore);
    setMaxScore(maxScore);
    const scorePercent = (totalScore*100)/maxScore;
    if(scorePercent>80){
        setStars(3);
    }else if(scorePercent>60){
        setStars(2)
    }else if(scorePercent>10){
        setStars(1);
    }else{
        setStars(0);
    }
  },[scores]);
  return (
    <div>
      <div className='scorecard__heading'></div>
      <div className='scorecard__components'>
        <div className='up'>
            <ScoreBadge states={{score, maxScore, stars}} actions={{setCurrentScreen}}/>
        </div>
        <div className='down'>
            <ScoreDetails states={{scores, questions}} actions={{setCurrentScreen}}/>
        </div>
      </div>
    </div>
  )
}

export default ScoreCard