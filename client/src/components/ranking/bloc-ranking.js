import React, { Component } from 'react'
import PlayerRow from "./player-row"

export default class BlocRanking extends Component {
  render() {

    if (!this.props.dataRank) return <div class="loader"> <p>LOADING</p> </div>

    console.log("rank", this.props.dataRank.data)

    return (
      <div className="bloc-login">
        <br /> <br /> <br />
        <marquee>...WELCOME TO INTERGALACTIC SHUFFLE HUMAN...</marquee>
        <br /> <br />
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Username</th>
              <th>Score</th>
              <th>Objects</th>
              <th>Trophies</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dataRank.data.map((el, i) => {

              return (
                <tr>
                  <PlayerRow position={i + 1} username={el.user_ref.username} score={el.high_score} />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}



