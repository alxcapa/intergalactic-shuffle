import React, { Component } from 'react';
import Banner from '../banner/banner'
import Assistant from "../assistant/assistant"
import Menu from "../menu/menu"
import Logout from "../logout-btn"
import BlocProfile from "../profile/bloc-profile"
import apiRequests from "../api-requests"

export default class Profile extends Component {

  // componentDidMount() {

  //   apiRequests.profile()
  //     .then(response => {

  //       console.log("data", response)

  //     })
  //     .catch(err => this.setState({ error: err.response.data.message }))
  //     ;

  // }



  render() {
    console.log("props===>", this.props.userInSession);
    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout />
        </div>

        <div className="second">
          <Menu />
          <BlocProfile userInSession = {this.props.userInSession} />

        </div>

        <div className="third">
          <Assistant />
        </div>


      </div>
    )
  }
}





