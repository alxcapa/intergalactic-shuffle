import React from 'react';
import Banner from '../banner/banner'
import GameArea from '../game-area/gameArea'
import Assistant from "../assistant/assistant"
import Menu from "../menu/menu"
import GameEvents from "../game-events/game-events"
import Logout from "../logout-btn"


function Game() {

  return (<div className="globalContainer">

    <div id="top">
      <Banner />
      <Logout />
    </div>
    <div id="middle">
      <Menu />
      <GameArea />
      <GameEvents />
    </div>
    <div id="bottom">
      <Assistant />
    </div>


  </div>)

}

export default Game