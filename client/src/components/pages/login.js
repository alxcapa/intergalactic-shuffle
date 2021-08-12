import React, { Component } from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocLogin from "../auth/login/bloc-login";
import { Redirect } from "react-router-dom"

export default class Login extends Component {
  render() {
    console.log("session", this.props.session)
    if (!this.props.session) {
      return (
        <div className="globalContainer">
          <div className="first">
            <Banner />
            <Logout />
          </div>

          <div className="second">
            <Menu />
            <BlocLogin updateUser={this.props.updateUser} history={this.props.history} />
          </div>

          <div className="third">
            <Assistant />
          </div>
        </div>
      );
    }
    else {
      return <Redirect to="/" />;
    }


  }
}
