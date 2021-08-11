import React, { Component } from "react";
import TimeRemaining from "../game-events/time-remaining";
import Score from "../game-events/score";
import Objects from "../game-events/objects";
import Notice from "../game-events/notice";

export default class GameEvents extends Component {
  render() {
    // console.log("props", this.props.time)
    // console.log("props score", this.props.score)
    // console.log("props 1", this.props.objectOne)
    // console.log("props 2", this.props.objectTwo)
    // console.log("props 3", this.props.objectThree)
    return (
      <div className="game-events">
        <TimeRemaining timeRemaining={this.props.time} />
        <Score score={this.props.scorePlayer} />
        <Objects
          objectOne={this.props.objectOne}
          objectTwo={this.props.objectTwo}
          objectThree={this.props.objectThree}
        />
        <Notice />
      </div>
    );
  }
}
