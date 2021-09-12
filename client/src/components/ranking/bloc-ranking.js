import React, { Component } from 'react'
import PlayerRow from "./player-row"

export default class BlocRanking extends Component {
  render() {

    if (!this.props.dataRank) return <div class="loader"> <p>LOADING</p> </div>

    console.log("rank", this.props.dataRank.data)

    return (
      <div className="bloc-login">
        <br />   <br />    <br />
        <div> <h2>HUMAN PERFORMANCE</h2></div>



        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Username</th>
              <th>Score</th>
              <th>Objects</th>

            </tr>
          </thead>
          <tbody>
            {this.props.dataRank.data.map((el, i) => {
              if (el.high_score > 1) {
                return (
                  <tr>
                    <PlayerRow position={i + 1} username={el.user_ref.username} score={el.high_score} objectOne={el.object_one} objectTwo={el.object_two} objectThree={el.object_three} />
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    )
  }
}



