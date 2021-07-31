import React, { Component } from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocLogin from "../auth/login/bloc-login";

export default class Login extends Component {
  render() {
    console.log("props history", this.props.history)
    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout />
        </div>

        <div className="second">
          <Menu />
          <BlocLogin history={this.props.history} />
        </div>

        <div className="third">
          <Assistant />
        </div>
      </div>
    );
  }
}
