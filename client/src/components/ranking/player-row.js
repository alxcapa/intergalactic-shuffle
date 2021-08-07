import React from 'react';
import { Component } from 'react';

class PlayerRow extends Component {


  render() {
    return (<>
      <td>{this.props.position}</td>
      <td>{this.props.username}</td>
      <td>{this.props.score}</td>
    </>)
  }
}

export default PlayerRow;