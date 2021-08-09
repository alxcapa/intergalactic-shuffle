import React, { Component } from 'react'

export default class Score extends Component {
  render() {
    return (
      <div className="score titles-events">
        <div>Score</div>
        <div>{this.props.score}</div>
      </div>
    )
  }
}

