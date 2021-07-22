import React from 'react';
import Player from './player'
import Start from './start-btn'

function GameArea() {

  return <div className="game-area">
    <Player />
    <Start />
  </div>

}

export default GameArea