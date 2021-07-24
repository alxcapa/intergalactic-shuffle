import React from 'react';
import Banner from '../banner/banner'
import GameArea from '../game-area/gameArea'
import Assistant from "../assistant/assistant"
import Menu from "../menu/menu"
import GameEvents from "../game-events/game-events"
import Logout from "../logout-btn"


function Game() {

  return (<div className="globalContainer">
    <Banner />
    <Logout />
    <Menu />
    <GameArea />
    <GameEvents />
    <Assistant />

  </div>)

}

export default Game