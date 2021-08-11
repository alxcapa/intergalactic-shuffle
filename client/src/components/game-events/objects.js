import React, { Component } from "react";

export default class Objects extends Component {
  render() {
    return (
      <div className="objects">
        <div className="object">
          <img src="images/lune.png" alt="object" />
          <div>{this.props.objectOne}</div>
        </div>
        <div className="object">
          <img src="images/planet.png" alt="object" />
          <div>{this.props.objectTwo}</div>
        </div>
        <div className="object">
          <img src="images/sun.png" alt="object" />
          <div>{this.props.objectThree}</div>
        </div>
      </div>
    );
  }
}