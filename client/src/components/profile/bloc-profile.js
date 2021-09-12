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


    if (!this.props.dataProfile) return <div class="loader"><p>LOADING</p> </div>
    console.log(this.props.dataProfile.user, 'props')
    return (
      <div className="bloc-profile">
        <br />
        <br /><br />
        <h2>PROFILE</h2>
        <h3>BEST GAMES</h3>
        <ul>
          {this.props.dataProfile.scores.map((item) => {
            if (item.high_score > 1) {
              return (
                <li key={item.id}> {formatDate(item.createdAt)} - {item.high_score} - [{item.object_one}, {item.object_two}, {item.object_three} ]</li>
              )
            }

          })}

        </ul>
        <h3>PERSONNAL INFORMATIONS</h3>
        <p>USERNAME: {this.props.dataProfile.user.user_ref.username}</p>
        <p>EMAIL: {this.props.dataProfile.user.user_ref.email}</p>
        <p>LOCATION: {this.props.dataProfile.user.user_ref.location}</p>


      </div>
    );
  }
}
