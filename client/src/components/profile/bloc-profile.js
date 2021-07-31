import React, { Component } from "react";



export default class BlocProfile extends Component {
  render() {

    function formatDate(date) {

      let strDate = JSON.stringify(date)
      let cutDate = strDate.slice(1, 11)

      let arrDate = cutDate.split('-')
      arrDate.reverse()

      return arrDate.join('/')
    }


    if (!this.props.dataProfile) return 'loading'
    console.log(this.props.dataProfile.user, 'props')
    return (
      <div className="bloc-profile">
        <h2>PROFILE</h2>
        <p>USERNAME: {this.props.dataProfile.user.user_ref.username}</p>
        <p>EMAIL: {this.props.dataProfile.user.user_ref.email}</p>
        <h3>BEST GAMES</h3>
        <ul>
          {this.props.dataProfile.scores.map((item) => {
            return (
              <li key={item.id}> {formatDate(item.createdAt)} - {item.high_score} - [{item.object_one}, {item.object_two}, {item.object_three} ]</li>
            )
          })}

        </ul>

      </div>
    );
  }
}
