import React, { Component } from 'react'

export default class BlocProfile extends Component {



  render() {
    console.log("props", this.props.dataProfile);
    return (
      <div className="bloc-profile">
        <h2>PROFILE</h2>
        <p>USERNAME: BONJOUR_ROBOT</p>
        <p>EMAIL: BONJOUR_ROBOT@ROBOMAIL.COM</p>
        <h3>GAMES HISTORIC</h3>
        <ul>
          <li>17.07.2021 - 1000000000 - 59 - XXX</li>
          <li>16.07.2021 - 1000000000 - 59 - XXX</li>
          <li>15.07.2021 - 1000000000 - 59 - XXX</li>
        </ul>
        <h3>BEST GAME</h3>
        <span>14.07.2021 - 5000000000 - 99 - XXXXX</span>
      </div>
    )
  }
}


