

import React, { Component } from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocSignup from "../auth/signup/bloc-signup";

export default class Signup extends Component {
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
          <BlocSignup history={this.props.history} />
        </div>

        <div className="third">
          <Assistant />
        </div>
      </div>
    );
  }
}
