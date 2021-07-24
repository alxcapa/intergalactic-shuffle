import React from 'react';
import TimeRemaining from "../game-events/time-remaining"
import Score from "../game-events/score"
import Objects from "../game-events/objects"
import Notice from "../game-events/notice"


function GameEvents() {

  return (<div className="game-events">
    <TimeRemaining />
    <Score />
    <Objects />
    <Notice />


  </div>)

}

export default GameEvents