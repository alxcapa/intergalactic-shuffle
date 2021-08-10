import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Banner from "../banner/banner";
import GameArea from "../game-area/gameArea";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import GameEvents from "../game-events/game-events";
import Logout from "../logout-btn";


///  TIME THING 
export default class Game extends Component {

  state = {
    times: 0,
    scores: 0,
    objectOne: 0,
    objectTwo: 0,
    objectThree: 0
  }

  recoverGameTime = (time) => {

    // console.log("time", time)

    // let newTime = time
    this.setState({ times: time });
  }


  recoverScore = (score) => {

    // console.log("score", score)
    this.setState({ scores: score });
  }

  recoverObjects = (one, two, three) => {

    // console.log("score", score)
    this.setState({
      objectOne: one,
      objectTwo: two,
      objectThree: three
    });
  }


  render() {
    // console.log("props", this.props.userInSession);

    if (!this.props.userInSession) {
      if (this.props.userInSession === false) {
        return <Redirect to="/login" />;
      } else {
        return "loading";
      }
    }




    // console.log("yooooo", this.state.scores)
    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout />
        </div>
        <div className="second">
          <Menu />
          <GameArea object={this.recoverObjects} gameTime={this.recoverGameTime} score={this.recoverScore} />
          <GameEvents time={this.state.times} scorePlayer={this.state.scores} />
        </div>

        <div className="third">
          <Assistant />
        </div>
      </div>
    );
  }
}
