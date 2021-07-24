import React from 'react';
import Banner from '../banner/banner'
import GameArea from '../game-area/gameArea'
import Assistant from "../assistant/assistant"

function Game() {

  return (<div className="globalContainer">
    <Banner />
    <GameArea />
    <Assistant />
  </div>)

}

export default Game