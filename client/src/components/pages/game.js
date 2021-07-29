import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Banner from "../banner/banner";
import GameArea from "../game-area/gameArea";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import GameEvents from "../game-events/game-events";
import Logout from "../logout-btn";



export default class Game extends Component {
  render() {
    console.log("props", this.props.userInSession);

    if (!this.props.userInSession) {
      if (this.props.userInSession === false) {
        return <Redirect to="/login"/>;
      } else {
        return "loading";
      }
    }

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
        </div>

        <div className="third">
          <Assistant />
        </div>
      </div>
    );
  }
}
