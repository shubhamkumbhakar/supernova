import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import happyStarData from '../../Assets/3-star-rating.json';
import okayStarData from '../../Assets/2-star-rating.json';
import sadStarData from '../../Assets/1-star-rating.json';
import horribleStarData from '../../Assets/0-star-rating.json';

import './styles.css'
const ScoreBadge = (props) => {
  const {score, maxScore, stars} = props.states;
  const {setCurrentScreen} = props.actions;
  return (
    <div className="outer_wrapper">
        <div className="inner_wrapper">
            <Player
              autoplay
              loop
              src={stars===3?happyStarData:stars===2?okayStarData:stars===1?sadStarData:horribleStarData}
              style={{ height: '100px', width: '100px', marginTop:'-90px' }}
            >
            </Player>
            <div className='total_text'>SCORE</div>
            <div className='score_number'><span>{score}</span>/{maxScore}</div>
            <div className="restart" onClick={()=>setCurrentScreen('start')}>
                <img src="https://cdn-icons-png.flaticon.com/512/724/724863.png" width="50px" height="50px" alt=""/>
            </div>
        </div>
    </div>
  )
}

export default ScoreBadge