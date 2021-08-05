import React from 'react';
import { Component } from 'react';

class PlayerRow extends Component {


  render() {
    return (<div>
      <td>{this.props.position}</td>
      <td>{this.props.username}</td>
    </div>)
  }
}

export default PlayerRow;