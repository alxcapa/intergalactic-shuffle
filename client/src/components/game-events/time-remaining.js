import React, { Component } from 'react'

export default class TimeRemaining extends Component {
  render() {
    // console.log("props time", this.props.timeRemaining)
    return (
      <div className="time-remaining titles-events">
        <div>Time Remaining</div>
        <div>{this.props.timeRemaining}</div>
      </div>
    )
  }
}


