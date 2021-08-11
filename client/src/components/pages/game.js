import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Banner from "../banner/banner";
import GameArea from "../game-area/gameArea";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import GameEvents from "../game-events/game-events";
import Logout from "../logout-btn";
import apiRequests from "../api-requests";
// import BtnFullScreen from "../game-area/btnFullScreen"

///  TIME THING
export default class Game extends Component {
  state = {
    times: 0,
    scores: 0,
    objectOne: 0,
    objectTwo: 0,
    objectThree: 0,
  };

  handleSubmit = () => {
    apiRequests
      .game(
        this.state.scores,
        this.state.objectOne,
        this.state.objectTwo,
        this.state.objectThree,
        this.props.userInSession
      )
      .then((response) => {
        console.log("api reponse", response);
      })
      .catch((err) => this.setState({ error: err.response }));
  };

  sendScoreEnd = (gameStart) => {
    if (gameStart === false) {
      this.handleSubmit();
    } else {
    }
  };

  recoverGameTime = (time) => {
    // console.log("time", time)

    // let newTime = time
    this.setState({ times: time });
  };

  recoverScore = (score) => {
    // console.log("score", score)
    this.setState({ scores: score });
  };

  recoverObjects = (one, two, three) => {
    // console.log("score", score)
    this.setState({
      objectOne: one,
      objectTwo: two,
      objectThree: three,
    });
  };

  render() {
    // console.log("props", this.props.userInSession);

    if (!this.props.userInSession) {
      if (this.props.userInSession === false) {
        return <Redirect to="/login" />;
      } else {
        return "loading";
      }
    }

    console.log("game", this.state.objectOne);

    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout />
        </div>
        <div className="second">
          <Menu />
          <GameArea
            object={this.recoverObjects}
            gameTime={this.recoverGameTime}
            score={this.recoverScore}
            scoreEndGame={this.sendScoreEnd}
          />
          <GameEvents
            time={this.state.times}
            scorePlayer={this.state.scores}
            objectOne={this.state.objectOne}
            objectTwo={this.state.objectTwo}
            objectThree={this.state.objectThree}
          />
        </div>

        <div className="third">
          <Assistant />
          {/* <BtnFullScreen /> */}

          <form onSubmit={this.handleSubmit} method="post">
            <input type="hidden" value={this.state.scores} />
            <input type="hidden" value={this.state.objectOne} />
            <input type="hidden" value={this.state.objectTwo} />
            <input type="hidden" value={this.state.objectThree} />
          </form>
        </div>
      </div>
    );
  }
}
