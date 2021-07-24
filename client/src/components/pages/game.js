import React from "react";
import Banner from "../banner/banner";
import GameArea from "../game-area/gameArea";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import GameEvents from "../game-events/game-events";
import Logout from "../logout-btn";

function Game() {
  return (
    <div className="globalContainer">
      <div className="first">
        <Banner />
        <Logout />
      </div>
      <div className="second">
        <Menu />
       <GameArea />
        <GameEvents />  
        <Assistant />
      </div>

      {/* <div className="third">
 
      </div> */}
    </div>
  );
}

export default Game;
